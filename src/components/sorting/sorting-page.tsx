'use client';

import { Avatar } from '@/lib/shooting/avatar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SerifScreen } from './serif-screen';
import { SortingScreen } from './sorting-screen';

export default function SortingClientPage({
  avatars,
  initialRemainCount,
}: {
  avatars: Avatar[];
  initialRemainCount: number;
}) {
  const [index, setIndex] = useState(0);
  const [remain, setRemain] = useState(initialRemainCount);
  const [serifScreen, setSerifScreen] = useState(true);
  const router = useRouter();

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
    if (index === avatars.length - 1) {
      router.replace('/zukan');
    } else {
      transition(true, true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddButtonClick = (avatar: Avatar, tag?: string) => {
    // TODO: DBに追加
    setRemain((r) => r - 1);
    if (index === avatars.length - 1) {
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
