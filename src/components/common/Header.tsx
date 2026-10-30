import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Eye, Sparkles } from 'lucide-react';
import { ViewTab } from '../../types';
import { audioService } from '../../services/audioService';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  const [isMuted, setIsMuted] = useState(audioService.getIsMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioService.setMuted(next);
    if (!next) {
      audioService.playChime('pop');
    }
  };

  const navItems: { tab: ViewTab; label: string }[] = [
    { tab: 'home', label: 'Trang chủ' },
    { tab: 'games', label: 'Vườn trò chơi' },
    { tab: 'learn', label: 'Bé học vui' },
    { tab: 'teacher_ai', label: 'Góc cô Thảo AI' },
    { tab: 'library', label: 'Kho học liệu' },
    { tab: 'dien_bien', label: 'Điện Biên' },
    { tab: 'observation', label: 'Sổ quan sát' },
    { tab: 'portfolio', label: 'Giới thiệu' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F2]/95 backdrop-blur-md border-b border-[#F5A4BF]/30 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand title, one line */}
        <div
          onClick={() => {
            onSelectTab('home');
            audioService.playChime('pop');
          }}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
          title="Hoa Ban AI - Mầm Non Thanh Yên Điện Biên"
        >
          {/* Logo Bông hoa ban 5 cánh */}
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#F5A4BF] flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
            <svg viewBox="0 0 100 100" className="w-7 h-7">
              <path d="M50 15 C45 28 35 38 20 40 C35 48 42 60 40 78 C50 68 62 72 68 85 C68 68 78 58 90 50 C75 46 68 35 65 20 Z" fill="#F5A4BF" />
              <circle cx="50" cy="50" r="8" fill="#FFD878" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-slate-900 group-hover:text-[#9B7BC0] transition-colors leading-none">
              HOA BAN AI <span className="text-xs font-bold text-[#F5A4BF] ml-1">2026</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-500 leading-tight">
              MN Thanh Yên · Điện Biên
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation links (single line whitespace-nowrap) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {navItems.map((item) => {
            const active = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => {
                  onSelectTab(item.tab);
                  audioService.playChime('pop');
                }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  active
                    ? 'text-[#9B7BC0] font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B7BC0] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Quick Controls (Sound, Motion, CTA) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Nút bật/tắt âm thanh tiếng Việt */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-[#7DBCA0]/40 text-[#7DBCA0] hover:bg-[#7DBCA0]/10'
            }`}
            title={isMuted ? 'Bật âm thanh tiếng Việt' : 'Tắt tiếng'}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Giảm chuyển động */}
          <button
            onClick={onToggleReducedMotion}
            className={`p-2 rounded-xl border transition-all hidden sm:inline-flex ${
              reducedMotion
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
            title={reducedMotion ? 'Đang bật chế độ giảm chuyển động' : 'Bật chế độ giảm chuyển động'}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Nút hành động chính */}
          <button
            onClick={() => {
              onSelectTab('games');
              audioService.speak('Chào mừng bé đến với Vườn trò chơi Hoa Ban!');
            }}
            className="px-4 py-2 text-xs md:text-sm font-bold text-white bg-[#9B7BC0] hover:bg-[#8565AA] rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bé Bắt Đầu Chơi</span>
          </button>

          {/* Nút mở Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-slate-200 text-slate-700 bg-white"
            aria-label="Mở thực đơn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu thả xuống trên điện thoại / máy tính bảng */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-[#F5A4BF]/20 flex flex-col gap-1 pb-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                onSelectTab(item.tab);
                setMobileMenuOpen(false);
                audioService.playChime('pop');
              }}
              className={`text-left px-3 py-2 rounded-xl font-bold text-sm ${
                currentTab === item.tab
                  ? 'bg-[#FBE1EC] text-[#9B7BC0]'
                  : 'text-slate-700 hover:bg-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
