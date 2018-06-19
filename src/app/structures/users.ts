export interface IUser {
  name?: string;
  uid: string;
  email: string;
  bio?: string;
  tokens ?: {[token: string]: boolean};
}
