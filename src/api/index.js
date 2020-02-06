import userRoutes from "./user/user.route";
// import authRoutes from "./auth/auth.controller";

export default app => {
  // app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
};
