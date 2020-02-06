import { bufferToHex } from "ethereumjs-util";
import { personalSign, recoverPersonalSignature } from "eth-sig-util";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "./../user/user.model";
import { ErrorHandler } from "./../../helper/error";

export async function sign(req, res, next) {
  try {
    const { nonce, publicAddress } = req.body;
    const msgBufferHex = publicAddress.toString("hex");
    let signature = personalSign(msgBufferHex, nonce);
    return res.status(200).json({ signature, publicAddress });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function handleAuthentication(req, res, next) {
  const { signature, publicAddress } = req.body;
  try {
    if (!signature || !publicAddress) {
      throw new ErrorHandler(
        400,
        "Request should have signature and publicAddress"
      );
    }
    //1. get user with given publicAddress
    const user = await User.findOne({ publicAddress });
    if (!user) {
      throw new ErrorHandler(
        404,
        `User with publicAddress ${publicAddress} is not found`
      );
    }
    //2. Varify digital signature
    // We now are in possession of msg, publicAddress and signature
    // We will use a helper from eth-sig-util to extract the address from the signature
    const msg = `I am signing my one-time nonce: ${user.nonce}`;
    const msgBufferHex = msg.toString("hex");
    const address = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature
    });
    // The signature verification is successful if the address found with sigUtil.recoverPersonalSignature
    // matches the initial publicAddress
    if (!(address.toLowerCase() === publicAddress.toLowerCase())) {
      throw new ErrorHandler(401, "Signature verification failed");
    }
    //3. generate a new nonce for user
    newNonce = Math.floor(Math.random() * 10000);
    await User.findByIdAndUpdate(user._id, { nonce: newNonce });
    //4. Create JWT
    const payload = { _id: user._id, publicAddress };
    return res.status(201).json({
      token: jwt.sign(payload, process.env.SECRET_KEY)
    });
  } catch (error) {
    next(error);
  }
}
