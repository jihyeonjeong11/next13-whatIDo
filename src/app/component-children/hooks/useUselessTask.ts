import { useEffect, useState } from 'react';
import { delay } from '@/app/utils/functions';
import { TodoType } from '../types';

type Id = TodoType['id'];
type Status = 'loading' | 'loaded' | 'error';
type UseUselessTaskResult = [Status];

const useUselessTask = (id: Id): UseUselessTaskResult => {
  const [status, setStatus] = useState<Status>('loading');

  const uselessTask = () => {
    delay()
      .then(() => setStatus('loaded'))
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    uselessTask();
  }, [id]);

  return [status];
};

export default useUselessTask;
