import React from 'react';

interface HoaBanFlowerProps {
  size?: number;
  bloom?: boolean;
  className?: string;
  onClick?: () => void;
  badgeNumber?: number;
}

export const HoaBanFlower: React.FC<HoaBanFlowerProps> = ({
  size = 64,
  bloom = false,
  className = '',
  onClick,
  badgeNumber,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group transition-transform duration-300 hover:scale-110 active:scale-95 ${className}`}
      style={{ width: size, height: size }}
      title="Bông hoa ban Điện Biên 5 cánh"
    >
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-md transition-all duration-500 ${
          bloom ? 'scale-110 filter brightness-105' : ''
        }`}
      >
        {/* Shadow */}
        <ellipse cx="50" cy="88" rx="26" ry="7" fill="rgba(125, 188, 160, 0.25)" />

        {/* 5 Cánh Hoa Ban Điện Biên: 3 cánh trên màu trắng phớt hồng, 2 cánh dưới phớt tím đậm */}
        {/* Cánh 1 (Đỉnh) */}
        <path
          d="M50 48 C42 26 38 8 50 4 C62 8 58 26 50 48 Z"
          fill="url(#petalGradientTop)"
          stroke="#F5A4BF"
          strokeWidth="1.2"
        />
        {/* Cánh 2 (Trên bên phải) */}
        <path
          d="M50 48 C68 34 88 28 92 40 C88 52 70 54 50 48 Z"
          fill="url(#petalGradientRight)"
          stroke="#F5A4BF"
          strokeWidth="1.2"
        />
        {/* Cánh 3 (Dưới bên phải - phớt tím) */}
        <path
          d="M50 48 C70 56 82 76 72 86 C60 88 52 70 50 48 Z"
          fill="url(#petalGradientBottomRight)"
          stroke="#9B7BC0"
          strokeWidth="1.2"
        />
        {/* Cánh 4 (Dưới bên trái - phớt tím) */}
        <path
          d="M50 48 C48 70 40 88 28 86 C18 76 30 56 50 48 Z"
          fill="url(#petalGradientBottomLeft)"
          stroke="#9B7BC0"
          strokeWidth="1.2"
        />
        {/* Cánh 5 (Trên bên trái) */}
        <path
          d="M50 48 C30 54 12 52 8 40 C12 28 32 34 50 48 Z"
          fill="url(#petalGradientLeft)"
          stroke="#F5A4BF"
          strokeWidth="1.2"
        />

        {/* Nhụy hoa vàng óng với các tia nhụy tinh tế */}
        <circle cx="50" cy="48" r="9" fill="#FFD878" stroke="#F5A4BF" strokeWidth="1" />
        <circle cx="50" cy="48" r="4.5" fill="#E6A700" />
        
        {/* Hạt nhụy li ti */}
        <circle cx="48" cy="44" r="1.5" fill="#E67E22" />
        <circle cx="53" cy="45" r="1.5" fill="#E67E22" />
        <circle cx="51" cy="51" r="1.5" fill="#E67E22" />
        <circle cx="46" cy="50" r="1.5" fill="#E67E22" />

        {/* Gradients */}
        <defs>
          <linearGradient id="petalGradientTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF2F7" />
            <stop offset="100%" stopColor="#F5A4BF" />
          </linearGradient>
          <linearGradient id="petalGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FBE1EC" />
            <stop offset="100%" stopColor="#F5A4BF" />
          </linearGradient>
          <linearGradient id="petalGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FBE1EC" />
            <stop offset="100%" stopColor="#F5A4BF" />
          </linearGradient>
          <linearGradient id="petalGradientBottomRight" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FBE1EC" />
            <stop offset="50%" stopColor="#E9D8F4" />
            <stop offset="100%" stopColor="#9B7BC0" />
          </linearGradient>
          <linearGradient id="petalGradientBottomLeft" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBE1EC" />
            <stop offset="50%" stopColor="#E9D8F4" />
            <stop offset="100%" stopColor="#9B7BC0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hiển thị số lượng bông hoa (đối với trò chơi đếm) */}
      {badgeNumber !== undefined && (
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#9B7BC0] text-white text-xs font-bold flex items-center justify-center shadow-md border-2 border-white">
          {badgeNumber}
        </span>
      )}
    </div>
  );
};
