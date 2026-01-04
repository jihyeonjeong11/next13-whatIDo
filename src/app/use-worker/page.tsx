'use client';

import Clock from '../components/use-worker/clock';
import NoWorkerClock from '../components/use-worker/NoWorkerClock';
import StyledTaskbar from '../components/use-worker/StyledTaskBar';

export default function UseWorkerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StyledTaskbar >
        <span className="text-white">With Web worker</span> <Clock />
      </StyledTaskbar>
      <StyledTaskbar $bottom={100}>
         <span className="text-white">Without Web worker</span><NoWorkerClock />
      </StyledTaskbar>


    </main>
  );
}
