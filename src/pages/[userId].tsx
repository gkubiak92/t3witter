import { type NextPage } from "next";
import { Timeline } from "../components/timeline/Timeline";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { query } = useRouter();
  const userId = (query.userId as string) ?? undefined;

  return (
    <div className="my-4">
      <Timeline userId={userId} />
    </div>
  );
};

export default Home;
