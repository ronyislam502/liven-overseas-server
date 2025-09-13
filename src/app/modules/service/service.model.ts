import { model, Schema } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    category: {
      type: Schema.Types.ObjectId,
      required: [true, "Category is required"],
      ref: "Category",
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    visa: {
      type: String,
      required: [true, "Visa Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    extra: {
      type: String,
      required: [true, "extra is required"],
    },
  },
  { timestamps: true }
);

serviceSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Service = model<TService>("Service", serviceSchema);
