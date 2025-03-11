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
                  <div className={styles.bocina} />
                  <div className={styles.camera} />
                </div>
                {/* styles.blocked need animation to turn on effect */}
                <div className={`${styles.mainScreen}`}>
                  <div className={styles['status-bar']}>
                    <div className={styles.leftside}>
                      <div className="operador">Telcel</div>
                    </div>
                    <div className={styles.rightside}>
                      <div className={`${styles.signal} ${styles.mid}`}>
                        <div className={styles.bar} />
                      </div>
                      <div className={styles.data}>5G</div>
                      <div className={`${styles.battery} ${styles.mid}`} />
                    </div>
                  </div>
                  <div className={styles.lockScreen}>
                    <div className={styles.up}>
                      <div className={styles.lockIcon} />
                      <div className={styles.time}>
                        {(function () {
                          const now = new Date();

                          const hours = String(now.getHours()).padStart(2, '0');
                          const minutes = String(now.getMinutes()).padStart(
                            2,
                            '0',
                          );

                          return `${hours}:${minutes}`;
                        })()}
                      </div>
                      <div className={styles.date}>
                        {new Intl.DateTimeFormat('en-US', {
                          weekday: 'long', // Full weekday name
                          day: '2-digit',
                          month: 'long', // Full month name
                        }).format(new Date())}
                      </div>
                    </div>
                    <div className={styles.down}>
                      <div className={`${styles.sysIcon} ${styles.flash}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0"
                          y="0"
                          viewBox="0 0 400 400"
                        >
                          <path d="M117,62.85v13.72c0,32.45,10.64,61.49,27.43,81.57v206.43h109.71V158.14c16.79-20.08,27.43-49.12,27.43-81.57 V62.85H117z M203.37,246.86c0,6.45-10,6.43-10,0v-41.88c0-6.45,10-6.43,10,0V246.86z M259.35,73.33H136.65c-6.45,0-6.43-10,0-10 h122.69C265.79,63.33,265.78,73.33,259.35,73.33z" />
                          <path d="M144.43,364.57v13.71c0,7.57,6.14,13.72,13.71,13.72h82.29c7.57,0,13.71-6.15,13.71-13.72v-13.71H144.43z M144.43,364.57" />
                          <path d="M267.86,8H130.71C123.14,8,117,14.14,117,21.71v41.14h164.57V21.71C281.57,14.14,275.43,8,267.86,8L267.86,8z M267.86,8" />
                          <path d="M267.86,8h-68.57v54.85h-82.07v13.72h164.35V21.71C281.57,14.14,275.43,8,267.86,8z M259.35,73.33H136.65 c-6.45,0-6.43-10,0-10h122.69C265.79,63.33,265.78,73.33,259.35,73.33z" />
                          <path d="M199.29,364.57v13.71h-54.86c0,7.57,6.14,13.72,13.71,13.72h82.29c7.57,0,13.71-6.15,13.71-13.72v-13.71 H199.29z M199.29,364.57" />
                          <path d="M257.68,153.45c5.97-8.05,11-17.29,14.9-27.46C268.35,136.16,263.34,145.37,257.68,153.45L257.68,153.45z M257.68,153.45" />
                          <path d="M199.29,158.85c-15.13,0-27.43,12.29-27.43,27.43c0,13.11,9.22,24.07,21.51,26.78v-8.09c0-6.45,10-6.43,10,0 v8.43c13.2-1.98,23.35-13.37,23.35-27.13C226.72,171.15,214.41,158.85,199.29,158.85z" />
                          <path d="M218.68,166.9l-9.7,9.69c-2.48-2.48-5.91-4.02-9.7-4.02c-7.55,0-13.72,6.14-13.72,13.71 c0,3.79,1.54,7.22,4.02,9.7l-9.7,9.7c3.84,3.84,8.53,6.29,13.47,7.37v-8.07c0-6.45,10-6.43,10,0v8.41 c5.61-0.84,11-3.41,15.31-7.72C229.39,194.98,229.38,177.58,218.68,166.9z" />
                        </svg>
                      </div>
                      <div className={`${styles.sysIcon} ${styles.flash}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0"
                          y="0"
                          viewBox="0 0 512 512"
                        >
                          <circle cx="256" cy="296" r="81" />
                          <path d="m374.297 91-5.177-25.883c-2.794-13.974-15.166-24.117-29.417-24.117h-167.406c-14.25 0-26.623 10.143-29.417 24.117l-5.177 25.883z" />
                          <path d="m467 121c-35.223 0-405.516 0-422 0-24.813 0-45 20.187-45 45v260c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45v-260c0-24.813-20.187-45-45-45zm-339 94h-48c-8.284 0-15-6.716-15-15s6.716-15 15-15h48c8.284 0 15 6.716 15 15s-6.716 15-15 15zm128 192c-61.206 0-111-49.794-111-111s49.794-111 111-111 111 49.794 111 111-49.794 111-111 111z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
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
