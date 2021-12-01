import { Module } from "@nestjs/common";

import { API } from "./api";

import { DYNAMO_CONNECT } from "./config/dynamodb";

@Module({
	imports: [DYNAMO_CONNECT, ...API],
})
export class V1Module {}
