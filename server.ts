import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Google GenAI initialization with required User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiConfigured: hasKey,
    app: 'Hoa Ban AI 2026',
    teacher: 'Cô Trần Thị Bích Thảo',
    school: 'Trường Mầm non Thanh Yên - Điện Biên',
  });
});

// Bulk AI Content Generation Endpoint
app.post('/api/gemini/generate', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng thêm khóa trong Settings > Secrets.',
      });
    }

    const {
      type, // 'questions' | 'lesson_plan' | 'story' | 'poem'
      topic = 'Quê hương Điện Biên',
      gameType = 'counting',
      supportLevel = 'basic',
      count = 5,
      customPrompt = '',
      lessonDetails = null,
    } = req.body;

    // 1. GENERATE BULK QUESTIONS
    if (type === 'questions') {
      const targetCount = Math.min(Math.max(Number(count) || 5, 1), 50); // safe batch limit per API request

      const systemInstruction = `Bạn là chuyên gia giáo dục mầm non Việt Nam cao cấp và trợ lý ảo của Cô giáo Trần Thị Bích Thảo, Trường Mầm non Thanh Yên, Điện Biên.
Nhiệm vụ: Tạo ${targetCount} câu hỏi giáo dục tương tác cho trẻ mẫu giáo nhỡ 4-5 tuổi (phát triển nhận thức, ngôn ngữ, kỹ năng sống và tâm thế hào hứng).
Chủ đề: "${topic}".
Loại trò chơi: "${gameType}" (counting: đếm số trong phạm vi 1-5 hoặc 1-7 phù hợp độ tuổi 4-5; shapes: nhận biết hình tròn, vuông, tam giác, chữ nhật; listening: nghe nhận biết đồ vật/con vật quen thuộc; behavior: chọn hành vi đẹp, thói quen tốt; grade1_prep: làm quen thói quen tự lập, nhận biết đồ dùng học tập).
Mức hỗ trợ: "${supportLevel}" (support: có gợi ý đơn giản; basic: tiêu chuẩn lứa tuổi 4-5; challenge: mở rộng tư duy nhẹ nhàng).
YÊU CẦU BẮT BUỘC:
- 100% tiếng Việt chuẩn có dấu, ngữ điệu dịu dàng, trong sáng, câu từ ngắn gọn, khích lệ trẻ 4-5 tuổi.
- Câu hỏi ngắn gọn, trực quan, gần gũi với trẻ 4-5 tuổi.
- 'speechText' là câu văn tự nhiên dùng để phát âm thanh tiếng Việt (ví dụ: "Bé ơi, con hãy đếm xem có bao nhiêu bông hoa ban nở nhé!").
- 'options' gồm 3 lựa chọn ngắn gọn, có hình ảnh hoặc biểu tượng trực quan.
- 'correctAnswer' phải trùng khớp với 1 trong các lựa chọn.
- 'explanation' giải thích ngắn gọn, dịu dàng, dễ thương khi trẻ làm đúng hoặc cần thử lại.
- Trả về đúng JSON Schema đã quy định.`;

      const prompt = `Hãy tạo ${targetCount} câu hỏi độc đáo, không trùng lặp cho chủ đề "${topic}" dành cho trẻ mẫu giáo nhỡ 4-5 tuổi. ${customPrompt ? `Ghi chú thêm của giáo viên: ${customPrompt}` : ''}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: 'Danh sách các câu hỏi mầm non',
            items: {
              type: Type.OBJECT,
              properties: {
                questionText: { type: Type.STRING, description: 'Nội dung câu hỏi hiển thị' },
                speechText: { type: Type.STRING, description: 'Văn bản đọc tiếng Việt cho trẻ nghe' },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      text: { type: Type.STRING },
                      isCorrect: { type: Type.BOOLEAN },
                      iconOrVisual: { type: Type.STRING, description: 'Tên biểu tượng hoặc gợi ý hình (ví dụ: flower, cat, circle, sun, apple)' },
                    },
                    required: ['id', 'text', 'isCorrect'],
                  },
                },
                correctAnswer: { type: Type.STRING, description: 'Nội dung đáp án đúng' },
                explanation: { type: Type.STRING, description: 'Lời khen hoặc giải thích dịu dàng' },
                supportLevel: { type: Type.STRING, description: 'support | basic | challenge' },
                visualCount: { type: Type.INTEGER, description: 'Số lượng vật thể nếu là trò chơi đếm (1-10)' },
              },
              required: ['questionText', 'speechText', 'options', 'correctAnswer', 'explanation'],
            },
          },
        },
      });

      const text = response.text || '[]';
      const parsed = JSON.parse(text);
      return res.json({ success: true, count: parsed.length, data: parsed });
    }

    // 2. GENERATE LESSON PLAN (KẾ HOẠCH HOẠT ĐỘNG GIÁO DỤC 12 PHẦN)
    if (type === 'lesson_plan') {
      const details = lessonDetails || {};
      const systemInstruction = `Bạn là chuyên gia sư phạm mầm non Việt Nam và Trợ lý AI của Cô giáo Trần Thị Bích Thảo (Trường Mầm non Thanh Yên, huyện Điện Biên).
Nhiệm vụ: Soạn giáo án / kế hoạch hoạt động giáo dục mầm non chuẩn cho trẻ mẫu giáo nhỡ 4-5 tuổi theo phương pháp giáo dục lấy trẻ làm trung tâm, học qua chơi.
Kế hoạch phải bao gồm đủ 12 phần chuẩn mực của Bộ Giáo dục & Đào tạo Việt Nam:
1. Tên hoạt động & Đề tài
2. Mục tiêu (Kiến thức, Kỹ năng, Thái độ phù hợp lứa tuổi 4-5 tuổi)
3. Chuẩn bị (Đồ dùng của cô, Đồ dùng của trẻ, Địa điểm)
4. Hoạt động gây hứng thú (3-5 phút)
5. Hoạt động trọng tâm (Khám phá / Trải nghiệm chính)
6. Trò chơi củng cố (Tương tác trên Hoa Ban AI hoặc trò chơi dân gian)
7. Hệ thống câu hỏi gợi mở phát triển tư duy
8. Hoạt động ngoài màn hình (Vận động, tạo hình, trải nghiệm thực tế)
9. Điều chỉnh theo 3 mức độ hỗ trợ (Trẻ cần hỗ trợ, Trẻ đạt chuẩn, Trẻ phát triển nhanh)
10. Phương pháp quan sát và đánh giá trẻ
11. Lưu ý an toàn và vệ sinh
12. Kết thúc và chuyển tiếp`;

      const prompt = `Soạn kế hoạch chi tiết cho:
- Chủ đề: ${topic}
- Đề tài: ${details.title || 'Khám phá hoa ban Điện Biên'}
- Lĩnh vực phát triển: ${details.domain || 'Phát triển nhận thức'}
- Độ tuổi: 4 - 5 tuổi (Lớp mẫu giáo nhỡ)
- Thời lượng: ${details.duration || '25 - 30 phút'}
- Điều kiện & Đồ dùng sẵn có: ${details.supplies || 'Đồ dùng mầm non, máy tính bảng/màn hình tương tác Hoa Ban AI, hoa ban giấy, bảng số'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              domain: { type: Type.STRING },
              ageGroup: { type: Type.STRING },
              duration: { type: Type.STRING },
              objectives: {
                type: Type.OBJECT,
                properties: {
                  knowledge: { type: Type.STRING },
                  skills: { type: Type.STRING },
                  attitude: { type: Type.STRING },
                },
                required: ['knowledge', 'skills', 'attitude'],
              },
              preparation: {
                type: Type.OBJECT,
                properties: {
                  teacher: { type: Type.STRING },
                  children: { type: Type.STRING },
                  space: { type: Type.STRING },
                },
                required: ['teacher', 'children', 'space'],
              },
              introduction: { type: Type.STRING },
              coreActivity: { type: Type.STRING },
              reinforcementGame: { type: Type.STRING },
              guidingQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              offlineActivity: { type: Type.STRING },
              differentiatedSupport: {
                type: Type.OBJECT,
                properties: {
                  supportNeeded: { type: Type.STRING },
                  standard: { type: Type.STRING },
                  advanced: { type: Type.STRING },
                },
                required: ['supportNeeded', 'standard', 'advanced'],
              },
              observationCriteria: { type: Type.STRING },
              safetyNotes: { type: Type.STRING },
              wrapUp: { type: Type.STRING },
            },
            required: [
              'title',
              'domain',
              'objectives',
              'preparation',
              'introduction',
              'coreActivity',
              'reinforcementGame',
              'guidingQuestions',
              'offlineActivity',
              'differentiatedSupport',
              'observationCriteria',
              'safetyNotes',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed });
    }

    // 3. GENERATE STORY / POEM FOR BAN BAN
    if (type === 'story' || type === 'poem') {
      const systemInstruction = `Bạn là tác giả văn học thiếu nhi Việt Nam và trợ lý của Cô giáo Trần Thị Bích Thảo.
Hãy sáng tác một ${type === 'story' ? 'câu chuyện tranh ngắn 4-5 phân đoạn' : 'bài thơ 4-5 khổ 4 chữ dễ nhớ'} cho trẻ mẫu giáo nhỡ 4-5 tuổi.
Nhân vật chính: Bé hoa ban tên "Ban Ban" vui vẻ, thông minh.
Bối cảnh: Trường Mầm non Thanh Yên, cánh đồng thung lũng Mường Thanh hoặc núi đồi hoa ban Điện Biên.
Thông điệp: Yêu thiên nhiên quê hương, gắn kết bạn bè, chăm ngoan vâng lời cô giáo và ba mẹ.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Sáng tác ${type === 'story' ? 'truyện ngắn' : 'thơ mầm non'} về chủ đề "${topic}".`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              moralLesson: { type: Type.STRING },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    order: { type: Type.INTEGER },
                    content: { type: Type.STRING },
                    speechNarration: { type: Type.STRING },
                    illustrationIdea: { type: Type.STRING },
                    comprehensionQuestion: { type: Type.STRING },
                  },
                  required: ['order', 'content', 'speechNarration'],
                },
              },
            },
            required: ['title', 'summary', 'moralLesson', 'sections'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed });
    }

    return res.status(400).json({ error: 'Loại yêu cầu không hợp lệ' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: error?.message || 'Lỗi xử lý khi gọi Gemini AI',
      code: error?.status || 500,
    });
  }
});

// Text-to-speech status and guidance endpoint
app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Thiếu nội dung văn bản' });
  }

  // Vietnamese voice guidance and metadata
  res.json({
    status: 'ready',
    engine: 'vietnamese-preschool-tts',
    lang: 'vi-VN',
    rate: 0.95,
    pitch: 1.05,
    text,
    message: 'Sử dụng hệ thống giọng nói tiếng Việt chuẩn vi-VN kết hợp Web Speech API và cache học liệu.',
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const port = Number(PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`🌸 HOA BAN AI 2026 đang chạy tại: http://localhost:${port}`);
    console.log(`👩‍🏫 Giáo viên: Trần Thị Bích Thảo - Trường MN Thanh Yên, Điện Biên`);
  });
}

startServer();
