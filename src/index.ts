import { App, ExpressReceiver } from '@slack/bolt';
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

const receiver = new ExpressReceiver({
  signingSecret: process.env.SIGNING_SECRET,
});

const app = new App({
  receiver,
  token: process.env.SLACK_BOT_TOKEN,
});

app.message(':hr-whistle:', async ({ message, say }) => {
  console.log(message);
  await say('https://youtu.be/IwLSrNu1ppI');
});

(async () => {
  await app.start(process.env.PORT || 4000);
  console.log('⚡️ Bolt app started');
})();

receiver.router.get('/', (req, res) => {
  res.send('Hello there!');
});
