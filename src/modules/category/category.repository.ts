import { getConnection } from 'typeorm'

export async function getCategoryInfoBy(userId: string, categoryId?: string) {
    const whereClause = categoryId ? `AND id = '${categoryId}'` : ``
    const category = `
      SELECT
        id,
        name,
        user_id AS "userId"
      FROM
        categories
      WHERE
        user_id = $1
        ${whereClause}
    `
    return await getConnection().query(category, [userId])
}
