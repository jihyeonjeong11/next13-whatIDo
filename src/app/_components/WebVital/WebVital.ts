'use client';

import { useReportWebVitals } from 'next/web-vitals';

function WebVital() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
}

export default WebVital;
