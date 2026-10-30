import React, { useState, useEffect } from 'react';
import { Volume2, Play, Square, Sparkles, CheckCircle2, Sliders, Mic } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const VoiceStudio: React.FC = () => {
  const [customText, setCustomText] = useState('Xin chào các con! Chúng mình cùng khám phá Vườn Hoa Ban Điện Biên nhé!');
  const [rate, setRate] = useState(audioService.getRate());
  const [volume, setVolume] = useState(audioService.getVolume());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasViVoice, setHasViVoice] = useState(false);
  const [voiceName, setVoiceName] = useState('Đang tìm...');

  useEffect(() => {
    const unsub = audioService.subscribeSpeakingState(setIsSpeaking);
    const vi = audioService.hasVietnameseVoice();
    setHasViVoice(vi);
    const current = audioService.getCurrentVoice();
    if (current) {
      setVoiceName(`${current.name} (${current.lang})`);
    } else {
      setVoiceName(vi ? 'Giọng tiếng Việt mặc định của hệ thống' : 'Sử dụng công nghệ tổng hợp giọng nói vi-VN chuẩn');
    }
    return () => unsub();
  }, []);

  const samplePhrases = [
    { label: 'Lời chào đầu giờ', text: 'Xin chào các con! Chúng mình cùng khám phá Vườn Hoa Ban nhé!' },
    { label: 'Câu hỏi đếm số', text: 'Con hãy đếm số bông hoa ban đang nở trên màn hình nào!' },
    { label: 'Câu hỏi hình học', text: 'Con hãy chọn hình tròn giống ông mặt trời tỏa nắng nhé!' },
    { label: 'Lời khen bé giỏi', text: 'Con giỏi lắm! Cô khen con, bạn nhỏ thật là thông minh!' },
    { label: 'Lời động viên', text: 'Chưa đúng rồi, chúng mình cùng thử lại nhé, bé cố lên nào!' },
    { label: 'Chúc mừng chiến thắng', text: 'Chúc mừng con đã xuất sắc hoàn thành trò chơi!' },
  ];

  const handleSpeak = (text: string) => {
    audioService.setRate(rate);
    audioService.setVolume(volume);
    audioService.speak(text);
  };

  const handleStop = () => {
    audioService.stop();
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FFF9F2] via-[#FBE1EC] to-[#9B7BC0]/20 p-6 md:p-8 rounded-3xl border border-[#F5A4BF]/40 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#9B7BC0] text-xs font-black uppercase tracking-wider mb-2">
          <Mic className="w-3.5 h-3.5" />
          <span>PHÒNG THỬ GIỌNG TIẾNG VIỆT (VI-VN)</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Kiểm Tra &amp; Tinh Chỉnh Giọng Đọc Sư Phạm
        </h1>
        <p className="mt-2 text-sm text-slate-700 max-w-xl">
          Nơi cô giáo Trần Thị Bích Thảo nghe thử các câu lệnh mầm non, điều chỉnh tốc độ đọc chậm rãi, dịu dàng, tự nhiên phù hợp với tâm lý trẻ 5–6 tuổi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Bảng điều khiển tốc độ & âm lượng */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="font-black text-slate-900 text-base flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#9B7BC0]" />
            <span>Thông Số Giọng Đọc</span>
          </h2>

          <div className="p-3 bg-[#FFF9F2] rounded-2xl border border-[#F5A4BF]/30 text-xs text-slate-700">
            <div className="font-bold text-[#9B7BC0] mb-0.5">Giọng đọc hiện tại:</div>
            <div className="font-semibold truncate">{voiceName}</div>
            <div className="text-[11px] text-slate-500 mt-1">Ngôn ngữ: Tiếng Việt (vi-VN) chuẩn ngữ điệu</div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Tốc độ đọc (Rate):</span>
              <span className="text-[#9B7BC0] font-black">{Math.round(rate * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.05"
              value={rate}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setRate(val);
                audioService.setRate(val);
              }}
              className="w-full accent-[#9B7BC0]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Chậm (Mầm non)</span>
              <span>Bình thường</span>
              <span>Nhanh</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Âm lượng (Volume):</span>
              <span className="text-[#9B7BC0] font-black">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                audioService.setVolume(val);
              }}
              className="w-full accent-[#9B7BC0]"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            {isSpeaking ? (
              <button
                onClick={handleStop}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Dừng phát âm thanh</span>
              </button>
            ) : (
              <div className="w-full py-2 text-center text-xs text-slate-400 italic">
                Sẵn sàng phát âm thanh
              </div>
            )}
          </div>
        </div>

        {/* Khung nghe thử mẫu & nhập văn bản tùy ý */}
        <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="font-black text-slate-900 text-base">
            Mẫu Câu Chuẩn Sư Phạm Mầm Non
          </h2>

          <div className="grid grid-cols-1 gap-2.5">
            {samplePhrases.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl border border-slate-200 hover:border-[#9B7BC0]/40 transition-colors bg-[#FFF9F2]/30 flex items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <span className="text-[10px] font-black text-[#9B7BC0] uppercase tracking-wider block">
                    {item.label}
                  </span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">
                    "{item.text}"
                  </p>
                </div>

                <button
                  onClick={() => handleSpeak(item.text)}
                  className="px-3 py-1.5 rounded-xl bg-[#FBE1EC] hover:bg-[#F5A4BF] text-[#9B7BC0] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                  title="Nghe thử"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe</span>
                </button>
              </div>
            ))}
          </div>

          {/* Nhập câu tùy ý của cô giáo */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Nhập câu văn bản cô Thảo muốn nghe thử:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs md:text-sm font-semibold"
                placeholder="Nhập câu tiếng Việt có dấu..."
              />
              <button
                onClick={() => handleSpeak(customText)}
                className="px-4 py-2.5 bg-[#9B7BC0] hover:bg-[#8565AA] text-white font-black text-xs rounded-xl shadow shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Phát</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
