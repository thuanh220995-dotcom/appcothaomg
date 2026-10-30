import React, { useState } from 'react';
import { Volume2, MapPin, Sparkles, Heart, Compass, CheckCircle2 } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { HoaBanFlower } from '../common/HoaBanFlower';

interface DienBienExploreProps {
  onGoToGame: (gameType: string) => void;
}

export const DienBienExplore: React.FC<DienBienExploreProps> = ({ onGoToGame }) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  const explorationTopics = [
    {
      title: 'Bông Hoa Ban Điện Biên',
      badge: 'Biểu Tượng Mùa Xuân Tây Bắc',
      speech: 'Hoa ban nở rộ vào mùa xuân trên khắp các sườn núi Điện Biên. Bông hoa có 5 cánh trắng muốt pha chút hồng tím dịu dàng tỏa hương thơm thanh khiết đón chào năm mới.',
      description: 'Cứ mỗi độ tháng Ba về, núi rừng Điện Biên và xã Thanh Yên lại khoác lên mình màu áo trắng tinh khôi của hoa ban. Hoa ban không chỉ đẹp mà còn là biểu tượng của tình bạn thủy chung, lòng hiếu thảo và tình yêu quê hương.',
      activities: [
        'Bé tập đếm 5 cánh hoa ban trên bông hoa nở',
        'Quan sát nhụy hoa vàng và những cánh hoa phớt hồng',
        'Vẽ tranh hoa ban tặng cô giáo và người thân',
      ],
      interactivePrompt: 'Đếm hoa ban trong vườn trò chơi',
      targetGame: 'counting',
    },
    {
      title: 'Cánh Đồng Mường Thanh Màu Mỡ',
      badge: 'Vựa Lúa Tây Bắc',
      speech: 'Cánh đồng Mường Thanh trải rộng ngút ngàn, được dòng sông Nậm Rốm hiền hòa tưới mát, tạo nên những hạt gạo thơm dẻo nuôi lớn các thế hệ em thơ Điện Biên.',
      description: 'Nhất Thanh, nhì Lò, tam Than, tứ Tấc - Thung lũng Mường Thanh Điện Biên là cánh đồng lớn nhất Tây Bắc. Nơi đây các bạn nhỏ được ngắm nhìn cánh đồng lúa chín vàng óng ả và học cách quý trọng từng hạt cơm ngoan.',
      activities: [
        'Nhận biết hạt gạo Điện Biên thơm dẻo',
        'Lắng nghe tiếng chim hót trên cánh đồng mùa gặt',
        'Hát bài ca về quê hương tươi đẹp',
      ],
      interactivePrompt: 'Lắng nghe âm thanh đồng quê',
      targetGame: 'listening',
    },
    {
      title: 'Nếp Nhà Sàn Ấm Cúng Xã Thanh Yên',
      badge: 'Nét Đẹp Bản Làng',
      speech: 'Những nếp nhà sàn truyền thống che mưa che nắng, nơi các bạn nhỏ quây quần bên bếp lửa ấm áp cùng ông bà, cha mẹ nghe kể chuyện xưa.',
      description: 'Nhà sàn Điện Biên được dựng từ gỗ và tre nứa của núi rừng, mái dốc hình tam giác giúp thoát nước mưa nhanh chóng. Các em bé học cách giữ gìn vệ sinh nhà cửa và lễ phép với người lớn.',
      activities: [
        'Nhận biết mái nhà sàn có dạng hình tam giác',
        'Học cách tháo giày dép gọn gàng trước khi lên cầu thang',
        'Khoanh tay chào ông bà khi đi học về',
      ],
      interactivePrompt: 'Khám phá Ngôi nhà hình học',
      targetGame: 'shapes',
    },
    {
      title: 'Em Bảo Vệ Môi Trường Quê Em',
      badge: 'Hành Động Đẹp Của Bé',
      speech: 'Để quê hương Điện Biên luôn xanh sạch đẹp, bé ngoan không vứt rác bừa bãi, không bẻ cành hái hoa và cùng cô giáo tưới nước chăm sóc cây xanh.',
      description: 'Mỗi em bé trường mầm non Thanh Yên là một đại sứ tí hon yêu thiên nhiên: nhặt rác bỏ vào thùng, cùng bạn trồng cây con, chăm sóc bồn hoa ban của lớp học.',
      activities: [
        'Bỏ vỏ hộp sữa vào đúng thùng rác',
        'Tưới nước cho chậu hoa nhỏ ở góc thiên nhiên',
        'Nhắc nhở bạn cùng bảo vệ cây xanh',
      ],
      interactivePrompt: 'Bé chọn điều hay trong ngày',
      targetGame: 'behavior',
    },
  ];

  const current = explorationTopics[activeTopicIndex];

  const handleRead = () => {
    audioService.speak(current.speech);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FFF9F2] via-[#FBE1EC] to-[#7DBCA0]/30 p-6 md:p-8 rounded-3xl border border-[#F5A4BF]/40 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <HoaBanFlower size={72} />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#9B7BC0] text-xs font-black uppercase tracking-wider mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>BÉ YÊU ĐIỆN BIÊN – VƯỜN HOA QUÊ EM</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Khám Phá Thiên Nhiên &amp; Bản Làng Thanh Yên
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-xl">
              Giúp trẻ mầm non thêm yêu quê hương Điện Biên qua hình ảnh hoa ban, cánh đồng Mường Thanh và những nếp nhà sàn hiền hòa.
            </p>
          </div>
        </div>
      </div>

      {/* Danh sách các chủ đề khám phá */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {explorationTopics.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTopicIndex(idx);
              audioService.playChime('pop');
              audioService.speak(topic.speech);
            }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all cursor-pointer ${
              activeTopicIndex === idx
                ? 'bg-[#9B7BC0] text-white shadow-md scale-102'
                : 'bg-white text-slate-700 hover:bg-[#FBE1EC] border border-slate-200'
            }`}
          >
            {topic.title}
          </button>
        ))}
      </div>

      {/* Nội dung chi tiết chủ đề đang chọn */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-[#7DBCA0] uppercase tracking-wider block mb-1">
              {current.badge}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              {current.title}
            </h2>
          </div>

          <button
            onClick={handleRead}
            className="px-4 py-2.5 rounded-xl bg-[#FBE1EC] hover:bg-[#F5A4BF] text-[#9B7BC0] hover:text-white font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe giọng cô đọc</span>
          </button>
        </div>

        {/* Khung mô tả */}
        <div className="p-5 bg-gradient-to-r from-[#FFF9F2] to-[#BFE7F4]/30 rounded-2xl border border-[#7DBCA0]/30 text-sm md:text-base text-slate-800 leading-relaxed font-medium">
          {current.description}
        </div>

        {/* Hoạt động giáo dục gợi ý */}
        <div>
          <h3 className="font-black text-slate-900 text-sm md:text-base mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFD878]" />
            <span>Hoạt Động Gợi Mở Dành Cho Bé:</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {current.activities.map((act, aIdx) => (
              <div
                key={aIdx}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#7DBCA0] shrink-0 mt-0.5" />
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nút trải nghiệm trò chơi tương ứng */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => onGoToGame(current.targetGame)}
            className="px-5 py-2.5 rounded-xl bg-[#7DBCA0] hover:bg-[#68A98D] text-white font-extrabold text-xs md:text-sm flex items-center gap-2 shadow cursor-pointer active:scale-95"
          >
            <span>Bé vào chơi: {current.interactivePrompt} →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
