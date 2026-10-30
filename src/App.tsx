/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HOA BAN AI – MỖI BÉ MỘT HÀNH TRÌNH KHÁM PHÁ, TỰ TIN BƯỚC VÀO LỚP MỘT
 * Phiên bản: 2026
 * Giáo viên: Trần Thị Bích Thảo
 * Đơn vị: Trường Mầm non Thanh Yên, huyện Điện Biên, tỉnh Điện Biên
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Heart, BookOpen, Volume2, ShieldCheck, 
  Smile, Award, ChevronRight, Lock, Key, LogIn, LogOut, 
  MapPin, School, ArrowRight, CheckCircle2 
} from 'lucide-react';

import { ViewTab, TeacherProfile, GameType } from './types';
import { storageService, INITIAL_TEACHER_PROFILE } from './services/storageService';
import { audioService } from './services/audioService';

import { Header } from './components/common/Header';
import { TeacherCard } from './components/common/TeacherCard';
import { MascotBanBan } from './components/common/MascotBanBan';
import { HoaBanFlower } from './components/common/HoaBanFlower';

import { GamesHub } from './components/games/GamesHub';
import { CountingGame } from './components/games/CountingGame';
import { ShapesGame } from './components/games/ShapesGame';
import { ListeningGame } from './components/games/ListeningGame';
import { BehaviorGame } from './components/games/BehaviorGame';
import { StoryGame } from './components/games/StoryGame';
import { Grade1PrepGame } from './components/games/Grade1PrepGame';

import { AIStudio } from './components/teacher/AIStudio';
import { LessonPlanner } from './components/teacher/LessonPlanner';
import { VoiceStudio } from './components/teacher/VoiceStudio';
import { ResourceBank } from './components/teacher/ResourceBank';
import { ObservationJournal } from './components/teacher/ObservationJournal';
import { DienBienExplore } from './components/kids/DienBienExplore';
import { PortfolioShowcase } from './components/about/PortfolioShowcase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [targetGameType, setTargetGameType] = useState<GameType | null>(null);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(INITIAL_TEACHER_PROFILE);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Tab phụ trong góc Cô Thảo AI
  const [teacherSubTab, setTeacherSubTab] = useState<'bulk' | 'planner' | 'voice'>('bulk');

  useEffect(() => {
    setTeacherProfile(storageService.getTeacherProfile());
    setIsAuthenticated(storageService.isTeacherAuthenticated());
  }, []);

  const handleToggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    if (next) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mật khẩu quản trị dành riêng cho cô giáo Thảo hoặc mã chuẩn 2026
    if (authPassword.trim() === 'cothao2026' || authPassword.trim() === 'hoaban2026' || authPassword.trim() === 'admin') {
      storageService.setTeacherAuthenticated(true);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setAuthPassword('');
      setAuthError('');
      audioService.playChime('correct');
      audioService.speak('Chào mừng Cô giáo Trần Thị Bích Thảo đăng nhập hệ thống quản trị!');
    } else {
      setAuthError('Mật khẩu chưa đúng. (Gợi ý thử nghiệm: hoaban2026)');
      audioService.playChime('encourage');
    }
  };

  const handleLogout = () => {
    storageService.setTeacherAuthenticated(false);
    setIsAuthenticated(false);
    audioService.playChime('pop');
  };

  const navigateToGame = (gameType: GameType) => {
    setTargetGameType(gameType);
    setCurrentTab('games');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* 1. Header (Top Bar Contract) */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setTargetGameType(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* TAB 1: TRANG CHỦ (HOME) */}
        {currentTab === 'home' && (
          <div className="space-y-10">
            {/* HERO BANNER ĐIỆN BIÊN & HOA BAN */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#BFE7F4]/40 via-[#FFF9F2] to-[#FBE1EC]/60 border border-[#F5A4BF]/40 p-6 sm:p-10 shadow-sm">
              {/* Trang trí hoa ban và đồi núi Tây Bắc */}
              <div className="absolute -top-12 -right-12 opacity-30 pointer-events-none">
                <HoaBanFlower size={200} />
              </div>
              <div className="absolute -bottom-16 -left-16 opacity-25 pointer-events-none">
                <HoaBanFlower size={180} />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#F5A4BF]/40 text-[#9B7BC0] text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MẦM NON THANH YÊN · ĐIỆN BIÊN 2026</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Mỗi Bé Một Hành Trình Khám Phá, Tự Tin Tỏa Sáng
                  </h1>

                  <p className="mt-3.5 text-base md:text-lg text-slate-700 font-semibold leading-relaxed">
                    Ứng dụng giáo dục thông minh chuẩn hóa giọng đọc tiếng Việt, cá nhân hóa học qua chơi, đồng hành cùng trẻ mẫu giáo nhỡ 4–5 tuổi và giáo viên Trần Thị Bích Thảo.
                  </p>

                  {/* Nút hành động nổi bật */}
                  <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <button
                      onClick={() => {
                        setCurrentTab('games');
                        audioService.speak('Chào mừng các con đến với Vườn trò chơi Hoa Ban!');
                      }}
                      className="px-6 py-3.5 rounded-2xl bg-[#9B7BC0] hover:bg-[#8565AA] text-white font-black text-base shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>BÉ BẮT ĐẦU KHÁM PHÁ</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTab('teacher_ai');
                        audioService.playChime('pop');
                      }}
                      className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-black text-sm shadow-xs transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                    >
                      <span>GÓC CÔ THẢO AI</span>
                      <ArrowRight className="w-4 h-4 text-[#9B7BC0]" />
                    </button>
                  </div>
                </div>

                {/* Linh vật Ban Ban tươi vui vẫy chào */}
                <div className="shrink-0 text-center">
                  <MascotBanBan
                    mood="talking"
                    size={160}
                    speechBubble="Xin chào các con! Chúng mình cùng khám phá Vườn Hoa Ban nhé!"
                    onBubbleClick={() => audioService.speak('Xin chào các con! Chúng mình cùng khám phá Vườn Hoa Ban nhé!')}
                  />
                </div>
              </div>
            </div>

            {/* THẺ GIỚI THIỆU CÔ GIÁO TRẦN THỊ BÍCH THẢO */}
            <TeacherCard
              profile={teacherProfile}
              onProfileUpdate={setTeacherProfile}
              isAdmin={isAuthenticated}
            />

            {/* 2 KHU VỰC PHÂN BIỆT RÕ RÀNG: DÀNH CHO TRẺ & DÀNH CHO GIÁO VIÊN */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* KHU VỰC 1: DÀNH CHO TRẺ MẦM NON (7 CỘT) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#FBE1EC] text-[#9B7BC0] flex items-center justify-center font-black">
                      🧒
                    </span>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        Khu Vực Dành Cho Bé (4–5 Tuổi)
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Chạm ngón tay để học qua chơi, nghe lời cô Thảo và Ban Ban dặn dò
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentTab('games')}
                    className="text-xs font-extrabold text-[#9B7BC0] hover:underline"
                  >
                    Xem tất cả →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={() => navigateToGame('counting')}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF2F7] to-[#FBE1EC] border border-white hover:border-[#F5A4BF] transition-all duration-200 text-left shadow-xs hover:shadow-md cursor-pointer group flex items-start justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-1.5">🌸</div>
                      <h3 className="font-black text-slate-900 group-hover:text-[#9B7BC0] transition-colors text-base">
                        Bé Làm Quen Toán
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Vườn hoa đếm số phạm vi 5 (mở rộng 7)
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#9B7BC0]">Chơi ngay →</span>
                  </button>

                  <button
                    onClick={() => navigateToGame('listening')}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-white hover:border-[#9B7BC0] transition-all duration-200 text-left shadow-xs hover:shadow-md cursor-pointer group flex items-start justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-1.5">👂</div>
                      <h3 className="font-black text-slate-900 group-hover:text-[#9B7BC0] transition-colors text-base">
                        Bé Yêu Tiếng Việt
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Tai tin mắt sáng, nghe chỉ tranh
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#9B7BC0]">Chơi ngay →</span>
                  </button>

                  <button
                    onClick={() => navigateToGame('behavior')}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] border border-white hover:border-[#F5A4BF] transition-all duration-200 text-left shadow-xs hover:shadow-md cursor-pointer group flex items-start justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-1.5">💖</div>
                      <h3 className="font-black text-slate-900 group-hover:text-[#E88AA7] transition-colors text-base">
                        Bé Học Kỹ Năng Sống
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Bé chọn điều hay, thói quen ngoan
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#E88AA7]">Chơi ngay →</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('dien_bien')}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border border-white hover:border-[#7DBCA0] transition-all duration-200 text-left shadow-xs hover:shadow-md cursor-pointer group flex items-start justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-1.5">🏔️</div>
                      <h3 className="font-black text-slate-900 group-hover:text-[#5FA485] transition-colors text-base">
                        Khám Phá Điện Biên
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Hoa ban, thung lũng Mường Thanh
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#5FA485]">Khám phá →</span>
                  </button>
                </div>
              </div>

              {/* KHU VỰC 2: DÀNH CHO GIÁO VIÊN (5 CỘT) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
                      👩‍🏫
                    </span>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        Khu Vực Giáo Viên
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        Công cụ AI hỗ trợ giảng dạy &amp; soạn học liệu
                      </p>
                    </div>
                  </div>

                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="text-xs font-bold text-[#9B7BC0] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Đăng nhập</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setCurrentTab('teacher_ai');
                      setTeacherSubTab('bulk');
                    }}
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#9B7BC0] text-left transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FBE1EC] text-[#9B7BC0] flex items-center justify-center text-sm font-black">
                        ⚡
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          Tạo Học Liệu Bằng AI (10 – 100 Câu)
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Chia lô nhỏ, Zod schema, xuất bản tức thì
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('teacher_ai');
                      setTeacherSubTab('planner');
                    }}
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#7DBCA0] text-left transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#5FA485] flex items-center justify-center text-sm font-black">
                        📝
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          Soạn Kế Hoạch Hoạt Động (12 Phần)
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Chuẩn giáo dục mầm non, in và lưu trữ
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => setCurrentTab('library')}
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#9B7BC0] text-left transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-black">
                        📚
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          Ngân Hàng Dữ Liệu &amp; Quản Lý Học Liệu
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Duyệt nội dung, xuất/nhập JSON an toàn
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('teacher_ai');
                      setTeacherSubTab('voice');
                    }}
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-left transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-black">
                        🎙️
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          Phòng Thử Giọng Đọc Tiếng Việt
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Nghe thử và tinh chỉnh tốc độ sư phạm
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VƯỜN TRÒ CHƠI (GAMES) */}
        {currentTab === 'games' && (
          <GamesHub initialGame={targetGameType} />
        )}

        {/* TAB 3: BÉ HỌC VUI (LEARN) */}
        {currentTab === 'learn' && (
          <div className="max-w-5xl mx-auto space-y-8 pb-16">
            <div className="text-center max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full bg-[#FBE1EC] text-[#9B7BC0] text-xs font-black uppercase tracking-wider mb-2 inline-block">
                CHƯƠNG TRÌNH PHÁT TRIỂN NĂNG LỰC 4–5 TUỔI (MẪU GIÁO NHỠ)
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                Bé Học Vui Cùng Cô Thảo &amp; Ban Ban
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Các chuyên đề được thiết kế chuẩn tâm lý lứa tuổi 4–5 tuổi, học qua chơi, nhận biết và tự lập.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-3xl">🌸</span>
                  <h3 className="font-black text-slate-900 text-lg mt-3">Làm Quen Với Toán</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Đếm số lượng trong phạm vi 5 (mở rộng 7), nhận biết hình tròn, vuông, tam giác, chữ nhật qua thế giới thực vật Điện Biên.
                  </p>
                </div>
                <button
                  onClick={() => navigateToGame('counting')}
                  className="mt-6 w-full py-2.5 bg-[#FBE1EC] hover:bg-[#F5A4BF] text-[#9B7BC0] hover:text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Vào học đếm hoa →
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-3xl">🗣️</span>
                  <h3 className="font-black text-slate-900 text-lg mt-3">Phát Triển Ngôn Ngữ</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Luyện phát âm tiếng Việt chuẩn có dấu, nghe kể chuyện tranh Ban Ban, nhận biết từ vựng qua tranh sinh động.
                  </p>
                </div>
                <button
                  onClick={() => navigateToGame('listening')}
                  className="mt-6 w-full py-2.5 bg-[#EDE9FE] hover:bg-[#9B7BC0] text-[#9B7BC0] hover:text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Vào luyện tai mắt →
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-3xl">🎒</span>
                  <h3 className="font-black text-slate-900 text-lg mt-3">Hành Trang Lớp Một</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Sắp xếp ba lô, tự lập đồ dùng cá nhân, rèn luyện tư thế ngồi ngay ngắn và nề nếp văn minh học đường.
                  </p>
                </div>
                <button
                  onClick={() => navigateToGame('grade1_prep')}
                  className="mt-6 w-full py-2.5 bg-[#FEF08A] hover:bg-[#CA8A04] text-slate-800 hover:text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Vào xếp ba lô →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GÓC CÔ THẢO AI (TEACHER AI STUDIO & SOẠN BÀI) */}
        {currentTab === 'teacher_ai' && (
          <div className="space-y-6">
            {/* Thanh điều hướng con trong góc cô Thảo */}
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setTeacherSubTab('bulk');
                    audioService.playChime('pop');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    teacherSubTab === 'bulk'
                      ? 'bg-[#9B7BC0] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  ⚡ Xưởng Tạo Học Liệu Hàng Loạt
                </button>

                <button
                  onClick={() => {
                    setTeacherSubTab('planner');
                    audioService.playChime('pop');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    teacherSubTab === 'planner'
                      ? 'bg-[#9B7BC0] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  📝 Soạn Kế Hoạch Giáo Dục 12 Phần
                </button>

                <button
                  onClick={() => {
                    setTeacherSubTab('voice');
                    audioService.playChime('pop');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    teacherSubTab === 'voice'
                      ? 'bg-[#9B7BC0] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🎙️ Phòng Thử Giọng Việt
                </button>
              </div>

              {!isAuthenticated && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300 flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Cần đăng nhập để lưu/xuất bản</span>
                </button>
              )}
            </div>

            {teacherSubTab === 'bulk' && (
              <AIStudio
                onGoToLibrary={() => setCurrentTab('library')}
                onGoToGames={() => setCurrentTab('games')}
                isAuthenticated={isAuthenticated}
                onRequireAuth={() => setShowAuthModal(true)}
              />
            )}

            {teacherSubTab === 'planner' && (
              <LessonPlanner
                isAuthenticated={isAuthenticated}
                onRequireAuth={() => setShowAuthModal(true)}
              />
            )}

            {teacherSubTab === 'voice' && (
              <VoiceStudio />
            )}
          </div>
        )}

        {/* TAB 5: KHO HỌC LIỆU (LIBRARY) */}
        {currentTab === 'library' && (
          <ResourceBank
            isAuthenticated={isAuthenticated}
            onRequireAuth={() => setShowAuthModal(true)}
            onGoToGames={() => setCurrentTab('games')}
          />
        )}

        {/* TAB 6: KHÁM PHÁ ĐIỆN BIÊN */}
        {currentTab === 'dien_bien' && (
          <DienBienExplore onGoToGame={(gameType) => navigateToGame(gameType as GameType)} />
        )}

        {/* TAB 7: SỔ QUAN SÁT PHÁT TRIỂN */}
        {currentTab === 'observation' && (
          <ObservationJournal
            isAuthenticated={isAuthenticated}
            onRequireAuth={() => setShowAuthModal(true)}
          />
        )}

        {/* TAB 8: GIỚI THIỆU & HỒ SƠ 2026 */}
        {currentTab === 'portfolio' && (
          <PortfolioShowcase />
        )}
      </main>

      {/* FOOTER ĐẲNG CẤP MẦM NON SƯ PHẠM */}
      <footer className="border-t border-[#F5A4BF]/30 bg-[#FFF9F2] py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-500">
          <div>
            <div className="font-extrabold text-slate-800 text-sm flex items-center justify-center md:justify-start gap-2">
              <HoaBanFlower size={20} />
              <span>HOA BAN AI 2026 · MẦM NON THANH YÊN, ĐIỆN BIÊN</span>
            </div>
            <p className="mt-1">
              Sáng kiến sư phạm của <strong>Cô giáo Trần Thị Bích Thảo</strong>. Bản quyền © 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-semibold">
            <button onClick={() => setCurrentTab('home')} className="hover:text-[#9B7BC0]">Trang chủ</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setCurrentTab('games')} className="hover:text-[#9B7BC0]">Vườn trò chơi</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setCurrentTab('portfolio')} className="hover:text-[#9B7BC0]">Hồ sơ minh chứng</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setShowAuthModal(true)} className="hover:text-[#9B7BC0]">
              {isAuthenticated ? 'Tài khoản giáo viên ✓' : 'Đăng nhập giáo viên'}
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL ĐĂNG NHẬP QUẢN TRỊ VIÊN DÀNH CHO CÔ THẢO */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-slate-200">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FBE1EC] text-[#9B7BC0] flex items-center justify-center mx-auto mb-2 font-black">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Xác Thực Cô Giáo Trần Thị Bích Thảo
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Khu vực quản trị chỉ dành riêng cho giáo viên tạo và xuất bản học liệu.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mật khẩu bảo mật:
                </label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B7BC0]"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-rose-600 font-semibold mt-1.5">{authError}</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#9B7BC0] hover:bg-[#8565AA] text-white font-extrabold text-xs rounded-xl shadow cursor-pointer"
                >
                  Đăng nhập
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthPassword('hoaban2026');
                  }}
                  className="text-[11px] text-[#9B7BC0] underline"
                >
                  Dùng mã thử nghiệm nhanh: hoaban2026
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
