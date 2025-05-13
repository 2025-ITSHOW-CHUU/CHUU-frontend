import { create } from "zustand";

type TestType = {
  testNumber: number;
  testScore: number;
};

const useTestScoreStore = create<{
  scores: TestType[] | null;
  setScores: (scores: TestType[] | null) => void;
  addScore: (index: number, score: number) => void;
}>((set) => ({
  scores: null,
  setScores: (scores) => {
    set({ scores });
  },
  addScore: (index: number, score: number) => {
    set((state) => {
      if (!state.scores) {
        return { scores: [{ testNumber: index, testScore: score }] };
      }
      return {
        scores: [...state.scores, { testNumber: index, testScore: score }],
      };
    });
  },
}));

export default useTestScoreStore;
