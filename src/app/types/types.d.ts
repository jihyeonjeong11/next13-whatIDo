/**
 * Functional Component
 */

type FC<TProps = Record<string, unknown>> = (
  props: React.PropsWithChildren<TProps>,
) => JSX.Element | null;

type HTMLElementWithPriority<T> = T & {
  fetchPriority?: 'auto' | 'high' | 'low';
};

// vanta
declare module 'vanta/dist/vanta.net.min';
declare module 'vanta/dist/vanta.halo.min';
