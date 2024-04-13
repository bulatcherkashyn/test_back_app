export interface AuthService {
  login(): Promise<string>;
  validateAccessToken(authToken: string): Promise<void>;
}
