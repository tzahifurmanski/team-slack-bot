import { getRandomFromArray } from '../utils';
import { BotAction } from '../base_action';
import { botConfig } from '../../bot_config';

const { sendSlackMessage } = require('../../integrations/slack/messages');

const GIFS: string[] = botConfig.RESPONSE_BUG_POOL;

// TODO: Add a chaos element (only show gif at X % of the cases)

export class BugResponse implements BotAction {
  doesMatch(event: any): boolean {
    return (
      event.text.toLowerCase().includes('found a bug') ||
      event.text.toLowerCase().includes('we have a bug') ||
      event.text.toLowerCase().includes('might be a bug') ||
      event.text.toLowerCase().includes('created a bug') ||
      event.text.toLowerCase().includes('there is a bug') ||
      event.text.toLowerCase().includes('there is a small bug')
    );
  }

  async performAction(event: any): Promise<void> {
    if (event.thread_ts) {
      // This is a thread, do nothing. Not sure if I need it
      return;
    }
    const gif = getRandomFromArray(GIFS);

    // Reply in a thread
    await sendSlackMessage(gif, event.channel, event.ts);
  }
}
