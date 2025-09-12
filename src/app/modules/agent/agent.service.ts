import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { UserSearchableFields } from "../../utilities/const";
import { Agent } from "./agent.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TImageFiles } from "../../interface/image.interface";
import { TAgent } from "./agent.interface";

const AllAgentsFromDB = async (query: Record<string, unknown>) => {
  const agentQuery = new QueryBuilder(Agent.find(), query)
    .search(UserSearchableFields)
    .fields()
    .paginate()
    .sort()
    .filter();

  const meta = await agentQuery.countTotal();
  const data = await agentQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const singleAgentFromDB = async (id: string) => {
  const result = await Agent.findById(id);

  return result;
};

const deleteAgentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  const isAgent = await Agent.findById(id);

  if (!isAgent) {
    throw new AppError(httpStatus.NOT_FOUND, "Agent not found");
  }

  try {
    const deletedAgent = await Agent.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAgent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete agent");
    }

    const userId = deletedAgent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAgent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateAgentIntoDB = async (
  id: string,
  images: TImageFiles,
  payload: Partial<TAgent>
) => {
  const isAgent = await Agent.findById(id);

  if (!isAgent) {
    throw new AppError(httpStatus.NOT_FOUND, "Agent not found");
  }

  const avatar = images?.avatar[0];
  const nidImgs = images?.nidImg;
  const passportImgs = images?.passportImg;

  if (avatar && avatar.path) {
    payload.avatar = avatar.path;
  }

  if (nidImgs) {
    payload.nidImg = nidImgs?.map((file) => file.path);
  }

  if (passportImgs) {
    payload.nidImg = passportImgs?.map((file) => file.path);
  }

  const { presentAddress, permanentAddress, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (presentAddress && Object.keys(presentAddress)) {
    for (const [key, value] of Object.entries(presentAddress)) {
      modifiedData[`presentAddress.${key}`] = value;
    }
  }

  if (permanentAddress && Object.keys(permanentAddress)) {
    for (const [key, value] of Object.entries(permanentAddress)) {
      modifiedData[`permanentAddress.${key}`] = value;
    }
  }

  const result = await Agent.findByIdAndUpdate(isAgent._id, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const AgentServices = {
  AllAgentsFromDB,
  singleAgentFromDB,
  updateAgentIntoDB,
  deleteAgentFromDB,
};
