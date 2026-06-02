import { useEffect, useState } from 'react';
import { loadWeddingInfo } from '../lib/loadWeddingInfo';
import type { WeddingInfo } from '../types/wedding';

export function useWeddingInfo() {
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadWeddingInfo().then((info) => {
      if (!cancelled) setWeddingInfo(info);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { weddingInfo, isLoading: weddingInfo === null };
}
