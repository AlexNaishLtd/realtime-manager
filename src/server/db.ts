import dynamoose from "dynamoose";

const application = dynamoose.model("Application", {
  AppId: {
    "type": String,
    "hashKey": true
  },
  AppName: String,
  AppKey: String,
  AppSecret: String,
  MaxConnections: Number,
  EnableClientMessages: Boolean,
  EnableUserAuthentication: Boolean,
  Enabled: Boolean,
  MaxBackendEventsPerSecond: Number,
  MaxClientEventsPerSecond: Number,
  MaxReadRequestsPerSecond: Number,
  Webhooks: String
}, { tableName: 'realtime_apps', create: false });

export const db = {
  application
}
