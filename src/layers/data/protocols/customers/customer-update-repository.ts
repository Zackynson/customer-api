export interface CustomerUpdateRepository {
  updateOne(
    params: CustomerUpdateRepository.Params,
  ): Promise<CustomerUpdateRepository.Result>;
}

export namespace CustomerUpdateRepository {
  export type Params = {
    id: string;
    data: {
      name: string;
      document: number;
    };
  };

  export type Result = {
    id: string;
    name: string;
    document: number;
  };
}
