import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { Question } from '../../types';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { MascotBanBan } from '../common/MascotBanBan';

interface ShapesGameProps {
  onBackToMenu: () => void;
}

export const ShapesGame: React.FC<ShapesGameProps> = ({ onBackToMenu }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const list = storageService.getQuestionsByGame('shapes', true);
    setQuestions(list);
  }, []);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ) {
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      const speech = currentQ.speechText || currentQ.questionText;
      audioService.speak(speech);
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
        colors: ['#7DBCA0', '#FFD878', '#9B7BC0'],
      });
      const praise = currentQ.explanation || 'Con nhận biết hình học rất giỏi!';
      audioService.speak(praise);
    } else {
      audioService.playChime('encourage');
      audioService.speak('Chưa đúng rồi! Bé cùng quan sát kỹ các cạnh và góc của hình nhé!');
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

  const renderShapeIcon = (shapeType?: string) => {
    switch (shapeType) {
      case 'circle':
        return (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD878] to-[#F5A4BF] border-4 border-white shadow-md flex items-center justify-center animate-gentle-pulse">
            <span className="text-xs font-bold text-slate-800">Tròn xoe</span>
          </div>
        );
      case 'square':
        return (
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7DBCA0] to-[#5FA485] border-4 border-white shadow-md flex items-center justify-center animate-gentle-pulse">
            <span className="text-xs font-bold text-white">4 cạnh bằng</span>
          </div>
        );
      case 'triangle':
        return (
          <div className="w-24 h-24 flex items-center justify-center animate-gentle-pulse">
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
              <polygon points="50,10 90,85 10,85" fill="#9B7BC0" stroke="#FFFFFF" strokeWidth="4" />
              <text x="50" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">3 cạnh</text>
            </svg>
          </div>
        );
      case 'rectangle':
        return (
          <div className="w-32 h-20 rounded-2xl bg-gradient-to-br from-[#BFE7F4] to-[#68B8D4] border-4 border-white shadow-md flex items-center justify-center animate-gentle-pulse">
            <span className="text-xs font-bold text-slate-800">2 dài 2 ngắn</span>
          </div>
        );
      default:
        return (
          <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#9B7BC0]" />
          </div>
        );
    }
  };

  if (!currentQ) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl p-6">
        <p className="text-slate-600 font-bold mb-4">Chưa có câu hỏi hình học nào.</p>
        <button onClick={onBackToMenu} className="px-4 py-2 bg-[#9B7BC0] text-white rounded-xl font-bold">
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Navigation bar */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#7DBCA0]/40">
        <button
          onClick={onBackToMenu}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          ← Vườn trò chơi
        </button>
        <span className="text-xs font-bold text-[#7DBCA0]">
          Câu {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#7DBCA0]/30 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-black tracking-wider uppercase text-[#7DBCA0] block mb-1">
              TRÒ CHƠI 2: NGÔI NHÀ HÌNH HỌC
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              {currentQ.questionText}
            </h1>
          </div>

          <button
            onClick={() => audioService.speak(currentQ.speechText || currentQ.questionText)}
            className="p-3.5 rounded-2xl bg-[#7DBCA0]/20 hover:bg-[#7DBCA0] text-[#5FA485] hover:text-white transition-all shadow-sm active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer"
            title="Nghe câu hỏi"
          >
            <Volume2 className="w-6 h-6" />
            <span className="text-xs font-bold hidden sm:inline">Nghe lại</span>
          </button>
        </div>

        {/* Khung minh họa hình học & vật thật */}
        <div className="my-8 py-8 px-4 bg-gradient-to-br from-[#FFF9F2] via-[#FBE1EC]/30 to-[#BFE7F4]/30 rounded-3xl border-2 border-[#7DBCA0]/30 flex flex-col items-center justify-center gap-4">
          {renderShapeIcon(currentQ.shapeType)}
          <span className="text-xs font-bold text-slate-600">
            {currentQ.topic === 'Quê hương Điện Biên' ? '🏔️ Gắn liền với quê hương Điện Biên' : '📐 Bé chạm vào hình để quan sát'}
          </span>
        </div>

        {/* Lựa chọn các hình học */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {currentQ.options.map((opt) => {
            const selected = selectedOption === opt.text;
            let btnClass = 'bg-[#FFF9F2] hover:bg-[#7DBCA0]/15 border-2 border-slate-200 text-slate-800';

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

        {/* Phản hồi */}
        {isAnswered && (
          <div
            className={`mt-6 p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <MascotBanBan mood={isCorrect ? 'celebrate' : 'thinking'} size={65} />
              <div>
                <div className="font-extrabold text-base md:text-lg">
                  {isCorrect ? '🎉 Chính xác rồi!' : '💡 Bé thử lại nhé!'}
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
                className="px-5 py-2.5 rounded-xl bg-[#7DBCA0] hover:bg-[#68A98D] text-white font-extrabold text-xs md:text-sm flex items-center gap-1.5 shadow cursor-pointer active:scale-95"
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
