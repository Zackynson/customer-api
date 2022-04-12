export interface CustomerFindByIdRepository {
  find(
    params: CustomerFindByIdRepository.Params,
  ): Promise<CustomerFindByIdRepository.Result>;
}

export namespace CustomerFindByIdRepository {
  export type Params = {
    id: string;
  };

  export type Result = {
    id: string;
    name: string;
    document: number;
  };
}
