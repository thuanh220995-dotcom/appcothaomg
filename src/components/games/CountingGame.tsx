import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, RotateCcw, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { Question, SupportLevel } from '../../types';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { HoaBanFlower } from '../common/HoaBanFlower';
import { MascotBanBan } from '../common/MascotBanBan';

interface CountingGameProps {
  onBackToMenu: () => void;
}

export const CountingGame: React.FC<CountingGameProps> = ({ onBackToMenu }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [countedTaps, setCountedTaps] = useState<number[]>([]);
  const [supportLevel, setSupportLevel] = useState<SupportLevel>('basic');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Tải câu hỏi đã xuất bản từ ngân hàng học liệu
    const list = storageService.getQuestionsByGame('counting', true);
    setQuestions(list);
  }, []);

  const currentQ = questions[currentIndex];
  const flowerCount = currentQ?.visualCount || 3;

  useEffect(() => {
    if (currentQ) {
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setCountedTaps([]);
      setShowHint(false);
      
      // Tự động phát âm thanh tiếng Việt sau khi chuyển câu
      const speech = currentQ.speechText || currentQ.questionText;
      audioService.speak(speech);
    }
  }, [currentIndex, currentQ]);

  const handleTapFlower = (flowerIndex: number) => {
    if (isAnswered) return;
    audioService.playChime('pop');
    if (!countedTaps.includes(flowerIndex)) {
      const nextTaps = [...countedTaps, flowerIndex];
      setCountedTaps(nextTaps);
      // Đọc số lượng hiện tại bé vừa đếm được
      audioService.speak(`${nextTaps.length}`);
    }
  };

  const handleSelectOption = (optionText: string, correct: boolean) => {
    if (isAnswered) return;
    setSelectedOption(optionText);
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      audioService.playChime('correct');
      // Bắn pháo hoa hoa ban nở
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5A4BF', '#FFF9F2', '#9B7BC0', '#FFD878'],
      });
      const praise = currentQ.explanation || 'Con giỏi lắm! Cô khen con!';
      audioService.speak(praise);
    } else {
      audioService.playChime('encourage');
      audioService.speak('Chưa đúng rồi bé ơi! Chúng mình cùng đếm lại từng bông hoa nhé!');
    }
  };

  const handleNext = () => {
    audioService.playChime('pop');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Vòng lại câu đầu
    }
  };

  const handleReplay = () => {
    audioService.playChime('pop');
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCountedTaps([]);
    const speech = currentQ.speechText || currentQ.questionText;
    audioService.speak(speech);
  };

  const handleReadQuestion = () => {
    if (currentQ) {
      audioService.speak(currentQ.speechText || currentQ.questionText);
    }
  };

  if (!currentQ) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl p-6 border border-slate-200">
        <p className="text-slate-600 font-bold mb-4">Chưa có câu hỏi đếm số nào được xuất bản.</p>
        <button
          onClick={onBackToMenu}
          className="px-4 py-2 bg-[#9B7BC0] text-white rounded-xl font-bold"
        >
          Quay lại vườn trò chơi
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Thanh điều hướng trò chơi */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#F5A4BF]/30">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMenu}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            ← Vườn trò chơi
          </button>
          <span className="text-xs font-bold text-slate-400">·</span>
          <span className="text-xs font-bold text-[#9B7BC0]">
            Câu {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Chế độ hỗ trợ */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium hidden sm:inline">Mức độ:</span>
          {(['support', 'basic', 'challenge'] as SupportLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSupportLevel(lvl);
                audioService.playChime('pop');
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                supportLevel === lvl
                  ? 'bg-[#9B7BC0] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl === 'support' ? 'Có gợi ý' : lvl === 'basic' ? 'Cơ bản' : 'Mở rộng'}
            </button>
          ))}
        </div>
      </div>

      {/* Khu vực câu hỏi & Nút phát âm */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#F5A4BF]/30 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className="text-xs font-black tracking-wider uppercase text-[#7DBCA0] block mb-1">
              TRÒ CHƠI 1: VƯỜN HOA ĐẾM SỐ (1-10)
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              {currentQ.questionText}
            </h1>
          </div>

          <button
            onClick={handleReadQuestion}
            className="p-3.5 rounded-2xl bg-[#FBE1EC] hover:bg-[#F5A4BF] text-[#9B7BC0] hover:text-white transition-all shadow-sm active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer"
            title="Nghe câu hỏi bằng tiếng Việt"
          >
            <Volume2 className="w-6 h-6" />
            <span className="text-xs font-bold hidden sm:inline">Nghe câu hỏi</span>
          </button>
        </div>

        {/* Gợi ý cho trẻ ở mức 'support' */}
        {supportLevel === 'support' && (
          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Gợi ý cho bé: Hãy chạm vào từng bông hoa bên dưới để đếm nhé!</span>
            </div>
            <span className="font-bold text-amber-700">Đã chạm: {countedTaps.length}</span>
          </div>
        )}

        {/* KHU VƯỜN HOA BAN TƯƠNG TÁC (Chạm vào từng bông hoa để đếm) */}
        <div className="my-8 py-8 px-4 bg-gradient-to-b from-[#BFE7F4]/30 via-[#FFF9F2] to-[#7DBCA0]/20 rounded-3xl border-2 border-dashed border-[#7DBCA0]/40 flex flex-wrap items-center justify-center gap-4 md:gap-8 min-h-[200px] relative overflow-hidden">
          {/* Cỏ và hoa nền trang trí */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#7DBCA0]/30 rounded-b-3xl" />

          {Array.from({ length: flowerCount }).map((_, idx) => {
            const isTapped = countedTaps.includes(idx);
            const tapOrder = countedTaps.indexOf(idx) + 1;
            return (
              <div
                key={idx}
                className="relative group flex flex-col items-center"
              >
                <HoaBanFlower
                  size={76}
                  bloom={isTapped || isCorrect}
                  onClick={() => handleTapFlower(idx)}
                  className="transition-transform duration-300"
                />
                {isTapped && (
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-[#9B7BC0] text-white text-xs font-extrabold shadow-sm animate-bounce">
                    {tapOrder}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs md:text-sm text-slate-500 italic mb-6">
          * Bé chạm ngón tay vào từng bông hoa ban để đếm nhẩm số lượng nào!
        </p>

        {/* CÁC LỰA CHỌN ĐÁP ÁN (Nút lớn phù hợp trẻ mầm non chạm cảm ứng) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {currentQ.options.map((opt) => {
            const selected = selectedOption === opt.text;
            let btnClass = 'bg-[#FFF9F2] hover:bg-[#FBE1EC] border-2 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (opt.isCorrect) {
                btnClass = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg scale-102';
              } else if (selected && !opt.isCorrect) {
                btnClass = 'bg-rose-100 border-2 border-rose-300 text-rose-800 opacity-80';
              } else {
                btnClass = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.text, opt.isCorrect)}
                disabled={isAnswered}
                className={`py-4 px-6 rounded-2xl font-black text-lg md:text-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${btnClass}`}
              >
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* PHẢN HỒI KHI TRẢ LỜI */}
        {isAnswered && (
          <div
            className={`mt-6 p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3 text-center sm:text-left">
              <MascotBanBan
                mood={isCorrect ? 'celebrate' : 'thinking'}
                size={70}
              />
              <div>
                <div className="font-extrabold text-base md:text-lg">
                  {isCorrect ? '🎉 Con giỏi lắm! Đúng rồi!' : '💡 Bé cố lên nhé!'}
                </div>
                <div className="text-sm">{currentQ.explanation}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleReplay}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs md:text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Nghe lại</span>
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-[#9B7BC0] hover:bg-[#8565AA] text-white font-extrabold text-xs md:text-sm flex items-center gap-1.5 shadow cursor-pointer active:scale-95"
              >
                <span>Chơi tiếp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
