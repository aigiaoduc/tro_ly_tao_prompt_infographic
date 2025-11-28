
import React, { useState, useEffect } from 'react';
import { 
  OfflineFormData, 
  HistoryItem
} from './types';
import { 
  STYLES, MOODS, GOALS, AUDIENCES, FORMATS,
  STYLE_DETAILS, MOOD_DETAILS, GOAL_DETAILS, AUDIENCES_DETAILS, FORMAT_DETAILS 
} from './constants';
import Button from './components/Button';
import PromptDisplay from './components/PromptDisplay';
import { 
  Cpu, 
  PenTool, 
  GraduationCap, 
  Smile, 
  Palette, 
  Target,
  X,
  Facebook,
  Users,
  Coffee,
  RotateCcw,
  History,
  Trash2,
  Clock,
  Check,
  Copy,
  Image as ImageIcon
} from 'lucide-react';

// --- Internal Component: Creatable Select ---
interface CreatableSelectProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const CreatableSelect: React.FC<CreatableSelectProps> = ({ label, icon, options, value, onChange, placeholder }) => {
  const isCustom = !options.includes(value) && value !== '';
  const [isEditing, setIsEditing] = useState(isCustom);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__CUSTOM__') {
      setIsEditing(true);
      onChange('');
    } else {
      setIsEditing(false);
      onChange(val);
    }
  };

  const inputClasses = "block w-full pl-3 pr-10 py-3 text-base border-2 border-black rounded-lg focus:ring-0 focus:border-black focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] text-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-slate-500 transition-all";

  return (
    <div>
      <label className="block text-sm font-bold text-black uppercase mb-1.5 border-l-4 border-yellow-400 pl-2">
        <span className="flex items-center gap-1.5">{icon} {label}</span>
      </label>
      
      {isEditing ? (
        <div className="relative animate-in fade-in zoom-in duration-200">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Nhập nội dung tùy chỉnh..."}
            className={inputClasses}
            autoFocus
          />
          <button
            onClick={() => { setIsEditing(false); onChange(options[0]); }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-red-600 font-bold"
            title="Quay lại danh sách"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <select
          value={value}
          onChange={handleSelectChange}
          className={inputClasses}
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          <option value="__CUSTOM__" className="font-bold text-indigo-700">✎ Tự nhập (Khác)...</option>
        </select>
      )}
    </div>
  );
};

const App: React.FC = () => {
  // Offline State
  const initialOfflineData = {
    content: '',
    format: FORMATS[0],
    style: STYLES[0],
    mood: MOODS[0],
    goal: GOALS[0],
    audience: AUDIENCES[0]
  };
  const [offlineData, setOfflineData] = useState<OfflineFormData>(initialOfflineData);

  // Result State
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [viewingHistoryItem, setViewingHistoryItem] = useState<HistoryItem | null>(null);
  const [modalCopied, setModalCopied] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('prompt_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('prompt_history', JSON.stringify(history));
  }, [history]);

  // Handlers
  const handleOfflineChange = (field: keyof OfflineFormData, value: string) => {
    setOfflineData(prev => ({ ...prev, [field]: value }));
    setGeneratedPrompt(''); // Clear result when changing inputs
  };

  const addToHistory = (prompt: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      prompt,
      timestamp: Date.now(),
      preview: offlineData.content || "Infographic không tên"
    };

    setHistory(prev => [newItem, ...prev].slice(0, 10)); // Keep last 10 items
  };

  const handleReset = () => {
    setOfflineData(initialOfflineData);
    setGeneratedPrompt('');
  };

  const clearHistory = () => {
    if(window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
      setHistory([]);
    }
  };

  const openHistoryModal = (item: HistoryItem) => {
    setViewingHistoryItem(item);
    setModalCopied(false);
  };

  const closeHistoryModal = () => {
    setViewingHistoryItem(null);
    setModalCopied(false);
  };

  const handleModalCopy = async () => {
    if (viewingHistoryItem) {
      await navigator.clipboard.writeText(viewingHistoryItem.prompt);
      setModalCopied(true);
      setTimeout(() => setModalCopied(false), 2000);
    }
  };

  const generateOfflinePrompt = () => {
    const { content, format, style, mood, goal, audience } = offlineData;
    if (!content.trim()) return;

    // --- XỬ LÝ LOGIC HEADER (Infographic vs Poster) ---
    const isPoster = format.includes("Poster");
    const headerTitle = isPoster ? "**TẠO ẢNH POSTER**" : "**TẠO ẢNH INFOGRAPHIC**";
    
    // --- XỬ LÝ FALLBACK CHO "TỰ NHẬP" (Custom Input) ---
    
    // 0. Format Detail
    const formatDescription = FORMAT_DETAILS[format]
      ? `${format} (${FORMAT_DETAILS[format]})`
      : `${format} (Format tùy chỉnh, hãy tự động điều chỉnh bố cục phù hợp)`;

    // 1. Style
    const styleDescription = STYLE_DETAILS[style] 
      ? `${style} (${STYLE_DETAILS[style]})` 
      : `${style} (Phong cách tùy chỉnh: Sử dụng các yếu tố nghệ thuật đặc trưng của phong cách "${style}", đảm bảo tính thẩm mỹ cao và đồng bộ)`;

    // 2. Mood
    const moodDescription = MOOD_DETAILS[mood]
      ? `${mood} (${MOOD_DETAILS[mood]})`
      : `${mood} (Không khí tùy chỉnh: Truyền tải cảm xúc "${mood}" thông qua màu sắc, ánh sáng và đường nét)`;

    // 3. Goal
    const goalDescription = GOAL_DETAILS[goal]
      ? `${goal} (${GOAL_DETAILS[goal]})`
      : `${goal} (Mục tiêu tùy chỉnh: Sắp xếp bố cục để đạt được mục tiêu "${goal}" một cách rõ ràng nhất)`;

    // 4. Audience
    const audienceDescription = AUDIENCES_DETAILS[audience]
      ? `${audience} (${AUDIENCES_DETAILS[audience]})`
      : `${audience} (Đối tượng tùy chỉnh: Điều chỉnh độ phức tạp của hình ảnh phù hợp cho nhóm "${audience}")`;

    // Template Prompt nâng cấp
    const template = `${headerTitle}

-- HƯỚNG DẪN THIẾT KẾ (DESIGN GUIDELINES) --
(Lưu ý cho AI: Đây là quy tắc vẽ, KHÔNG phải văn bản để viết lên ảnh)
1. **Định dạng (Format)**: ${formatDescription}
2. **Phong cách nghệ thuật (Art Style)**: ${styleDescription}
3. **Không khí & Màu sắc (Mood & Color)**: ${moodDescription}
4. **Cấu trúc & Bố cục (Structure)**: ${goalDescription}
5. **Đối tượng mục tiêu (Audience)**: ${audienceDescription}

-- MÔ TẢ HÌNH ẢNH CẦN VẼ (VISUAL CONTENT) --
Hãy vẽ một ${isPoster ? "tấm Poster" : "tấm Infographic"} giáo dục chuyên nghiệp về chủ đề: "${content}".`;

    setGeneratedPrompt(template);
    addToHistory(template);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex flex-col font-sans text-black relative">
      {/* Header */}
      <header className="bg-white border-b-4 border-black sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#8B5CF6] p-2.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight leading-none">
              Trợ Lý Prompt <br className="sm:hidden" /> Infographic Giáo Dục
            </h1>
          </div>
          {/* Settings and Mode toggles removed for offline-only version */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-10 sm:px-6">
        
        {/* Intro Text */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-black mb-4 uppercase tracking-wide">
            Công Cụ Tạo Prompt Nhanh
          </h2>
          <div className="inline-block bg-[#A7F3D0] px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 mb-6">
             <p className="text-black font-bold text-sm sm:text-base">
              Điền mẫu → Tạo prompt Infographic/Poster → Không cần mạng
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-bold mt-2">
            <a 
              href="https://www.facebook.com/tran.hong.quan.216221/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:bg-blue-100 px-2 py-1 border border-transparent hover:border-black transition-all rounded-sm"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
            <span className="text-black font-black hidden sm:inline">/</span>
            <a 
              href="https://www.facebook.com/groups/1390746932674995" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:bg-indigo-100 px-2 py-1 border border-transparent hover:border-black transition-all rounded-sm"
            >
              <Users className="w-4 h-4" />
              <span>Group FB</span>
            </a>
            <span className="text-black font-black hidden sm:inline">/</span>
            <a 
              href="https://ung-ho-tac-gia.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:bg-orange-100 px-2 py-1 border border-transparent hover:border-black transition-all rounded-sm"
            >
              <Coffee className="w-4 h-4" />
              <span>Ủng Hộ Cafe</span>
            </a>
          </div>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-3 border-black overflow-hidden relative">
            <div className="p-6 sm:p-8 space-y-8">
              {/* Reset Button */}
              <div className="absolute top-4 right-4">
                 <button 
                  onClick={handleReset}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Làm mới form"
                 >
                   <RotateCcw className="w-5 h-5" />
                 </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-black uppercase mb-2 border-l-4 border-indigo-500 pl-2">
                  Nội dung chính Infographic <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PenTool className="h-5 w-5 text-black" />
                  </div>
                  <input
                    type="text"
                    value={offlineData.content}
                    onChange={(e) => handleOfflineChange('content', e.target.value)}
                    placeholder="Nhập nội dung chính (VD: Vòng đời của nước, Lịch sử Việt Nam...)"
                    className="block w-full pl-10 pr-3 py-3 border-2 border-black rounded-lg focus:ring-0 focus:shadow-none focus:translate-x-[4px] focus:translate-y-[4px] text-black placeholder:text-slate-500 sm:text-base bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                </div>
              </div>

              {/* Format Selection Row */}
              <div>
                <CreatableSelect 
                  label="Định dạng ảnh (Format)"
                  icon={<ImageIcon className="w-4 h-4 text-black"/>}
                  options={FORMATS}
                  value={offlineData.format}
                  onChange={(val) => handleOfflineChange('format', val)}
                  placeholder="Chọn định dạng..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CreatableSelect 
                  label="Phong cách"
                  icon={<Palette className="w-4 h-4 text-black"/>}
                  options={STYLES}
                  value={offlineData.style}
                  onChange={(val) => handleOfflineChange('style', val)}
                  placeholder="Nhập phong cách tùy ý..."
                />

                <CreatableSelect 
                  label="Tính chất / Cảm xúc"
                  icon={<Smile className="w-4 h-4 text-black"/>}
                  options={MOODS}
                  value={offlineData.mood}
                  onChange={(val) => handleOfflineChange('mood', val)}
                  placeholder="Nhập cảm xúc tùy ý..."
                />

                <CreatableSelect 
                  label="Mục tiêu bài học"
                  icon={<Target className="w-4 h-4 text-black"/>}
                  options={GOALS}
                  value={offlineData.goal}
                  onChange={(val) => handleOfflineChange('goal', val)}
                  placeholder="Nhập mục tiêu tùy ý..."
                />

                <CreatableSelect 
                  label="Đối tượng học sinh"
                  icon={<GraduationCap className="w-4 h-4 text-black"/>}
                  options={AUDIENCES}
                  value={offlineData.audience}
                  onChange={(val) => handleOfflineChange('audience', val)}
                  placeholder="Nhập đối tượng tùy ý..."
                />
              </div>

              <div className="pt-6 flex justify-end border-t-2 border-dashed border-slate-300">
                <Button 
                  onClick={generateOfflinePrompt}
                  disabled={!offlineData.content.trim()}
                  className="w-full md:w-auto text-base"
                >
                  Tạo Prompt Ngay
                </Button>
              </div>
            </div>
        </div>

        {/* Result Display */}
        <PromptDisplay prompt={generatedPrompt} />

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
             {/* History Container */}
             <div className="bg-white border-3 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
               
               {/* History Header */}
               <div className="bg-[#FFEDD5] border-b-3 border-black p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-black uppercase flex items-center gap-2">
                      <History className="w-5 h-5" /> Lịch sử hoạt động
                    </h3>
                    <p className="text-xs font-bold text-slate-600 mt-1 italic">
                      * Chỉ lưu 10 prompt gần nhất
                    </p>
                  </div>
                  
                  <button 
                    onClick={clearHistory}
                    className="px-3 py-1.5 bg-red-100 hover:bg-red-200 border-2 border-black text-xs font-bold text-red-600 uppercase transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-md flex items-center gap-1 w-fit"
                  >
                    <Trash2 className="w-3 h-3" /> Xóa tất cả
                  </button>
               </div>

               {/* History List - Scrollable */}
               <div className="max-h-[300px] overflow-y-auto p-4 space-y-3 custom-scrollbar">
                 {history.map((item) => (
                   <div 
                      key={item.id}
                      onClick={() => openHistoryModal(item)}
                      className="group cursor-pointer bg-white border-2 border-black p-3 hover:bg-yellow-50 transition-all active:translate-x-[2px] active:translate-y-[2px] shadow-[3px_3px_0px_0px_#e5e7eb] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg flex items-center justify-between gap-4"
                   >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.timestamp).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-black truncate">
                          {item.preview}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold underline decoration-2">Xem</span>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        )}

      </main>

      <footer className="bg-white border-t-4 border-black mt-auto">
        <div className="max-w-5xl mx-auto py-8 px-4 text-center">
          <p className="text-black text-sm font-bold uppercase tracking-wider">
            © 2025 Bản quyền thuộc về Thầy giáo Trần Hồng Quân.
          </p>
        </div>
      </footer>

      {/* History Modal Popup */}
      {viewingHistoryItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeHistoryModal}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b-4 border-black flex items-center justify-between bg-green-300">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-black" />
                <h3 className="text-lg font-black uppercase text-black">
                  Chi tiết Prompt
                </h3>
              </div>
              <button 
                onClick={closeHistoryModal}
                className="bg-white hover:bg-red-500 hover:text-white border-2 border-black p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
              <p className="font-mono text-black whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                {viewingHistoryItem.prompt}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t-4 border-black bg-slate-50 flex justify-end">
              <button
                onClick={handleModalCopy}
                className={`flex items-center justify-center gap-2 px-6 py-2 text-sm font-bold uppercase border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${
                  modalCopied 
                    ? 'bg-[#4ADE80] text-black' 
                    : 'bg-black text-white hover:bg-slate-800'
                }`}
              >
                {modalCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Đã sao chép
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Sao chép Prompt
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
