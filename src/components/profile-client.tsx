'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className='absolute top-6 right-6 flex gap-2 justify-center items-center'>
        <img className='rounded-full w-10' src={user.picture || ""} alt={user.name || ""} />
      </div>
    )
  );
}
