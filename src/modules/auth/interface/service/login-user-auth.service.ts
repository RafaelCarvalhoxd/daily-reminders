export interface ILoginUserAuthService {
  execute(input: {
    email: string;
    password: string;
  }): Promise<{ token: string }>;
}
