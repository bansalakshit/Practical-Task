import { getConnection } from 'typeorm'

export async function getUserBy(userId: string) {
  const sql = `
    SELECT
      id,
      email,
      display_name AS "displayName"
    FROM
      users
    WHERE
      id = $1
  `
  return await getConnection().query(sql, [userId])
}
