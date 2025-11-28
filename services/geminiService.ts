// SERVICE ĐÃ VÔ HIỆU HÓA (OFFLINE MODE ONLY)
// Các hàm này được giữ lại dưới dạng dummy để đảm bảo tương thích nếu có import sót, 
// nhưng không còn thực hiện gọi API.

export const generateOnlinePrompt = async (): Promise<string> => {
  return "";
};

export const optimizeOfflinePrompt = async (): Promise<string> => {
  return "";
};

export const translatePromptToEnglish = async (): Promise<string> => {
  return "";
};