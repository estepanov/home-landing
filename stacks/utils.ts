import { App } from "@serverless-stack/resources";

export const isProdStage = (app: App) => app.stage === "prod";