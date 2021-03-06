import { BotAction } from "../base_action";
import { removeTimeInfoFromDate } from "../utils";
import {
  AsksChannelStatsResult,
  getChannelMessages,
  getStatsBuckets,
  reportStatsToSlack,
} from "../../logic/asks_channel";
import { BOT_ID } from "../../integrations/slack/consts";

export class AskChannelDailyStats implements BotAction {
  doesMatch(event: any): boolean {
    // Check if the command starts with 'ask channel daily stats' (even if the bot is mentioned first)
    return event.text
      .replace(`<@${BOT_ID}> `, "")
      .trim()
      .startsWith("ask channel daily stats");
  }

  async performAction(event: any): Promise<void> {
    // Get the number of days back from event.text. Default is 0 (this day)
    // Added 1 as default so I can reduce the user input by 1 (because day 0 is the first day)
    // TODO: Make this prettier - This is needed because we need to count for a scenario where the text starts with @unibot so we needs to exclude it
    const numOfDays =
      (event.text.replace(`<@${BOT_ID}> `, "").split(" ")[4] || 1) - 1;

    const startingDate = new Date();
    startingDate.setDate(startingDate.getDate() - numOfDays);
    removeTimeInfoFromDate(startingDate);

    const messages: any[any] = await getChannelMessages(startingDate);

    const statsArray: AsksChannelStatsResult[] = await getStatsBuckets(
      messages,
      "day"
    );

    // Group the messages by buckets - one bucket for each
    for (const stats of statsArray) {
      console.log(
        `Currently processing block for ${stats.startDateInUTC} to ${stats.endDateInUTC}...`
      );
      await reportStatsToSlack(stats, event.channel, event.thread_ts);
    }
  }
}
