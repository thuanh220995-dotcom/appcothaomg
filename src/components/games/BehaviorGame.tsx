import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, RotateCcw, ArrowRight, Heart, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Question } from '../../types';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { MascotBanBan } from '../common/MascotBanBan';

interface BehaviorGameProps {
  onBackToMenu: () => void;
}

export const BehaviorGame: React.FC<BehaviorGameProps> = ({ onBackToMenu }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const list = storageService.getQuestionsByGame('behavior', true);
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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7DBCA0', '#F5A4BF', '#FFD878'],
      });
      audioService.speak(currentQ.explanation || 'Bé ngoan lắm! Đây là hành vi rất đẹp!');
    } else {
      audioService.playChime('encourage');
      audioService.speak('Hành động này chưa đúng rồi. Chúng mình cùng chọn lại việc làm tốt nhé!');
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

  if (!currentQ) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl p-6">
        <p className="text-slate-600 font-bold mb-4">Chưa có câu hỏi kỹ năng sống.</p>
        <button onClick={onBackToMenu} className="px-4 py-2 bg-[#9B7BC0] text-white rounded-xl font-bold">
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#F5A4BF]/40">
        <button
          onClick={onBackToMenu}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          ← Vườn trò chơi
        </button>
        <span className="text-xs font-bold text-[#F5A4BF]">
          Tình huống {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#F5A4BF]/30 mb-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase text-[#F5A4BF] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>TRÒ CHƠI 4: BÉ CHỌN ĐIỀU HAY – KỸ NĂNG SỐNG</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              {currentQ.questionText}
            </h1>
          </div>

          <button
            onClick={() => audioService.speak(currentQ.speechText || currentQ.questionText)}
            className="p-3.5 rounded-2xl bg-[#FBE1EC] hover:bg-[#F5A4BF] text-[#F5A4BF] hover:text-white transition-all shadow-sm active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer"
            title="Nghe tình huống"
          >
            <Volume2 className="w-6 h-6" />
            <span className="text-xs font-bold hidden sm:inline">Nghe cô giảng</span>
          </button>
        </div>

        {/* LỰA CHỌN CÁCH ỨNG XỬ / HÀNH ĐỘNG (Các ô lớn rõ ràng, dễ hiểu) */}
        <div className="flex flex-col gap-3.5">
          {currentQ.options.map((opt) => {
            const selected = selectedOption === opt.text;
            let cardClass = 'bg-[#FFF9F2] hover:bg-[#FBE1EC]/50 border-2 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (opt.isCorrect) {
                cardClass = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg';
              } else if (selected && !opt.isCorrect) {
                cardClass = 'bg-rose-100 border-2 border-rose-300 text-rose-800 opacity-80';
              } else {
                cardClass = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-50';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.text, opt.isCorrect)}
                disabled={isAnswered}
                className={`w-full p-4 md:p-5 rounded-2xl text-left font-bold text-base md:text-lg transition-all cursor-pointer flex items-center justify-between gap-4 active:scale-98 ${cardClass}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    opt.isCorrect && isAnswered
                      ? 'bg-white text-emerald-600'
                      : 'bg-white/80 text-slate-600'
                  }`}>
                    {isAnswered && opt.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isAnswered && selected && !opt.isCorrect ? (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    ) : (
                      <Heart className="w-4 h-4 text-[#F5A4BF]" />
                    )}
                  </div>
                  <span>{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Phản hồi giải thích dịu dàng */}
        {isAnswered && (
          <div
            className={`mt-6 p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3 text-center sm:text-left">
              <MascotBanBan mood={isCorrect ? 'celebrate' : 'thinking'} size={65} />
              <div>
                <div className="font-extrabold text-base md:text-lg">
                  {isCorrect ? '🌟 Bé ngoan và hiểu chuyện lắm!' : '💡 Bé nhớ điều này nhé!'}
                </div>
                <div className="text-sm mt-0.5">{currentQ.explanation}</div>
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
                className="px-5 py-2.5 rounded-xl bg-[#F5A4BF] hover:bg-[#E88AA7] text-white font-extrabold text-xs md:text-sm flex items-center gap-1.5 shadow cursor-pointer active:scale-95"
              >
                <span>Tình huống tiếp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
