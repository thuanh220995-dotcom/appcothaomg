import React, { useState, useEffect } from 'react';
import { ClipboardList, Plus, Heart, User, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';
import { ObservationRecord } from '../../types';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface ObservationJournalProps {
  isAuthenticated: boolean;
  onRequireAuth: () => void;
}

export const ObservationJournal: React.FC<ObservationJournalProps> = ({
  isAuthenticated,
  onRequireAuth,
}) => {
  const [records, setRecords] = useState<ObservationRecord[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form thêm mới
  const [childCode, setChildCode] = useState('Bé A (Minh họa)');
  const [activityName, setActivityName] = useState('Vườn hoa đếm số');
  const [participation, setParticipation] = useState<'Tích cực' | 'Trung bình' | 'Cần khích lệ'>('Tích cực');
  const [languageBehavior, setLanguageBehavior] = useState('Nói rõ câu, phát âm chuẩn các thanh điệu.');
  const [cognitionBehavior, setCognitionBehavior] = useState('Nhận biết nhanh, đếm không bỏ sót.');
  const [independenceBehavior, setIndependenceBehavior] = useState('Tự tin thao tác trên màn hình chạm.');
  const [socialBehavior, setSocialBehavior] = useState('Biết đợi lượt và nhường bạn.');
  const [supportNotes, setSupportNotes] = useState('Tiếp tục mở rộng câu hỏi tư duy.');

  useEffect(() => {
    setRecords(storageService.getObservations());
  }, []);

  const handleSaveRecord = () => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    const newRec = storageService.addObservation({
      date: new Date().toISOString().slice(0, 10),
      childCode,
      activityName,
      participation,
      languageBehavior,
      cognitionBehavior,
      independenceBehavior,
      socialBehavior,
      supportNotes,
    });
    setRecords(storageService.getObservations());
    setIsAdding(false);
    audioService.playChime('pop');
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Header Sổ quan sát */}
      <div className="bg-gradient-to-r from-[#FFF9F2] via-[#7DBCA0]/20 to-[#BFE7F4]/40 p-6 md:p-8 rounded-3xl border border-[#7DBCA0]/40 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#7DBCA0] text-xs font-black uppercase tracking-wider mb-2">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>SỔ QUAN SÁT PHÁT TRIỂN TRẺ MẦM NON</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Nhật Ký Đồng Hành &amp; Cá Nhân Hóa Của Cô Thảo
            </h1>
            <p className="mt-2 text-sm text-slate-700 max-w-xl">
              Ghi chép sự tiến bộ của từng bé theo 4 lĩnh vực trọng tâm: Ngôn ngữ, Nhận thức, Tính tự lập và Giao tiếp xã hội nhằm chuẩn bị tâm thế tự tin nhất vào lớp Một.
            </p>
          </div>

          <button
            onClick={() => {
              if (!isAuthenticated) onRequireAuth();
              else setIsAdding(true);
            }}
            className="px-4 py-2.5 bg-[#7DBCA0] hover:bg-[#68A98D] text-white font-extrabold text-xs md:text-sm rounded-xl shadow flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Ghi phiếu quan sát mới</span>
          </button>
        </div>
      </div>

      {/* Cảnh báo bảo mật dữ liệu trẻ em theo đạo luật COPPA & Quy chuẩn VN */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 mb-6 text-xs text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Quy tắc bảo mật thông tin trẻ em:</strong> Để bảo vệ quyền riêng tư của học sinh mầm non theo quy định, ứng dụng không lưu trữ họ tên đầy đủ, hình ảnh hay dữ liệu định danh cá nhân của trẻ em trên môi trường công khai. Các mã trẻ mẫu hiển thị là: <span className="font-bold">Bé A (Minh họa), Bé B (Minh họa), Bé C (Minh họa)</span>.
        </div>
      </div>

      {/* Danh sách các phiếu quan sát */}
      <div className="space-y-4">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-[#7DBCA0]/40 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FBE1EC] text-[#9B7BC0] font-black flex items-center justify-center text-sm">
                  {rec.childCode.slice(0, 5)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {rec.childCode}
                  </h3>
                  <div className="text-xs text-slate-500">
                    Hoạt động: <strong className="text-slate-700">{rec.activityName}</strong> · Ngày quan sát: {rec.date}
                  </div>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                rec.participation === 'Tích cực'
                  ? 'bg-emerald-100 text-emerald-800'
                  : rec.participation === 'Trung bình'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                Mức tham gia: {rec.participation}
              </span>
            </div>

            {/* 4 Lĩnh vực biểu hiện */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block mb-1">🗣️ Biểu hiện ngôn ngữ tiếng Việt:</strong>
                <p>{rec.languageBehavior}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block mb-1">🧠 Biểu hiện nhận thức &amp; tư duy:</strong>
                <p>{rec.cognitionBehavior}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block mb-1">🎒 Tính tự lập &amp; nề nếp vào lớp 1:</strong>
                <p>{rec.independenceBehavior}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block mb-1">🤝 Giao tiếp &amp; hợp tác với bạn:</strong>
                <p>{rec.socialBehavior}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 italic">
              💡 Ghi chú hỗ trợ tiếp theo của cô Thảo: {rec.supportNotes}
            </div>
          </div>
        ))}
      </div>

      {/* Modal ghi phiếu mới */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900 mb-4">
              Ghi Phiếu Quan Sát Phát Triển
            </h3>

            <div className="space-y-3.5 text-xs md:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mã trẻ (Ký hiệu minh họa):</label>
                <select
                  value={childCode}
                  onChange={(e) => setChildCode(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-white"
                >
                  <option value="Bé A (Minh họa)">Bé A (Minh họa)</option>
                  <option value="Bé B (Minh họa)">Bé B (Minh họa)</option>
                  <option value="Bé C (Minh họa)">Bé C (Minh họa)</option>
                  <option value="Bé D (Minh họa)">Bé D (Minh họa)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hoạt động quan sát:</label>
                <input
                  type="text"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mức độ tham gia:</label>
                <select
                  value={participation}
                  onChange={(e) => setParticipation(e.target.value as any)}
                  className="w-full p-2.5 border rounded-xl bg-white"
                >
                  <option value="Tích cực">Tích cực hào hứng</option>
                  <option value="Trung bình">Trung bình theo nhịp chung</option>
                  <option value="Cần khích lệ">Cần cô khích lệ động viên thêm</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Biểu hiện ngôn ngữ:</label>
                <input
                  type="text"
                  value={languageBehavior}
                  onChange={(e) => setLanguageBehavior(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Biểu hiện nhận thức:</label>
                <input
                  type="text"
                  value={cognitionBehavior}
                  onChange={(e) => setCognitionBehavior(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kế hoạch hỗ trợ tiếp theo:</label>
                <input
                  type="text"
                  value={supportNotes}
                  onChange={(e) => setSupportNotes(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveRecord}
                className="px-4 py-2 bg-[#7DBCA0] text-white rounded-xl font-bold text-xs shadow"
              >
                Lưu phiếu quan sát
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
