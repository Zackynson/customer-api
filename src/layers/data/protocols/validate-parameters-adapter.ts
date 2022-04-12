export interface ValidateParametersAdapter {
  validate: (params: any) => Promise<void>;
}
