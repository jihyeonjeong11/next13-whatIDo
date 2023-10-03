import { createContext, memo, useContext } from 'react';

const contextFactory = <T,>(
  useContextState: () => T,
  ContextComponent?: JSX.Element
): {
  Provider: React.MemoExoticComponent<FC>;
  useContext: () => T;
} => {
  const Context = createContext(Object.create(null) as T);

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
