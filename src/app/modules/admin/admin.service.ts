import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { Admin } from "./admin.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TImageFiles } from "../../interface/image.interface";
import { TAdmin } from "./admin.interface";
import { adminSearchableFields } from "../../utilities/const";

const allAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(
    Admin.find().populate("user", "role password status needsPasswordChange"),
    query
  )
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await adminQuery.countTotal();
  const data = await adminQuery.modelQuery;

  return { meta, data };
};

const singleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }

    const userId = deletedAdmin.user;
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

    return deletedAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateAdminIntoDB = async (
  id: string,
  images: TImageFiles,
  payload: Partial<TAdmin>
) => {
  const isAdmin = await Admin.findById(id);

  if (!isAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, "Admin not found");
  }

  const avatar = images?.avatar[0];
  const nidImgs = images?.nidImg;

  if (avatar && avatar.path) {
    payload.avatar = avatar.path;
  }

  if (nidImgs) {
    payload.nidImg = nidImgs?.map((file) => file.path);
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

  const result = await Admin.findByIdAndUpdate(isAdmin._id, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const AdminServices = {
  allAdminsFromDB,
  singleAdminFromDB,
  deleteAdminFromDB,
  updateAdminIntoDB,
};
