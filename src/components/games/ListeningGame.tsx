import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { Question } from '../../types';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { MascotBanBan } from '../common/MascotBanBan';

interface ListeningGameProps {
  onBackToMenu: () => void;
}

export const ListeningGame: React.FC<ListeningGameProps> = ({ onBackToMenu }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const list = storageService.getQuestionsByGame('listening', true);
    setQuestions(list);
  }, []);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ) {
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      audioService.speak(currentQ.speechText || currentQ.questionText);
    }
  }, [currentIndex, currentQ]);

  const handleSelectOption = (optionText: string, correct: boolean) => {
    if (isAnswered) return;
    setSelectedOption(optionText);
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      audioService.playChime('correct');
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5A4BF', '#9B7BC0', '#BFE7F4'],
      });
      audioService.speak(currentQ.explanation || 'Đôi tai của con thật là thính! Đúng rồi!');
    } else {
      audioService.playChime('encourage');
      audioService.speak('Chưa đúng rồi, bé hãy bấm nút loa nghe lại giọng đọc nhé!');
    }
  };

  const handleNext = () => {
    audioService.playChime('pop');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleReplay = () => {
    audioService.playChime('pop');
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    audioService.speak(currentQ.speechText || currentQ.questionText);
  };

  // Render SVG minh họa trực quan sinh động theo loại vật thể
  const renderItemVisual = (text: string, iconKey?: string) => {
    const key = (iconKey || text).toLowerCase();

    if (key.includes('mèo') || key.includes('cat')) {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="55" r="30" fill="#FFA07A" />
          <polygon points="30,35 20,10 42,28" fill="#FFA07A" />
          <polygon points="70,35 80,10 58,28" fill="#FFA07A" />
          <circle cx="40" cy="50" r="4" fill="#2C3E50" />
          <circle cx="60" cy="50" r="4" fill="#2C3E50" />
          <ellipse cx="50" cy="58" rx="3" ry="2" fill="#E74C3C" />
          <line x1="25" y1="56" x2="10" y2="54" stroke="#2C3E50" strokeWidth="2" />
          <line x1="25" y1="60" x2="10" y2="62" stroke="#2C3E50" strokeWidth="2" />
          <line x1="75" y1="56" x2="90" y2="54" stroke="#2C3E50" strokeWidth="2" />
          <line x1="75" y1="60" x2="90" y2="62" stroke="#2C3E50" strokeWidth="2" />
        </svg>
      );
    }

    if (key.includes('ban') || key.includes('hoa') || key.includes('flower')) {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="50" r="38" fill="#FBE1EC" />
          <circle cx="50" cy="30" r="14" fill="#FFFFFF" stroke="#F5A4BF" strokeWidth="1.5" />
          <circle cx="68" cy="44" r="14" fill="#FFFFFF" stroke="#F5A4BF" strokeWidth="1.5" />
          <circle cx="62" cy="68" r="14" fill="#FBE1EC" stroke="#9B7BC0" strokeWidth="1.5" />
          <circle cx="38" cy="68" r="14" fill="#FBE1EC" stroke="#9B7BC0" strokeWidth="1.5" />
          <circle cx="32" cy="44" r="14" fill="#FFFFFF" stroke="#F5A4BF" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="8" fill="#FFD878" />
        </svg>
      );
    }

    if (key.includes('xe') || key.includes('bike') || key.includes('đạp')) {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="28" cy="65" r="18" fill="none" stroke="#2C3E50" strokeWidth="4" />
          <circle cx="72" cy="65" r="18" fill="none" stroke="#2C3E50" strokeWidth="4" />
          <line x1="28" y1="65" x2="50" y2="65" stroke="#E74C3C" strokeWidth="4" />
          <line x1="50" y1="65" x2="68" y2="40" stroke="#E74C3C" strokeWidth="4" />
          <line x1="68" y1="40" x2="72" y2="65" stroke="#E74C3C" strokeWidth="4" />
          <line x1="28" y1="65" x2="42" y2="42" stroke="#E74C3C" strokeWidth="4" />
          <line x1="42" y1="42" x2="50" y2="65" stroke="#E74C3C" strokeWidth="4" />
          <line x1="38" y1="42" x2="46" y2="42" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" />
          <line x1="64" y1="36" x2="72" y2="40" stroke="#2C3E50" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    }

    if (key.includes('bác sĩ') || key.includes('doctor') || key.includes('stethoscope')) {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="50" r="38" fill="#E8F8F5" />
          <rect x="42" y="25" width="16" height="50" fill="#E74C3C" rx="3" />
          <rect x="25" y="42" width="50" height="16" fill="#E74C3C" rx="3" />
        </svg>
      );
    }

    if (key.includes('hộp bút') || key.includes('pencil') || key.includes('bút')) {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <rect x="15" y="32" width="70" height="36" rx="10" fill="#9B7BC0" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="25" y1="44" x2="75" y2="44" stroke="#FFD878" strokeWidth="3" strokeLinecap="round" />
          <line x1="25" y1="56" x2="55" y2="56" stroke="#7DBCA0" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    }

    if (key.includes('táo') || key.includes('apple')) {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <circle cx="50" cy="55" r="28" fill="#E74C3C" />
          <path d="M50 28 Q54 18 64 20" stroke="#8B4513" strokeWidth="3" fill="none" />
          <ellipse cx="64" cy="22" rx="7" ry="4" fill="#7DBCA0" transform="rotate(-20 64 22)" />
        </svg>
      );
    }

    if (key.includes('ong') || key.includes('bee')) {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <ellipse cx="50" cy="52" rx="26" ry="18" fill="#FFD878" stroke="#2C3E50" strokeWidth="2" />
          <line x1="42" y1="36" x2="42" y2="68" stroke="#2C3E50" strokeWidth="4" />
          <line x1="56" y1="36" x2="56" y2="68" stroke="#2C3E50" strokeWidth="4" />
          <ellipse cx="44" cy="30" rx="10" ry="14" fill="#BFE7F4" opacity="0.8" />
          <ellipse cx="56" cy="30" rx="10" ry="14" fill="#BFE7F4" opacity="0.8" />
          <circle cx="68" cy="48" r="3" fill="#2C3E50" />
        </svg>
      );
    }

    if (key.includes('cầu vồng') || key.includes('rainbow')) {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <path d="M15 75 A35 35 0 0 1 85 75" fill="none" stroke="#E74C3C" strokeWidth="5" />
          <path d="M22 75 A28 28 0 0 1 78 75" fill="none" stroke="#FFD878" strokeWidth="5" />
          <path d="M29 75 A21 21 0 0 1 71 75" fill="none" stroke="#7DBCA0" strokeWidth="5" />
          <path d="M36 75 A14 14 0 0 1 64 75" fill="none" stroke="#9B7BC0" strokeWidth="5" />
        </svg>
      );
    }

    // Mặc định hình tròn thẻ đẹp mắt
    return (
      <div className="w-16 h-16 rounded-2xl bg-[#FBE1EC] flex items-center justify-center text-[#9B7BC0]">
        <Sparkles className="w-8 h-8" />
      </div>
    );
  };

  if (!currentQ) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl p-6">
        <p className="text-slate-600 font-bold mb-4">Chưa có câu hỏi nghe tranh.</p>
        <button onClick={onBackToMenu} className="px-4 py-2 bg-[#9B7BC0] text-white rounded-xl font-bold">
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#9B7BC0]/30">
        <button
          onClick={onBackToMenu}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          ← Vườn trò chơi
        </button>
        <span className="text-xs font-bold text-[#9B7BC0]">
          Câu {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#9B7BC0]/30 mb-6">
        {/* Lời nhắc nghe câu hỏi */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FBE1EC] to-[#BFE7F4]/40 border border-[#9B7BC0]/20 mb-8">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <MascotBanBan mood="talking" size={80} />
            <div>
              <span className="text-xs font-black tracking-wider uppercase text-[#9B7BC0] block mb-1">
                TRÒ CHƠI 3: TAI TIN – MẮT SÁNG
              </span>
              <h2 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                {currentQ.questionText}
              </h2>
            </div>
          </div>

          <button
            onClick={() => audioService.speak(currentQ.speechText || currentQ.questionText)}
            className="px-5 py-3 rounded-2xl bg-[#9B7BC0] hover:bg-[#8565AA] text-white font-extrabold shadow-md active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span>Nghe lại lời cô dặn</span>
          </button>
        </div>

        {/* LƯỚI TRANH CHO TRẺ CHỌN (3 hoặc 4 ô lớn) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {currentQ.options.map((opt) => {
            const selected = selectedOption === opt.text;
            let cardClass = 'bg-[#FFF9F2] hover:bg-[#FBE1EC]/50 border-2 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (opt.isCorrect) {
                cardClass = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-xl scale-102';
              } else if (selected && !opt.isCorrect) {
                cardClass = 'bg-rose-100 border-2 border-rose-300 text-rose-800 opacity-80';
              } else {
                cardClass = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.text, opt.isCorrect)}
                disabled={isAnswered}
                className={`p-6 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all cursor-pointer active:scale-95 min-h-[170px] ${cardClass}`}
              >
                <div className="p-3 bg-white/80 rounded-2xl shadow-sm">
                  {renderItemVisual(opt.text, opt.iconOrVisual)}
                </div>
                <span className="font-black text-lg md:text-xl text-center">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phản hồi khi chọn */}
        {isAnswered && (
          <div
            className={`mt-8 p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="text-center sm:text-left">
              <div className="font-extrabold text-base md:text-lg">
                {isCorrect ? '🎉 Hoan hô! Con chọn đúng bức tranh rồi!' : '💡 Bé hãy lắng nghe kỹ lại nhé!'}
              </div>
              <div className="text-sm mt-0.5">{currentQ.explanation}</div>
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
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
