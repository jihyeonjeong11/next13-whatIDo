'use client';

import type { Dispatch, SetStateAction } from 'react';

type ButtonGroupType = {
  handleSetId: Dispatch<SetStateAction<number>>;
};

const ButtonGroup = ({ handleSetId }: ButtonGroupType) => {
  const handlePrevious = () => handleSetId((id) => (id > 1 ? id - 1 : id));
  const handleNext = () => handleSetId((id) => id + 1);

  return (
    <div className="p-6 flex justify-center gap-2">
      <button
        type="button"
        name="previous"
        onClick={handlePrevious}
        className="w-8 h-8 text-black rounded-2xl bg-[#f9f4da] cursor-pointer border border-black font-bold shadow-[0_0_0_1px_rgba(255,255,255,1),0_0_32px_rgba(0,0,0,0.2)]"
      >
        ←
      </button>
      <button
        type="button"
        name="next"
        onClick={handleNext}
        className="w-8 h-8 text-black rounded-2xl bg-[#f9f4da] cursor-pointer border border-black font-bold shadow-[0_0_0_1px_rgba(255,255,255,1),0_0_32px_rgba(0,0,0,0.2)]"
      >
        →
      </button>
    </div>
  );
};

export default ButtonGroup;
