import catchAsync from '../../../utils/catchAsync.js';
import connect from '../../database/index.js'

export const getAllUsers = async () => {
    const db = await connect();

    const sql = `
        select * from users
    `;
    const [[rows]] = await db.query(sql);
    return rows;

}