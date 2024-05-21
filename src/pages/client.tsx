import { useEffect, useState } from 'react';
import { makeClient } from '@/utils/socket.client';
import { useRouter } from 'next/router';
import { ClientMain } from '@/modules/client/main';
import { ClientReaction } from '@/modules/client/reaction';
import { ClientStatus } from '@/modules/client/status';

type MessageEvent = {
  id: string;
  data: string;
  style: Record<string, string | number>
}

export default function Client() {
  const { query, isReady } = useRouter();
  const [stats, setStats] = useState({
    love: 0,
    hate: 0,
    like: 0,
    confused: 0
  });
  const [status, setStatus] = useState('disconnected');
  const [messages, setMessages] = useState<MessageEvent[]>([]);

  useEffect(() => {
    if (!isReady) return;
    const client = makeClient('test')

    const channel = query?.channel as string || 'default';
    client.subscribe(channel)
      .bind('reaction', (eventData: string) => {
        setStats((current) => {
          if (eventData === 'love') {
            return {
              ...current,
              love: current.love + 1
            };
          }
          if (eventData === 'like') {
            return {
              ...current,
              like: current.like + 1
            };
          }
          if (eventData === 'hate') {
            return {
              ...current,
              hate: current.hate + 1
            };
          }

          return {
            ...current,
            confused: current.confused + 1
          };

        })

        setMessages(messages => [...messages, {
          id: `${Math.random()}`,
          data: eventData,
          style: {
            size: Math.max(Math.random() * 3, 0.5),
            left: Math.max(Math.random(), 0.1) * window.innerWidth
          }
        }])
      });

    client.connection.bind("state_change", (state: { current: string }) => {
      setStatus(state.current)
    });
    client.bind_global(console.log);
    client.connection.bind("error", (err: unknown) => {
      console.log('err', err);
    });
    return () => {
      client.unsubscribe('default');
    }
  }, [setMessages, query, isReady])

  return (
    <ClientMain>
      <ClientStatus status={status} />
      <div className='flex gap-10 justify-center text-2xl text-center'>
        <div>
          🥰 Love: {stats.love}
        </div>
        <div>
          👌 Like: {stats.like}
        </div>
        <div>
          😡 Hate: {stats.hate}
        </div>
        <div>
          😕 Confused: {stats.confused}
        </div>
      </div>
      {messages.map(message => {
        return (
          <ClientReaction key={message.id} style={{
            left: message.style.left,
            '--size': message.style.size as number
          }} type={message.data} />
        )
      })}
    </ClientMain>
  )
}
