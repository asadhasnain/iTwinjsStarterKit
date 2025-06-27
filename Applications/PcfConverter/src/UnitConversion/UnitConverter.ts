import { IModelDb } from "@itwin/core-backend";
import { Schema, SchemaContext, SchemaLoader, UnitConversion, UnitConverter } from "@itwin/ecschema-metadata";

export class UnitConversionManager {
  private _unitConverter!: UnitConverter;
  private readonly UnitSchemaName: string = "Units";

  /**
   * constructor
   */
  constructor() {
    
  }

  public async initialize(iModelDb: IModelDb): Promise<void> {
    const loader: SchemaLoader = new SchemaLoader((schemaName: string) => iModelDb.getSchemaProps(schemaName));
    const schema: Schema = loader.getSchema(this.UnitSchemaName);
    const context = new SchemaContext();
    await context.addSchema(schema);
    this._unitConverter = new UnitConverter(context);
  }

  
  /**
   * Convert the value on the basis of source and target unit and return it.
   * @param sourceUnit Unit that needs to be changed
   * @param targetUnit Unit that will change
   * @param value
   */
  public async convertPropertyUnit(sourceUnit: string, targetUnit: string, value: number): Promise<any> {
    const unitConversion: UnitConversion = await this._unitConverter.calculateConversion(`${this.UnitSchemaName}.${sourceUnit}`, `${this.UnitSchemaName}.${targetUnit}`);
    return unitConversion.evaluate(value);
  }
}
