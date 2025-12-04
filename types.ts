export interface Prospect {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

export interface FormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}