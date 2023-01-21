import { NewTweetForm } from "../newTweetForm/NewTweetForm";
import { api } from "../../utils/api";
import { Tweet } from "../tweet/Tweet";
import { Button } from "../button/Button";

const LIMIT = 10;

export const Timeline = () => {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.tweet.getAll.useInfiniteQuery(
      {
        limit: LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];
  const handleLoadMore = () => fetchNextPage();

  return (
    <div>
      <NewTweetForm />
      <div className="mb-2">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore} disabled={isFetching}>
            Load more
          </Button>
        </div>
      )}
      {isFetching && <div>Loading...</div>}
    </div>
  );
};
