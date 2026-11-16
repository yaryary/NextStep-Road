import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import * as incidentPlanService from "../services/incidentPlan.service.js";
import {
  buildPayload,
  validateRequest,
} from "../validators/validateRequest.js";

export const generateIncidentPlan = asyncHandler(async (req, res) => {
  validateRequest(req.body);
  const payload = buildPayload(req.body);
  console.log(payload);
  const plan = await incidentPlanService.generateIncidentPlan(payload);
  sendSuccess(res, { message: "Plan generated", data: { plan } });
});
