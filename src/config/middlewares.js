import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
// import compression from 'compression';
// import helmet from 'helmet';
import passport from "passport";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());

  if (isProd) {
    // app.use(compression());
    // app.use(helmet());
  }
  if (isDev) {
    // logger middlewares
    app.use(morgan("dev"));
  }
};
