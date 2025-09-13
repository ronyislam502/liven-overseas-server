import { Router } from "express";
import { ServiceControllers } from "./service.controller";

const router = Router();

router.post("/create-service", ServiceControllers.createService);

export const ServiceRoutes = router;
