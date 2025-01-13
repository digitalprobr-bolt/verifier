export interface ValidationResult {
  email: string;
  formatValid: boolean;
  domainExists: boolean;
  mxRecords: boolean;
  spf: boolean;
  dkim: boolean;
  dmarc: boolean;
  smtp: boolean;
  blacklisted: boolean;
}

export interface User {
  id: string;
  first_name: string;
  email: string;
  credits: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}