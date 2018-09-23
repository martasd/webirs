import { SourceStructure } from './source-structure';
import { TargetStructure } from './target-structure';

export class MessageType {
  constructor(
    public name: string,
    public messageTypes: MessageType[],
    public sourceStructure: SourceStructure,
    public targetStructure: TargetStructure
  ) {}
}
