/**
 * Implements Error
 * @param {Number} statusCode
 * @param {String} message
 */
export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Handle error
 * @param {ErrorHandler} err
 * @param {Response} res
 */
export const handleError = (err, res) => {
  try {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      statusCode: statusCode,
      message
    });
  } catch (error) {
    res.status(500).send(err);
  }
};