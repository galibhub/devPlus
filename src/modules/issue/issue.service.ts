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



const getAllIssuesFromDB = async (
  query: any,
) => {

  const {
    sort = "newest",
    type,
    status,
  } = query;

  let sql = `
    SELECT * FROM issues
  `;

  const conditions = [];

  const values = [];

  // filtering

  if (type) {

    values.push(type);

    conditions.push(
      `type=$${values.length}`
    );

  }

  if (status) {

    values.push(status);

    conditions.push(
      `status=$${values.length}`
    );

  }

  // where

  if (conditions.length > 0) {

    sql += `
      WHERE ${conditions.join(" AND ")}
    `;

  }

  // sorting

  if (sort === "oldest") {

    sql += `
      ORDER BY created_at ASC
    `;

  } else {

    sql += `
      ORDER BY created_at DESC
    `;

  }

  // get issues

  const issuesResult =
    await pool.query(sql, values);

  const issues = issuesResult.rows;

  // reporter ids

  const reporterIds = [
    ...new Set(
      issues.map(
        (issue) =>
          issue.reporter_id
      ),
    ),
  ];

  // users query

  const usersResult = await pool.query(
    `
    SELECT id,name,role
    FROM users
    WHERE id = ANY($1)
    `,
    [reporterIds],
  );

  const users = usersResult.rows;

  // merge reporter

  const formattedIssues = issues.map(
    (issue) => {

      const reporter = users.find(
        (user) =>
          user.id ===
          issue.reporter_id,
      );

      return {
        ...issue,
        reporter,
      };
    },
  );

  return formattedIssues;
};



//single issue

const getSingleIssueFromDB = async (
  id: string,
) => {

  // issue

  const issueResult = await pool.query(
    `
    SELECT * FROM issues
    WHERE id=$1
    `,
    [id],
  );

  if (issueResult.rows.length === 0) {

    throw new Error(
      "Issue not found!",
    );

  }

  const issue = issueResult.rows[0];

  // reporter

  const userResult = await pool.query(
    `
    SELECT id,name,role
    FROM users
    WHERE id=$1
    `,
    [issue.reporter_id],
  );

  const reporter =
    userResult.rows[0];

  return {
    ...issue,
    reporter,
  };
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


//issue matrics
const getIssueMetricsFromDB =
  async () => {

    const totalResult =
      await pool.query(`
        SELECT COUNT(*) FROM issues
      `);

    const openResult =
      await pool.query(`
        SELECT COUNT(*) FROM issues
        WHERE status='open'
      `);

    const progressResult =
      await pool.query(`
        SELECT COUNT(*) FROM issues
        WHERE status='in_progress'
      `);

    const resolvedResult =
      await pool.query(`
        SELECT COUNT(*) FROM issues
        WHERE status='resolved'
      `);

    return {

      total: Number(
        totalResult.rows[0].count,
      ),

      open: Number(
        openResult.rows[0].count,
      ),

      in_progress: Number(
        progressResult.rows[0].count,
      ),

      resolved: Number(
        resolvedResult.rows[0].count,
      ),
    };
  };

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,

    updateIssueFromDB,
    deleteIssueFromDB,
    getIssueMetricsFromDB
};