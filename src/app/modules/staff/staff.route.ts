import { Router } from "express";
import { StaffControllers } from "./staff.controller";

const router = Router();

router.get("/", StaffControllers.allStaffs);

router.get("/:id", StaffControllers.singleStaff);

router.patch("/update/:id", StaffControllers.updateStaff);

router.delete("/delete/:id", StaffControllers.deleteStaff);

export const StaffRoutes = router;
