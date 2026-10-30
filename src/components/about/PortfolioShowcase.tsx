import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, ShieldCheck, Database, QrCode, ExternalLink, Cpu, GitBranch, Globe, Heart } from 'lucide-react';
import { storageService } from '../../services/storageService';

export const PortfolioShowcase: React.FC = () => {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    publishedQuestions: 0,
    lessonPlans: 0,
    observations: 0,
  });

  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const qList = storageService.getQuestions();
    const lList = storageService.getLessonPlans();
    const oList = storageService.getObservations();

    setStats({
      totalQuestions: qList.length,
      publishedQuestions: qList.filter(q => q.status === 'published').length,
      lessonPlans: lList.length,
      observations: oList.length,
    });

    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-8">
      {/* Banner Giới thiệu giải pháp */}
      <div className="bg-gradient-to-r from-[#FFF9F2] via-[#FBE1EC] to-[#9B7BC0]/20 p-6 md:p-8 rounded-3xl border border-[#F5A4BF]/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#9B7BC0] text-xs font-black uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>HỒ SƠ GIẢI PHÁP ỨNG DỤNG AI TRONG GIÁO DỤC 2026</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          HOA BAN AI – MỖI BÉ MỘT HÀNH TRÌNH KHÁM PHÁ, TỰ TIN BƯỚC VÀO LỚP MỘT
        </h1>
        <p className="mt-2 text-sm text-slate-700 italic">
          "Mỗi bông hoa ban có một vẻ đẹp riêng – mỗi em bé có một hành trình trưởng thành riêng."
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 font-semibold">
          <span>👩‍🏫 Tác giả: <strong>Cô Trần Thị Bích Thảo</strong></span>
          <span>·</span>
          <span>🏫 Đơn vị: <strong>Trường Mầm non Thanh Yên, huyện Điện Biên, tỉnh Điện Biên</strong></span>
          <span>·</span>
          <span>🧒 Đối tượng: <strong>Trẻ mẫu giáo nhỡ 4–5 tuổi</strong></span>
        </div>
      </div>

      {/* THỐNG KÊ HỌC LIỆU THỰC TẾ TRONG HỆ THỐNG */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="text-2xl md:text-3xl font-black text-[#9B7BC0]">{stats.totalQuestions}</div>
          <div className="text-xs font-bold text-slate-600 mt-1">Tổng câu hỏi trong kho</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Lưu thực tế trong CSDL</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="text-2xl md:text-3xl font-black text-emerald-600">{stats.publishedQuestions}</div>
          <div className="text-xs font-bold text-slate-600 mt-1">Câu hỏi đã xuất bản</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Đang chạy trong 6 trò chơi</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="text-2xl md:text-3xl font-black text-[#7DBCA0]">{stats.lessonPlans}</div>
          <div className="text-xs font-bold text-slate-600 mt-1">Kế hoạch hoạt động (12 phần)</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Chuẩn BGD&amp;ĐT</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="text-2xl md:text-3xl font-black text-[#F5A4BF]">{stats.observations}</div>
          <div className="text-xs font-bold text-slate-600 mt-1">Phiếu quan sát trẻ</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Dữ liệu minh họa an toàn</div>
        </div>
      </div>

      {/* MA TRẬN MINH CHỨNG VÀ TRẠNG THÁI TRIỂN KHAI */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Ma Trận Chức Năng Đã Hoàn Thiện &amp; Thử Nghiệm Kỹ Thuật</span>
        </h2>

        <div className="space-y-3 text-xs md:text-sm">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-black text-[10px] uppercase shrink-0 mt-0.5">
              ĐÃ HOÀN THIỆN
            </span>
            <div>
              <strong className="text-slate-900 block font-bold">1. Hệ thống âm thanh tiếng Việt chuẩn (vi-VN):</strong>
              <p className="text-slate-700 mt-0.5">
                Tích hợp Web Speech API ưu tiên giọng nữ tiếng Việt nhẹ nhàng, ngắt nghỉ rõ ràng, có phòng thử giọng riêng cho giáo viên điều chỉnh tốc độ, phát hiện giọng đọc và hiệu ứng âm thanh nhạc chuông Web Audio API không phụ thuộc file mạng.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-black text-[10px] uppercase shrink-0 mt-0.5">
              ĐÃ HOÀN THIỆN
            </span>
            <div>
              <strong className="text-slate-900 block font-bold">2. Vườn 6 trò chơi tương tác mầm non:</strong>
              <p className="text-slate-700 mt-0.5">
                Vườn hoa đếm số 1–5 (mở rộng 7); Ngôi nhà hình học; Tai tin - Mắt sáng; Bé chọn điều hay (kỹ năng sống); Chuyện kể cùng Ban Ban; Hành trang tự lập cho bé 4–5 tuổi. Toàn bộ câu hỏi được tải động từ ngân hàng đã duyệt, hỗ trợ chạm cảm ứng trực tiếp trên máy tính bảng và màn hình tương tác.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-black text-[10px] uppercase shrink-0 mt-0.5">
              ĐÃ HOÀN THIỆN
            </span>
            <div>
              <strong className="text-slate-900 block font-bold">3. Xưởng sáng tạo học liệu AI &amp; Tạo hàng loạt 10/20/50/100 câu:</strong>
              <p className="text-slate-700 mt-0.5">
                Kết nối Gemini 3.8 Flash phía máy chủ (Server-side proxy bảo mật API key), cơ chế chia nhỏ lô (batching) kèm thanh tiến trình thực tế, xác thực Zod Schema, chống trùng lặp câu hỏi, cho phép giáo viên chỉnh sửa, duyệt và xuất bản thẳng vào trò chơi không cần viết lại mã nguồn.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-black text-[10px] uppercase shrink-0 mt-0.5">
              THỬ NGHIỆM KỸ THUẬT
            </span>
            <div>
              <strong className="text-slate-900 block font-bold">4. Trợ lý AI Soạn Kế hoạch hoạt động 12 phần:</strong>
              <p className="text-slate-700 mt-0.5">
                Tự động sinh giáo án 12 phần đầy đủ theo phương pháp giáo dục lấy trẻ làm trung tâm, phân hóa 3 mức độ hỗ trợ trẻ, hỗ trợ xuất văn bản, sao chép và in ấn thuận tiện.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-md bg-slate-600 text-white font-black text-[10px] uppercase shrink-0 mt-0.5">
              DỰ KIẾN TRIỂN KHAI
            </span>
            <div>
              <strong className="text-slate-900 block font-bold">5. Đồng bộ đám mây Cloud Firestore đa thiết bị:</strong>
              <p className="text-slate-700 mt-0.5">
                Hiện tại dữ liệu được lưu trữ liên tục và bảo toàn trên trình duyệt giáo viên (IndexedDB / LocalStorage). Sẵn sàng đồng bộ hóa thời gian thực lên Cloud Firestore khi tài khoản Firebase của trường được kích hoạt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MÃ QR VÀ HƯỚNG DẪN TRIỂN KHAI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9B7BC0] uppercase tracking-wider mb-2">
              <QrCode className="w-4 h-4" />
              <span>MÃ QR TRUY CẬP ỨNG DỤNG</span>
            </div>
            <h3 className="font-black text-slate-900 text-base">
              Quét Mã Để Trải Nghiệm Trên Điện Thoại &amp; Máy Tính Bảng
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Phụ huynh và đồng nghiệp có thể quét để vào vườn trò chơi mầm non Thanh Yên.
            </p>
          </div>

          {/* QR Code SVG Image */}
          <div className="my-5 p-3 bg-white border-2 border-[#F5A4BF] rounded-2xl shadow-sm">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(currentUrl || 'https://ais-dev.run.app')}`}
              alt="Mã QR Hoa Ban AI 2026"
              className="w-36 h-36 object-contain"
            />
          </div>

          <div className="text-[11px] text-slate-400 break-all">
            URL: {currentUrl}
          </div>
        </div>

        {/* Hướng dẫn triển khai Vercel & GitHub */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7DBCA0] uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>TRIỂN KHAI VERCEL &amp; CẬP NHẬT ỨNG DỤNG</span>
          </div>

          <h3 className="font-black text-slate-900 text-base">
            Quy Trình Triển Khai 2026
          </h3>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <strong>1. Cập nhật học liệu thường xuyên:</strong> Cô Thảo chỉ cần mở dashboard, tạo/duyệt câu hỏi mới. Dữ liệu lập tức hiển thị trong game cho học sinh mà <span className="text-emerald-700 font-bold">không cần deploy lại mã nguồn</span>.
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl">
              <strong>2. Triển khai mã nguồn lên Vercel:</strong>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
                <li>Đẩy toàn bộ mã nguồn lên kho lưu trữ GitHub của trường.</li>
                <li>Kết nối repository vào Vercel (chọn framework Vite/Node.js).</li>
                <li>Cấu hình biến môi trường <code>GEMINI_API_KEY</code> trong mục Environment Variables.</li>
                <li>Nhấn Deploy để có tên miền chính thức của trường mầm non.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
