import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { useCallback, useEffect } from 'react';
import bcrypt from 'react-native-bcrypt';
import { updateLockState } from 'stores/AppState';

export interface UseAppLockOptions {
  isLocked: boolean;
  unlock: (code: string) => boolean;
  lock: () => void;
}

export default function useAppLock(): UseAppLockOptions {
  const isLocked = useSelector((state: RootState) => state.appState.isLocked);
  const { pinCode, pinCodeEnabled } = useSelector((state: RootState) => state.mobileSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLockState(pinCodeEnabled));
  }, [dispatch, pinCodeEnabled]);

  const unlock = useCallback(
    (code: string) => {
      const compareRs = bcrypt.compareSync(code, pinCode);
      dispatch(updateLockState(!compareRs));
      return compareRs;
    },
    [dispatch, pinCode],
  );

  const lock = useCallback(() => {
    dispatch(updateLockState(true));
  }, [dispatch]);

  return { isLocked, unlock, lock };
}
