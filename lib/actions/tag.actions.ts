"use server";

import userModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import tagModel from "@/database/tag.model";
import questionModel from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    //findinteractions for the user and group by tags

    return [
      { id: "1", name: "tag1" },
      { id: "2", name: "tag2" },
      ,
      { id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await tagModel.find({});
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<typeof tagModel> = { _id: tagId };

    const tag = await tagModel.findOne(tagFilter).populate({
      path: "questions",
      model: questionModel,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: tagModel, select: "_id name" },
        {
          path: "author",
          model: userModel,
          select: "_id clerkId name picture",
        },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;


    return { tagTitle: tag.name, questions};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function name(params: type) {
//   try {
//     connectToDatabase();
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
