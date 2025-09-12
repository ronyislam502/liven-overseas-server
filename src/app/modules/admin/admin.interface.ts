import { Model, Types } from "mongoose";
import { Gender, TAddress } from "../../utilities/const";

export type TAdmin = {
  user: Types.ObjectId;
  name: string;
  email: string;
  designation: string;
  gender: keyof typeof Gender;
  avatar?: string;
  phone: string;
  nidNo:string;
  nidImg?:string[];
  dateOfBirth?: Date;
  presentAddress: TAddress;
  permanentAddress: TAddress;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(email: string): Promise<TAdmin | null>;
}
