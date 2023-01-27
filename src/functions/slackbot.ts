import { IHandlerResponse } from '../types';
import { App, ExpressReceiver } from '@slack/bolt';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { config } from 'dotenv';
import {
  parseRequestBody,
  isUrlVerificationRequest,
  generateReceiverEvent,
} from '../utils';
import { ReceiverEvent } from '@slack/bolt';

if (process.env.NODE_ENV !== 'production') {
  config();
}

const receiver = new ExpressReceiver({
  signingSecret: process.env.SIGNING_SECRET,
  processBeforeResponse: true,
});

const app = new App({
  receiver,
  token: process.env.SLACK_BOT_TOKEN,
});

app.message(':hr-whistle:', async ({ message, say }) => {
  await say({
    text: '*Phwwwwwhht!* \n https://youtu.be/IwLSrNu1ppI',
    thread_ts: (message as any).thread_ts
      ? (message as any).thread_ts
      : message.ts,
  });
});

export async function handler(
  event: APIGatewayEvent
): Promise<IHandlerResponse> {
  const payload = parseRequestBody(event.body, event.headers['content-type']);

  if (isUrlVerificationRequest(payload)) {
    return {
      statusCode: 200,
      body: payload?.challenge,
    };
  }

  const slackEvent: ReceiverEvent = generateReceiverEvent(payload);
  await app.processEvent(slackEvent);

  return {
    statusCode: 200,
    body: '',
  };
}
