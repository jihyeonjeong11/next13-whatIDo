/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

'use client';

import React, { useState } from 'react';
import '@/app/use-phone-css/styles/phone.css';
import StatusSvg from '../components/use-phone/svg/StatusSvg';

export default function UsePhone() {
  const [hide, setHide] = useState(true);

  return (
    <main
      onClick={() => {
        if (!hide) {
          setHide(true);
        }
      }}
      className="flex min-h-screen flex-col items-center justify-center p-24"
    >
      <div className={`layer-phone tempsize ${hide ? 'open' : ''}`}>
        <div className={`lockscreen ${hide ? '' : 'hide'}`}>
          <button
            type="button"
            aria-label="hide"
            onClick={(e) => {
              e.stopPropagation();
              setHide((prev) => !prev);
            }}
          >
            <figcaption>hide</figcaption>
          </button>
        </div>
        <div className="phone-island">
          <div className="phone-camera" />
        </div>
        <div className="phone-status">
          <StatusSvg />
        </div>
      </div>
    </main>
  );
}
