import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Category } from "../category/category.model";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import QueryBuilder from "../../builder/queryBuilder";

const createServiceIntoDB = async (payload: TService) => {
  const isCategory = await Category.findById(payload?.category);
  if (!isCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  const result = await Service.create(payload);

  return result;
};

const allServicesFromDB = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(Service.find(), query)
    .search(["price", "country"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await serviceQuery.countTotal();
  const data = await serviceQuery.modelQuery;

  return { meta, data };
};

const singleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id);

  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  allServicesFromDB,
  singleServiceFromDB,
  deleteServiceFromDB,
};
