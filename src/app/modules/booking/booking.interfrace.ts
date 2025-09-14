import { Types } from "mongoose";

export type TBooking = {
  user: Types.ObjectId;
  service: Types.ObjectId;

  isDeleted: boolean;
};
