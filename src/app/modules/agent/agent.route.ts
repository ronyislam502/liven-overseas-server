import { Router } from "express";
import { AgentControllers } from "./agent.controller";

const router = Router();

router.get("/", AgentControllers.allAgents);

router.get("/:id", AgentControllers.singleAgent);

router.patch("/update/:id", AgentControllers.updateAgent);

router.delete("/delete/:id", AgentControllers.deleteAgent);

export const AgentRoutes = router;
