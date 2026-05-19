import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, UserRole } from '../shared/types';

interface AuthContextType {
	user: User | null;
	login: (username: string, password: string) => boolean;
	logout: () => void;
	register: (username: string, email: string, password: string) => boolean;
	isAuthenticated: boolean;
	hasRole: (role: UserRole) => boolean;
}

const defaultUsers: User[] = [
	{
		id: 1,
		username: 'admin',
		email: 'admin@usinsk-culture.ru',
		password: 'admin123',
		role: 'admin',
		createdAt: '2026-01-01',
	},
	{
		id: 2,
		username: 'editor',
		email: 'editor@usinsk-culture.ru',
		password: 'editor123',
		role: 'editor',
		createdAt: '2026-01-15',
	},
	{
		id: 3,
		username: 'user1',
		email: 'user1@mail.ru',
		password: 'user123',
		role: 'user',
		createdAt: '2026-02-01',
	},
];

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(() => {
		try {
			const stored = localStorage.getItem('auth_user');
			return stored ? (JSON.parse(stored) as User) : null;
		} catch {
			return null;
		}
	});

	const getUsers = (): User[] => {
		try {
			const stored = localStorage.getItem('app_users');
			return stored ? (JSON.parse(stored) as User[]) : defaultUsers;
		} catch {
			return defaultUsers;
		}
	};

	const login = (username: string, password: string): boolean => {
		const users = getUsers();
		const found = users.find(
			(u) => u.username === username && u.password === password,
		);
		if (found) {
			setUser(found);
			localStorage.setItem('auth_user', JSON.stringify(found));
			return true;
		}
		return false;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('auth_user');
	};

	const register = (
		username: string,
		email: string,
		password: string,
	): boolean => {
		const users = getUsers();
		if (users.find((u) => u.username === username || u.email === email)) {
			return false;
		}
		const newUser: User = {
			id: Date.now(),
			username,
			email,
			password,
			role: 'user',
			createdAt: new Date().toISOString().split('T')[0],
		};
		localStorage.setItem('app_users', JSON.stringify([...users, newUser]));
		setUser(newUser);
		localStorage.setItem('auth_user', JSON.stringify(newUser));
		return true;
	};

	const roleLevel: Record<UserRole, number> = {
		guest: 0,
		user: 1,
		editor: 2,
		admin: 3,
	};

	const hasRole = (role: UserRole): boolean => {
		if (!user) return false;
		return roleLevel[user.role] >= roleLevel[role];
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				register,
				isAuthenticated: !!user,
				hasRole,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
