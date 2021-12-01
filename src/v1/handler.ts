import { makeHandler } from "helpers/make-handler";
import { V1Module } from "./v1.module";
import { API_VERSION } from "./config";

export const handler = makeHandler(V1Module, API_VERSION);
