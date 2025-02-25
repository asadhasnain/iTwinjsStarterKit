
import { ECClass, Relationship } from '../Mappings/ECToPCMapping';
import { PhysicalElementProps } from '@itwin/core-common';
import { IRelationshipTransformer } from './IRelationshipTransformer';


export class RelationshipTransformer implements IRelationshipTransformer {

    public  transform(relationship: Relationship, sourceElementProps: PhysicalElementProps, targetElementProps: PhysicalElementProps): string {
        let pcfContent = `\n\t${relationship.ECClass.pcfName}`;

        relationship.ECClass.ECProperty.forEach((ecProperty) => {
            if((targetElementProps as any)[ecProperty.propertyName] !== undefined)
                pcfContent += ` ${ecProperty.pcfName} ${(targetElementProps as any)[ecProperty.propertyName]}`;
            else if((sourceElementProps as any)[ecProperty.propertyName] !== undefined)
                pcfContent += ` ${ecProperty.pcfName} ${(sourceElementProps as any)[ecProperty.propertyName]}`;
        });

        return pcfContent;
    }
}