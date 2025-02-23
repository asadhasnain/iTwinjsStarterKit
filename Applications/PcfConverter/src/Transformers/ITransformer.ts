import { PhysicalElementProps } from "@itwin/core-common";
import { ECClass } from "../Mappings/ECToPCMapping";

export interface ITransformer {
    /**
     * Transforms an ECClass and PhysicalElementProps to a pcf string.
     */
    transform(ecClass: ECClass, elementProps: PhysicalElementProps): string;
}