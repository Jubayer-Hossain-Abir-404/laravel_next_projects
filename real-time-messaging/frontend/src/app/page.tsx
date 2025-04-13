'use client';
import Echo from 'laravel-echo';
import { useState } from 'react';
import { User } from './types/user';
import Pusher from 'pusher-js';

const RealTime = () => {
  const [userInfo, setUserInfo] = useState<User | null>();

  const pusher = new Pusher(process.env.NEXT_PUBLIC_REVERB_APP_KEY as string, {
    cluster: String(process.env.NEXT_PUBLIC_REVERB_CLUSTER),
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ? parseInt(process.env.NEXT_PUBLIC_REVERB_PORT, 10) : 80,
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ? parseInt(process.env.NEXT_PUBLIC_REVERB_PORT, 10) : 443,
    forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
  });

  const echo = new Echo({
    broadcaster: 'reverb',
    client: pusher,
  });

  const channel = echo.channel("public-updates");

  channel
    .listen(".public.notification", (event: {  userInfo: User } ) => {
      console.log(event);
      setUserInfo(event?.userInfo);
    });

  return (
    <>
      <div>
        <h1>Real Time</h1>
        <p>{userInfo?.name}</p>
      </div>
    </>
  );
};

export default RealTime;
