import { model, Schema } from "mongoose";
import { Gender, TAddress } from "../../utilities/const";
import { addressSchema } from "../admin/admin.model";
import { AgentModel, TAgent } from "./agent.interface";

const agentSchema = new Schema<TAgent, AgentModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "E-mail is required"],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    gender: {
      type: String,
      enum: Object.keys(Gender),
      required: [true, "Role is required"],
    },
    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    nidNo: {
      type: String,
      required: [true, "NIDNO is required"],
      unique: true,
    },
    nidImg: [
      {
        type: String,
        required: [true, "nidImg is required"],
        default: "",
      },
    ],
    passportNo: {
      type: String,
      required: [true, "PassportNo is required"],
      unique: true,
    },
    passportImg: [
      {
        type: String,
        required: [true, "PassportImg is required"],
        default: "",
      },
    ],
    dateOfBirth: {
      type: Date,
    },
    presentAddress: {
      type: addressSchema,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: addressSchema,
      required: [true, "Permanent address is required"],
    },
  },
  {
    timestamps: true,
  }
);

agentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

agentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

agentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

agentSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Agent.findOne({ email });

  return existingUser;
};

export const Agent = model<TAgent, AgentModel>("Agent", agentSchema);
