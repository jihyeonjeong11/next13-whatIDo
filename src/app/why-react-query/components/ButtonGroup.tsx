'use client';

import React, { Dispatch, SetStateAction } from 'react';
import '../styles/index.css';

type ButtonGroupType = {
  handleSetId: Dispatch<SetStateAction<number>>;
};

const ButtonGroup = ({ handleSetId }: ButtonGroupType) => {
  const handlePrevious = () => handleSetId((id) => (id > 1 ? id - 1 : id));
  const handleNext = () => handleSetId((id) => id + 1);

  return (
    <div className="button-group">
      <button type="button" name="previous" onClick={handlePrevious}>
        ←
      </button>
      <button type="button" name="next" onClick={handleNext}>
        →
      </button>
    </div>
  );
};

export default ButtonGroup;
