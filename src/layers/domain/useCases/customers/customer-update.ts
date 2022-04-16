export interface CustomerUpdate {
  updateCustomerById(
    params: CustomerUpdate.Params,
  ): Promise<CustomerUpdate.Result>;
}

export namespace CustomerUpdate {
  export type Params = {
    id: string;
    data: {
      document: number;
      name: string;
    };
  };

  export type Result = {
    id: string;
    document: number;
    name: string;
  };
}
