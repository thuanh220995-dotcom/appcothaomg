import React, { useState } from 'react';
import { GameType } from '../../types';
import { CountingGame } from './CountingGame';
import { ShapesGame } from './ShapesGame';
import { ListeningGame } from './ListeningGame';
import { BehaviorGame } from './BehaviorGame';
import { StoryGame } from './StoryGame';
import { Grade1PrepGame } from './Grade1PrepGame';
import { audioService } from '../../services/audioService';
import { HoaBanFlower } from '../common/HoaBanFlower';

interface GamesHubProps {
  initialGame?: GameType | null;
}

export const GamesHub: React.FC<GamesHubProps> = ({ initialGame = null }) => {
  const [activeGame, setActiveGame] = useState<GameType | null>(initialGame);

  const gamesList: {
    type: GameType;
    title: string;
    subtitle: string;
    badge: string;
    bgColor: string;
    textColor: string;
    icon: string;
    description: string;
  }[] = [
    {
      type: 'counting',
      title: 'Vườn Hoa Đếm Số',
      subtitle: 'Nhận biết số lượng 1 – 5 (mở rộng 7)',
      badge: 'Toán Mầm Non',
      bgColor: 'bg-gradient-to-br from-[#FFF2F7] to-[#FBE1EC]',
      textColor: 'text-[#9B7BC0]',
      icon: '🌸',
      description: 'Đếm hoa ban nở trên sườn đồi Điện Biên, chạm ngón tay vào từng bông hoa và chọn số đúng.',
    },
    {
      type: 'shapes',
      title: 'Ngôi Nhà Hình Học',
      subtitle: 'Tròn, vuông, tam giác, chữ nhật',
      badge: 'Tư Duy Hình Học',
      bgColor: 'bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]',
      textColor: 'text-[#5FA485]',
      icon: '📐',
      description: 'Nhận biết các hình qua vật thật: bánh chưng Điện Biên, mặt trời, mái nhà sàn Tây Bắc.',
    },
    {
      type: 'listening',
      title: 'Tai Tin – Mắt Sáng',
      subtitle: 'Lắng nghe giọng đọc và chỉ tranh',
      badge: 'Phát Triển Ngôn Ngữ',
      bgColor: 'bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]',
      textColor: 'text-[#9B7BC0]',
      icon: '👂',
      description: 'Nghe hướng dẫn tiếng Việt chuẩn có dấu và chọn đúng bức tranh con vật, đồ vật thân quen.',
    },
    {
      type: 'behavior',
      title: 'Bé Chọn Điều Hay',
      subtitle: 'Kỹ năng sống và thói quen tốt',
      badge: 'Tình Cảm & Xã Hội',
      bgColor: 'bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2]',
      textColor: 'text-[#E88AA7]',
      icon: '💖',
      description: 'Rửa tay trước khi ăn, cất đồ chơi gọn gàng, chào hỏi lễ phép, bảo vệ hoa ban quê hương.',
    },
    {
      type: 'story',
      title: 'Chuyện Kể Cùng Ban Ban',
      subtitle: 'Truyện tranh tranh động tiếng Việt',
      badge: 'Văn Học Thiếu Nhi',
      bgColor: 'bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]',
      textColor: 'text-[#3B82F6]',
      icon: '📖',
      description: 'Lắng nghe giọng kể ngọt ngào về hành trình khám phá Điện Biên của bé hoa ban Ban Ban.',
    },
    {
      type: 'grade1_prep',
      title: 'Hành Trang Vào Lớp Một',
      subtitle: 'Tâm thế tự tin bước vào trường mới',
      badge: 'Kỹ Năng & Tự Lập',
      bgColor: 'bg-gradient-to-br from-[#FEF9C3] to-[#FEF08A]',
      textColor: 'text-[#CA8A04]',
      icon: '🎒',
      description: 'Tự sắp xếp ba lô, nhận biết đồ dùng học tập, rèn luyện tính tự lập và nề nếp cho trẻ 4–5 tuổi.',
    },
  ];

  const handleLaunchGame = (type: GameType, title: string) => {
    audioService.playChime('pop');
    setActiveGame(type);
    audioService.speak(`Chào mừng bé đến với trò chơi ${title}!`);
  };

  if (activeGame === 'counting') return <CountingGame onBackToMenu={() => setActiveGame(null)} />;
  if (activeGame === 'shapes') return <ShapesGame onBackToMenu={() => setActiveGame(null)} />;
  if (activeGame === 'listening') return <ListeningGame onBackToMenu={() => setActiveGame(null)} />;
  if (activeGame === 'behavior') return <BehaviorGame onBackToMenu={() => setActiveGame(null)} />;
  if (activeGame === 'story') return <StoryGame onBackToMenu={() => setActiveGame(null)} />;
  if (activeGame === 'grade1_prep') return <Grade1PrepGame onBackToMenu={() => setActiveGame(null)} />;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Banner Vườn trò chơi */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBE1EC] text-[#9B7BC0] text-xs font-black uppercase tracking-wider mb-2">
          <HoaBanFlower size={20} />
          <span>VƯỜN TRÒ CHƠI TƯƠNG TÁC HOA BAN</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
          Học Qua Chơi – Tự Tin Tỏa Sáng
        </h1>
        <p className="mt-2 text-slate-600 max-w-xl mx-auto text-sm md:text-base">
          Mỗi trò chơi được thiết kế chuẩn sư phạm mầm non cho trẻ mẫu giáo nhỡ 4–5 tuổi, kết hợp giọng đọc tiếng Việt dịu dàng và tương tác chạm cảm ứng tự nhiên.
        </p>
      </div>

      {/* Lưới 6 trò chơi tương tác */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {gamesList.map((g) => (
          <div
            key={g.type}
            onClick={() => handleLaunchGame(g.type, g.title)}
            className={`p-6 rounded-3xl border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1.5 flex flex-col justify-between ${g.bgColor}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-3 bg-white/90 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  {g.icon}
                </span>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/90 text-slate-700 shadow-xs">
                  {g.badge}
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 group-hover:text-[#9B7BC0] transition-colors">
                {g.title}
              </h2>
              <p className="text-xs font-bold text-slate-500 mt-0.5">{g.subtitle}</p>
              <p className="text-xs text-slate-700 mt-3 leading-relaxed">{g.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#9B7BC0] group-hover:underline">
                Bé bấm vào để chơi →
              </span>
              <div className="w-8 h-8 rounded-full bg-white text-slate-800 font-bold flex items-center justify-center shadow-sm group-hover:bg-[#9B7BC0] group-hover:text-white transition-colors">
                ▶
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
