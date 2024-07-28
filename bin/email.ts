#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EmailStack } from '../lib/email-stack';
import {getConfig} from '../lib/config';


const app = new cdk.App();
new EmailStack(app, 'EmailStack', {
 config: getConfig()
});