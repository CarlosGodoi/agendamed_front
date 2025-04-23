import { createContext } from 'react';
import { ROLE } from '@/enums/profile';

export type TUser = {
	id: string;
	name: string;
	email: string;
	cpf: string;
	role: ROLE;
};

export interface IAuthContext {
	user: TUser | null;
	signed: boolean;
	loading: boolean;
	signIn: (data: {
		email: string;
		password: string;
	}) => Promise<{ status: boolean; message: string }>;
	signOut: VoidFunction;
	updateUserContext: ({ name, email }: { name: string; email: string }) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
