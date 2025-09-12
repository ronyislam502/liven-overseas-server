import { z } from "zod";
import { Gender } from "../../utilities/const";
import { addressValidationSchema } from "../admin/admin.validation";

const createAgentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      designation: z.string().min(1, "Designation is required"),
      gender: z.nativeEnum(Gender),
      avatar: z.string().url("Invalid avatar URL").optional(),
      phone: z.string().min(1, "Phone number is required"),
      nidNo: z.string().min(1, "NID number is required"),
      nidImg: z.string().url("Invalid NID image URL").optional(),
      passportNo: z.string().min(1, "Passport number is required"),
      dateOfBirth: z.coerce.date().optional(),
      presentAddress: addressValidationSchema,
      permanentAddress: addressValidationSchema,
    }),
  }),
});

export const AgentValidations = { createAgentValidationSchema };
