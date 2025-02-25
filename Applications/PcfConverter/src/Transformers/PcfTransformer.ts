
import { ECClass } from '../Mappings/ECToPCMapping';
import { PhysicalElementProps } from '@itwin/core-common';
import { ITransformer } from './ITransformer';


export class PcfTransformer implements ITransformer {

    public transform(ecClass: ECClass, elementProps: PhysicalElementProps): string {
        let pcfContent = `\n${ecClass.pcfName}\n`;

        pcfContent = this.mapProperties(ecClass, elementProps, pcfContent);

        return pcfContent;
    }

    protected mapProperties(ecClass: ECClass, elementProps: PhysicalElementProps, pcfContent: string) {
        ecClass.ECProperty.forEach((ecProperty) => {
            const propertyValue = (elementProps as any)[ecProperty.propertyName];
            if (propertyValue !== undefined)
                pcfContent += `\t${ecProperty.pcfName} ${propertyValue}\n`;
        });
        return pcfContent;
    }
}
/*
const convertToMM = (value: number): string => (value * 1000).toFixed(2);

const convertToInches = (value: number): string => (value * 39.3701).toFixed(2);

const formatOrigin = (origin: number[]): string[] => origin.map(convertToMM);

*/

// const pcfContent = generatePCFContent(pipeData);
// writePCFFile('output.pcf', pcfContent);