import dynamic from 'next/dynamic';

export const GraphView = dynamic(() => import('./GraphView').then((res) => res.GraphView));
