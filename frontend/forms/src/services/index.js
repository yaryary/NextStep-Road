import api from "../lib/api.js";

export const incidentPlanApi = {
  create: (answers) =>
    api.post("/incident-plan", answers).then((response) => {
      return response.data.data.plan;
    }),
};