export interface FirestoreFilter {
  key: string;
  operation:
    | '<'
    | '<='
    | '=='
    | '>'
    | '>='
    | '!='
    | 'array-contains'
    | 'array-contains-any'
    | 'in'
    | 'not-in';
  value: string | number | boolean | Date;
}

export interface FirestoreSort {
  key: string;
  direction: 'asc' | 'desc';
}

export type FirestoreLimit = number;

export interface FirestoreConditions {
  filters?: FirestoreFilter[];
  sort?: FirestoreSort;
  limit?: FirestoreLimit;
}
