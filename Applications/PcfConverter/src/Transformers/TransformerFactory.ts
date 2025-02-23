import { IRelationshipTransformer } from './IRelationshipTransformer';
import { ITransformer } from './ITransformer';
import { PcfTransformer } from './PcfTransformer';
import { PipelineTransformer } from './PipelineTransformer';
import { RelationshipTransformer } from './RelationshipTransformer';

export class TransformerFactory {
  static getTransformer(typeName: string): ITransformer {
    switch (typeName) {
      case 'ProcessPhysical.PIPING_NETWORK_SYSTEM':
        return new PipelineTransformer();
      default:
        return new PcfTransformer();
    }
  }

  static getRelationshipTransformer(typeName: string): IRelationshipTransformer {
    switch (typeName) {
      default:
        return new RelationshipTransformer();
    }
  }
}