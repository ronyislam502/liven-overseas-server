import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TImageFile } from "../../interface/image.interface";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (icon: TImageFile, payload: TCategory) => {
  if (icon && icon.path) {
    payload.icon = icon.path;
  }
  const result = await Category.create(payload);

  return result;
};

const allCategoriesFromDB = async () => {
  const result = await Category.find();

  return result;
};

const singleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);

  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  icon: TImageFile,
  payload: Partial<TCategory>
) => {
  const isCategory = await Category.findById(id);

  if (!isCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  if (payload.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can't update isDeleted filed"
    );
  }

  if (icon && icon.path) {
    payload.icon = icon.path;
  }

  const result = await Category.findByIdAndUpdate(isCategory?._id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  allCategoriesFromDB,
  singleCategoryFromDB,
  updateCategoryIntoDB,
};
