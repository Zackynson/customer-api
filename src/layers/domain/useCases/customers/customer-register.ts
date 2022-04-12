export interface CustomerRegister {
  register(params: CustomerRegister.Params): Promise<CustomerRegister.Result>;
}

export namespace CustomerRegister {
  export type Params = {
    document: number;
    name: string;
  };

  export type Result = {
    id: string;
    document: number;
    name: string;
  };
}
