export function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem('access_token');
}

export function setTokenToLocalStorage(token: string): void {
  localStorage.setItem('access_token', token);
}

export function removeTokenFromLocalStorage(): void {
  localStorage.removeItem('access_token');
}
