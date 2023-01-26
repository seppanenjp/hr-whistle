import { App } from '@slack/bolt';
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
});

app.message(':hr-whistle:', async ({ message, say }) => {
  console.log(message);
  await say('https://youtu.be/IwLSrNu1ppI');
});

(async () => {
  await app.start(process.env.PORT || 4000);
  console.log('⚡️ Bolt app started');
})();
