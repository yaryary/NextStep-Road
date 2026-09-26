import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import * as incidentPlanService from "../services/incidentPlan.service.js";

export const generateIncidentPlan = asyncHandler(async (req, res) => {
    const plan  = await incidentPlanService.generateIncidentPlan(req.body);
    sendSuccess(res, { message: "Plan generated", data: { plan } });
});