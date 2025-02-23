
import { ECClass } from '../Mappings/ECToPCMapping';
import { PhysicalElementProps } from '@itwin/core-common';
import { PcfTransformer } from './PcfTransformer';


export class PipelineTransformer extends PcfTransformer {

    public transform(ecClass: ECClass, elementProps: PhysicalElementProps): string {
        let pcfContent = `\n${ecClass.pcfName} ${elementProps.userLabel}\n`;

        pcfContent = super.mapProperties(ecClass, elementProps, pcfContent);

        return pcfContent;
    }
}