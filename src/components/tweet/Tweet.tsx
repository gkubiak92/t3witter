import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { LikeButton } from "../likeButton/LikeButton";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

type TweetProps = RouterOutputs["tweet"]["getAll"]["tweets"][number];

export const Tweet = ({
  id,
  text,
  author,
  likes,
  authorId,
  createdAt,
}: TweetProps) => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  const initialLikesCount = likes.length;
  const isLikedByMe = likes.some(
    (like) => like.user.id === session.data?.user?.id
  );
  const [isLiked, setIsLiked] = useState(isLikedByMe);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const { mutateAsync: likeTweet, isLoading: isLikeLoading } =
    api.like.like.useMutation();
  const { mutateAsync: unlikeTweet, isLoading: isUnlikeLoading } =
    api.like.unlike.useMutation();

  const isLoading = isLikeLoading || isUnlikeLoading;

  const handleLikeTweetClick = async () => {
    if (isLiked) {
      await unlikeTweet({ tweetId: id });
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => prev - 1);
    } else {
      await likeTweet({ tweetId: id });
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-b-gray-100 py-2">
      <div className="flex items-start">
        <div className="mr-2 basis-12">
          {author.image && (
            <Image
              src={author.image}
              alt={`${author.name || ""} profile picture`}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="mb-1">
            <Link href={`/${authorId}`}>
              <span className="mr-2 font-bold">{author.name}</span>
            </Link>
            <span>
              {formatDistance(createdAt, Date.now(), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="whitespace-pre-wrap">{text}</div>
          <LikeButton
            likesCount={likesCount}
            isLiked={isLiked}
            isLoading={isLoading}
            onClick={handleLikeTweetClick}
            disabled={!isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
};
