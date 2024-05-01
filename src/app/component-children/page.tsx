'use client';

import React from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export default function UseComponentChildren() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ErrorBoundary>123123123</ErrorBoundary>
    </main>
  );
}
