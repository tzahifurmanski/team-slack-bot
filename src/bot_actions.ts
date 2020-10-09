import { BotAction } from "./actions/base_action";

const config = require("../config.json");
import {
  AskChannelStats,
  Compliment,
  GenuineCompliment,
  IntroduceYourself,
  MeaningOfLife,
  WhatCanYouDo,
} from "./actions/asks";
import {
  BugResponse,
  FolksResponse,
  ReviewRequestResponse,
} from "./actions/responses";

// TODO: Convert events handling to new format: https://api.slack.com/changelog/2020-09-15-events-api-truncate-authed-users

// TODO: Load the actions and responses dynamically
const RESPONSES: BotAction[] = [
  new BugResponse(),
  new ReviewRequestResponse(),
  new FolksResponse(),
];

const ASKS: BotAction[] = [
  new Compliment(),
  new GenuineCompliment(),
  new IntroduceYourself(),
  new WhatCanYouDo(),
  new AskChannelStats(),
  new MeaningOfLife(),
];

// This method handles events that are posted directly inside a channel
export const handle_channel_event = async function (event: any) {
  // TODO: Limit this functionality to specific channels?
  if (event.channel == config.TEAM_ASK_CHANNEL_ID) {
    console.log(
      "This is the asks channel, we don't want to respond just yet..."
    );
    return;
  }

  console.log("Got new event", event);

  await runActions(event, RESPONSES);

  // TODO: Reply to good morning / great day / good weekend things
};

// This method handles events that are with direct interaction with the bot (like a DM or when the bot is tagged)
export const handle_direct_event = async function (event: any) {
  console.log("Got new event", event);

  await runActions(event, ASKS);
};

async function runActions(event: any, actions: BotAction[]) {
  // TODO: Feels like there should be a prettier way to iterate on the actions and execute the native functions but did not find one
  let action: BotAction;
  for (let index = 0; index < actions.length; index++) {
    action = actions[index];
    if (action.doesMatch(event)) {
      await action.performAction(event);
      return;
    }
  }

  console.log("Unsupported event", event);
}
