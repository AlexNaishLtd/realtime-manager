import CircleStack from '@heroicons/react/24/outline/CircleStackIcon';
import ChannelsIcon from '@heroicons/react/24/outline/InboxStackIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';

import styles from './mainnav.module.css';
import Link from 'next/link';

export const MainNav = () => {
  return (
    <nav className="relative z-50 block">
      <ul className="pb-3 md:pb-0 px-[50px] md:px-[80px] flex flex-wrap">
        <li className="relative">
          <Link href="/" className={styles.link} data-active="true">
            <CircleStack className="w-5 h-5" />
            <div className="ml-3 flex items-center whitespace-nowrap text-black font-medium">Apps</div>
          </Link>
        </li>
        <li className="relative">
          <Link href="/channels" className={styles.link}>
            <ChannelsIcon className="w-5 h-5" />
            <div className="ml-3 flex items-center whitespace-nowrap">Channels</div>
          </Link>
        </li>
        <li className="relative">
          <Link href="/users" className={styles.link}>
            <UsersIcon className="w-5 h-5" />
            <div className="ml-3 flex items-center whitespace-nowrap">Users</div>
          </Link>
        </li>
      </ul >
    </nav >

  )
}