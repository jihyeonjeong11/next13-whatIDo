import styles from './styles/phone-css.module.scss';

export default function usePhone() {
  return (
    <main className={styles.main}>
      <section className={styles['iphone-mock']}>
        <div className={styles.container}>
          <div className={styles.iphone}>
            <div className={styles['iphone-border']}>
              <div className={styles.buttons}>
                <div className={styles.switch} />
                <div className={styles.vol} />
                <div className={styles['vol-down']} />
                <div className={styles['touch-id']} />
              </div>
              <div className="backslide" />
              <div className={styles['border-black']}>
                <div className={styles.notch}>
                  <div className={styles.bocina}></div>
                  <div className={styles.camera}></div>
                </div>
                <div className={styles.mainScreen} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import '@/app/use-phone-css/styles/phone.css';
// import StatusSvg from '../components/use-phone/svg/StatusSvg';

// export default function UsePhone() {
//   const [hide, setHide] = useState(true);

//   return (
//     <main
//       onClick={() => {
//         if (!hide) {
//           setHide(true);
//         }
//       }}
//       className="flex min-h-screen flex-col items-center justify-center p-24"
//     >
//       <div className={`layer-phone tempsize ${hide ? 'open' : ''}`}>
//         <div className={`lockscreen ${hide ? '' : 'hide'}`}>
//           <button
//             type="button"
//             aria-label="hide"
//             onClick={(e) => {
//               e.stopPropagation();
//               setHide((prev) => !prev);
//             }}
//           >
//             <figcaption>hide</figcaption>
//           </button>
//         </div>
//         <div className="phone-island">
//           <div className="phone-camera" />
//         </div>
//         <div className="phone-status">
//           <StatusSvg />
//         </div>
//       </div>
//     </main>
//   );
// }
