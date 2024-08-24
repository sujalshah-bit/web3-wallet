// storeAccess.ts
import useStore from '@/store/store';

export const getAccountsData = () => {
  const state = useStore.getState(); // Use getState instead of get
  return state.accounts;
};