import type { RouterOutputs } from "../../utils/api";
import Image from "next/image";

type TweetProps = RouterOutputs["tweet"]["getAll"][number];

export const Tweet = ({
  id,
  text,
  author,
  authorId,
  updatedAt,
  createdAt,
}: TweetProps) => (
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
        <div className="mb-1 font-bold">{author.name}</div>
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  </div>
);
