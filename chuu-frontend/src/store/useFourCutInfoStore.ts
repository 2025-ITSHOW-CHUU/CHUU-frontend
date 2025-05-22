import { create } from "zustand";

type FourCutInfoType = {
  teacher: string;
  title: string;
  frames: string[];
  finalFrame: string;
};

const useFourCutInfoStore = create<{
  fourCutInfo: FourCutInfoType | null;
  setFourCutInfo: (fourCutInfo: FourCutInfoType) => void;
}>((set) => ({
  fourCutInfo: null,
  setFourCutInfo: (fourCutInfo) => {
    set({ fourCutInfo });
    sessionStorage.setItem("fourcutInfo", JSON.stringify(fourCutInfo));

    return { fourCutInfo: fourCutInfo };
  },
}));

export default useFourCutInfoStore;
