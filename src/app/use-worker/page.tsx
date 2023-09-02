'use client';

import Clock from '../components/use-worker/clock';
import StyledTaskbar from '../components/use-worker/StyledTaskBar';

export default function UseWorker() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StyledTaskbar>
        <Clock />
      </StyledTaskbar>
    </main>
  );
}
