export interface ECProperty {
  propertyName: string;
  pcfName: string;
}

export interface ECClass {
  typeName: string;
  pcfName: string;
  ECProperty: ECProperty[];
  Relationship?: Relationship;
}

export interface Relationship {
  relationshipName: string;
  ECClass: ECClass;
}

export interface ECToPCFMapping {
  ECClass: ECClass[];
}