import Link from 'next/link';
import { ticketsPath } from '@/paths';
import { Heading } from '@/components/heading';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading title="Home" description="Your home place to start" />

      <div className="flex flex-col items-center gap-x-4">
        <Link href={ticketsPath()} className="underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
