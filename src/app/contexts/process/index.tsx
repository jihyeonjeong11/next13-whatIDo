import contextFactory from '../ContextFactory';
import useProcessContextState from './';

const { Provider, useContext } = contextFactory(useProcessContextState);

export { Provider as ProcessProvider, useContext as useProcesses };
