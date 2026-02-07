'use client';

import contextFactory from '../contextFactory';
import useTodoContext from './useTodoContext';

const { Provider, useContext } = contextFactory(useTodoContext);

export { Provider as TodoProvider, useContext as useTodo };
