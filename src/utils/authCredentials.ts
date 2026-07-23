export const DEMO_CREDENTIALS = {
  username: 'user123',
  password: 'password123',
} as const;

export function validateCredentials(username: string, password: string): boolean {
  return username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;
}
