import Link from "next/link";
import { ticketsPath } from "@/paths";

const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg">HomePage</h2>

      <Link href={ticketsPath()} className="text-sm underline">
        Go to Tickets
      </Link>
    </div>
  );
};

export default HomePage;
