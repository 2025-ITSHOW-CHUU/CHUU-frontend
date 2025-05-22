import { create } from "zustand";

// base64 변환 함수
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject("base64 변환 실패");
    };
    reader.onerror = (err) => reject(err);
  });

// base64 -> File 변환 함수
const base64ToFile = (base64: string, filename: string, mimeType: string) => {
  const arr = base64.split(",");
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mimeType });
};

type FourCutInfoType = {
  teacher: string;
  title: string;
  frames: string[];
  finalFrame: string;
};

type StoreType = {
  fourCutInfo: FourCutInfoType | null;
  setFourCutInfo: (fourCutInfo: FourCutInfoType) => void;
  getFourCutInfo: () => FourCutInfoType | null;
  fourCutImage: File | null;
  setFourCutImage: (file: File | null) => Promise<void>;
  getFourCutImage: () => File | null;
};

const useFourCutInfoStore = create<StoreType>((set, get) => ({
  fourCutInfo: null,
  setFourCutInfo: (fourCutInfo) => {
    set({ fourCutInfo });
    sessionStorage.setItem("fourcutInfo", JSON.stringify(fourCutInfo));
  },
  getFourCutInfo: () => {
    const storedInfo = sessionStorage.getItem("fourcutInfo");
    console.log(storedInfo);
    return storedInfo ? JSON.parse(storedInfo) : null;
  },
  fourCutImage: null,
  setFourCutImage: async (file) => {
    set({ fourCutImage: file });
    if (file) {
      const base64 = await fileToBase64(file);
      sessionStorage.setItem("fourCutImageBase64", base64);
      sessionStorage.setItem("fourCutImageName", file.name);
      sessionStorage.setItem("fourCutImageType", file.type);
    } else {
      sessionStorage.removeItem("fourCutImageBase64");
      sessionStorage.removeItem("fourCutImageName");
      sessionStorage.removeItem("fourCutImageType");
    }
  },
  getFourCutImage: () => {
    const base64 = sessionStorage.getItem("fourCutImageBase64");
    const name =
      sessionStorage.getItem("fourCutImageName") || "fourCutImage.png";
    const type = sessionStorage.getItem("fourCutImageType") || "image/png";
    if (base64) {
      return base64ToFile(base64, name, type);
    }
    return null;
  },
}));

export default useFourCutInfoStore;
