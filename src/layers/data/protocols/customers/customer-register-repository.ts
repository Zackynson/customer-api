export interface CustomerRegisterRespository {
  register(
    params: CustomerRegisterRespository.Params,
  ): Promise<CustomerRegisterRespository.Result>;
}

export namespace CustomerRegisterRespository {
  export type Params = {
    id: string;
    name: string;
    document: number;
  };

  export type Result = {
    id: string;
    name: string;
    document: number;
  };
}
