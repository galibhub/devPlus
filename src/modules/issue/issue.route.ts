import { Router } from "express";

import { authMiddleware } from "../../middleware/auth";

import { issueController } from "./issue.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  issueController.createIssue,
);

export const issueRoute = router;