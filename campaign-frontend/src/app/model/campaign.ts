import { Message } from './message';
import { Sender } from './sender';

export interface Campaign {
  object: string;
  id: number;
  title: string;
  created: string;
  archived: null;
  isPaused: boolean;
  messages: Message[];
  sender: Sender;
  url: string;
}
