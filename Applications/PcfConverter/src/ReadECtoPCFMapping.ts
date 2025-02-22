
import EcToPcfMappingJson from "./ECToPCFMapping.json";
import { ECToPCFMapping } from "./ECToPCMapping";

// Function to get the EC to PCF mapping
export const readECToPCFMapping = (): ECToPCFMapping => {
  return EcToPcfMappingJson as ECToPCFMapping;
};
