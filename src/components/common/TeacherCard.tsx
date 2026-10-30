import React, { useRef, useState } from 'react';
import { Camera, Heart, Sparkles, School, MapPin } from 'lucide-react';
import { TeacherProfile } from '../../types';
import { storageService } from '../../services/storageService';

interface TeacherCardProps {
  profile: TeacherProfile;
  onProfileUpdate: (updated: TeacherProfile) => void;
  isAdmin?: boolean;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  profile,
  onProfileUpdate,
  isAdmin = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadNote, setShowUploadNote] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Kích thước ảnh nên nhỏ hơn 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        storageService.updateTeacherProfile({
          avatarUrl: base64,
          customUploaded: true,
        });
        onProfileUpdate({
          ...profile,
          avatarUrl: base64,
          customUploaded: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCustomPhoto = () => {
    storageService.updateTeacherProfile({
      avatarUrl: '',
      customUploaded: false,
    });
    onProfileUpdate({
      ...profile,
      avatarUrl: '',
      customUploaded: false,
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border border-[#F5A4BF]/40 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Khung ảnh cô giáo (Ảnh thật tải lên hoặc Minh họa mặc định) */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-[#FBE1EC] ring-offset-2 overflow-hidden shadow-inner bg-gradient-to-br from-[#FFF9F2] to-[#FBE1EC] flex items-center justify-center">
            {profile.customUploaded && profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={`Cô giáo ${profile.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Minh họa chân dung cô giáo mầm non phong cách dịu dàng */
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Nền dịu */}
                <circle cx="50" cy="50" r="50" fill="#FBE1EC" />
                {/* Tóc sau */}
                <path d="M22 45 C20 70 30 90 50 90 C70 90 80 70 78 45 C78 20 65 14 50 14 C35 14 22 20 22 45 Z" fill="#2C3437" />
                {/* Cổ áo dài */}
                <path d="M42 68 L58 68 L64 96 L36 96 Z" fill="#FFF" />
                <path d="M30 78 C38 72 62 72 70 78 L78 100 L22 100 Z" fill="#F5A4BF" />
                {/* Khuôn mặt */}
                <ellipse cx="50" cy="46" rx="20" ry="22" fill="#FDEFE7" />
                {/* Tóc mái */}
                <path d="M30 38 C38 24 62 24 70 38 C64 34 56 33 50 34 C44 33 36 34 30 38 Z" fill="#2C3437" />
                <path d="M28 42 C26 55 28 62 30 65 C32 50 31 44 33 40 Z" fill="#2C3437" />
                <path d="M72 42 C74 55 72 62 70 65 C68 50 69 44 67 40 Z" fill="#2C3437" />
                {/* Hoa ban cài tóc */}
                <circle cx="68" cy="28" r="5" fill="#FFFFFF" />
                <circle cx="68" cy="28" r="2" fill="#FFD878" />
                {/* Mắt dịu dàng */}
                <ellipse cx="43" cy="44" rx="2" ry="2.5" fill="#2C3437" />
                <ellipse cx="57" cy="44" rx="2" ry="2.5" fill="#2C3437" />
                <path d="M40 40 Q43 38 46 40" stroke="#2C3437" strokeWidth="1" fill="none" />
                <path d="M54 40 Q57 38 60 40" stroke="#2C3437" strokeWidth="1" fill="none" />
                {/* Má hồng */}
                <ellipse cx="38" cy="49" rx="3.5" ry="2" fill="#F5A4BF" opacity="0.6" />
                <ellipse cx="62" cy="49" rx="3.5" ry="2" fill="#F5A4BF" opacity="0.6" />
                {/* Nụ cười tươi */}
                <path d="M46 54 Q50 58 54 54" stroke="#D9534F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            )}
          </div>

          {/* Biểu tượng trái tim mầm non */}
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#F5A4BF] text-white flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 fill-white" />
          </div>
        </div>

        {/* Nội dung thông tin giáo viên */}
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9B7BC0] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Giáo Viên Sáng Lập Hoa Ban AI</span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            CÔ GIÁO TRẦN THỊ BÍCH THẢO
          </h2>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs md:text-sm text-slate-600 mt-1">
            <span className="inline-flex items-center gap-1">
              <School className="w-4 h-4 text-[#7DBCA0]" />
              {profile.school}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#F5A4BF]" />
              Xã Thanh Yên, tỉnh Điện Biên
            </span>
          </div>

          {/* Lời chào & Slogan */}
          <p className="mt-2.5 text-sm md:text-base text-slate-700 italic bg-[#FFF9F2] px-3.5 py-2 rounded-xl border border-[#FFD878]/50">
            "Chào mừng các con đến với vườn hoa khám phá! {profile.quote}"
          </p>

          {/* Khu vực quản trị viên: Tải ảnh thật cô giáo */}
          <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FBE1EC] hover:bg-[#F5A4BF] text-slate-800 hover:text-white transition-colors cursor-pointer"
              title="Dành cho cô Thảo tải chân dung thật có bản quyền"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{profile.customUploaded ? 'Đổi ảnh cô giáo' : 'Tải ảnh cô giáo'}</span>
            </button>

            {profile.customUploaded && (
              <button
                onClick={handleRemoveCustomPhoto}
                className="text-xs text-slate-500 hover:text-red-600 underline px-2 py-1"
              >
                Dùng minh họa mặc định
              </button>
            )}

            <button
              onClick={() => setShowUploadNote(!showUploadNote)}
              className="text-xs text-[#9B7BC0] hover:underline"
            >
              (Ghi chú bản quyền)
            </button>
          </div>

          {showUploadNote && (
            <p className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
              * Quy tắc bảo vệ hình ảnh: Chỉ tải chân dung thật do chính cô giáo Trần Thị Bích Thảo cung cấp và có quyền sử dụng. Nếu chưa tải ảnh, hệ thống hiển thị hình minh họa sư phạm mặc định.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
