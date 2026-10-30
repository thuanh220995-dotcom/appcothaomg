import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Backpack, CheckCircle2, RotateCcw, Volume2, Sparkles, Heart } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { MascotBanBan } from '../common/MascotBanBan';

interface Grade1PrepGameProps {
  onBackToMenu: () => void;
}

interface Item {
  id: string;
  name: string;
  isNeeded: boolean;
  explanation: string;
  iconName: string;
}

export const Grade1PrepGame: React.FC<Grade1PrepGameProps> = ({ onBackToMenu }) => {
  const [backpackItems, setBackpackItems] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string>('Bé hãy chọn đúng những đồ dùng học tập cần mang vào lớp Một nhé!');

  const candidateItems: Item[] = [
    { id: '1', name: 'Hộp bút chì & thước kẻ', isNeeded: true, explanation: 'Rất cần thiết để viết chữ và vẽ bài!', iconName: 'pencil' },
    { id: '2', name: 'Vở ô ly tập viết', isNeeded: true, explanation: 'Quyển vở sạch đẹp để rèn nét chữ đầu đời!', iconName: 'book' },
    { id: '3', name: 'Bình nước uống cá nhân', isNeeded: true, explanation: 'Giúp bé uống đủ nước mỗi ngày ở trường.', iconName: 'bottle' },
    { id: '4', name: 'Hộp sáp màu tô tranh', isNeeded: true, explanation: 'Cho những giờ học mỹ thuật rực rỡ.', iconName: 'colors' },
    { id: '5', name: 'Kiếm nhựa đồ chơi sắc nhọn', isNeeded: false, explanation: 'Đồ chơi không mang đến lớp học để giữ an toàn.', iconName: 'sword' },
    { id: '6', name: 'Đồ ăn vặt dễ đổ bẩn', isNeeded: false, explanation: 'Không mang đồ ăn vặt vào lớp giữ vệ sinh.', iconName: 'snack' },
  ];

  const handleToggleItem = (item: Item) => {
    if (completed) return;
    audioService.playChime('pop');

    if (item.isNeeded) {
      if (!backpackItems.includes(item.id)) {
        const next = [...backpackItems, item.id];
        setBackpackItems(next);
        setFeedback(`Bé giỏi lắm! Đã xếp ${item.name} vào cặp.`);
        audioService.speak(`Con giỏi lắm! Đã xếp ${item.name} vào ba lô.`);

        // Nếu đã đủ 4 món cần thiết
        if (next.length === 4) {
          setCompleted(true);
          audioService.playChime('fanfare');
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD878', '#7DBCA0', '#F5A4BF'],
          });
          audioService.speak('Hoan hô bé! Chiếc ba lô lớp Một đã được sắp xếp gọn gàng, ngăn nắp!');
        }
      }
    } else {
      audioService.playChime('encourage');
      setFeedback(`Lưu ý: ${item.explanation}`);
      audioService.speak(item.explanation);
    }
  };

  const handleReset = () => {
    audioService.playChime('pop');
    setBackpackItems([]);
    setCompleted(false);
    setFeedback('Bé hãy chọn đúng những đồ dùng học tập cần mang vào lớp Một nhé!');
    audioService.speak('Bé hãy chọn đúng những đồ dùng học tập cần mang vào lớp Một nhé!');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#7DBCA0]/40">
        <button
          onClick={onBackToMenu}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          ← Vườn trò chơi
        </button>

        <span className="text-xs font-bold text-[#7DBCA0]">
          Đã xếp: {backpackItems.length} / 4 món cần thiết
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#7DBCA0]/30 mb-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase text-[#7DBCA0] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>TRÒ CHƠI 6: HÀNH TRANG VÀO LỚP MỘT</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              Bé Tự Sắp Xếp Ba Lô Vào Lớp Một
            </h1>
          </div>

          <button
            onClick={() => audioService.speak(feedback)}
            className="p-3.5 rounded-2xl bg-[#7DBCA0]/20 hover:bg-[#7DBCA0] text-[#5FA485] hover:text-white transition-all shadow-sm active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer"
            title="Nghe hướng dẫn"
          >
            <Volume2 className="w-6 h-6" />
            <span className="text-xs font-bold hidden sm:inline">Nghe cô dặn</span>
          </button>
        </div>

        {/* Khung ba lô & đồ dùng tương tác */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6">
          {/* Cặp sách minh họa trực quan */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#FFF9F2] to-[#BFE7F4]/40 p-6 rounded-3xl border-2 border-dashed border-[#7DBCA0] flex flex-col items-center justify-center text-center min-h-[240px]">
            <div className="relative">
              <div className="w-28 h-28 rounded-3xl bg-[#9B7BC0] text-white flex items-center justify-center shadow-lg border-4 border-white animate-gentle-pulse">
                <Backpack className="w-16 h-16" />
              </div>
              <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FFD878] text-slate-900 font-black text-sm flex items-center justify-center shadow">
                {backpackItems.length}
              </span>
            </div>

            <h3 className="font-black text-slate-900 mt-4">Ba Lô Của Bé</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xs">{feedback}</p>
          </div>

          {/* Danh sách các vật thể để bé chọn */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {candidateItems.map((item) => {
              const inBag = backpackItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggleItem(item)}
                  className={`p-3.5 rounded-2xl border text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between gap-2 active:scale-95 ${
                    inBag
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                      : 'bg-[#FFF9F2] hover:bg-[#7DBCA0]/15 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-white/80 text-slate-700 flex items-center justify-center text-xs shrink-0">
                      {item.isNeeded ? '🎒' : '🏠'}
                    </div>
                    <span>{item.name}</span>
                  </div>

                  {inBag && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Thông điệp hoàn thành */}
        {completed && (
          <div className="mt-6 p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MascotBanBan mood="celebrate" size={65} />
              <div>
                <div className="font-extrabold text-base text-emerald-900">
                  🎉 Bé đã sẵn sàng bước vào lớp Một!
                </div>
                <div className="text-xs md:text-sm text-emerald-800">
                  Ba lô đã đầy đủ dụng cụ học tập, bé tự tin đến trường mới nhé!
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs md:text-sm flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sắp xếp lại</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
