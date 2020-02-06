import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();
import User from "./../api/user/user.model";

/**Request with token
 * Method 1: Headers: Authorization: Bearer JSON_WEB_TOKEN_STRING.....
 * Method 2: Authorization Type: Bearer token : JSON_WEB_TOKEN_STRING.....
 */

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

const jwtStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(null, false);
  }
});

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", { session: false });
