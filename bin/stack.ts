#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApplicationStack } from '../resources/stack';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new cdk.App();

new ApplicationStack(app, 'RealtimeManager', {
  tableName: 'realtime_apps',
  userName: 'realtime_apps-user',
});