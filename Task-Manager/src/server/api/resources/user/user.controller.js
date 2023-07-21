export const sayHi = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'hello world!'
    })
}