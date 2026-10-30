import React, { useState } from 'react';
import { Sparkles, Printer, Copy, CheckCircle2, Save, FileText, RefreshCw, BookOpen } from 'lucide-react';
import { LessonPlan } from '../../types';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface LessonPlannerProps {
  isAuthenticated: boolean;
  onRequireAuth: () => void;
}

export const LessonPlanner: React.FC<LessonPlannerProps> = ({
  isAuthenticated,
  onRequireAuth,
}) => {
  const [topic, setTopic] = useState('Quê hương Điện Biên');
  const [title, setTitle] = useState('Khám phá hoa ban Điện Biên và đếm số lượng trong phạm vi 5');
  const [domain, setDomain] = useState('Phát triển nhận thức');
  const [duration, setDuration] = useState('25 - 30 phút');
  const [supplies, setSupplies] = useState('Màn hình tương tác Hoa Ban AI, hoa ban giấy xốp, tranh hoa ban bản làng, thẻ số 1-5');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Soạn giáo án bằng AI
  const handleGeneratePlan = async () => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    setIsLoading(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'lesson_plan',
          topic,
          lessonDetails: {
            title,
            domain,
            duration,
            supplies,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Lỗi máy chủ khi soạn kế hoạch');
      }

      const data = await res.json();
      if (data.success && data.data) {
        const raw = data.data;
        const newPlan: LessonPlan = {
          id: `lp-${Date.now()}`,
          title: raw.title || title,
          topic,
          domain: raw.domain || domain,
          ageGroup: '4 - 5 tuổi',
          duration: raw.duration || duration,
          objectives: raw.objectives || {
            knowledge: 'Trẻ nhận biết hoa ban và số lượng trong phạm vi 5.',
            skills: 'Kỹ năng đếm chạm tuần tự, thao tác tương tác trên màn hình.',
            attitude: 'Yêu quý thiên nhiên quê hương.',
          },
          preparation: raw.preparation || {
            teacher: supplies,
            children: 'Rổ đồ chơi hoa ban',
            space: 'Lớp học mầm non',
          },
          introduction: raw.introduction || 'Gây hứng thú bằng bài hát và câu đố hoa ban.',
          coreActivity: raw.coreActivity || 'Trải nghiệm đếm và nhận biết mặt số.',
          reinforcementGame: raw.reinforcementGame || 'Trò chơi Vườn hoa đếm số trên Hoa Ban AI.',
          guidingQuestions: raw.guidingQuestions || ['Bông hoa này có màu gì?', 'Có tất cả bao nhiêu bông hoa?'],
          offlineActivity: raw.offlineActivity || 'Vẽ và dán hoa ban lên giấy.',
          differentiatedSupport: raw.differentiatedSupport || {
            supportNeeded: 'Cô ngồi cạnh hướng dẫn trẻ chạm tay từng bông hoa.',
            standard: 'Trẻ tự đếm và chọn đúng thẻ số.',
            advanced: 'Trẻ tách gộp nhóm hoa theo các cách khác nhau.',
          },
          observationCriteria: raw.observationCriteria || 'Khả năng đếm, sự tự tin và tập trung.',
          safetyNotes: raw.safetyNotes || 'Giữ khoảng cách mắt phù hợp với màn hình tương tác.',
          wrapUp: raw.wrapUp || 'Cô và trẻ cùng vận động nhẹ nhàng.',
          createdAt: new Date().toISOString(),
          status: 'draft',
        };

        setCurrentPlan(newPlan);
        audioService.playChime('correct');
        audioService.speak('Cô Thảo ơi, kế hoạch hoạt động giáo dục 12 phần đã được soạn thảo xong!');
      }
    } catch (e: any) {
      alert(`Không thể soạn giáo án: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToStorage = () => {
    if (!currentPlan) return;
    storageService.addLessonPlan(currentPlan);
    setSavedSuccess(true);
    audioService.playChime('pop');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyText = () => {
    if (!currentPlan) return;
    const text = `KẾ HOẠCH HOẠT ĐỘNG GIÁO DỤC MẦM NON
Chủ đề: ${currentPlan.topic}
Đề tài: ${currentPlan.title}
Lĩnh vực: ${currentPlan.domain} (Độ tuổi: ${currentPlan.ageGroup})
Thời lượng: ${currentPlan.duration}

I. MỤC TIÊU:
- Kiến thức: ${currentPlan.objectives.knowledge}
- Kỹ năng: ${currentPlan.objectives.skills}
- Thái độ: ${currentPlan.objectives.attitude}

II. CHUẨN BỊ:
- Cô giáo: ${currentPlan.preparation.teacher}
- Trẻ em: ${currentPlan.preparation.children}
- Không gian: ${currentPlan.preparation.space}

III. TIẾN TRÌNH HOẠT ĐỘNG:
1. Gây hứng thú: ${currentPlan.introduction}
2. Hoạt động trọng tâm: ${currentPlan.coreActivity}
3. Trò chơi củng cố: ${currentPlan.reinforcementGame}
4. Câu hỏi gợi mở: ${currentPlan.guidingQuestions.join('; ')}
5. Hoạt động ngoài màn hình: ${currentPlan.offlineActivity}
6. Phân hóa 3 mức độ hỗ trợ:
   + Cần hỗ trợ: ${currentPlan.differentiatedSupport.supportNeeded}
   + Đạt chuẩn: ${currentPlan.differentiatedSupport.standard}
   + Mở rộng: ${currentPlan.differentiatedSupport.advanced}
7. Đánh giá quan sát: ${currentPlan.observationCriteria}
8. Lưu ý an toàn: ${currentPlan.safetyNotes}`;

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Tiêu đề & Giới thiệu */}
      <div className="bg-gradient-to-r from-[#FFF9F2] via-[#FBE1EC]/60 to-[#7DBCA0]/20 p-6 md:p-8 rounded-3xl border border-[#F5A4BF]/40 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#7DBCA0] text-xs font-black uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TRỢ LÝ CÔ THẢO – AI LESSON PLANNER</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Soạn Kế Hoạch Hoạt Động Giáo Dục Mầm Non Chuẩn
        </h1>
        <p className="mt-2 text-sm text-slate-700 max-w-2xl">
          Tạo giáo án chi tiết chuẩn 12 phần theo phương pháp lấy trẻ làm trung tâm, tích hợp học liệu tương tác Hoa Ban AI và hoạt động trải nghiệm thực tế tại Điện Biên.
        </p>
      </div>

      {/* Form cấu hình bài giảng */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Chủ đề giáo dục:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Đề tài hoạt động:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Lĩnh vực phát triển mầm non:
            </label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
            >
              <option value="Phát triển nhận thức">Phát triển nhận thức (Toán, Khám phá)</option>
              <option value="Phát triển ngôn ngữ">Phát triển ngôn ngữ (Văn học, Chữ cái)</option>
              <option value="Phát triển tình cảm và kỹ năng xã hội">Phát triển tình cảm &amp; kỹ năng xã hội</option>
              <option value="Phát triển thể chất">Phát triển thể chất (Vận động, Dinh dưỡng)</option>
              <option value="Phát triển thẩm mỹ">Phát triển thẩm mỹ (Âm nhạc, Tạo hình)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Thời lượng tổ chức:
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Điều kiện &amp; đồ dùng sẵn có trong lớp:
            </label>
            <input
              type="text"
              value={supplies}
              onChange={(e) => setSupplies(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm"
              placeholder="Ví dụ: Máy tính bảng, bảng tương tác Hoa Ban AI, hoa ban giấy xốp..."
            />
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleGeneratePlan}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl bg-[#9B7BC0] hover:bg-[#8565AA] text-white font-black text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Đang soạn giáo án AI...' : 'SOẠN KẾ HOẠCH BẰNG AI (12 PHẦN)'}</span>
          </button>

          {/* Dùng giáo án mẫu có sẵn */}
          <button
            onClick={() => {
              const plans = storageService.getLessonPlans();
              if (plans.length > 0) {
                setCurrentPlan(plans[0]);
                audioService.playChime('pop');
              }
            }}
            className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            Xem giáo án mẫu có sẵn
          </button>
        </div>
      </div>

      {/* HIỂN THỊ KẾ HOẠCH 12 PHẦN CHI TIẾT */}
      {currentPlan && (
        <div className="bg-white rounded-3xl p-8 border border-slate-300 shadow-lg print:border-none print:shadow-none">
          {/* Header kế hoạch */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6 print:hidden">
            <div>
              <span className="text-xs font-bold text-[#9B7BC0] uppercase tracking-wider">
                Giáo Án Mầm Nôn Điện Biên
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                {currentPlan.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedSuccess ? 'Đã chép!' : 'Sao chép'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In giáo án</span>
              </button>

              <button
                onClick={handleSaveToStorage}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savedSuccess ? 'Đã lưu!' : 'Lưu thư viện'}</span>
              </button>
            </div>
          </div>

          {/* 12 PHẦN CỦA KẾ HOẠCH GIÁO DỤC */}
          <div className="space-y-6 text-sm text-slate-800 leading-relaxed">
            <div className="p-4 bg-slate-50 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
              <div><span className="text-slate-400">Chủ đề:</span> <p className="text-slate-900 font-bold">{currentPlan.topic}</p></div>
              <div><span className="text-slate-400">Lĩnh vực:</span> <p className="text-slate-900 font-bold">{currentPlan.domain}</p></div>
              <div><span className="text-slate-400">Độ tuổi:</span> <p className="text-slate-900 font-bold">{currentPlan.ageGroup}</p></div>
              <div><span className="text-slate-400">Thời lượng:</span> <p className="text-slate-900 font-bold">{currentPlan.duration}</p></div>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">1. Mục Tiêu Hoạt Động</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Kiến thức:</strong> {currentPlan.objectives.knowledge}</li>
                <li><strong>Kỹ năng:</strong> {currentPlan.objectives.skills}</li>
                <li><strong>Thái độ:</strong> {currentPlan.objectives.attitude}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">2. Chuẩn Bị</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Của cô giáo:</strong> {currentPlan.preparation.teacher}</li>
                <li><strong>Của các bé:</strong> {currentPlan.preparation.children}</li>
                <li><strong>Không gian:</strong> {currentPlan.preparation.space}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">3. Hoạt Động Gây Hứng Thú (3–5 phút)</h3>
              <p>{currentPlan.introduction}</p>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">4. Hoạt Động Trọng Tâm</h3>
              <p>{currentPlan.coreActivity}</p>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">5. Trò Chơi Củng Cố Trên Hoa Ban AI</h3>
              <p>{currentPlan.reinforcementGame}</p>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">6. Hệ Thống Câu Hỏi Gợi Mở</h3>
              <ul className="list-disc pl-5 space-y-1">
                {currentPlan.guidingQuestions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">7. Hoạt Động Ngoài Màn Hình (Trải nghiệm thực tế)</h3>
              <p>{currentPlan.offlineActivity}</p>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">8. Điều Chỉnh Theo 3 Mức Độ Hỗ Trợ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="font-bold text-amber-900 text-xs mb-1">Trẻ Cần Hỗ Trợ</div>
                  <div className="text-xs text-amber-800">{currentPlan.differentiatedSupport.supportNeeded}</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="font-bold text-emerald-900 text-xs mb-1">Trẻ Đạt Chuẩn</div>
                  <div className="text-xs text-emerald-800">{currentPlan.differentiatedSupport.standard}</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="font-bold text-purple-900 text-xs mb-1">Trẻ Phát Triển Nhanh</div>
                  <div className="text-xs text-purple-800">{currentPlan.differentiatedSupport.advanced}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">9. Quan Sát và Đánh Giá Trẻ</h3>
              <p>{currentPlan.observationCriteria}</p>
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-base mb-2">10. Lưu Ý An Toàn</h3>
              <p>{currentPlan.safetyNotes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
