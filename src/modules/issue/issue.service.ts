import { pool } from "../../db";

import type { IIssue } from "./issue.interface";

const createIssueIntoDB = async (
  payload: IIssue,
  reporter_id: number,
) => {

  const {
    title,
    description,
    type,
  } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues(
      title,
      description,
      type,
      reporter_id
    )

    VALUES($1,$2,$3,$4)

    RETURNING *
    `,
    [
      title,
      description,
      type,
      reporter_id,
    ],
  );

  return result;
};




const getAllIssuesFromDB = async () => {

  const result = await pool.query(`
    SELECT * FROM issues
    ORDER BY created_at DESC
  `);

  return result.rows;
};




//single issue

const getSingleIssueFromDB = async (
  id: string,
) => {

  const result = await pool.query(
    `
    SELECT * FROM issues
    WHERE id=$1
    `,
    [id],
  );

  return result.rows[0];
};

//update

const updateIssueFromDB = async (
  payload: Partial<IIssue>,
  id: string,
  user: any,
) => {

  // find issue

  const issueData = await pool.query(
    `
    SELECT * FROM issues
    WHERE id=$1
    `,
    [id],
  );

  if (issueData.rows.length === 0) {
    throw new Error("Issue not found!");
  }

  const issue = issueData.rows[0];

  // maintainer can update everything

  if (user.role !== "maintainer") {

    // contributor rules

    if (
      issue.reporter_id !== user.id
    ) {

      throw new Error(
        "You cannot update others issue!",
      );

    }

    if (issue.status !== "open") {

      throw new Error(
        "You can only update open issues!",
      );

    }
  }

  // update

  const {
    title,
    description,
    type,
    status,
  } = payload;

  const result = await pool.query(
    `
    UPDATE issues

    SET
    title=COALESCE($1,title),

    description=COALESCE(
      $2,
      description
    ),

    type=COALESCE($3,type),

    status=COALESCE($4,status),

    updated_at=NOW()

    WHERE id=$5

    RETURNING *
    `,
    [
      title,
      description,
      type,
      status,
      id,
    ],
  );

  return result.rows[0];
};


//delete

const deleteIssueFromDB = async (
  id: string,
  user: any,
) => {

  // find issue

  const issueData = await pool.query(
    `
    SELECT * FROM issues
    WHERE id=$1
    `,
    [id],
  );

  if (issueData.rows.length === 0) {

    throw new Error(
      "Issue not found!",
    );

  }

  // only maintainer

  if (user.role !== "maintainer") {

    throw new Error(
      "Only maintainer can delete issue!",
    );

  }

  // delete issue

  const result = await pool.query(
    `
    DELETE FROM issues
    WHERE id=$1
    `,
    [id],
  );

  return result;
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,

    updateIssueFromDB,
    deleteIssueFromDB
};