import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();
// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://altium-medicare.vercel.app"],
    credentials: true,
  })
);
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Altium Medicare server..",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    status: httpStatus.NOT_FOUND,
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
