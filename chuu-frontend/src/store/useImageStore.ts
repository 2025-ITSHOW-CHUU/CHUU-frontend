import { create } from "zustand";

const useImageStore = create<{
  file: File | null;
  setFile: (file: File | null) => void;
  teacherName: string;
  setTeacherName: (teacherName: string) => void;
}>((set) => ({
  file: null,
  setFile: (file) => {
    set({ file });
  },
  teacherName: "",
  setTeacherName: (teacherName) => {
    set({ teacherName });
    sessionStorage.setItem("teacherName", teacherName);
  },
}));

export default useImageStore;
