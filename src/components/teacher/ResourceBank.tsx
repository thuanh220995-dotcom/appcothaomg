import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Filter, Plus, Trash2, Edit3, Copy, CheckCircle2, 
  XCircle, Download, Upload, Volume2, Sparkles, BookOpen, 
  Eye, RefreshCw, FileText 
} from 'lucide-react';
import { Question, GameType } from '../../types';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface ResourceBankProps {
  isAuthenticated: boolean;
  onRequireAuth: () => void;
  onGoToGames: () => void;
}

export const ResourceBank: React.FC<ResourceBankProps> = ({
  isAuthenticated,
  onRequireAuth,
  onGoToGames,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTopic, setFilterTopic] = useState('ALL');
  const [filterGame, setFilterGame] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'draft' | 'approved' | 'published'>('ALL');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reloadData = () => {
    setQuestions(storageService.getQuestions());
  };

  useEffect(() => {
    reloadData();
  }, []);

  // Lọc dữ liệu theo tìm kiếm & bộ lọc
  const filteredList = questions.filter((q) => {
    if (filterTopic !== 'ALL' && q.topic !== filterTopic) return false;
    if (filterGame !== 'ALL' && q.gameType !== filterGame) return false;
    if (filterStatus !== 'ALL' && q.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const qText = `${q.questionText} ${q.explanation} ${q.topic}`.toLowerCase();
      if (!qText.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  const topicsList = Array.from(new Set(questions.map((q) => q.topic)));

  // Thao tác CRUD
  const handleDelete = (id: string) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    if (window.confirm('Cô Thảo có chắc chắn muốn xóa học liệu này không?')) {
      storageService.deleteQuestion(id);
      reloadData();
      audioService.playChime('pop');
    }
  };

  const handleDuplicate = (id: string) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    storageService.duplicateQuestion(id);
    reloadData();
    audioService.playChime('pop');
  };

  const handleTogglePublish = (q: Question) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    const nextStatus = q.status === 'published' ? 'draft' : 'published';
    storageService.updateQuestion(q.id, { status: nextStatus });
    reloadData();
    audioService.playChime('pop');
  };

  const handleExportJSON = () => {
    const dataStr = storageService.exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NganHangHocLieu_HoaBanAI_2026_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const res = storageService.importData(content);
        if (res.success) {
          alert(`Nhập thành công ${res.count} học liệu vào ngân hàng!`);
          reloadData();
          audioService.playChime('correct');
        } else {
          alert(res.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const publishedCount = questions.filter(q => q.status === 'published').length;
  const draftCount = questions.filter(q => q.status !== 'published').length;

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FFF9F2] via-[#FBE1EC] to-[#BFE7F4]/40 p-6 md:p-8 rounded-3xl border border-[#F5A4BF]/40 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#9B7BC0] text-xs font-black uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THƯ VIỆN HOA BAN – NGÂN HÀNG HỌC LIỆU SỐ</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Quản Lý &amp; Kiểm Duyệt Học Liệu Mầm Non
            </h1>
            <p className="mt-2 text-sm text-slate-700 max-w-xl">
              Tổng số thực tế trong cơ sở dữ liệu: <strong className="text-slate-900">{questions.length}</strong> câu hỏi (
              <span className="text-emerald-700 font-bold">{publishedCount} đã xuất bản vào trò chơi</span>,{' '}
              <span className="text-amber-700 font-bold">{draftCount} bản nháp/chờ duyệt</span>).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (!isAuthenticated) onRequireAuth();
                else setIsAddingNew(true);
              }}
              className="px-4 py-2.5 bg-[#9B7BC0] hover:bg-[#8565AA] text-white font-extrabold text-xs rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm câu hỏi mới</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Xuất JSON</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
            <button
              onClick={() => {
                if (!isAuthenticated) onRequireAuth();
                else fileInputRef.current?.click();
              }}
              className="px-3.5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Upload className="w-4 h-4" />
              <span>Nhập file</span>
            </button>
          </div>
        </div>
      </div>

      {/* THANH TÌM KIẾM VÀ BỘ LỌC THÔNG MINH */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Tìm kiếm */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm theo nội dung câu hỏi, chủ đề, lời giải thích..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#9B7BC0]"
          />
        </div>

        {/* Lọc chủ đề */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterGame}
            onChange={(e) => setFilterGame(e.target.value)}
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
          >
            <option value="ALL">Tất cả trò chơi</option>
            <option value="counting">Vườn hoa đếm số</option>
            <option value="shapes">Ngôi nhà hình học</option>
            <option value="listening">Tai tin – Mắt sáng</option>
            <option value="behavior">Bé chọn điều hay</option>
            <option value="story">Chuyện kể Ban Ban</option>
            <option value="grade1_prep">Hành trang vào lớp 1</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản (Đang chơi)</option>
            <option value="draft">Bản nháp (Chưa xuất bản)</option>
          </select>
        </div>
      </div>

      {/* DANH SÁCH HỌC LIỆU TRONG NGÂN HÀNG */}
      <div className="space-y-3.5">
        {filteredList.map((q) => (
          <div
            key={q.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#9B7BC0]/40 transition-colors shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
                <span className="font-extrabold text-[#9B7BC0] uppercase">
                  {q.topic}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-500 font-medium">
                  {q.gameType === 'counting' ? 'Vườn hoa đếm số' :
                   q.gameType === 'shapes' ? 'Ngôi nhà hình học' :
                   q.gameType === 'listening' ? 'Tai tin mắt sáng' :
                   q.gameType === 'behavior' ? 'Bé chọn điều hay' :
                   q.gameType === 'story' ? 'Chuyện kể' : 'Lớp 1'}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                  q.status === 'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {q.status === 'published' ? 'Đã xuất bản vào game' : 'Bản nháp'}
                </span>
              </div>

              <h3 className="font-black text-slate-900 text-base">
                {q.questionText}
              </h3>

              {/* Các phương án */}
              <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
                {q.options.map((opt) => (
                  <span
                    key={opt.id}
                    className={`px-3 py-1 rounded-lg font-bold ${
                      opt.isCorrect
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-50 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {opt.text} {opt.isCorrect && '✓'}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-500 mt-2 italic">
                Lời giải thích: {q.explanation}
              </p>
            </div>

            {/* Các nút hành động quản lý */}
            <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
              <button
                onClick={() => audioService.speak(q.speechText || q.questionText)}
                className="p-2.5 rounded-xl bg-[#FBE1EC] hover:bg-[#F5A4BF] text-[#9B7BC0] hover:text-white transition-colors cursor-pointer"
                title="Nghe giọng đọc tiếng Việt"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleTogglePublish(q)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  q.status === 'published'
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                title={q.status === 'published' ? 'Hủy xuất bản khỏi game' : 'Xuất bản vào game ngay'}
              >
                {q.status === 'published' ? 'Gỡ khỏi game' : 'Duyệt vào game'}
              </button>

              <button
                onClick={() => handleDuplicate(q.id)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Tạo bản sao"
              >
                <Copy className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(q.id)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredList.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-500 font-semibold mb-2">Không tìm thấy học liệu nào phù hợp.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterTopic('ALL');
                setFilterGame('ALL');
                setFilterStatus('ALL');
              }}
              className="text-xs text-[#9B7BC0] font-bold underline"
            >
              Xóa bộ lọc để xem toàn bộ
            </button>
          </div>
        )}
      </div>

      {/* MODAL THÊM CÂU HỎI MỚI THỦ CÔNG */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900 mb-4">
              Thêm Câu Hỏi Mầm Non Mới
            </h3>

            <div className="space-y-4 text-xs md:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chủ đề:</label>
                <input
                  type="text"
                  id="new_topic"
                  defaultValue="Quê hương Điện Biên"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Loại trò chơi:</label>
                <select id="new_game" className="w-full p-2.5 border rounded-xl bg-white">
                  <option value="counting">Vườn hoa đếm số</option>
                  <option value="shapes">Ngôi nhà hình học</option>
                  <option value="listening">Tai tin mắt sáng</option>
                  <option value="behavior">Bé chọn điều hay</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội dung câu hỏi:</label>
                <textarea
                  id="new_question"
                  placeholder="Ví dụ: Bé hãy đếm xem có bao nhiêu bông hoa ban nở rộ?"
                  className="w-full p-2.5 border rounded-xl h-20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Đáp án đúng:</label>
                <input
                  type="text"
                  id="new_correct"
                  placeholder="Ví dụ: 3 bông hoa"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">2 đáp án sai (ngăn cách bằng dấu phẩy):</label>
                <input
                  type="text"
                  id="new_wrongs"
                  placeholder="Ví dụ: 2 bông hoa, 5 bông hoa"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lời khen / giải thích:</label>
                <input
                  type="text"
                  id="new_explanation"
                  defaultValue="Con giỏi lắm! Cô khen con!"
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  const t = (document.getElementById('new_topic') as HTMLInputElement).value;
                  const g = (document.getElementById('new_game') as HTMLSelectElement).value as GameType;
                  const q = (document.getElementById('new_question') as HTMLTextAreaElement).value;
                  const c = (document.getElementById('new_correct') as HTMLInputElement).value;
                  const w = (document.getElementById('new_wrongs') as HTMLInputElement).value;
                  const e = (document.getElementById('new_explanation') as HTMLInputElement).value;

                  if (!q || !c) {
                    alert('Vui lòng nhập đầy đủ câu hỏi và đáp án đúng');
                    return;
                  }

                  const wrongArr = w.split(',').map(s => s.trim()).filter(Boolean);
                  const options = [
                    { id: '1', text: c, isCorrect: true },
                    ...wrongArr.map((txt, i) => ({ id: `${i + 2}`, text: txt, isCorrect: false })),
                  ];

                  storageService.addQuestion({
                    topic: t,
                    gameType: g,
                    questionText: q,
                    speechText: q,
                    options,
                    correctAnswer: c,
                    explanation: e || 'Con giỏi lắm!',
                    supportLevel: 'basic',
                    status: 'published',
                    source: 'teacher',
                  });

                  setIsAddingNew(false);
                  reloadData();
                  audioService.playChime('correct');
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow"
              >
                Lưu &amp; Xuất bản
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
