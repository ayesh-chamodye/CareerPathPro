import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

export default app;

if (!process.env.VERCEL) {
  (async () => {
    const { setupVite, serveStatic } = await import("./vite");
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const port = Number(process.env.PORT ?? 5000);
    const host = process.env.HOST ?? "0.0.0.0";

    const reusePort = process.platform === "win32" ? false : true;

    server.listen(
      {
        port,
        host,
        reusePort,
      },
      () => {
        const displayHost = host === "0.0.0.0" ? "localhost" : host;
        log(`serving on http://${displayHost}:${port} (bound to ${host})`);
      }
    );
  })();
} else {
  (async () => {
    const { serveStatic } = await import("./vite");
    await registerRoutes(app);
    serveStatic(app);
  })();
}
