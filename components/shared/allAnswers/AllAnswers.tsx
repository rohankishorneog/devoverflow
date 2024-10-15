import React from "react";
import { AnswerFilters } from "@/constants/filters";
import Link from "next/link";
import Image from "next/image";
import { getAnswers } from "@/lib/actions/answer.actions";
import Filter from "../filter/Filter";
import { getTimeStamp } from "@/lib/utils";
import ParseHtml from "../parseHtml/ParseHtml";
import Votes from "../votes/Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
  clerkId: string | null;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
  clerkId,
}: Props) => {
  const result = await getAnswers({
    questionId,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="pb-2 pt-8">
            <div className="mb-2 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    • answered {getTimeStamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type="answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  downvotes={answer.downvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  hasdownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>
            <ParseHtml data={answer.content} />
          </article>
        ))}
      </div>

      <div className="mt-4 w-full"></div>
    </div>
  );
};

export default AllAnswers;