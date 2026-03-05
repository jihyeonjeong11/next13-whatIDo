'use client';
// https://nextjs.org/docs/app/guides/analytics
import { useReportWebVitals } from 'next/web-vitals';

function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return <></>;
}

export default WebVitals;
