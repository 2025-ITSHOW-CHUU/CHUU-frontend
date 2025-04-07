import { create } from "zustand";

const useImageStore = create<{
  file: File | null;
  setFile: (file: File | null) => void;
  teacherName: string;
  setTeacherName: (teacherName: string) => void;
}>((set) => ({
  file: stringToFile(sessionStorage.getItem("file")) || null,
  setFile: (file) => {
    set({ file });
    if (file) {
      sessionStorage.setItem("file", JSON.stringify(file));
    }
  },
  teacherName: sessionStorage.getItem("teacherName") || "",
  setTeacherName: (teacherName) => {
    set({ teacherName });
    sessionStorage.setItem("teacherName", teacherName);
  },
}));

function stringToFile(fileString: string | null): File | null {
  if (!fileString) return null;
  try {
    const parsed = JSON.parse(fileString);
    return new File([parsed.content], parsed.name, { type: parsed.type });
  } catch {
    return null;
  }
}

const storedFileString = sessionStorage.getItem("file");
const storedFile = stringToFile(storedFileString);
useImageStore.setState({ file: storedFile });

export default useImageStore;
