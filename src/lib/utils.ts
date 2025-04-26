import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import UserAPI from "./api/user/users";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fileUploader = async (file: any, folderPath?: any) => {
  const formData = new FormData();
  formData.append("document", file);

  try {
    const response = await UserAPI.uploadDoc(formData, folderPath);
    if (response && response.data && response.data.body) {
      const parsedResponse = response.data.body;
      return {
        url: parsedResponse.url,
        error: response.data.error,
        name: parsedResponse.name,
        mimetype: parsedResponse.mimetype,
      };
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
