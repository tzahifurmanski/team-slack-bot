import { botConfig } from "../../bot_config";
import { BotAction } from "../base_action";
import { getRandomFromArray } from "../utils";
import { sendSlackMessage } from "../../integrations/slack/messages";

const GIFS = botConfig.RESPONSE_I_THINK_POOL || [];

// TODO: Add a chaos element (only show gif at X % of the cases)

export class IThinkResponse implements BotAction {
  doesMatch(event: any): boolean {
    return (
      event.text.toLowerCase().includes("I think") ||
      event.text.toLowerCase().includes("I don't think")
    );
  }

  async performAction(event: any): Promise<void> {
    const gif = getRandomFromArray(GIFS);

    // Reply in a thread
    if (gif) await sendSlackMessage(gif, event.channel, event.ts);
  }
}
