import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AdminServices } from "./admin.service";
import { TImageFiles } from "../../interface/image.interface";

const AllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.allAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins retrieved successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

const singleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.singleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.updateAdminIntoDB(
    id,
    req.files as TImageFiles,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const AdminControllers = {
  AllAdmins,
  singleAdmin,
  updateAdmin,
  deleteAdmin,
};
