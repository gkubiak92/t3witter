import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import clsx from "clsx";

type LikeButtonProps = {
  likesCount: number;
  isLiked: boolean;
  onClick: () => void;
  isLoading?: boolean;
};

export const LikeButton = ({
  likesCount,
  isLiked,
  onClick,
  isLoading,
}: LikeButtonProps) => {
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div className="flex items-center gap-2">
      <Icon
        onClick={isLoading ? undefined : onClick}
        className={clsx(!isLoading && "cursor-pointer")}
      />
      <span>{likesCount}</span>
    </div>
  );
};
