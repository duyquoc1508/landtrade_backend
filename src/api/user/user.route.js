import * as userController from "./user.controller";
import { Router } from "express";
import { authJwt } from "../../service/passport.service";

const routes = new Router();

routes.get("/", userController.findPublicAddress);

routes.post("/", userController.createUser);

routes.get("/:publicAddress", authJwt, userController.getUserProfile);

export default routes;
