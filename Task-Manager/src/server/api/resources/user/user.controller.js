import connect from '../../database/index.js'
import catchAsync from '../../../utils/catchAsync.js'
import * as userService from './user.service.js'

export const getAllUsers = catchAsync(async (req, res, next) => {

    const users =  await userService.getAllUsers();

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
})