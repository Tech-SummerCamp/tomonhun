'use client';

import { Avatar } from '@/lib/shooting/avatar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SerifScreen } from './serif-screen';
import { SortingScreen } from './sorting-screen';

export default function SortingClientPage({
  initialRemainCount,
}: {
  initialRemainCount: number;
}) {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [index, setIndex] = useState(0);
  const [remain, setRemain] = useState(initialRemainCount);
  const [serifScreen, setSerifScreen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const str = localStorage.getItem('avatars');
    if (str) {
      const obj = JSON.parse(str) as Avatar[];
      if (obj) {
        setAvatars(obj);
        return;
      }
    }

    router.replace('/zukan');
  }, [router]);

  const transition = (serifScreen: boolean, increment: boolean) => {
    if (increment) {
      setIndex((i) => i + 1);
    }
    setSerifScreen(serifScreen);
  };

  const handleSerifScreenButtonClick = () => {
    transition(false, false);
  };

  const handleReleaseButtonClick = () => {
    const i = index;
    setAvatars((avatars) => avatars.slice(i, 1));
    if (index === avatars.length - 1) {
      // TODO: DBに追加
      // sql``
      router.replace('/zukan');
    } else {
      transition(true, false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddButtonClick = (avatar: Avatar, tag?: string) => {
    setRemain((r) => r - 1);
    if (index === avatars.length - 1) {
      // TODO: DBに追加
      router.replace('/zukan');
    } else {
      transition(true, true);
    }
  };

  return serifScreen ? (
    <SerifScreen
      onClick={handleSerifScreenButtonClick}
      avatar={avatars[index]}
    />
  ) : (
    <SortingScreen
      onReleaseClick={handleReleaseButtonClick}
      onAddClick={handleAddButtonClick}
      avatar={avatars[index]}
      remain={remain}
    />
  );
}
