import Question from "@/components/forms/question/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Ask | QueryHub",
  description:
    "got stuck? Asks here to get it answered",
};

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900"> Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} type={"question"} />
      </div>
    </div>
  );
};

export default Page;
