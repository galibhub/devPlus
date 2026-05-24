import type {
  Request,
  Response,
} from "express";

import { issueService } from "./issue.service";

const createIssue = async (
  req: Request,
  res: Response,
) => {

  try {

    const result =
      await issueService.createIssueIntoDB(
        req.body,
        req.user.id,
      );

    res.status(201).json({
      success: true,
      message:
        "Issue created successfully!",
      data: result.rows[0],
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });

  }
};


const getAllIssues = async (
  req: Request,
  res: Response,
) => {

  try {

    const result =
    await issueService.getAllIssuesFromDB(
  req.query,
);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



const getSingleIssue = async (
  req: Request,
  res: Response,
) => {

  try {

    const result =
      await issueService.getSingleIssueFromDB(
        req.params.id as string,
      );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateIssue = async (
  req: Request,
  res: Response,
) => {

  try {

    const result =
      await issueService.updateIssueFromDB(
        req.body,
        req.params.id as string,
        req.user,
      );

    res.status(200).json({
      success: true,
      message:
        "Issue updated successfully!",
      data: result,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const deleteIssue = async (
  req: Request,
  res: Response,
) => {

  try {

    await issueService.deleteIssueFromDB(
      req.params.id as string,
      req.user,
    );

    res.status(200).json({
      success: true,
      message:
        "Issue deleted successfully!",
      data: {},
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



const getIssueMetrics = async (
  req: Request,
  res: Response,
) => {

  try {

    // maintainer only

    if (
      req.user.role !== "maintainer"
    ) {

      throw new Error(
        "Only maintainer can access metrics!",
      );

    }

    const result =
      await issueService.getIssueMetricsFromDB();

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,

  updateIssue,
  deleteIssue,
  getIssueMetrics
};