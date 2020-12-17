const config = require("../../../config.json");
const { WebClient } = require("@slack/web-api");

export const SLACK_USER_FORMAT: RegExp = /<@.*>/;

// These will be filled by the loading process
export let BOT_ID: string;
export let TEAM_ASK_CHANNEL_ID: string;
export let TEAM_CHATTER_CHANNEL_ID: string;
export let TEAM_LEADS_CHANNEL_ID: string;
export let BOT_TESTS_CHANNEL_ID: string;

export const setSlackIds = function (
  botId: string,
  teamAskChannelId: string,
  teamChatterChannelId: string,
  teamLeadsChannelId: string,
  botTestsChannelId: string
) {
  BOT_ID = botId;
  TEAM_ASK_CHANNEL_ID = teamAskChannelId;
  TEAM_CHATTER_CHANNEL_ID = teamChatterChannelId;
  TEAM_LEADS_CHANNEL_ID = teamLeadsChannelId;
  BOT_TESTS_CHANNEL_ID = botTestsChannelId;
};

const token: string = config.BOT_USER_OAUTH_ACCESS_TOKEN;
export const SlackWebClient = new WebClient(token);
