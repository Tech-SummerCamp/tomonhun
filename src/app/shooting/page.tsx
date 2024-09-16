import { AvatarsDemo } from '@/demo';
import { ShootingView } from '../../components/shooting/shooting-view';

// TODO: データベースから取得

export default function Page() {
  return <ShootingView avatars={AvatarsDemo} />;
}
