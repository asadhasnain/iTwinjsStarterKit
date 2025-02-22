export interface ECProperty {
  propertyName: string;
  pcfName: string;
}

export interface ECClass {
  typeName: string;
  pcfName: string;
  ECProperty: ECProperty[];
}

export interface ECToPCFMapping {
  ECClass: ECClass[];
}