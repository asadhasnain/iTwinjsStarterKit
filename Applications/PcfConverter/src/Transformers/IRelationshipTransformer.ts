import { PhysicalElementProps } from "@itwin/core-common";
import { Relationship } from "../Mappings/ECToPCMapping";

export interface IRelationshipTransformer {

    transform(relationship: Relationship, sourceElementProps: PhysicalElementProps, targetElementProps: PhysicalElementProps): string;
}