import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, BookOpen, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { MascotBanBan } from '../common/MascotBanBan';
import { Story } from '../../types';

interface StoryGameProps {
  onBackToMenu: () => void;
}

export const StoryGame: React.FC<StoryGameProps> = ({ onBackToMenu }) => {
  const [story, setStory] = useState<Story | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const s = storageService.getStory();
    setStory(s);
  }, []);

  const currentSection = story?.sections[currentPageIndex];

  useEffect(() => {
    if (currentSection) {
      setShowQuestion(false);
      setSelectedAnswer(null);
      setIsAnswered(false);
      // Đọc đoạn truyện tiếng Việt tự nhiên
      audioService.speak(currentSection.speechNarration || currentSection.content);
    }
  }, [currentPageIndex, currentSection]);

  const handleNextPage = () => {
    if (!story) return;
    audioService.playChime('pop');
    if (currentPageIndex < story.sections.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      setShowQuestion(true);
      audioService.speak('Bé ơi, câu chuyện đã hết rồi! Chúng mình cùng trả lời một câu hỏi nhỏ nhé!');
    }
  };

  const handlePrevPage = () => {
    audioService.playChime('pop');
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleReplayPage = () => {
    if (currentSection) {
      audioService.speak(currentSection.speechNarration || currentSection.content);
    }
  };

  if (!story || !currentSection) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl p-6">
        <p className="text-slate-600 font-bold mb-4">Chưa có truyện tranh.</p>
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

        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#9B7BC0]" />
          <span className="text-xs font-black text-[#9B7BC0]">
            Trang {currentPageIndex + 1} / {story.sections.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#9B7BC0]/30 mb-6">
        <div className="text-center mb-6">
          <span className="text-xs font-black tracking-wider uppercase text-[#F5A4BF] block mb-1">
            TRUYỆN TRANH MẦM NON ĐIỆN BIÊN
          </span>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">
            {story.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">Tác giả: {story.author}</p>
        </div>

        {/* Khung tranh minh họa sinh động */}
        <div className="my-6 p-6 md:p-8 bg-gradient-to-b from-[#BFE7F4]/30 via-[#FFF9F2] to-[#FBE1EC]/40 rounded-3xl border-2 border-[#9B7BC0]/20 flex flex-col items-center justify-center min-h-[260px] text-center relative overflow-hidden">
          <MascotBanBan mood="talking" size={100} />
          
          <div className="mt-4 max-w-xl text-base md:text-lg font-bold text-slate-800 leading-relaxed bg-white/80 p-4 rounded-2xl shadow-sm border border-[#F5A4BF]/30">
            {currentSection.content}
          </div>

          <p className="mt-2 text-xs text-[#9B7BC0] italic">
            * Minh họa: {currentSection.illustrationIdea || 'Ban Ban mỉm cười chào bé'}
          </p>
        </div>

        {/* Các nút điều khiển trang sách */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              currentPageIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang trước</span>
          </button>

          <button
            onClick={handleReplayPage}
            className="px-4 py-2.5 rounded-xl bg-[#FBE1EC] hover:bg-[#F5A4BF] text-[#9B7BC0] hover:text-white font-bold text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe lại trang này</span>
          </button>

          <button
            onClick={handleNextPage}
            className="px-5 py-2.5 rounded-xl bg-[#9B7BC0] hover:bg-[#8565AA] text-white font-extrabold text-xs md:text-sm flex items-center gap-1.5 shadow transition-all cursor-pointer active:scale-95"
          >
            <span>{currentPageIndex === story.sections.length - 1 ? 'Trả lời câu hỏi' : 'Trang tiếp'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Khung câu hỏi ôn tập nội dung truyện */}
        {showQuestion && (
          <div className="mt-8 p-6 bg-gradient-to-r from-[#FBE1EC] to-[#FFF9F2] rounded-3xl border-2 border-[#F5A4BF] animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-black text-[#9B7BC0] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>CÂU HỎI NHỚ BÀI CÙNG BAN BAN</span>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-4">
              {currentSection.comprehensionQuestion || 'Bé hãy cho biết bạn Ban Ban có đức tính gì đáng khen?'}
            </h3>

            <div className="flex flex-col gap-2.5">
              {[
                { text: 'Biết giúp đỡ bạn bè và yêu quê hương Điện Biên', isCorrect: true },
                { text: 'Chỉ thích ở nhà ngủ nướng một mình', isCorrect: false },
                { text: 'Hay hờn dỗi không chơi với ai', isCorrect: false },
              ].map((ans, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedAnswer(idx);
                    setIsAnswered(true);
                    if (ans.isCorrect) {
                      audioService.playChime('correct');
                      confetti({ particleCount: 40 });
                      audioService.speak('Đúng rồi! Con nhớ câu chuyện rất giỏi!');
                    } else {
                      audioService.playChime('encourage');
                      audioService.speak('Chưa đúng rồi, bé hãy chọn lại nhé!');
                    }
                  }}
                  className={`p-3.5 rounded-xl font-bold text-sm text-left transition-all ${
                    isAnswered && ans.isCorrect
                      ? 'bg-emerald-500 text-white shadow-md'
                      : isAnswered && selectedAnswer === idx && !ans.isCorrect
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-white hover:bg-[#FBE1EC] text-slate-800 border border-slate-200'
                  }`}
                >
                  {ans.text}
                </button>
              ))}
            </div>

            {isAnswered && (
              <div className="mt-4 p-3 bg-white/90 rounded-xl text-xs md:text-sm font-semibold text-slate-700">
                🌱 Bài học giáo dục: {story.moralLesson}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
