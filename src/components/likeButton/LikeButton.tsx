import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import clsx from "clsx";

type LikeButtonProps = {
  likesCount: number;
  isLiked: boolean;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export const LikeButton = ({
  likesCount,
  isLiked,
  onClick,
  isLoading,
  disabled,
}: LikeButtonProps) => {
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div className="flex items-center gap-2">
      <Icon
        onClick={disabled || isLoading ? undefined : onClick}
        className={clsx("cursor-pointer", {
          "text-red-500": isLiked,
          "cursor-default": isLoading || disabled,
        })}
      />
      <span>{likesCount}</span>
    </div>
  );
};
