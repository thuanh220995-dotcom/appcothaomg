import { Question, LessonPlan, Story, ObservationRecord, TeacherProfile } from '../types';

export const INITIAL_TEACHER_PROFILE: TeacherProfile = {
  name: 'Trần Thị Bích Thảo',
  school: 'Trường Mầm non Thanh Yên',
  location: 'Xã Thanh Yên, huyện Điện Biên, tỉnh Điện Biên',
  quote: 'Mỗi bông hoa ban có một vẻ đẹp riêng – mỗi em bé có một hành trình trưởng thành riêng.',
  avatarUrl: '', // Default illustrated portrait will render if empty
  customUploaded: false,
};

// 1. NGÂN HÀNG HỌC LIỆU MẪU BAN ĐẦU (SEED DATA)
export const SEED_QUESTIONS: Question[] = [
  // --- TRÒ CHƠI 1: VƯỜN HOA ĐẾM SỐ (10 câu) ---
  {
    id: 'count-01',
    topic: 'Quê hương Điện Biên',
    gameType: 'counting',
    visualCount: 3,
    questionText: 'Bé ơi, có bao nhiêu bông hoa ban trắng đang nở trên cành?',
    speechText: 'Bé ơi, có bao nhiêu bông hoa ban trắng đang nở trên cành? Con hãy đếm và chọn số nhé!',
    options: [
      { id: 'c1-1', text: '2 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c1-2', text: '3 bông hoa', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c1-3', text: '5 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '3 bông hoa',
    explanation: 'Con giỏi lắm! Đúng là có 3 bông hoa ban trắng xinh xắn.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T08:00:00.000Z',
    updatedAt: '2026-10-20T08:00:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-02',
    topic: 'Thế giới thực vật',
    gameType: 'counting',
    visualCount: 5,
    questionText: 'Con hãy đếm xem trong giỏ có mấy bông hoa màu hồng?',
    speechText: 'Con hãy đếm xem trong giỏ có mấy bông hoa màu hồng nào?',
    options: [
      { id: 'c2-1', text: '4 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c2-2', text: '5 bông hoa', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c2-3', text: '6 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '5 bông hoa',
    explanation: 'Chính xác! 5 bông hoa tương ứng với 5 ngón tay trên một bàn tay của bé đấy!',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T08:05:00.000Z',
    updatedAt: '2026-10-20T08:05:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-03',
    topic: 'Bản thân',
    gameType: 'counting',
    visualCount: 2,
    questionText: 'Bé hãy đếm xem chú bướm đang bay quanh mấy bông hoa?',
    speechText: 'Bé hãy đếm xem chú bướm đang bay quanh mấy bông hoa nhé!',
    options: [
      { id: 'c3-1', text: '1 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c3-2', text: '2 bông hoa', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c3-3', text: '3 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '2 bông hoa',
    explanation: 'Bé đếm rất tinh mắt! Có đúng 2 bông hoa ban.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T08:10:00.000Z',
    updatedAt: '2026-10-20T08:10:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-04',
    topic: 'Trường mầm non',
    gameType: 'counting',
    visualCount: 6,
    questionText: 'Các bạn nhỏ lớp bé Thảo trồng được mấy cây hoa?',
    speechText: 'Các bạn nhỏ lớp mầm non trồng được mấy cây hoa ban, con đếm cùng cô nhé!',
    options: [
      { id: 'c4-1', text: '5 cây', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c4-2', text: '6 cây', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c4-3', text: '7 cây', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '6 cây',
    explanation: 'Tuyệt vời! 1, 2, 3, 4, 5, 6 cây hoa ban tươi thắm.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T08:15:00.000Z',
    updatedAt: '2026-10-20T08:15:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-05',
    topic: 'Quê hương Điện Biên',
    gameType: 'counting',
    visualCount: 4,
    questionText: 'Con đếm xem có mấy cánh hoa ban nở sớm?',
    speechText: 'Con đếm xem có mấy bông hoa ban đang khoe sắc đón mặt trời nào!',
    options: [
      { id: 'c5-1', text: '3 bông', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c5-2', text: '4 bông', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c5-3', text: '5 bông', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '4 bông',
    explanation: 'Bé giỏi quá! Có đúng 4 bông hoa ban trắng muốt.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T08:20:00.000Z',
    updatedAt: '2026-10-20T08:20:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-06',
    topic: 'Thế giới động vật',
    gameType: 'counting',
    visualCount: 7,
    questionText: 'Có bao nhiêu nụ hoa ban sắp nở đón đàn ong ghé thăm?',
    speechText: 'Có bao nhiêu nụ hoa ban sắp hé nở, bé thử đếm xem nhé!',
    options: [
      { id: 'c6-1', text: '6 nụ hoa', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c6-2', text: '7 nụ hoa', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c6-3', text: '8 nụ hoa', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '7 nụ hoa',
    explanation: 'Rất thông minh! 7 nụ hoa ban xinh đẹp.',
    supportLevel: 'challenge',
    status: 'published',
    createdAt: '2026-10-20T08:25:00.000Z',
    updatedAt: '2026-10-20T08:25:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-07',
    topic: 'Quê hương Điện Biên',
    gameType: 'counting',
    visualCount: 1,
    questionText: 'Bé thấy có mấy bông hoa ban nở đầu tiên trên đỉnh đồi?',
    speechText: 'Bé hãy nhìn xem có mấy bông hoa ban đầu mùa đang tỏa hương thơm?',
    options: [
      { id: 'c7-1', text: '1 bông hoa', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c7-2', text: '2 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c7-3', text: '3 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '1 bông hoa',
    explanation: 'Đúng rồi! Số 1 tượng trưng cho một bông hoa ban tiên phong.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T08:30:00.000Z',
    updatedAt: '2026-10-20T08:30:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-08',
    topic: 'Trường mầm non',
    gameType: 'counting',
    visualCount: 8,
    questionText: 'Cô Thảo và các bé hái được bao nhiêu cánh hoa để làm tranh dán?',
    speechText: 'Chúng mình cùng đếm xem có bao nhiêu bông hoa ban trên bàn nào!',
    options: [
      { id: 'c8-1', text: '7 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c8-2', text: '8 bông hoa', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c8-3', text: '9 bông hoa', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '8 bông hoa',
    explanation: 'Con đếm rất cẩn thận! Đúng 8 bông hoa rồi.',
    supportLevel: 'challenge',
    status: 'published',
    createdAt: '2026-10-20T08:35:00.000Z',
    updatedAt: '2026-10-20T08:35:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-09',
    topic: 'Thế giới thực vật',
    gameType: 'counting',
    visualCount: 9,
    questionText: 'Bé đếm xem có bao nhiêu chiếc lá non xanh bên cạnh hoa ban?',
    speechText: 'Hãy đếm xem có mấy bông hoa ban đang xòe cánh tươi vui nhé!',
    options: [
      { id: 'c9-1', text: '8 bông', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c9-2', text: '9 bông', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c9-3', text: '10 bông', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '9 bông',
    explanation: 'Giỏi quá! 9 bông hoa ban thật rực rỡ.',
    supportLevel: 'challenge',
    status: 'published',
    createdAt: '2026-10-20T08:40:00.000Z',
    updatedAt: '2026-10-20T08:40:00.000Z',
    source: 'seed',
  },
  {
    id: 'count-10',
    topic: 'Chuẩn bị vào lớp Một',
    gameType: 'counting',
    visualCount: 10,
    questionText: 'Khu vườn mầm non có đủ 10 bông hoa ban rực rỡ, con hãy chọn số 10 nhé!',
    speechText: 'Khu vườn mầm non Thanh Yên có bao nhiêu bông hoa ban, bé hãy đếm hết nào!',
    options: [
      { id: 'c10-1', text: '9 bông', isCorrect: false, iconOrVisual: 'flower' },
      { id: 'c10-2', text: '10 bông', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'c10-3', text: '8 bông', isCorrect: false, iconOrVisual: 'flower' },
    ],
    correctAnswer: '10 bông',
    explanation: 'Hoan hô bé! 10 bông hoa ban trọn vẹn, bé tự tin đếm tới 10 rồi!',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T08:45:00.000Z',
    updatedAt: '2026-10-20T08:45:00.000Z',
    source: 'seed',
  },

  // --- TRÒ CHƠI 2: NGÔI NHÀ HÌNH HỌC (10 câu) ---
  {
    id: 'shape-01',
    topic: 'Bé làm quen toán',
    gameType: 'shapes',
    shapeType: 'circle',
    questionText: 'Con hãy tìm xem đâu là Hình Tròn giống ông mặt trời tỏa nắng?',
    speechText: 'Con hãy tìm xem đâu là Hình Tròn giống ông mặt trời tỏa nắng nhé!',
    options: [
      { id: 's1-1', text: 'Hình Tròn', isCorrect: true, iconOrVisual: 'circle' },
      { id: 's1-2', text: 'Hình Vuông', isCorrect: false, iconOrVisual: 'square' },
      { id: 's1-3', text: 'Hình Tam Giác', isCorrect: false, iconOrVisual: 'triangle' },
    ],
    correctAnswer: 'Hình Tròn',
    explanation: 'Đúng rồi! Hình tròn có đường viền cong khép kín, lăn được bon bon!',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T09:00:00.000Z',
    updatedAt: '2026-10-20T09:00:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-02',
    topic: 'Quê hương Điện Biên',
    gameType: 'shapes',
    shapeType: 'square',
    questionText: 'Chiếc bánh chưng xanh ngày Tết Điện Biên có dạng hình gì hả con?',
    speechText: 'Chiếc bánh chưng xanh thơm dẻo ngày Tết quê hương có dạng hình gì?',
    options: [
      { id: 's2-1', text: 'Hình Tròn', isCorrect: false, iconOrVisual: 'circle' },
      { id: 's2-2', text: 'Hình Vuông', isCorrect: true, iconOrVisual: 'square' },
      { id: 's2-3', text: 'Hình Chữ Nhật', isCorrect: false, iconOrVisual: 'rectangle' },
    ],
    correctAnswer: 'Hình Vuông',
    explanation: 'Chính xác! Bánh chưng vuông có 4 cạnh bằng nhau và 4 góc vuông vức.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T09:05:00.000Z',
    updatedAt: '2026-10-20T09:05:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-03',
    topic: 'Quê hương Điện Biên',
    gameType: 'shapes',
    shapeType: 'triangle',
    questionText: 'Mái nhà sàn của đồng bào Tây Bắc có dạng hình gì vậy bé?',
    speechText: 'Mái nhà sàn vững chãi trên bản làng có dạng hình gì vậy bé ơi?',
    options: [
      { id: 's3-1', text: 'Hình Tam Giác', isCorrect: true, iconOrVisual: 'triangle' },
      { id: 's3-2', text: 'Hình Vuông', isCorrect: false, iconOrVisual: 'square' },
      { id: 's3-3', text: 'Hình Tròn', isCorrect: false, iconOrVisual: 'circle' },
    ],
    correctAnswer: 'Hình Tam Giác',
    explanation: 'Cô khen con! Mái nhà sàn có 3 cạnh tạo thành hình tam giác che mưa nắng rất tốt.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T09:10:00.000Z',
    updatedAt: '2026-10-20T09:10:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-04',
    topic: 'Trường mầm non',
    gameType: 'shapes',
    shapeType: 'rectangle',
    questionText: 'Chiếc bảng lớp học mầm non Thanh Yên có dạng hình gì?',
    speechText: 'Chiếc bảng đen lớp học của cô giáo có dạng hình gì nào con?',
    options: [
      { id: 's4-1', text: 'Hình Tròn', isCorrect: false, iconOrVisual: 'circle' },
      { id: 's4-2', text: 'Hình Chữ Nhật', isCorrect: true, iconOrVisual: 'rectangle' },
      { id: 's4-3', text: 'Hình Vuông', isCorrect: false, iconOrVisual: 'square' },
    ],
    correctAnswer: 'Hình Chữ Nhật',
    explanation: 'Bé nhận biết rất giỏi! Bảng lớp có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T09:15:00.000Z',
    updatedAt: '2026-10-20T09:15:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-05',
    topic: 'Thế giới đồ vật',
    gameType: 'shapes',
    shapeType: 'circle',
    questionText: 'Chiếc đồng hồ treo tường lớp học chạy tích tắc là hình gì?',
    speechText: 'Chiếc đồng hồ tròn xinh chạy tích tắc là hình gì hả bé?',
    options: [
      { id: 's5-1', text: 'Hình Tròn', isCorrect: true, iconOrVisual: 'circle' },
      { id: 's5-2', text: 'Hình Tam Giác', isCorrect: false, iconOrVisual: 'triangle' },
      { id: 's5-3', text: 'Hình Chữ Nhật', isCorrect: false, iconOrVisual: 'rectangle' },
    ],
    correctAnswer: 'Hình Tròn',
    explanation: 'Hoan hô bé! Mặt đồng hồ tròn xoe như mặt trăng rằm.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T09:20:00.000Z',
    updatedAt: '2026-10-20T09:20:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-06',
    topic: 'Chuẩn bị vào lớp Một',
    gameType: 'shapes',
    shapeType: 'rectangle',
    questionText: 'Quyển vở ô ly tập viết lớp 1 của bé có dạng hình gì?',
    speechText: 'Quyển vở ô ly bé chuẩn bị viết chữ vào lớp Một là hình gì?',
    options: [
      { id: 's6-1', text: 'Hình Chữ Nhật', isCorrect: true, iconOrVisual: 'rectangle' },
      { id: 's6-2', text: 'Hình Tròn', isCorrect: false, iconOrVisual: 'circle' },
      { id: 's6-3', text: 'Hình Tam Giác', isCorrect: false, iconOrVisual: 'triangle' },
    ],
    correctAnswer: 'Hình Chữ Nhật',
    explanation: 'Tuyệt vời! Quyển vở chữ nhật ngay ngắn chờ bé nắn nót từng nét chữ.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T09:25:00.000Z',
    updatedAt: '2026-10-20T09:25:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-07',
    topic: 'Giao thông',
    gameType: 'shapes',
    shapeType: 'triangle',
    questionText: 'Biển báo giao thông hình tam giác viền đỏ dùng để làm gì?',
    speechText: 'Biển báo giao thông có hình tam giác, bé chọn đúng hình tam giác nhé!',
    options: [
      { id: 's7-1', text: 'Hình Vuông', isCorrect: false, iconOrVisual: 'square' },
      { id: 's7-2', text: 'Hình Tam Giác', isCorrect: true, iconOrVisual: 'triangle' },
      { id: 's7-3', text: 'Hình Tròn', isCorrect: false, iconOrVisual: 'circle' },
    ],
    correctAnswer: 'Hình Tam Giác',
    explanation: 'Đúng rồi! Biển tam giác nhắc nhở bé và bố mẹ đi đường cẩn thận.',
    supportLevel: 'challenge',
    status: 'published',
    createdAt: '2026-10-20T09:30:00.000Z',
    updatedAt: '2026-10-20T09:30:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-08',
    topic: 'Đồ dùng đồ chơi',
    gameType: 'shapes',
    shapeType: 'square',
    questionText: 'Hộp quà sinh nhật cô giáo tặng bé là hình khối gì có mặt vuông?',
    speechText: 'Chiếc hộp quà xinh xắn có mặt hình vuông, bé hãy chọn hình vuông nào!',
    options: [
      { id: 's8-1', text: 'Hình Vuông', isCorrect: true, iconOrVisual: 'square' },
      { id: 's8-2', text: 'Hình Tròn', isCorrect: false, iconOrVisual: 'circle' },
      { id: 's8-3', text: 'Hình Tam Giác', isCorrect: false, iconOrVisual: 'triangle' },
    ],
    correctAnswer: 'Hình Vuông',
    explanation: 'Rất thông minh! 4 cạnh bằng nhau tạo thành hình vuông xinh đẹp.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T09:35:00.000Z',
    updatedAt: '2026-10-20T09:35:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-09',
    topic: 'Giao thông',
    gameType: 'shapes',
    shapeType: 'circle',
    questionText: 'Bánh xe đạp bé đi dạo có dạng hình gì để lăn được dễ dàng?',
    speechText: 'Bánh xe đạp lăn tròn bon bon trên đường làng có dạng hình gì hả con?',
    options: [
      { id: 's9-1', text: 'Hình Tròn', isCorrect: true, iconOrVisual: 'circle' },
      { id: 's9-2', text: 'Hình Vuông', isCorrect: false, iconOrVisual: 'square' },
      { id: 's9-3', text: 'Hình Chữ Nhật', isCorrect: false, iconOrVisual: 'rectangle' },
    ],
    correctAnswer: 'Hình Tròn',
    explanation: 'Đúng rồi, nhờ có hình tròn mà bánh xe mới lăn được êm ru đấy!',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T09:40:00.000Z',
    updatedAt: '2026-10-20T09:40:00.000Z',
    source: 'seed',
  },
  {
    id: 'shape-10',
    topic: 'Bé làm quen toán',
    gameType: 'shapes',
    shapeType: 'rectangle',
    questionText: 'Cửa ra vào lớp học có 2 cạnh dài và 2 cạnh ngắn, đó là hình gì?',
    speechText: 'Cánh cửa lớn đón các bé vào lớp học là hình gì nào con?',
    options: [
      { id: 's10-1', text: 'Hình Tam Giác', isCorrect: false, iconOrVisual: 'triangle' },
      { id: 's10-2', text: 'Hình Chữ Nhật', isCorrect: true, iconOrVisual: 'rectangle' },
      { id: 's10-3', text: 'Hình Vuông', isCorrect: false, iconOrVisual: 'square' },
    ],
    correctAnswer: 'Hình Chữ Nhật',
    explanation: 'Cô Thảo khen con! Cánh cửa chữ nhật rộng mở chào đón bé mỗi ngày.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T09:45:00.000Z',
    updatedAt: '2026-10-20T09:45:00.000Z',
    source: 'seed',
  },

  // --- TRÒ CHƠI 3: TAI TIN – MẮT SÁNG (10 câu) ---
  {
    id: 'listen-01',
    topic: 'Thế giới động vật',
    gameType: 'listening',
    targetItem: 'con_meo',
    questionText: 'Bé hãy lắng nghe và chọn đúng hình: Con Mèo kêu meo meo!',
    speechText: 'Con hãy tìm hình con mèo đáng yêu nhé!',
    options: [
      { id: 'l1-1', text: 'Con Mèo', isCorrect: true, iconOrVisual: 'cat' },
      { id: 'l1-2', text: 'Con Chó', isCorrect: false, iconOrVisual: 'dog' },
      { id: 'l1-3', text: 'Con Gà', isCorrect: false, iconOrVisual: 'bird' },
    ],
    correctAnswer: 'Con Mèo',
    explanation: 'Chuẩn xác! Chú mèo có ria mép dài bắt chuột rất cừ.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T10:00:00.000Z',
    updatedAt: '2026-10-20T10:00:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-02',
    topic: 'Quê hương Điện Biên',
    gameType: 'listening',
    targetItem: 'hoa_ban',
    questionText: 'Bé hãy lắng nghe và chọn: Cành hoa ban trắng tinh khôi của núi rừng Tây Bắc!',
    speechText: 'Con hãy tìm cành hoa ban trắng nở rộ trên sườn đồi quê em!',
    options: [
      { id: 'l2-1', text: 'Hoa Ban', isCorrect: true, iconOrVisual: 'flower' },
      { id: 'l2-2', text: 'Hoa Hồng', isCorrect: false, iconOrVisual: 'rose' },
      { id: 'l2-3', text: 'Cây Tre', isCorrect: false, iconOrVisual: 'tree' },
    ],
    correctAnswer: 'Hoa Ban',
    explanation: 'Bé yêu quê hương lắm! Hoa ban Điện Biên nở trắng xóa thung lũng Mường Thanh.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T10:05:00.000Z',
    updatedAt: '2026-10-20T10:05:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-03',
    topic: 'Giao thông',
    gameType: 'listening',
    targetItem: 'xe_dap',
    questionText: 'Bé hãy lắng nghe và tìm: Chiếc Xe Đạp có 2 bánh!',
    speechText: 'Con hãy tìm hình chiếc xe đạp kêu kính coong kính coong nào!',
    options: [
      { id: 'l3-1', text: 'Xe Ô Tô', isCorrect: false, iconOrVisual: 'car' },
      { id: 'l3-2', text: 'Xe Đạp', isCorrect: true, iconOrVisual: 'bike' },
      { id: 'l3-3', text: 'Máy Bay', isCorrect: false, iconOrVisual: 'plane' },
    ],
    correctAnswer: 'Xe Đạp',
    explanation: 'Đúng rồi! Xe đạp giúp bé rèn luyện đôi chân khỏe mạnh.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T10:10:00.000Z',
    updatedAt: '2026-10-20T10:10:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-04',
    topic: 'Nghề nghiệp',
    gameType: 'listening',
    targetItem: 'bac_si',
    questionText: 'Ai là người mặc áo blouse trắng khám bệnh và chăm sóc sức khỏe cho bé?',
    speechText: 'Con hãy tìm hình Bác Sĩ khám chữa bệnh cho mọi người nhé!',
    options: [
      { id: 'l4-1', text: 'Bác Sĩ', isCorrect: true, iconOrVisual: 'stethoscope' },
      { id: 'l4-2', text: 'Chú Chú Công An', isCorrect: false, iconOrVisual: 'shield' },
      { id: 'l4-3', text: 'Bác Nông Dân', isCorrect: false, iconOrVisual: 'plant' },
    ],
    correctAnswer: 'Bác Sĩ',
    explanation: 'Hoan hô bé! Bác sĩ luôn ân cần khám chữa bệnh cho các con.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T10:15:00.000Z',
    updatedAt: '2026-10-20T10:15:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-05',
    topic: 'Chuẩn bị vào lớp Một',
    gameType: 'listening',
    targetItem: 'hop_but',
    questionText: 'Bé hãy tìm: Chiếc Hộp Bút đựng bút chì, thước kẻ và tẩy của học sinh!',
    speechText: 'Con hãy tìm chiếc hộp bút xinh xắn để vào lớp Một nhé!',
    options: [
      { id: 'l5-1', text: 'Hộp Bút', isCorrect: true, iconOrVisual: 'pencil' },
      { id: 'l5-2', text: 'Quả Bóng', isCorrect: false, iconOrVisual: 'ball' },
      { id: 'l5-3', text: 'Búp Bê', isCorrect: false, iconOrVisual: 'toy' },
    ],
    correctAnswer: 'Hộp Bút',
    explanation: 'Chính xác! Chiếc hộp bút đựng ngay ngắn các đồ dùng học tập của bé.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T10:20:00.000Z',
    updatedAt: '2026-10-20T10:20:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-06',
    topic: 'Thế giới thực vật',
    gameType: 'listening',
    targetItem: 'qua_tao',
    questionText: 'Bé hãy lắng nghe và chọn: Quả Táo đỏ ngọt giòn và nhiều vitamin!',
    speechText: 'Con hãy tìm hình Quả Táo màu đỏ thơm ngon nào!',
    options: [
      { id: 'l6-1', text: 'Quả Chuối', isCorrect: false, iconOrVisual: 'banana' },
      { id: 'l6-2', text: 'Quả Táo', isCorrect: true, iconOrVisual: 'apple' },
      { id: 'l6-3', text: 'Củ Cà Rốt', isCorrect: false, iconOrVisual: 'carrot' },
    ],
    correctAnswer: 'Quả Táo',
    explanation: 'Giỏi quá! Quả táo đỏ tươi ăn rất tốt cho sức khỏe của bé.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T10:25:00.000Z',
    updatedAt: '2026-10-20T10:25:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-07',
    topic: 'Thế giới động vật',
    gameType: 'listening',
    targetItem: 'chu_ong',
    questionText: 'Con hãy tìm hình: Chú Ong chăm chỉ bay đi hút mật hoa ban!',
    speechText: 'Con hãy tìm hình chú ong chăm chỉ bay lượn tìm mật nhé!',
    options: [
      { id: 'l7-1', text: 'Chú Ong', isCorrect: true, iconOrVisual: 'bee' },
      { id: 'l7-2', text: 'Con Ếch', isCorrect: false, iconOrVisual: 'frog' },
      { id: 'l7-3', text: 'Con Cá', isCorrect: false, iconOrVisual: 'fish' },
    ],
    correctAnswer: 'Chú Ong',
    explanation: 'Bé có đôi tai rất thính! Chú ong vo ve chăm chỉ hút mật.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T10:30:00.000Z',
    updatedAt: '2026-10-20T10:30:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-08',
    topic: 'Nước và hiện tượng tự nhiên',
    gameType: 'listening',
    targetItem: 'cau_vong',
    questionText: 'Bé hãy lắng nghe và tìm: Cầu Vồng 7 sắc rực rỡ sau cơn mưa!',
    speechText: 'Con hãy tìm hình Cầu Vồng bảy sắc rực rỡ trên bầu trời nào!',
    options: [
      { id: 'l8-1', text: 'Đám Mây Đen', isCorrect: false, iconOrVisual: 'cloud' },
      { id: 'l8-2', text: 'Cầu Vồng', isCorrect: true, iconOrVisual: 'rainbow' },
      { id: 'l8-3', text: 'Mặt Trăng', isCorrect: false, iconOrVisual: 'moon' },
    ],
    correctAnswer: 'Cầu Vồng',
    explanation: 'Đúng rồi! Cầu vồng uốn lượn sau mưa thật là đẹp mắt.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T10:35:00.000Z',
    updatedAt: '2026-10-20T10:35:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-09',
    topic: 'Quê hương Điện Biên',
    gameType: 'listening',
    targetItem: 'dong_lua',
    questionText: 'Bé hãy lắng nghe và tìm: Cánh đồng lúa Mường Thanh chín vàng óng!',
    speechText: 'Con hãy tìm hình Cánh đồng lúa chín vàng của Điện Biên quê hương nhé!',
    options: [
      { id: 'l9-1', text: 'Cánh Đồng Lúa', isCorrect: true, iconOrVisual: 'field' },
      { id: 'l9-2', text: 'Dòng Sông', isCorrect: false, iconOrVisual: 'river' },
      { id: 'l9-3', text: 'Thành Phố', isCorrect: false, iconOrVisual: 'city' },
    ],
    correctAnswer: 'Cánh Đồng Lúa',
    explanation: 'Bé giỏi lắm! Cánh đồng Mường Thanh nuôi lớn những hạt gạo dẻo thơm.',
    supportLevel: 'challenge',
    status: 'published',
    createdAt: '2026-10-20T10:40:00.000Z',
    updatedAt: '2026-10-20T10:40:00.000Z',
    source: 'seed',
  },
  {
    id: 'listen-10',
    topic: 'Trường mầm non',
    gameType: 'listening',
    targetItem: 'tieng_trong',
    questionText: 'Bé hãy lắng nghe và tìm: Chiếc Trống trường kêu tùng tùng tùng!',
    speechText: 'Con hãy tìm hình Chiếc Trống trường mầm non báo hiệu giờ vào lớp!',
    options: [
      { id: 'l10-1', text: 'Chiếc Trống', isCorrect: true, iconOrVisual: 'drum' },
      { id: 'l10-2', text: 'Cây Đàn', isCorrect: false, iconOrVisual: 'guitar' },
      { id: 'l10-3', text: 'Cái Chuông', isCorrect: false, iconOrVisual: 'bell' },
    ],
    correctAnswer: 'Chiếc Trống',
    explanation: 'Hoan hô bé! Trống trường giục giã các bạn nhỏ vui bước đến trường.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T10:45:00.000Z',
    updatedAt: '2026-10-20T10:45:00.000Z',
    source: 'seed',
  },

  // --- TRÒ CHƠI 4: BÉ CHỌN ĐIỀU HAY (10 câu) ---
  {
    id: 'behavior-01',
    topic: 'Kỹ năng sống',
    gameType: 'behavior',
    questionText: 'Trước khi ngồi vào bàn ăn cơm, bé ngoan cần làm gì?',
    speechText: 'Trước khi ngồi vào bàn ăn cơm, bé ngoan cần làm gì để giữ vệ sinh?',
    options: [
      { id: 'b1-1', text: 'Rửa tay sạch bằng xà phòng', isCorrect: true, iconOrVisual: 'hands' },
      { id: 'b1-2', text: 'Cứ thế bốc thức ăn ăn luôn', isCorrect: false, iconOrVisual: 'food' },
      { id: 'b1-3', text: 'Vừa ăn vừa xem tivi', isCorrect: false, iconOrVisual: 'tv' },
    ],
    correctAnswer: 'Rửa tay sạch bằng xà phòng',
    explanation: 'Bé rất ngoan! Rửa tay với xà phòng giúp đôi bàn tay sạch vi khuẩn, ăn cơm ngon miệng và khỏe mạnh.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T11:00:00.000Z',
    updatedAt: '2026-10-20T11:00:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-02',
    topic: 'Kỹ năng sống',
    gameType: 'behavior',
    questionText: 'Sau khi chơi đồ chơi ở lớp hoặc ở nhà xong, bé cần làm gì?',
    speechText: 'Sau khi chơi đồ chơi xong, hành động nào là đúng đắn hả bé?',
    options: [
      { id: 'b2-1', text: 'Vứt bừa bãi ra sàn nhà', isCorrect: false, iconOrVisual: 'trash' },
      { id: 'b2-2', text: 'Cất đồ chơi gọn gàng vào rổ', isCorrect: true, iconOrVisual: 'box' },
      { id: 'b2-3', text: 'Bỏ đi chỗ khác chơi tiếp', isCorrect: false, iconOrVisual: 'run' },
    ],
    correctAnswer: 'Cất đồ chơi gọn gàng vào rổ',
    explanation: 'Đúng rồi! Cất đồ chơi gọn gàng giúp lớp học ngăn nắp và đồ chơi không bị hỏng.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T11:05:00.000Z',
    updatedAt: '2026-10-20T11:05:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-03',
    topic: 'Quê hương Điện Biên',
    gameType: 'behavior',
    questionText: 'Khi đi ngắm hoa ban ở vườn hoa mầm non, bé nên làm gì?',
    speechText: 'Khi ngắm hoa ban nở rực rỡ, hành vi nào của bé là đáng khen?',
    options: [
      { id: 'b3-1', text: 'Bẻ cành, hái hoa mang về', isCorrect: false, iconOrVisual: 'break' },
      { id: 'b3-2', text: 'Ngắm hoa và tưới nước chăm sóc cây', isCorrect: true, iconOrVisual: 'plant' },
      { id: 'b3-3', text: 'Dẫm lên thảm cỏ và hoa', isCorrect: false, iconOrVisual: 'step' },
    ],
    correctAnswer: 'Ngắm hoa và tưới nước chăm sóc cây',
    explanation: 'Bé biết yêu thiên nhiên! Hoa ban nở đẹp để mọi người cùng ngắm, không nên bẻ cành bẻ hoa.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T11:10:00.000Z',
    updatedAt: '2026-10-20T11:10:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-04',
    topic: 'Kỹ năng sống',
    gameType: 'behavior',
    questionText: 'Khi có người lạ cho bánh kẹo hoặc rủ bé đi theo, bé nên làm gì?',
    speechText: 'Nếu người lạ rủ bé đi theo hoặc cho đồ ăn, bé xử trí thế nào?',
    options: [
      { id: 'b4-1', text: 'Đi theo ngay vì thích kẹo', isCorrect: false, iconOrVisual: 'candy' },
      { id: 'b4-2', text: 'Nói không và chạy lại mách cô giáo hoặc bố mẹ', isCorrect: true, iconOrVisual: 'shield' },
      { id: 'b4-3', text: 'Giấu bố mẹ đi theo người lạ', isCorrect: false, iconOrVisual: 'hide' },
    ],
    correctAnswer: 'Nói không và chạy lại mách cô giáo hoặc bố mẹ',
    explanation: 'Rất thông minh! Bé tuyệt đối không đi theo người lạ để bảo vệ an toàn cho bản thân.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T11:15:00.000Z',
    updatedAt: '2026-10-20T11:15:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-05',
    topic: 'Trường mầm non',
    gameType: 'behavior',
    questionText: 'Khi gặp cô giáo hoặc người lớn tuổi, bé cần làm gì?',
    speechText: 'Khi gặp cô giáo và người lớn tuổi, lời chào của bé thế nào?',
    options: [
      { id: 'b5-1', text: 'Khoanh tay lễ phép: "Cháu chào cô ạ!"', isCorrect: true, iconOrVisual: 'heart' },
      { id: 'b5-2', text: 'Cúi mặt đi thẳng, không nói gì', isCorrect: false, iconOrVisual: 'ignore' },
      { id: 'b5-3', text: 'Nói cộc lốc không có ạ', isCorrect: false, iconOrVisual: 'cross' },
    ],
    correctAnswer: 'Khoanh tay lễ phép: "Cháu chào cô ạ!"',
    explanation: 'Bé ngoan lắm! Lời chào lễ phép thể hiện sự kính trọng và đáng yêu của học sinh mầm non.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T11:20:00.000Z',
    updatedAt: '2026-10-20T11:20:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-06',
    topic: 'Giao thông',
    gameType: 'behavior',
    questionText: 'Khi ngồi trên xe máy cùng bố mẹ, bé cần đội gì để an toàn?',
    speechText: 'Khi ngồi sau xe máy cùng bố mẹ, bé cần đội gì trên đầu?',
    options: [
      { id: 'b6-1', text: 'Đội mũ bảo hiểm vừa vặn và cài quai', isCorrect: true, iconOrVisual: 'helmet' },
      { id: 'b6-2', text: 'Không đội gì cả', isCorrect: false, iconOrVisual: 'none' },
      { id: 'b6-3', text: 'Đội mũ rộng vành che mắt', isCorrect: false, iconOrVisual: 'hat' },
    ],
    correctAnswer: 'Đội mũ bảo hiểm vừa vặn và cài quai',
    explanation: 'Chính xác! Đội mũ bảo hiểm bảo vệ đầu bé an toàn khi tham gia giao thông.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T11:25:00.000Z',
    updatedAt: '2026-10-20T11:25:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-07',
    topic: 'Kỹ năng sống',
    gameType: 'behavior',
    questionText: 'Khi bạn trong lớp chẳng may bị ngã, bé nên làm gì?',
    speechText: 'Khi thấy bạn bị ngã đau, bé ngoan sẽ làm gì để giúp bạn?',
    options: [
      { id: 'b7-1', text: 'Cười đùa trêu chọc bạn', isCorrect: false, iconOrVisual: 'laugh' },
      { id: 'b7-2', text: 'Đỡ bạn dậy và gọi cô giáo giúp đỡ', isCorrect: true, iconOrVisual: 'help' },
      { id: 'b7-3', text: 'Bỏ mặc bạn ngồi khóc', isCorrect: false, iconOrVisual: 'cry' },
    ],
    correctAnswer: 'Đỡ bạn dậy và gọi cô giáo giúp đỡ',
    explanation: 'Bé có trái tim nhân ái! Giúp đỡ bạn bè khi gặp khó khăn là đức tính rất đáng quý.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T11:30:00.000Z',
    updatedAt: '2026-10-20T11:30:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-08',
    topic: 'Môi trường',
    gameType: 'behavior',
    questionText: 'Sau khi ăn bánh kẹo hoặc uống hộp sữa, vỏ rác nên bỏ vào đâu?',
    speechText: 'Vỏ hộp sữa sau khi uống xong bé cần bỏ vào đâu?',
    options: [
      { id: 'b8-1', text: 'Vứt ngay xuống sàn lớp hoặc gốc cây', isCorrect: false, iconOrVisual: 'drop' },
      { id: 'b8-2', text: 'Bỏ gọn vào thùng rác', isCorrect: true, iconOrVisual: 'bin' },
      { id: 'b8-3', text: 'Nhét vào khe tường', isCorrect: false, iconOrVisual: 'wall' },
    ],
    correctAnswer: 'Bỏ gọn vào thùng rác',
    explanation: 'Rất đáng khen! Giữ gìn vệ sinh chung giúp trường mầm non Thanh Yên luôn xanh - sạch - đẹp.',
    supportLevel: 'support',
    status: 'published',
    createdAt: '2026-10-20T11:35:00.000Z',
    updatedAt: '2026-10-20T11:35:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-09',
    topic: 'Chuẩn bị vào lớp Một',
    gameType: 'behavior',
    questionText: 'Khi muốn phát biểu ý kiến trong giờ học, bé cần làm gì?',
    speechText: 'Trong giờ học khi muốn nói điều gì, bé ngoan nên làm thế nào?',
    options: [
      { id: 'b9-1', text: 'Giơ tay xin phép cô giáo', isCorrect: true, iconOrVisual: 'raise_hand' },
      { id: 'b9-2', text: 'Nói leo và hét to', isCorrect: false, iconOrVisual: 'shout' },
      { id: 'b9-3', text: 'Đứng dậy chạy lăng xăng', isCorrect: false, iconOrVisual: 'run' },
    ],
    correctAnswer: 'Giơ tay xin phép cô giáo',
    explanation: 'Bé đã sẵn sàng vào lớp Một rồi! Giơ tay xin phép là nề nếp văn minh trong lớp học.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T11:40:00.000Z',
    updatedAt: '2026-10-20T11:40:00.000Z',
    source: 'seed',
  },
  {
    id: 'behavior-10',
    topic: 'Kỹ năng sống',
    gameType: 'behavior',
    questionText: 'Khi lỡ làm rơi đồ của bạn hoặc va vào bạn, bé cần nói câu gì?',
    speechText: 'Khi làm bạn buồn hoặc va vào bạn, câu nói phép thuật nào bé nên nói?',
    options: [
      { id: 'b10-1', text: '"Tớ xin lỗi bạn, bạn có sao không?"', isCorrect: true, iconOrVisual: 'sorry' },
      { id: 'b10-2', text: '"Tại bạn đứng đó chứ!"', isCorrect: false, iconOrVisual: 'blame' },
      { id: 'b10-3', text: 'Cười to rồi bỏ chạy', isCorrect: false, iconOrVisual: 'escape' },
    ],
    correctAnswer: '"Tớ xin lỗi bạn, bạn có sao không?"',
    explanation: 'Bé biết dũng cảm nhận lỗi! Lời xin lỗi chân thành giúp các bạn yêu quý bé nhiều hơn.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T11:45:00.000Z',
    updatedAt: '2026-10-20T11:45:00.000Z',
    source: 'seed',
  },

  // --- TRÒ CHƠI 5: CHUYỆN KỂ CÙNG BAN BAN ---
  {
    id: 'story-q-01',
    topic: 'Quê hương Điện Biên',
    gameType: 'story',
    questionText: 'Bé hoa ban Ban Ban đã tìm thấy điều kỳ diệu gì trên sườn đồi Thanh Yên?',
    speechText: 'Sau khi nghe truyện, bé hãy chọn xem Ban Ban đã gặp ai nhé!',
    options: [
      { id: 'sq1-1', text: 'Đàn bướm trắng và các bạn nhỏ mầm non', isCorrect: true, iconOrVisual: 'butterfly' },
      { id: 'sq1-2', text: 'Một con sư tử hung dữ', isCorrect: false, iconOrVisual: 'lion' },
      { id: 'sq1-3', text: 'Chiếc tàu hỏa chạy ngầm', isCorrect: false, iconOrVisual: 'train' },
    ],
    correctAnswer: 'Đàn bướm trắng và các bạn nhỏ mầm non',
    explanation: 'Con nhớ câu chuyện rất giỏi! Ban Ban được múa hát cùng các bạn mầm non Thanh Yên.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T12:00:00.000Z',
    updatedAt: '2026-10-20T12:00:00.000Z',
    source: 'seed',
  },

  // --- TRÒ CHƠI 6: HÀNH TRANG VÀO LỚP MỘT ---
  {
    id: 'grade1-01',
    topic: 'Chuẩn bị vào lớp Một',
    gameType: 'grade1_prep',
    questionText: 'Đồ dùng nào sau đây là dụng cụ học tập bé cần để vào cặp sách lớp Một?',
    speechText: 'Con hãy chọn đồ dùng học tập cần thiết để sắp xếp vào ba lô lớp Một nhé!',
    options: [
      { id: 'g1-1', text: 'Hộp bút và vở ô ly', isCorrect: true, iconOrVisual: 'book' },
      { id: 'g1-2', text: 'Kiếm đồ chơi sắc nhọn', isCorrect: false, iconOrVisual: 'sword' },
      { id: 'g1-3', text: 'Chiếc gối ngủ to', isCorrect: false, iconOrVisual: 'pillow' },
    ],
    correctAnswer: 'Hộp bút và vở ô ly',
    explanation: 'Chính xác! Vở ô ly, bút chì, thước kẻ là hành trang không thể thiếu của học sinh lớp Một.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T12:15:00.000Z',
    updatedAt: '2026-10-20T12:15:00.000Z',
    source: 'seed',
  },
  {
    id: 'grade1-02',
    topic: 'Chuẩn bị vào lớp Một',
    gameType: 'grade1_prep',
    questionText: 'Tư thế ngồi viết chữ đúng của học sinh lớp Một như thế nào?',
    speechText: 'Tư thế ngồi học đúng của bé là như thế nào hả con?',
    options: [
      { id: 'g1-2-1', text: 'Lưng thẳng, ngực không tỳ vào bàn, mắt cách vở khoảng 25-30cm', isCorrect: true, iconOrVisual: 'sit' },
      { id: 'g1-2-2', text: 'Nằm bò ra bàn viết chữ', isCorrect: false, iconOrVisual: 'lay' },
      { id: 'g1-2-3', text: 'Cúi sát mắt vào trang vở', isCorrect: false, iconOrVisual: 'close' },
    ],
    correctAnswer: 'Lưng thẳng, ngực không tỳ vào bàn, mắt cách vở khoảng 25-30cm',
    explanation: 'Bé hiểu bài rất nhanh! Ngồi thẳng lưng giúp cột sống khỏe mạnh và mắt sáng tinh anh.',
    supportLevel: 'basic',
    status: 'published',
    createdAt: '2026-10-20T12:20:00.000Z',
    updatedAt: '2026-10-20T12:20:00.000Z',
    source: 'seed',
  },
];

// 2. KẾ HOẠCH HOẠT ĐỘNG GIÁO DỤC MẪU (3 GIÁO ÁN CHUẨN MẪU GIÁO NHỠ 4-5 TUỔI)
export const SEED_LESSON_PLANS: LessonPlan[] = [
  {
    id: 'lp-01',
    title: 'Khám phá sắc hoa ban Điện Biên và đếm số lượng trong phạm vi 5',
    topic: 'Quê hương Điện Biên & Nhận biết toán',
    domain: 'Phát triển nhận thức',
    ageGroup: '4 - 5 tuổi',
    duration: '25 - 30 phút',
    objectives: {
      knowledge: 'Trẻ nhận biết hoa ban là loài hoa đặc trưng của Điện Biên; đếm thành thạo các nhóm đối tượng có số lượng trong phạm vi 5, nhận biết các chữ số từ 1 đến 5.',
      skills: 'Rèn kỹ năng đếm từ trái sang phải, chạm ngón tay từng đối tượng; kỹ năng tương tác nhấp chọn trên ứng dụng Hoa Ban AI; kỹ năng phát âm to rõ.',
      attitude: 'Trẻ hào hứng tham gia hoạt động, biết yêu quý và bảo vệ cây xanh, tự hào về vẻ đẹp quê hương Thanh Yên - Điện Biên.',
    },
    preparation: {
      teacher: 'Màn hình tương tác hoặc máy tính bảng kết nối ứng dụng Hoa Ban AI; hình ảnh hoa ban thật; rổ 5 bông hoa ban giấy xốp; thẻ số 1-5.',
      children: 'Mỗi trẻ một rổ đồ chơi gồm 5 bông hoa ban và các thẻ số từ 1 đến 5.',
      space: 'Lớp học mầm non rộng rãi, thoáng mát, sàn sạch.',
    },
    introduction: 'Cô và trẻ cùng vận động theo bài hát "Hoa ban trắng của em". Trò chuyện về mùa xuân Điện Biên và câu đố về bông hoa ban 5 cánh xinh đẹp.',
    coreActivity: '1. Ôn đếm trong phạm vi 3: Cho trẻ tìm các cành hoa xung quanh lớp. 2. Đếm và tạo nhóm trong phạm vi 5: Cô hướng dẫn trẻ xếp 5 bông hoa ban ra bảng, đếm lần lượt 1 đến 5. Trẻ gắn thẻ số 5 tương ứng. 3. Thử nghiệm trên ứng dụng Hoa Ban AI: Trẻ lần lượt lên màn hình tương tác chơi trò chơi "Vườn hoa đếm số".',
    reinforcementGame: 'Trò chơi "Kết chùm hoa ban 5 cánh": Trẻ vừa đi vừa hát, khi cô hô "Kết chùm 5 bông hoa", trẻ nhanh chóng tạo thành vòng tròn 5 bạn.',
    guidingQuestions: [
      'Bông hoa ban này có màu gì các con?',
      'Chúng mình cùng đếm xem có tất cả bao nhiêu bông hoa?',
      'Để chỉ số lượng 5 bông hoa thì ta dùng thẻ số mấy?',
    ],
    offlineActivity: 'Bé dùng giấy màu xốp và sáp màu dán bông hoa ban 5 cánh tặng mẹ và cô giáo.',
    differentiatedSupport: {
      supportNeeded: 'Cô ngồi cạnh hỗ trợ trẻ đếm chạm từng bông hoa bằng ngón tay trỏ, đếm chậm theo nhịp 1, 2, 3, 4, 5.',
      standard: 'Trẻ tự đếm và chọn thẻ số chính xác, thao tác tự tin trên màn hình cảm ứng.',
      advanced: 'Khuyến khích trẻ tách 5 bông hoa ban thành 2 phần theo nhiều cách khác nhau (1-4, 2-3).',
    },
    observationCriteria: 'Khả năng đếm chính xác đến 5, nhận biết mặt số, sự hứng thú khi tương tác với ứng dụng Hoa Ban AI.',
    safetyNotes: 'Chú ý an toàn khi trẻ di chuyển quanh lớp, giữ khoảng cách mắt hợp lý với màn hình tương tác.',
    wrapUp: 'Cô nhận xét, tuyên dương các bạn nhỏ và cùng hát bài chào tạm biệt.',
    createdAt: '2026-10-22T08:00:00.000Z',
    status: 'approved',
  },
  {
    id: 'lp-02',
    title: 'Học cách chào hỏi lễ phép và mạnh dạn tự tin giao tiếp trong lớp học',
    topic: 'Kỹ năng sống & Tự lập',
    domain: 'Phát triển tình cảm và kỹ năng xã hội',
    ageGroup: '4 - 5 tuổi',
    duration: '25 - 30 phút',
    objectives: {
      knowledge: 'Trẻ hiểu được ý nghĩa của lời chào hỏi lễ phép khi gặp thầy cô, bố mẹ và bạn bè trong trường mầm non.',
      skills: 'Rèn tư thế khoanh tay, mắt nhìn thẳng, nói rõ ràng câu "Cháu chào cô ạ!"; kỹ năng lắng nghe và trả lời trọn câu.',
      attitude: 'Trẻ tự giác, ngoan ngoãn, hòa đồng, yêu quý bạn bè và cô giáo.',
    },
    preparation: {
      teacher: 'Video clip tình huống bé chào hỏi; rối tay hoa ban Ban Ban trên ứng dụng Hoa Ban AI.',
      children: 'Trang phục gọn gàng, tâm thế thoải mái.',
      space: 'Góc đóng vai của lớp học mầm non.',
    },
    introduction: 'Ban Ban xuất hiện trên màn hình chào các bạn nhỏ: "Xin chào các bạn lớp mẫu giáo nhỡ 4-5 tuổi trường mầm non Thanh Yên!". Cho trẻ đáp lại lời chào.',
    coreActivity: 'Cô đóng vai cô giáo, một bạn đóng vai bé ngoan đến lớp. Hướng dẫn trẻ cách khoanh tay nhẹ nhàng và chào cô giáo. Cho từng nhóm trẻ 4-5 tuổi thực hành đóng vai.',
    reinforcementGame: 'Trò chơi tương tác "Bé chọn điều hay" trên ứng dụng Hoa Ban AI: chọn hành vi đúng khi gặp người lớn và bạn bè.',
    guidingQuestions: [
      'Khi gặp cô giáo vào buổi sáng, chúng mình chào thế nào?',
      'Tại sao khi nói chuyện với cô giáo ta lại cần có từ "ạ" ở cuối câu?',
    ],
    offlineActivity: 'Trẻ thực hành chào các cô bác trong khuôn viên trường mầm non Thanh Yên.',
    differentiatedSupport: {
      supportNeeded: 'Khích lệ những trẻ còn nhút nhát, cho trẻ tập chào cùng một bạn bạo dạn hơn.',
      standard: 'Trẻ tự tin chào hỏi to, rõ ràng, lễ phép.',
      advanced: 'Trẻ dẫn dắt bạn khác cùng chào đón bạn mới vào lớp.',
    },
    observationCriteria: 'Thái độ tự tin, tư thế đứng ngay ngắn, ngữ điệu giọng nói khi chào hỏi.',
    safetyNotes: 'Nhắc nhở trẻ đi lại nhẹ nhàng, không xô đẩy khi đóng vai.',
    wrapUp: 'Cô tặng cho mỗi bé một bông hoa ban ngoan ngoãn dán vào bảng bé ngoan.',
    createdAt: '2026-10-24T08:00:00.000Z',
    status: 'approved',
  },
  {
    id: 'lp-03',
    title: 'Kể chuyện: Chuyến du hành mùa xuân của bé hoa ban Ban Ban',
    topic: 'Quê hương Điện Biên & Văn học mầm non',
    domain: 'Phát triển ngôn ngữ',
    ageGroup: '4 - 5 tuổi',
    duration: '25 - 30 phút',
    objectives: {
      knowledge: 'Trẻ nhớ tên truyện, các nhân vật (Ban Ban, Chị Bướm Trắng, Bác Gió Ngàn); hiểu nội dung câu chuyện về tình bạn và vẻ đẹp hoa ban Điện Biên.',
      skills: 'Rèn kỹ năng nghe hiểu tiếng Việt chuẩn; trả lời câu hỏi mạch lạc, rõ ràng; tập kể lại đoạn truyện theo tranh minh họa.',
      attitude: 'Trẻ yêu mến cảnh đẹp quê hương, biết yêu thương, chia sẻ cùng bạn bè.',
    },
    preparation: {
      teacher: 'Trình chiếu truyện "Chuyện kể cùng Ban Ban" trên ứng dụng; mô hình rối hoa ban; âm thanh suối reo chim hót.',
      children: 'Mũ múa hoa ban, hoa giấy cài áo.',
      space: 'Phòng học sắp xếp hình chữ U ấm cúng.',
    },
    introduction: 'Cô giả tiếng chim hót líu lo, dẫn dắt trẻ cùng ngắm nhìn thung lũng Mường Thanh ngập tràn hoa ban trắng.',
    coreActivity: 'Cô kể chuyện diễn cảm lần 1 kết hợp cử chỉ điệu bộ. Kể lần 2 kết hợp giọng đọc tiếng Việt và tranh động trên màn hình Hoa Ban AI. Đàm thoại trích dẫn nội dung.',
    reinforcementGame: 'Trò chơi "Ai nhớ tài thế": Trẻ trả lời các câu hỏi nhanh về câu chuyện trên ứng dụng.',
    guidingQuestions: [
      'Câu chuyện có tên là gì? Trong truyện có những ai?',
      'Ban Ban đã làm gì khi thấy bạn Bướm bị lạc mẹ?',
      'Nếu là con, con sẽ làm gì để giúp đỡ bạn?',
    ],
    offlineActivity: 'Trẻ tô màu nhân vật Ban Ban theo cảm nhận sáng tạo của mình.',
    differentiatedSupport: {
      supportNeeded: 'Gợi ý từ khóa bằng hình ảnh trực quan để trẻ trả lời trọn câu.',
      standard: 'Trẻ trả lời mạch lạc, diễn đạt rõ ràng.',
      advanced: 'Khuyến khích trẻ cùng kể lại phân đoạn mình thích nhất.',
    },
    observationCriteria: 'Mức độ chú ý nghe kể chuyện, khả năng ghi nhớ chi tiết và cảm xúc bộc lộ qua nét mặt.',
    safetyNotes: 'Đảm bảo ánh sáng lớp học chan hòa, ấm áp.',
    wrapUp: 'Cô và cả lớp cùng múa điệu xòe hoa chúc mừng Ban Ban.',
    createdAt: '2026-10-26T08:00:00.000Z',
    status: 'approved',
  },
];

// 3. CÂU CHUYỆN TRANH MẪU VỀ BAN BAN
export const SEED_STORY: Story = {
  id: 'story-01',
  title: 'Chuyến Khám Phá Thung Lũng Mường Thanh của Ban Ban',
  summary: 'Câu chuyện kể về bé hoa ban Ban Ban rạng rỡ, cùng bạn bè ngắm nhìn cánh đồng lúa, dòng sông Nậm Rốm và học bao điều hay ở lớp mẫu giáo 4-5 tuổi.',
  author: 'Cô giáo Trần Thị Bích Thảo (Trường MN Thanh Yên)',
  createdAt: '2026-10-20T08:00:00.000Z',
  moralLesson: 'Biết yêu thiên nhiên quê hương, đoàn kết giúp đỡ bạn bè và chăm ngoan nghe lời cô giáo, ba mẹ.',
  sections: [
    {
      order: 1,
      content: 'Trên sườn đồi xanh mát của xã Thanh Yên, có một bé hoa ban nhỏ xinh tên là Ban Ban. Ban Ban có năm cánh hoa màu trắng muốt pha chút phớt hồng dịu dàng.',
      speechNarration: 'Trên sườn đồi xanh mát của xã Thanh Yên, có một bé hoa ban nhỏ xinh tên là Ban Ban. Ban Ban có năm cánh hoa màu trắng muốt pha chút phớt hồng dịu dàng đón ánh nắng ban mai.',
      illustrationIdea: 'Bé Ban Ban đang hé nụ mỉm cười trên cành cây giữa đồi hoa ban Điện Biên.',
      comprehensionQuestion: 'Bé hoa ban trong câu chuyện có tên là gì?',
    },
    {
      order: 2,
      content: 'Mỗi buổi sáng, Ban Ban thích lắng nghe tiếng chim ca líu lo và tiếng các bạn nhỏ trường mầm non Thanh Yên cùng nhau tập thể dục: "Một, hai, ba, hít thở thật sâu!".',
      speechNarration: 'Mỗi buổi sáng, Ban Ban thích lắng nghe tiếng chim ca líu lo và tiếng các bạn nhỏ trường mầm non Thanh Yên cùng nhau tập thể dục thật vui vẻ.',
      illustrationIdea: 'Các em bé mầm non mặc đồng phục đang vui vẻ múa hát dưới bóng cây hoa ban.',
      comprehensionQuestion: 'Các bạn nhỏ trường mầm non Thanh Yên đang làm gì dưới cành hoa ban?',
    },
    {
      order: 3,
      content: 'Một hôm, có một chú bướm nhỏ bị lạc mẹ đang đậu buồn thiu trên phiến lá. Ban Ban dịu dàng bảo: "Bạn đừng khóc nhé, mình sẽ cùng bạn ngắm bầu trời Điện Biên và chỉ đường về nhà cho bạn!".',
      speechNarration: 'Ban Ban dịu dàng bảo: Bạn đừng khóc nhé, mình sẽ cùng bạn ngắm bầu trời Điện Biên và chỉ đường về nhà cho bạn!',
      illustrationIdea: 'Ban Ban mỉm cười an ủi chú bướm vàng bé nhỏ.',
      comprehensionQuestion: 'Khi thấy bạn bướm buồn, Ban Ban đã làm gì?',
    },
    {
      order: 4,
      content: 'Bác Gió Ngàn lướt qua mang theo hương lúa thơm ngát từ cánh đồng Mường Thanh. Nhờ sự giúp đỡ của Ban Ban, chú bướm đã vui mừng bay về đoàn tụ với mẹ.',
      speechNarration: 'Bác Gió Ngàn lướt qua mang theo hương lúa thơm ngát từ cánh đồng Mường Thanh. Nhờ sự giúp đỡ của Ban Ban, chú bướm đã vui mừng bay về đoàn tụ với mẹ trong niềm vui hân hoan.',
      illustrationIdea: 'Đàn bướm bay lượn trên cánh đồng lúa vàng óng ả.',
      comprehensionQuestion: 'Gió mang theo hương thơm gì từ cánh đồng quê hương?',
    },
    {
      order: 5,
      content: 'Mỗi ngày đến lớp mẫu giáo nhỡ 4-5 tuổi, Ban Ban cùng các bạn nhỏ học hát, múa xòe và chăm ngoan vâng lời cô giáo Thảo. Ban Ban chúc các bạn luôn khỏe mạnh và vui tươi!',
      speechNarration: 'Ban Ban vẫy những cánh hoa xinh xắn chúc tất cả các bạn nhỏ lớp 4-5 tuổi luôn chăm ngoan, mỗi ngày đến trường là một ngày vui!',
      illustrationIdea: 'Ban Ban nở rộ rực rỡ vui chơi cùng các bạn nhỏ 4-5 tuổi ở trường mầm non.',
      comprehensionQuestion: 'Ban Ban đã chúc các bạn nhỏ điều gì?',
    },
  ],
};

// 4. SỔ QUAN SÁT PHÁT TRIỂN MẪU (DÁN NHÃN MINH HỌA RÕ RÀNG - MẪU GIÁO NHỠ 4-5 TUỔI)
export const SEED_OBSERVATIONS: ObservationRecord[] = [
  {
    id: 'obs-01',
    date: '2026-10-25',
    childCode: 'Bé A (4-5 tuổi)',
    activityName: 'Vườn hoa đếm số (phạm vi 5)',
    participation: 'Tích cực',
    languageBehavior: 'Đếm to, rõ ràng từ 1 đến 5, phát âm chuẩn các từ hoa ban, số bốn, số năm.',
    cognitionBehavior: 'Nhận biết số lượng nhanh, chạm tay đếm tuần tự từng bông hoa không bỏ sót.',
    independenceBehavior: 'Tự tin chọn đáp án trên màn hình tương tác, hào hứng khi hoa ban nở.',
    socialBehavior: 'Biết nhường bạn bên cạnh cùng bấm câu hỏi tiếp theo.',
    supportNotes: 'Khuyến khích bé thử thách thêm đếm mở rộng trong phạm vi 6-7.',
    teacherNote: 'Bé rất có khiếu toán học mầm non, tư duy trực quan tốt.',
    createdAt: '2026-10-25T09:30:00.000Z',
  },
  {
    id: 'obs-02',
    date: '2026-10-26',
    childCode: 'Bé B (4-5 tuổi)',
    activityName: 'Ngôi nhà hình học & Nhận biết vật thật',
    participation: 'Tích cực',
    languageBehavior: 'Nói được trọn câu: "Thưa cô, chiếc bánh chưng là hình vuông ạ!".',
    cognitionBehavior: 'Phân biệt chính xác hình tròn, hình tam giác, hình vuông trong lớp học.',
    independenceBehavior: 'Tự cất dọn thẻ hình sau khi kết thúc trò chơi.',
    socialBehavior: 'Hòa đồng, biết vỗ tay khen ngợi khi bạn trả lời đúng.',
    supportNotes: 'Cho bé làm quen thêm đồ vật dạng hình chữ nhật trong sinh hoạt hằng ngày.',
    teacherNote: 'Bé ngoan, lắng nghe lời cô giáo rất chăm chú.',
    createdAt: '2026-10-26T10:00:00.000Z',
  },
  {
    id: 'obs-03',
    date: '2026-10-27',
    childCode: 'Bé C (4-5 tuổi)',
    activityName: 'Bé chọn điều hay & Thói quen tự lập',
    participation: 'Trung bình',
    languageBehavior: 'Nói câu ngắn rõ ràng, biết chào hỏi cô giáo khi vào lớp.',
    cognitionBehavior: 'Nhận biết đúng hành vi đẹp: rửa tay trước khi ăn, cất đồ chơi gọn gàng.',
    independenceBehavior: 'Biết tự cởi giày dép và để lên giá dép của lớp.',
    socialBehavior: 'Hơi nhút nhát khi đứng trước đông bạn, thích chơi theo nhóm nhỏ.',
    supportNotes: 'Cô Thảo thường xuyên gọi bé lên tương tác nhẹ nhàng để tạo sự tự tin.',
    teacherNote: 'Bé cần được khích lệ thường xuyên để tự tin bộc lộ bản thân.',
    createdAt: '2026-10-27T10:45:00.000Z',
  },
];

// STORAGE KEYS CẬP NHẬT CHO TRẺ 4-5 TUỔI
const STORAGE_KEY_QUESTIONS = 'hoaban_ai_questions_v2026_4_5';
const STORAGE_KEY_LESSONS = 'hoaban_ai_lessons_v2026_4_5';
const STORAGE_KEY_OBSERVATIONS = 'hoaban_ai_observations_v2026_4_5';
const STORAGE_KEY_STORY = 'hoaban_ai_story_v2026_4_5';
const STORAGE_KEY_PROFILE = 'hoaban_ai_teacher_profile_v2026';
const STORAGE_KEY_AUTH = 'hoaban_ai_teacher_authenticated';

class StorageService {
  private questions: Question[] = [];
  private lessonPlans: LessonPlan[] = [];
  private observations: ObservationRecord[] = [];
  private story: Story = SEED_STORY;
  private teacherProfile: TeacherProfile = INITIAL_TEACHER_PROFILE;
  private isLoaded: boolean = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const qData = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (qData) {
        this.questions = JSON.parse(qData);
      } else {
        this.questions = [...SEED_QUESTIONS];
        this.saveQuestions();
      }

      const lData = localStorage.getItem(STORAGE_KEY_LESSONS);
      if (lData) {
        this.lessonPlans = JSON.parse(lData);
      } else {
        this.lessonPlans = [...SEED_LESSON_PLANS];
        this.saveLessons();
      }

      const oData = localStorage.getItem(STORAGE_KEY_OBSERVATIONS);
      if (oData) {
        this.observations = JSON.parse(oData);
      } else {
        this.observations = [...SEED_OBSERVATIONS];
        this.saveObservations();
      }

      const sData = localStorage.getItem(STORAGE_KEY_STORY);
      if (sData) {
        this.story = JSON.parse(sData);
      }

      const pData = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (pData) {
        this.teacherProfile = JSON.parse(pData);
      }

      this.isLoaded = true;
    } catch (e) {
      console.warn('Lỗi đọc dữ liệu từ bộ nhớ cục bộ, sử dụng dữ liệu khởi tạo:', e);
      this.questions = [...SEED_QUESTIONS];
      this.lessonPlans = [...SEED_LESSON_PLANS];
      this.observations = [...SEED_OBSERVATIONS];
    }
  }

  // --- QUẢN LÝ CÂU HỎI & HỌC LIỆU ---

  public getQuestions(): Question[] {
    return [...this.questions];
  }

  public getQuestionsByGame(gameType: string, onlyPublished: boolean = true): Question[] {
    return this.questions.filter(q => {
      if (q.gameType !== gameType) return false;
      if (onlyPublished && q.status !== 'published') return false;
      return true;
    });
  }

  public addQuestion(question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>): Question {
    const newQ: Question = {
      ...question,
      id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.questions.unshift(newQ);
    this.saveQuestions();
    return newQ;
  }

  public updateQuestion(id: string, updates: Partial<Question>): Question | null {
    const index = this.questions.findIndex(q => q.id === id);
    if (index === -1) return null;
    this.questions[index] = {
      ...this.questions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveQuestions();
    return this.questions[index];
  }

  public deleteQuestion(id: string): boolean {
    const beforeCount = this.questions.length;
    this.questions = this.questions.filter(q => q.id !== id);
    if (this.questions.length !== beforeCount) {
      this.saveQuestions();
      return true;
    }
    return false;
  }

  public duplicateQuestion(id: string): Question | null {
    const original = this.questions.find(q => q.id === id);
    if (!original) return null;
    const duplicated: Question = {
      ...original,
      id: `q-dup-${Date.now()}`,
      questionText: `${original.questionText} (Bản sao)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.questions.unshift(duplicated);
    this.saveQuestions();
    return duplicated;
  }

  public setQuestionStatus(id: string, status: 'draft' | 'approved' | 'published'): boolean {
    return Boolean(this.updateQuestion(id, { status }));
  }

  /**
   * Thêm hàng loạt câu hỏi tạo bởi AI với cơ chế kiểm tra trùng lặp
   */
  public bulkAddQuestions(newItems: Partial<Question>[]): { added: number; skippedDuplicates: number } {
    let added = 0;
    let skippedDuplicates = 0;

    const existingTexts = new Set(
      this.questions.map(q => q.questionText.trim().toLowerCase())
    );

    newItems.forEach((item, idx) => {
      const qText = (item.questionText || '').trim();
      if (!qText || existingTexts.has(qText.toLowerCase())) {
        skippedDuplicates++;
        return;
      }

      existingTexts.add(qText.toLowerCase());

      const validQ: Question = {
        id: `ai-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        topic: item.topic || 'Quê hương Điện Biên',
        gameType: item.gameType || 'counting',
        questionText: qText,
        speechText: item.speechText || qText,
        options: item.options && item.options.length > 0 ? item.options : [
          { id: '1', text: item.correctAnswer || 'Đáp án đúng', isCorrect: true },
          { id: '2', text: 'Phương án khác', isCorrect: false },
        ],
        correctAnswer: item.correctAnswer || (item.options?.[0]?.text || ''),
        explanation: item.explanation || 'Con giỏi lắm!',
        supportLevel: item.supportLevel || 'basic',
        visualCount: item.visualCount || 3,
        status: item.status || 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'ai',
      };

      this.questions.unshift(validQ);
      added++;
    });

    if (added > 0) {
      this.saveQuestions();
    }

    return { added, skippedDuplicates };
  }

  private saveQuestions(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(this.questions));
    }
  }

  // --- QUẢN LÝ KẾ HOẠCH BÀI DẠY (LESSON PLANS) ---

  public getLessonPlans(): LessonPlan[] {
    return [...this.lessonPlans];
  }

  public addLessonPlan(plan: Omit<LessonPlan, 'id' | 'createdAt'>): LessonPlan {
    const newPlan: LessonPlan = {
      ...plan,
      id: `lp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.lessonPlans.unshift(newPlan);
    this.saveLessons();
    return newPlan;
  }

  public deleteLessonPlan(id: string): boolean {
    const before = this.lessonPlans.length;
    this.lessonPlans = this.lessonPlans.filter(p => p.id !== id);
    if (this.lessonPlans.length !== before) {
      this.saveLessons();
      return true;
    }
    return false;
  }

  private saveLessons(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_LESSONS, JSON.stringify(this.lessonPlans));
    }
  }

  // --- SỔ QUAN SÁT TRẺ ---

  public getObservations(): ObservationRecord[] {
    return [...this.observations];
  }

  public addObservation(record: Omit<ObservationRecord, 'id' | 'createdAt'>): ObservationRecord {
    const newRecord: ObservationRecord = {
      ...record,
      id: `obs-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.observations.unshift(newRecord);
    this.saveObservations();
    return newRecord;
  }

  public deleteObservation(id: string): boolean {
    const before = this.observations.length;
    this.observations = this.observations.filter(o => o.id !== id);
    if (this.observations.length !== before) {
      this.saveObservations();
      return true;
    }
    return false;
  }

  private saveObservations(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_OBSERVATIONS, JSON.stringify(this.observations));
    }
  }

  // --- TRUYỆN TRANH BAN BAN ---
  public getStory(): Story {
    return this.story;
  }

  public updateStory(story: Story): void {
    this.story = story;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_STORY, JSON.stringify(this.story));
    }
  }

  // --- HỒ SƠ CÔ GIÁO THẢO ---
  public getTeacherProfile(): TeacherProfile {
    return this.teacherProfile;
  }

  public updateTeacherProfile(profile: Partial<TeacherProfile>): void {
    this.teacherProfile = { ...this.teacherProfile, ...profile };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(this.teacherProfile));
    }
  }

  // --- XUẤT VÀ NHẬP DỮ LIỆU ---
  public exportData(): string {
    return JSON.stringify({
      version: 'HoaBanAI_2026_v1',
      exportedAt: new Date().toISOString(),
      school: 'Trường Mầm non Thanh Yên - Điện Biên',
      teacher: this.teacherProfile.name,
      questions: this.questions,
      lessonPlans: this.lessonPlans,
      observations: this.observations,
      story: this.story,
    }, null, 2);
  }

  public importData(jsonString: string): { success: boolean; message: string; count?: number } {
    try {
      const data = JSON.parse(jsonString);
      if (!Array.isArray(data.questions)) {
        return { success: false, message: 'Dữ liệu không đúng cấu trúc học liệu Hoa Ban AI.' };
      }
      this.questions = data.questions;
      if (Array.isArray(data.lessonPlans)) this.lessonPlans = data.lessonPlans;
      if (Array.isArray(data.observations)) this.observations = data.observations;
      if (data.story) this.story = data.story;

      this.saveQuestions();
      this.saveLessons();
      this.saveObservations();
      if (data.story) this.updateStory(data.story);

      return { success: true, message: 'Nhập học liệu thành công!', count: this.questions.length };
    } catch (e: any) {
      return { success: false, message: `Lỗi đọc file: ${e?.message || 'Không thể đọc cú pháp JSON'}` };
    }
  }

  // --- XÁC THỰC GIÁO VIÊN ---
  public isTeacherAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  }

  public setTeacherAuthenticated(status: boolean): void {
    if (typeof window === 'undefined') return;
    if (status) {
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
  }

  // Khôi phục học liệu mẫu gốc
  public resetToSeed(): void {
    this.questions = [...SEED_QUESTIONS];
    this.lessonPlans = [...SEED_LESSON_PLANS];
    this.observations = [...SEED_OBSERVATIONS];
    this.story = SEED_STORY;
    this.saveQuestions();
    this.saveLessons();
    this.saveObservations();
    this.updateStory(SEED_STORY);
  }
}

export const storageService = new StorageService();
