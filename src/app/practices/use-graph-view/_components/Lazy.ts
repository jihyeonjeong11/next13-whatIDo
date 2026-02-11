import dynamic from 'next/dynamic';

export const GraphView = dynamic(() => import('./Graph-View').then((res) => res.GraphView));
