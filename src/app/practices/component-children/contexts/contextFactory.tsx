'use client';

import { createContext, memo, useContext } from 'react';

// A factory function for reusing context and context handler hook.
// A factory function is a function that returns an object to handle object more controllable manner. https://www.geeksforgeeks.org/what-are-factory-functions-in-javascript/
const contextFactory = <T,>(
  useContextState: () => T, // Handler gets generic type, since it can be everything.
  ContextComponent?: JSX.Element, // we might not need this since we don't define anything on declare.
): {
  Provider: React.MemoExoticComponent<FC>; // returns Provider, React.FC that actually renders children
  useContext: () => T; // returns handler hook.
} => {
  const Context = createContext(Object.create(null) as T); //

  const Provider = memo<FC>(({ children }) => (
    <Context.Provider value={useContextState()}>
      {children}
      {ContextComponent}
    </Context.Provider>
  ));

  Provider.displayName = 'YourProviderComponentDisplayName';
  return {
    Provider,
    useContext: () => useContext(Context),
  };
};

export default contextFactory;
