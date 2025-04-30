export interface IBcryptLib {
  compare(input: { plainText: string; hashedText: string }): Promise<boolean>;
  hash(input: { plainText: string; salt: number }): Promise<string>;
}
