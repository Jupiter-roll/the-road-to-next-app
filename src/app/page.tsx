import Link from 'next/link';
import { ticketsPath } from '@/paths';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-lg">HomePage</h1>

      <Link href={ticketsPath()} className="text-sm underline">
        Go to Tickets
      </Link>
    </div>
  );
};

export default HomePage;
