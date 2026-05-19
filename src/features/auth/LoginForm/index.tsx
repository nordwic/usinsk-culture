import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';

const LoginForm = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		if (!username.trim() || !password.trim()) {
			setError('Заполните все поля');
			return;
		}
		const ok = login(username.trim(), password);
		if (ok) {
			navigate('/');
		} else {
			setError('Неверное имя пользователя или пароль');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<Input
				label="Имя пользователя"
				placeholder="Введите логин"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				autoComplete="username"
			/>
			<Input
				label="Пароль"
				type="password"
				placeholder="Введите пароль"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				autoComplete="current-password"
			/>
			{error && <p className="text-red-400 text-sm">{error}</p>}
			<Button type="submit" className="w-full mt-2">
				Войти
			</Button>
			<p className="text-center text-sm text-gray-400">
				Нет аккаунта?{' '}
				<a href="/register" className="text-cyan-400 hover:underline">
					Зарегистрироваться
				</a>
			</p>
		</form>
	);
};

export default LoginForm;
