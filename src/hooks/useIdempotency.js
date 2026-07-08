import React from "react";
import { useState, useCallback } from 'react';
import { generateIdempotencyKey } from '../utils/helpers';
import { useStore } from '../store/store';

export const useIdempotency = () => {
  const [currentKey, setCurrentKey] = useState(null);
  const user = useStore((state) => state.user);

  const renewKey = useCallback(() => {
    const key = generateIdempotencyKey(user?.id || 'anonymous');
    setCurrentKey(key);
    return key;
  }, [user]);

  const getOrRenewKey = useCallback(() => {
    if (currentKey) return currentKey;
    return renewKey();
  }, [currentKey, renewKey]);

  return {
    idempotencyKey: currentKey || getOrRenewKey(),
    renewKey,
  };
};
export default useIdempotency;
