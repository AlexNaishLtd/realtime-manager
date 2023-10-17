import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const useRequireSession = () => {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace('/');
    }
  });

  return { status, data };
};
