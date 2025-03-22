import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { styles, COLORS } from './styles';

export default function HomeRedirect() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (navigationState?.key) {
      // Always redirect to start page when app opens
      router.replace('/start');
    }
  }, [navigationState]);

  return null; // optionally render a loading view
}
