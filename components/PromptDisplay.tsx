
import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  
  // Copy feedback reset
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    if (!prompt) return;

    try {
      // Cách 1: Sử dụng Clipboard API hiện đại (Yêu cầu HTTPS)
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
    } catch (err) {
      // Cách 2: Fallback cho trình duyệt cũ hoặc lỗi bảo mật
      try {
        const textArea = document.createElement("textarea");
        textArea.value = prompt;
        
        // Đảm bảo textarea không hiển thị làm vỡ giao diện
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
        } else {
          alert("Không thể tự động sao chép. Vui lòng bôi đen và nhấn Ctrl+C.");
        }
      } catch (fallbackErr) {
        console.error('Copy failed', fallbackErr);
        alert("Lỗi sao chép: " + fallbackErr);
      }
    }
  };

  if (!prompt) return null;

  return (
    <div className="w-full mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`overflow-hidden rounded-xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
        
        {/* Header Section */}
        <div className="border-b-2 border-black px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#E2E8F0]">
          
          {/* Label */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Terminal className="w-3.5 h-3.5" />
              KẾT QUẢ PROMPT
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopy}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-bold uppercase border-2 border-black transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] ${
                copied 
                  ? 'bg-[#4ADE80] text-black' 
                  : 'bg-white text-black hover:bg-slate-50'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Đã sao chép
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Sao chép
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white min-h-[150px] relative">
          <p className="text-black text-lg leading-relaxed font-mono whitespace-pre-wrap break-words">
            {prompt}
          </p>
        </div>

      </div>
    </div>
  );
};

export default PromptDisplay;
