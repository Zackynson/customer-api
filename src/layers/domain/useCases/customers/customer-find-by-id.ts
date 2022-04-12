export interface CustomerFindById {
  find(params: CustomerFindById.Params): Promise<CustomerFindById.Result>;
}

export namespace CustomerFindById {
  export type Params = {
    id: string;
  };

  export type Result = {
    id: string;
    document: number;
    name: string;
  };
}
