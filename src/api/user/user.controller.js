import User from "./user.model";
import { ErrorHandler } from "../../helper/error";

async function checkExistsAddress(publicAddress) {
  const user = await User.findOne({ publicAddress });
  if (!user) {
    return true;
  } else {
    return false;
  }
}

export async function findPublicAddress(req, res, next) {
  try {
    // If a query string publicAddress=... is given, then filter results
    const publicAddress = req.query.publicAddress;
    let user = await User.findOne({ publicAddress });
    if (!user) {
      throw new ErrorHandler(404, "Public address not found!");
    }
    return res.status(200).json({
      statusCode: 200,
      data
    });
  } catch (error) {
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    const { publicAddress } = req.body;
    const user = await User.create({ publicAddress });
    return res.status(201).json({
      statusCode: 201,
      data: user
    });
  } catch (error) {
    // handle error field (require, validate, unique) || error from model
    if (error.name === "ValidationError" || error.code === 11000) {
      next(new ErrorHandler(400, error.message));
    } else {
      next(error);
    }
  }
}

/**
 * get user profile from public address
 */
export async function getUserProfile(req, res, next) {
  // AccessToken payload is in req.user, especially its '_id' field
  // userId is the params in /user/:userId
  try {
    const publicAddress = req.params.publicAddress;
    const user = await User.findOne({ publicAddress });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return res.status(200).json({
      statusCode: 200,
      data: user
    });
  } catch (error) {
    next(error);
  }
}
