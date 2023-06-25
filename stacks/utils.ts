import { App } from "sst/constructs";

export const isProdStage = (app: App) => app.stage === "prod";