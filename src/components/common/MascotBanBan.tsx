import React from 'react';
import { Volume2 } from 'lucide-react';

interface MascotBanBanProps {
  mood?: 'happy' | 'talking' | 'celebrate' | 'thinking';
  speechBubble?: string;
  size?: number;
  className?: string;
  onBubbleClick?: () => void;
}

export const MascotBanBan: React.FC<MascotBanBanProps> = ({
  mood = 'happy',
  speechBubble,
  size = 140,
  className = '',
  onBubbleClick,
}) => {
  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* Speech Bubble nếu có */}
      {speechBubble && (
        <div
          onClick={onBubbleClick}
          className="relative max-w-xs md:max-w-sm bg-white/95 backdrop-blur-sm border-2 border-[#F5A4BF] text-slate-800 text-sm md:text-base font-semibold px-4 py-2.5 rounded-2xl shadow-lg cursor-pointer hover:border-[#9B7BC0] transition-colors group flex items-start gap-2"
          title="Bấm để nghe Ban Ban đọc lại"
        >
          <div className="flex-1 leading-snug">{speechBubble}</div>
          <Volume2 className="w-5 h-5 text-[#9B7BC0] group-hover:scale-110 shrink-0 mt-0.5" />
          
          {/* Mũi nhọn bong bóng thoại */}
          <div className="absolute -bottom-2.5 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-[#F5A4BF] rotate-45" />
        </div>
      )}

      {/* Nhân vật Ban Ban SVG */}
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 select-none transition-transform hover:scale-105 active:scale-95 animate-soft-float"
        title="Linh vật Ban Ban - Hoa Ban AI"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
          {/* 5 Cánh hoa trên đầu như chiếc mũ vương miện hoa ban */}
          <g transform="translate(60, 48)">
            {/* Cánh hoa đỉnh */}
            <path
              d="M0 -15 C-12 -38 0 -48 0 -48 C0 -48 12 -38 0 -15 Z"
              fill="#FFFFFF"
              stroke="#F5A4BF"
              strokeWidth="1.5"
            />
            {/* Cánh phải trên */}
            <path
              d="M10 -8 C32 -26 44 -15 44 -15 C44 -15 32 4 10 -8 Z"
              fill="#FFF2F7"
              stroke="#F5A4BF"
              strokeWidth="1.5"
            />
            {/* Cánh phải dưới */}
            <path
              d="M10 8 C35 15 36 34 36 34 C36 34 16 32 10 8 Z"
              fill="#FBE1EC"
              stroke="#9B7BC0"
              strokeWidth="1.5"
            />
            {/* Cánh trái dưới */}
            <path
              d="M-10 8 C-16 32 -36 34 -36 34 C-36 34 -35 15 -10 8 Z"
              fill="#FBE1EC"
              stroke="#9B7BC0"
              strokeWidth="1.5"
            />
            {/* Cánh trái trên */}
            <path
              d="M-10 -8 C-32 4 -44 -15 -44 -15 C-44 -15 -32 -26 -10 -8 Z"
              fill="#FFF2F7"
              stroke="#F5A4BF"
              strokeWidth="1.5"
            />
          </g>

          {/* Cơ thể tròn xoe dễ thương của Ban Ban */}
          <circle cx="60" cy="62" r="34" fill="#FFFFFF" stroke="#F5A4BF" strokeWidth="2.5" />
          
          {/* Vầng má hồng đào dễ thương */}
          <ellipse cx="40" cy="68" rx="5.5" ry="3.5" fill="#F5A4BF" opacity="0.6" />
          <ellipse cx="80" cy="68" rx="5.5" ry="3.5" fill="#F5A4BF" opacity="0.6" />

          {/* Đôi mắt to tròn long lanh */}
          {mood === 'happy' || mood === 'celebrate' ? (
            <g>
              {/* Mắt to long lanh */}
              <ellipse cx="46" cy="58" rx="4.5" ry="6" fill="#2C3E50" />
              <circle cx="48" cy="55" r="2" fill="#FFFFFF" />
              <ellipse cx="74" cy="58" rx="4.5" ry="6" fill="#2C3E50" />
              <circle cx="76" cy="55" r="2" fill="#FFFFFF" />
            </g>
          ) : mood === 'thinking' ? (
            <g>
              {/* Mắt liếc nhẹ suy nghĩ */}
              <ellipse cx="46" cy="56" rx="4.5" ry="5" fill="#2C3E50" />
              <circle cx="48" cy="54" r="1.5" fill="#FFFFFF" />
              <ellipse cx="74" cy="56" rx="4.5" ry="5" fill="#2C3E50" />
              <circle cx="76" cy="54" r="1.5" fill="#FFFFFF" />
              {/* Chân mày nhíu tò mò */}
              <path d="M42 49 Q46 47 50 50" stroke="#7F8C8D" strokeWidth="1.5" fill="none" />
              <path d="M70 50 Q74 47 78 49" stroke="#7F8C8D" strokeWidth="1.5" fill="none" />
            </g>
          ) : (
            <g>
              {/* Mi mắt cười híp vui vẻ */}
              <path d="M41 59 Q46 52 51 59" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M69 59 Q74 52 79 59" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Miệng cười xinh xắn */}
          {mood === 'talking' || mood === 'celebrate' ? (
            <path
              d="M52 68 Q60 80 68 68 Z"
              fill="#E74C3C"
              stroke="#C0392B"
              strokeWidth="1.2"
            />
          ) : (
            <path
              d="M53 69 Q60 76 67 69"
              stroke="#2C3E50"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Chiếc khăn lá xanh non quàng cổ */}
          <path
            d="M42 85 C52 92 68 92 78 85 C74 97 46 97 42 85 Z"
            fill="#7DBCA0"
            stroke="#5FA485"
            strokeWidth="1.5"
          />
          {/* Hai dải lá rủ xuống */}
          <path
            d="M58 90 C56 102 48 108 48 108 C54 105 63 99 61 90 Z"
            fill="#7DBCA0"
          />

          {/* Hai tay mầm non vẫy chào */}
          {mood === 'celebrate' ? (
            <g>
              {/* Hai tay giơ lên trời reo hò */}
              <path d="M30 65 Q18 50 20 42 Q28 46 32 58" fill="#FFF2F7" stroke="#F5A4BF" strokeWidth="1.8" />
              <path d="M90 65 Q102 50 100 42 Q92 46 88 58" fill="#FFF2F7" stroke="#F5A4BF" strokeWidth="1.8" />
            </g>
          ) : (
            <g>
              {/* Tay vẫy chào vui tính */}
              <path d="M30 68 Q18 64 22 55 Q29 58 32 63" fill="#FFF2F7" stroke="#F5A4BF" strokeWidth="1.8" />
              <path d="M90 68 Q100 75 96 82 Q88 80 88 72" fill="#FFF2F7" stroke="#F5A4BF" strokeWidth="1.8" />
            </g>
          )}

          {/* Đôi chân bé xíu xinh xắn */}
          <ellipse cx="48" cy="98" rx="8" ry="5" fill="#FFD878" stroke="#E6A700" strokeWidth="1.2" />
          <ellipse cx="72" cy="98" rx="8" ry="5" fill="#FFD878" stroke="#E6A700" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
};
