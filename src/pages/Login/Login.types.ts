export interface LoginProps {
  onLogin?: (username: string, password: string, rememberMe: boolean) => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
}
