'use client';

import React, { Dispatch, SetStateAction } from 'react';
import '../styles/index.css';

const ButtonGroup = ({
  setId,
}: {
  setId: Dispatch<SetStateAction<number>>;
}) => {
  const handlePrevious = () => setId((id) => (id > 1 ? id - 1 : id));
  const handleNext = () => setId((id) => id + 1);

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
