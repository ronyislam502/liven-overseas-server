import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { TImageFiles } from "../../interface/image.interface";
import { AgentServices } from "./agent.service";

const allAgents = catchAsync(async (req, res) => {
  const result = await AgentServices.AllAgentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Agents retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const singleAgent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AgentServices.singleAgentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Agent retrieved successfully",
    data: result,
  });
});

const updateAgent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AgentServices.updateAgentIntoDB(
    id,
    req.files as TImageFiles,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Agent updated successfully",
    data: result,
  });
});

const deleteAgent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AgentServices.deleteAgentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Agent deleted successfully",
    data: result,
  });
});

export const AgentControllers = {
  allAgents,
  singleAgent,
  updateAgent,
  deleteAgent,
};
