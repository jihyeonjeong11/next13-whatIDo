'use client'
import { ProcessProvider, useProcesses } from "../contexts/process";
import Window from "../components/use-window/window";
import StyledApp from "../components/use-window/StyledApp";
import { ErrorBoundary } from "../components/common/ErrorBoundary";

export default function UseWindowPage() {
  const {processes} = useProcesses()
  console.log(processes)
  // need ViewPortContext
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProcessProvider>
        <ErrorBoundary>
          <StyledApp />
        </ErrorBoundary>
      </ProcessProvider>
    </main>
  );
}

// here's strategy.
// skip useProcess for now. maybe i don't.
//

// dependencies...
// AppsLoader
// RenderComponent
// window index.tsx
// rndWindow index.tsx and all dependencies

// install react-rnd https://github.com/bokuweb/react-rnd
//
