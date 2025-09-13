import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: [true, "Name is  required"],
    },
    icon: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Description is  required"],
    },
    futures: [
      {
        type: String,
        required: [true, "Description is  required"],
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

categorySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Category = model<TCategory>("Category", categorySchema);
