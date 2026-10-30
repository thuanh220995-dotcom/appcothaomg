import React, { useState } from 'react';
import { z } from 'zod';
import { Sparkles, Play, CheckCircle2, Save, Download, FileText, AlertCircle, RefreshCw, Layers, Edit3, Trash2, Eye } from 'lucide-react';
import { Question, GameType, SupportLevel } from '../../types';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

// Schema validation Zod cho kết quả câu hỏi trả về từ AI
const QuestionItemSchema = z.object({
  questionText: z.string().min(3),
  speechText: z.string().min(3),
  options: z.array(z.object({
    id: z.string(),
    text: z.string(),
    isCorrect: z.boolean(),
    iconOrVisual: z.string().optional(),
  })).min(2),
  correctAnswer: z.string(),
  explanation: z.string(),
  supportLevel: z.string().optional(),
  visualCount: z.number().optional(),
});

const BulkQuestionsArraySchema = z.array(QuestionItemSchema);

interface AIStudioProps {
  onGoToLibrary: () => void;
  onGoToGames: () => void;
  isAuthenticated: boolean;
  onRequireAuth: () => void;
}

export const AIStudio: React.FC<AIStudioProps> = ({
  onGoToLibrary,
  onGoToGames,
  isAuthenticated,
  onRequireAuth,
}) => {
  const [topic, setTopic] = useState('Quê hương Điện Biên');
  const [customTopic, setCustomTopic] = useState('');
  const [gameType, setGameType] = useState<GameType>('counting');
  const [supportLevel, setSupportLevel] = useState<SupportLevel>('basic');
  const [targetCount, setTargetCount] = useState<number>(10);
  const [customPrompt, setCustomPrompt] = useState('');

  // Trạng thái tạo hàng loạt
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<{ current: number; total: number; batchInfo: string } | null>(null);
  const [generatedList, setGeneratedList] = useState<Partial<Question>[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  const topicsList = [
    'Quê hương Điện Biên',
    'Bản thân',
    'Gia đình',
    'Trường mầm non',
    'Nghề nghiệp',
    'Thế giới động vật',
    'Thế giới thực vật',
    'Giao thông',
    'Nước và hiện tượng tự nhiên',
    'Kỹ năng sống',
    'Chuẩn bị vào lớp Một',
    'Khác (Tự nhập)',
  ];

  const activeTopic = topic === 'Khác (Tự nhập)' ? customTopic || 'Chủ đề tự chọn' : topic;

  // HÀM TẠO CÂU HỎI THEO LÔ (BATCHING CHO SỐ LƯỢNG LỚN 10, 20, 50, 100)
  const generateBulk = async (count: number) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setStatusMessage(`Đang bắt đầu tạo ${count} câu hỏi AI cho chủ đề "${activeTopic}"...`);
    setGenerationProgress({ current: 0, total: count, batchInfo: 'Đang khởi động kết nối AI...' });

    const batchSize = 10; // mỗi lô 10 câu để đảm bảo tốc độ và tính ổn định
    const batches = Math.ceil(count / batchSize);
    const accumulated: Partial<Question>[] = [];

    try {
      for (let b = 0; b < batches; b++) {
        const remaining = count - accumulated.length;
        const currentBatchTarget = Math.min(batchSize, remaining);

        setGenerationProgress({
          current: accumulated.length,
          total: count,
          batchInfo: `Đang tạo lô ${b + 1}/${batches} (${currentBatchTarget} câu)...`,
        });

        const res = await fetch('/api/gemini/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'questions',
            topic: activeTopic,
            gameType,
            supportLevel,
            count: currentBatchTarget,
            customPrompt: `${customPrompt}. Đảm bảo các câu không trùng nhau.`,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Lỗi máy chủ (${res.status}) khi tạo lô ${b + 1}`);
        }

        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          // Xác thực dữ liệu bằng Zod Schema
          const parsed = BulkQuestionsArraySchema.safeParse(data.data);
          if (parsed.success) {
            const mapped = parsed.data.map((item, idx) => ({
              ...item,
              id: `gen-${Date.now()}-${b}-${idx}`,
              topic: activeTopic,
              gameType,
              supportLevel: (item.supportLevel as SupportLevel) || supportLevel,
              visualCount: item.visualCount || (idx % 10) + 1,
              status: 'draft' as const,
              source: 'ai' as const,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }));
            accumulated.push(...mapped);
          } else {
            console.warn('Dữ liệu một phần chưa đúng schema:', parsed.error);
            // Vẫn lấy các mục hợp lệ
            data.data.forEach((raw: any, idx: number) => {
              if (raw.questionText && raw.options) {
                accumulated.push({
                  ...raw,
                  id: `gen-raw-${Date.now()}-${b}-${idx}`,
                  topic: activeTopic,
                  gameType,
                  supportLevel,
                  status: 'draft' as const,
                  source: 'ai' as const,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
              }
            });
          }
        }
      }

      setGeneratedList(accumulated);
      setGenerationProgress({
        current: accumulated.length,
        total: count,
        batchInfo: `Hoàn tất! Đã tạo thành công ${accumulated.length}/${count} câu hỏi hợp lệ.`,
      });
      setStatusMessage(`Đã sinh xong ${accumulated.length} câu hỏi AI. Giáo viên vui lòng xem lại và nhấn "Duyệt nội dung" hoặc "Xuất bản vào trò chơi".`);
      audioService.playChime('correct');
      audioService.speak(`Cô Thảo ơi, đã tạo xong ${accumulated.length} câu hỏi mới cho các bé rồi ạ!`);
    } catch (err: any) {
      console.error('Lỗi tạo hàng loạt:', err);
      setErrorMessage(err.message || 'Không thể kết nối API AI');
      setStatusMessage(null);
      audioService.playChime('encourage');
    } finally {
      setIsGenerating(false);
    }
  };

  // LƯU TOÀN BỘ VÀO THƯ VIỆN Ở TRẠNG THÁI BẢN NHÁP (DRAFT)
  const handleSaveToLibrary = () => {
    if (generatedList.length === 0) return;
    const result = storageService.bulkAddQuestions(
      generatedList.map(item => ({ ...item, status: 'draft' }))
    );
    setStatusMessage(`Đã lưu ${result.added} câu hỏi vào Thư viện học liệu (Bỏ qua ${result.skippedDuplicates} câu trùng lặp).`);
    audioService.playChime('correct');
  };

  // DUYỆT TẤT CẢ VÀ XUẤT BẢN NGAY VÀO TRÒ CHƠI ĐANG CHẠY
  const handleApproveAndPublishAll = () => {
    if (generatedList.length === 0) return;
    const result = storageService.bulkAddQuestions(
      generatedList.map(item => ({ ...item, status: 'published' }))
    );
    setStatusMessage(`🎉 Đã duyệt và XUẤT BẢN THÀNH CÔNG ${result.added} câu hỏi vào trò chơi! Trẻ có thể chơi ngay.`);
    audioService.playChime('fanfare');
    audioService.speak(`Đã xuất bản thành công ${result.added} câu hỏi vào vườn trò chơi của các bé.`);
  };

  // XUẤT FILE JSON HỌC LIỆU
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(generatedList, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HoaBanAI_Questions_${activeTopic}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // THỬ NGHE CÂU HỎI TIẾNG VIỆT
  const handleAudition = (text: string) => {
    audioService.speak(text);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Banner Cô Thảo AI Studio */}
      <div className="bg-gradient-to-r from-[#FFF9F2] via-[#FBE1EC] to-[#BFE7F4]/40 p-6 md:p-8 rounded-3xl border border-[#F5A4BF]/40 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#9B7BC0] text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CÔ THẢO AI STUDIO – XƯỞNG SÁNG TẠO HỌC LIỆU</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Tạo Ngân Hàng Học Liệu Bằng Trí Tuệ Nhân Tạo
            </h1>
            <p className="mt-2 text-sm text-slate-700 max-w-2xl leading-relaxed">
              Trợ lý AI giúp giáo viên mầm non tự động sinh 10, 20, 50, 100 câu hỏi tương tác chuẩn mực cho trẻ mẫu giáo nhỡ 4–5 tuổi, có giọng đọc tiếng Việt, kiểm duyệt sư phạm và xuất bản thẳng vào trò chơi cho trẻ mà không cần sửa code.
            </p>
          </div>

          {!isAuthenticated && (
            <div className="shrink-0 bg-white/95 p-4 rounded-2xl border border-amber-300 text-center max-w-xs shadow-sm">
              <span className="text-xs font-bold text-amber-700 block mb-2">
                🔒 Khu vực quản trị giáo viên
              </span>
              <button
                onClick={onRequireAuth}
                className="w-full px-4 py-2 bg-[#9B7BC0] hover:bg-[#8565AA] text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
              >
                Đăng nhập cô giáo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FORM THIẾT LẬP NỘI DUNG TẠO AI */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
        <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#9B7BC0]" />
          <span>1. Thiết Lập Yêu Cầu Học Liệu Mầm Non (4–5 Tuổi)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Chọn chủ đề */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Chủ đề giáo dục:
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#9B7BC0]"
            >
              {topicsList.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {topic === 'Khác (Tự nhập)' && (
              <input
                type="text"
                placeholder="Nhập tên chủ đề..."
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full mt-2 p-2.5 rounded-xl border border-slate-300 text-sm"
              />
            )}
          </div>

          {/* Chọn loại trò chơi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Loại trò chơi áp dụng:
            </label>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value as GameType)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#9B7BC0]"
            >
              <option value="counting">Trò chơi 1: Vườn hoa đếm số (1-10)</option>
              <option value="shapes">Trò chơi 2: Ngôi nhà hình học</option>
              <option value="listening">Trò chơi 3: Tai tin - Mắt sáng</option>
              <option value="behavior">Trò chơi 4: Bé chọn điều hay (Kỹ năng sống)</option>
              <option value="story">Trò chơi 5: Chuyện kể cùng Ban Ban</option>
              <option value="grade1_prep">Trò chơi 6: Hành trang vào lớp Một</option>
            </select>
          </div>

          {/* Mức độ hỗ trợ */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Mức độ hỗ trợ của trẻ:
            </label>
            <select
              value={supportLevel}
              onChange={(e) => setSupportLevel(e.target.value as SupportLevel)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#9B7BC0]"
            >
              <option value="support">Cần hướng dẫn thêm (có gợi ý chạm)</option>
              <option value="basic">Khám phá cơ bản (tiêu chuẩn 4–5 tuổi)</option>
              <option value="challenge">Thử thách mở rộng (phát triển tư duy)</option>
            </select>
          </div>
        </div>

        {/* Ghi chú thêm của giáo viên */}
        <div className="mt-4">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Gợi ý riêng của cô giáo (tùy chọn):
          </label>
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ví dụ: Tập trung vào loài hoa ban trắng Điện Biên, dùng từ ngữ dịu dàng, số lượng nhỏ hơn 6..."
            className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B7BC0]"
          />
        </div>

        {/* CÁC NÚT TẠO DỮ LIỆU HÀNG LOẠT (BẮT BUỘC THEO ĐẶC TẢ) */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            2. Chọn Số Lượng Tạo Bằng AI:
          </label>
          <div className="flex flex-wrap gap-2.5">
            {[10, 20, 50, 100].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setTargetCount(num);
                  generateBulk(num);
                }}
                disabled={isGenerating}
                className="px-4 py-2.5 rounded-xl font-black text-xs md:text-sm bg-[#FBE1EC] hover:bg-[#F5A4BF] text-slate-800 hover:text-white transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
              >
                ✨ TẠO {num} CÂU HỎI AI
              </button>
            ))}

            <button
              onClick={() => generateBulk(10)}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer disabled:opacity-50"
            >
              ➕ TẠO THÊM 10 CÂU HỎI
            </button>

            <button
              onClick={() => {
                setGeneratedList([]);
                setStatusMessage(null);
                setErrorMessage(null);
                setGenerationProgress(null);
              }}
              className="px-3.5 py-2.5 rounded-xl font-semibold text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors ml-auto cursor-pointer"
            >
              Làm mới
            </button>
          </div>
        </div>
      </div>

      {/* TIẾN ĐỘ VÀ THÔNG BÁO TẠO */}
      {isGenerating && generationProgress && (
        <div className="p-6 bg-gradient-to-r from-[#FFF9F2] to-[#BFE7F4]/40 rounded-3xl border border-[#9B7BC0]/30 shadow-sm mb-8 animate-pulse">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>{generationProgress.batchInfo}</span>
            <span className="text-[#9B7BC0] font-black">
              {generationProgress.current} / {generationProgress.total} câu
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9B7BC0] transition-all duration-300"
              style={{ width: `${Math.min(100, Math.round((generationProgress.current / generationProgress.total) * 100))}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2 italic">
            * Hệ thống tự động chia lô nhỏ, kiểm tra tính hợp lệ bằng Zod Schema và lọc trùng lặp...
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold">Lỗi tạo nội dung:</div>
            <div>{errorMessage}</div>
            <div className="text-xs text-rose-600 mt-1">
              Vui lòng kiểm tra lại GEMINI_API_KEY trong Settings &gt; Secrets hoặc thử lại với số lượng nhỏ hơn.
            </div>
          </div>
        </div>
      )}

      {statusMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm flex items-center gap-3 mb-6">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="flex-1 font-semibold">{statusMessage}</div>
        </div>
      )}

      {/* DANH SÁCH CÂU HỎI VỪA TẠO – XEM TRƯỚC, CHỈNH SỬA VÀ DUYỆT */}
      {generatedList.length > 0 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                3. Danh Sách Câu Hỏi Chờ Duyệt ({generatedList.length} câu)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Giáo viên có thể nghe thử giọng đọc tiếng Việt, chỉnh sửa câu chữ trước khi xuất bản.
              </p>
            </div>

            {/* Các nút phê duyệt và xuất bản */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveToLibrary}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Bản Nháp</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Xuất File JSON</span>
              </button>

              <button
                onClick={handleApproveAndPublishAll}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow transition-all cursor-pointer active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>DUYỆT &amp; XUẤT BẢN VÀO TRÒ CHƠI</span>
              </button>
            </div>
          </div>

          {/* Bảng danh sách câu hỏi */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {generatedList.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#9B7BC0]/40 transition-colors bg-[#FFF9F2]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#9B7BC0] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      {item.topic} · {item.gameType}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm md:text-base text-slate-900">
                    {item.questionText}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {item.options?.map((opt, oIdx) => (
                      <span
                        key={oIdx}
                        className={`px-2.5 py-1 rounded-lg font-semibold ${
                          opt.isCorrect
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        {opt.text} {opt.isCorrect && '✓'}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 italic mt-1.5">
                    Lời khen: {item.explanation}
                  </p>
                </div>

                {/* Các nút thao tác trên từng câu */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleAudition(item.speechText || item.questionText || '')}
                    className="p-2 rounded-xl bg-[#FBE1EC] hover:bg-[#F5A4BF] text-[#9B7BC0] hover:text-white transition-colors cursor-pointer"
                    title="Nghe thử giọng đọc tiếng Việt"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const updated = generatedList.filter((_, i) => i !== idx);
                      setGeneratedList(updated);
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Xóa câu này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
