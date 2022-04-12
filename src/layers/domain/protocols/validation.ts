export interface Validation {
  validate: (params: any) => Promise<Error | undefined>;
}
