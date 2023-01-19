import { z } from "zod";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button/Button";

export const tweetSchema = z.object({
  text: z.string({ required_error: "Tweet text is required" }).min(1).max(280),
});

type FormValues = z.infer<typeof tweetSchema>;

export const NewTweetForm = () => {
  const { register, formState, handleSubmit } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    resolver: zodResolver(tweetSchema),
  });

  const { mutateAsync } = api.tweet.create.useMutation();

  const handleOnSubmit = async (values: FormValues) => {
    await mutateAsync(values);
    console.log(values);
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(handleOnSubmit)}
      className="my-4 flex w-full flex-col gap-4"
    >
      <textarea
        {...register("text")}
        rows={8}
        className="w-full resize-none rounded-md border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <Button
        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={!formState.isValid || formState.isSubmitting}
        type="submit"
      >
        Tweet
      </Button>
    </form>
  );
};
