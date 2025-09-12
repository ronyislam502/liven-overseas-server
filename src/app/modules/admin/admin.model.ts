import { model, Schema } from "mongoose";
import { AdminModel, TAdmin } from "./admin.interface";
import { Gender, TAddress } from "../../utilities/const";

export  const addressSchema=new Schema<TAddress>({
 Village: {
    type:String,
    required:[true, "Village is required"]
  },
  postOffice:{
    type: String,
    required:[true, "Post Office is required"]
  },
  postalCode: {
    type:String,
  },
  policeStation: {
    type:String,
    required:[true, "Police Station is required"]
  },
  district: {
    type:String,
    required:[true, "District is required"]
  },
  division:{
    type:String,
    required:[true, "Division is required"]
  },
  country: {
    type:String,
    required:[true, "Country is required"],
    default: "Bangladesh"
  }
})

const adminSchema=new Schema<TAdmin, AdminModel>({
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    email:{
      type: String,
      required:[ true, "E-mail is required"],
      unique: true,
    },
    designation:{
        type:String,
        required:[true, "Designation is required"]
    },
    gender:{
        type: String,
        enum: Object.keys(Gender),
        required: [true, "Role is required"],
    },
    avatar:{
        type: String,
        default:""
    },
    phone:{
        type: String,
        required: [true,"Phone is required"],
    },
    nidNo:{
        type: String,
        required:[true, "NIDNO is required"],
        unique:true
    },
    nidImg:[
      {
        type: String,
        required: [true, 'nidImg is required'],
        default: '',
      },
    ],
    dateOfBirth:{
        type: Date
    },
    presentAddress:{
        type:addressSchema,
        required:[true, "Present address is required"]
    },
    permanentAddress:{
        type:addressSchema,
        required:[true, "Permanent address is required"]
    }
},{
    timestamps:true
});

adminSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

adminSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Admin.findOne({ email });

  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);
