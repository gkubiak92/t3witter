import { NewTweetForm } from "../newTweetForm/NewTweetForm";
import { api } from "../../utils/api";
import { Tweet } from "../tweet/Tweet";

const LIMIT = 10;

export const Timeline = () => {
  const { data, isLoading } = api.tweet.getAll.useQuery({ limit: LIMIT });

  return (
    <div>
      <NewTweetForm />
      {isLoading && <div>Loading...</div>}
      {data?.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
};
