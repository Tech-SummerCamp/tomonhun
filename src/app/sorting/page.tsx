import SortingClientPage from '@/components/sorting/sorting-page';
import { AvatarsDemo } from '@/demo';

export default function Page() {
  return <SortingClientPage initialRemainCount={10} avatars={AvatarsDemo} />;
}
