import { Types } from "mongoose";

export type TService = {
  category: Types.ObjectId;
  country: string;
  visa: string;
  price: number;
  extra?: string;
  isDeleted: boolean;
};
