export interface SSOService {
  introspect(data: any): Promise<any>;
}
