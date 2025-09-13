import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { CategoryValidations } from "./category.validation";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";

const router = Router();

router.post(
  "/create-category",
  multerUpload.single("icon"),
  parseBody,
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory
);

router.get("/", CategoryControllers.allCategories);

router.get("/category/:id", CategoryControllers.singleCategory);

router.patch(
  "/update/:id",
  multerUpload.single("icon"),
  parseBody,
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory
);

export const CategoryRoutes = router;
