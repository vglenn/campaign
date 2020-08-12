export interface Message {
  object: string;
  id: number;
  type: string;
  subject: string;
  replyToID: number;
  isPaused: boolean;
}
