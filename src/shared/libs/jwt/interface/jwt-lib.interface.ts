export interface IJwtLib {
  sign(payload: object): Promise<string>;
  verify(token: string, secret: string): Promise<unknown>;
}
