class TokenService {
  private readonly tokenKey: string = "token";
  private storage: Storage = sessionStorage;

  constructor(storage: Storage = sessionStorage) {
    this.storage = storage;
  }

  getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
  }
}

export const TokenServiceInstance = new TokenService();
