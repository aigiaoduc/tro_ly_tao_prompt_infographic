
export enum FormatOption {
  INFOGRAPHIC = 'Infographic (Ngang)',
  POSTER = 'Poster (Dọc)'
}

export enum StyleOption {
  // --- Basic ---
  MINIMALIST = 'Tối giản hiện đại (Minimalist)',
  FLAT_DESIGN = 'Flat Design (Đồ họa phẳng)',
  
  // --- Artistic ---
  FUTURE_TECH = 'Công nghệ tương lai (Cyberpunk)',
  VN_CLASSIC = 'Cổ điển Việt Nam (Đông Hồ)',
  VN_COUNTRYSIDE = 'Đồng quê Việt Nam (Vietnamese Countryside)',
  ANIME_MANGA = 'Anime/Manga Nhật Bản',
  COMIC_FUN = 'Comic Fun (Truyện tranh)',
  RETRO_VINTAGE = 'Retro/Vintage (Hoài cổ)',
  PAPER_CUT = 'Paper Cutout (Cắt giấy)',
  HAND_DRAWN = 'Vẽ tay (Hand-drawn/Sketch)',
  WATERCOLOR = 'Màu nước (Watercolor)',
  
  // --- 3D & Technical ---
  ISOMETRIC_3D = '3D Isometric (Mô hình nổi)',
  CLAYMORPHISM = 'Claymorphism (Đất sét 3D)',
  STEM = 'Khoa học kỹ thuật (Blueprint)',
  DATA_VIZ = 'Data Visualization (Trực quan hóa)',
  PIXEL_ART = 'Pixel Art (8-bit)'
}

export enum MoodOption {
  // --- Positive ---
  CUTE = 'Dễ thương / Đáng yêu',
  VIVID = 'Sinh động / Rực rỡ',
  INSPIRING = 'Truyền cảm hứng / Hùng tráng',
  CALM_ZEN = 'Tĩnh lặng / Nhẹ nhàng (Zen)',
  
  // --- Educational ---
  ACADEMIC = 'Học thuật / Chuyên nghiệp',
  STUDENT_FRIENDLY = 'Thân thiện / Gần gũi',
  KNOWLEDGE_FOCUSED = 'Tập trung kiến thức',
  
  // --- Specific Vibes ---
  SERIOUS = 'Nghiêm túc / Trang trọng',
  MYSTERIOUS = 'Huyền bí / Khám phá',
  URGENT = 'Cảnh báo / Cấp thiết',
  FUTURISTIC = 'Đột phá / Tiên tiến'
}

export enum GoalOption {
  INTRO = 'Giới thiệu chủ đề mới',
  SYSTEMIZE = 'Hệ thống hóa (Sơ đồ tư duy)',
  SUMMARY = 'Tóm tắt bài học (Summary)',
  
  // --- New Logic Structures ---
  TIMELINE = 'Dòng thời gian (Lịch sử/Tiến trình)',
  COMPARISON = 'So sánh / Đối chiếu (Vs)',
  PROCESS = 'Quy trình / Các bước (Step-by-step)',
  CHECKLIST = 'Danh sách / Quy tắc (Checklist)',
  STORYTELLING = 'Kể chuyện (Storytelling)',
  
  EXTENDED = 'Bài giảng mở rộng',
  EXERCISE = 'Bài tập & Câu hỏi'
}

export enum AudienceOption {
  PRE_SCHOOL = 'Mầm non (3-5 tuổi)',
  PRIMARY = 'Tiểu học (Lớp 1-5)',
  MIDDLE = 'THCS (Lớp 6-9)',
  HIGH = 'THPT (Lớp 10-12)',
  COLLEGE = 'Sinh viên / Đại học',
  GENERAL = 'Đại chúng / Cộng đồng',
  EXPERTS = 'Chuyên gia / Nghiên cứu'
}

export interface OfflineFormData {
  content: string;
  format: string;
  style: string;
  mood: string;
  goal: string;
  audience: string;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
  preview: string;
}
