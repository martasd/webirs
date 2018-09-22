import { MessageType } from './message-type';

export class Repo {
  constructor(
    public name: string,
    public messageTypes: MessageType[]) {}
}
