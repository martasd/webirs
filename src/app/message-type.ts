export class MessageType {
  constructor(
    public name: string,
    public messageTypes: MessageType[],
  ) {}
}
