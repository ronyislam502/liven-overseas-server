import { Model, Types } from "mongoose";
import { Gender, TAddress } from "../../utilities/const";

export type TAgent = {
  user: Types.ObjectId;
  name: string;
  email: string;
  designation: string;
  gender: keyof typeof Gender;
  avatar?: string;
  phone: string;
  nidNo: string;
  nidImg?: string[];
  passportNo: string;
  passportImg?: string[];
  dateOfBirth?: Date;
  presentAddress: TAddress;
  permanentAddress: TAddress;
  isDeleted: boolean;
};

export interface AgentModel extends Model<TAgent> {
  isUserExists(email: string): Promise<TAgent | null>;
}
