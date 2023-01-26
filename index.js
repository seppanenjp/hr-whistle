"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bolt_1 = require("@slack/bolt");
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    (0, dotenv_1.config)();
}
const receiver = new bolt_1.ExpressReceiver({
    signingSecret: process.env.SIGNING_SECRET,
});
const app = new bolt_1.App({
    receiver,
    token: process.env.SLACK_BOT_TOKEN,
});
app.message(':hr-whistle:', ({ message, say }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(message);
    yield say('https://youtu.be/IwLSrNu1ppI');
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield app.start(process.env.PORT || 4000);
    console.log('⚡️ Bolt app started');
}))();
receiver.router.get('/', (req, res) => {
    res.send('Hello there!');
});
