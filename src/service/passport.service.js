import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";
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
    // time unit is milliseconds
    // if (Date.now() > payload.expires) {
    //   // return done("Token expired");
    // }
    const user = await User.findById(payload._id);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

// export const authJwt = passport.authenticate("jwt", { session: false })

// handle errors passport middleware
export const authJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    // send the error response to client
    if (error || !user) {
      return res.status(401).json({
        statusCode: 401,
        message: info || error.message
      });
    }
    next(); // continue to next middleware if no error.
  })(req, res, next);
  /* passport.authentication returns a function,
  we invoke it with normal req..res arguments 
  to override default functionality */
};
