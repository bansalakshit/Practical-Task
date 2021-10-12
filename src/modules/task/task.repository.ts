import { getConnection } from 'typeorm'

export async function getUserTasks(author: string) {
  const tasks = `
      SELECT
        tasks.id,
        tasks.name,
        tasks.user_id AS "userId",
        categories.name AS "category"
      FROM
        tasks
      LEFT JOIN
        categories
      ON
        tasks.category_id = categories.id
      WHERE
        tasks.user_id = $1
    `
  return await getConnection().query(tasks, [author])
}

export async function getTaskInfoBy(taskId: string) {
  const tasks = `
      SELECT
        tasks.id,
        tasks.name,
        tasks.user_id AS "userId",
        categories.name AS "category"
      FROM
        tasks
      LEFT JOIN
        categories
      ON
        tasks.category_id = categories.id
      WHERE
        tasks.id = $1
    `
  const [tasksInfo] = await getConnection().query(tasks, [taskId])
  return tasksInfo
}
