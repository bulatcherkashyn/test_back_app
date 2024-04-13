export interface JWTProvider {
  getAuthToken(): string;
  decodeAuthToken(token: string): void;
}
