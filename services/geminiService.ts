import { OfflineFormData } from "../types";

// SERVICE ĐÃ VÔ HIỆU HÓA (OFFLINE MODE ONLY)
// Các hàm này được giữ lại dưới dạng dummy để đảm bảo tương thích nếu có import sót, 
// nhưng không còn thực hiện gọi API.

export const generateOnlinePrompt = async (userInput: string, format: string): Promise<string> => {
  return "";
};

export const optimizeOfflinePrompt = async (data: OfflineFormData): Promise<string> => {
  return "";
};

export const translatePromptToEnglish = async (vietnamesePrompt: string): Promise<string> => {
  return "";
};
