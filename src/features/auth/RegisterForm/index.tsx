import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';

const RegisterForm = () => {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
		confirm: '',
	});
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!form.username.trim() || !form.email.trim() || !form.password) {
			setError('Заполните все поля');
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			setError('Некорректный e-mail');
			return;
		}
		if (form.password.length < 6) {
			setError('Пароль должен быть не менее 6 символов');
			return;
		}
		if (form.password !== form.confirm) {
			setError('Пароли не совпадают');
			return;
		}

		const ok = register(
			form.username.trim(),
			form.email.trim(),
			form.password,
		);
		if (ok) {
			navigate('/');
		} else {
			setError('Пользователь с таким именем или e-mail уже существует');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<Input
				name="username"
				label="Имя пользователя"
				placeholder="Придумайте логин"
				value={form.username}
				onChange={handleChange}
				autoComplete="username"
			/>
			<Input
				name="email"
				label="E-mail"
				type="email"
				placeholder="example@mail.ru"
				value={form.email}
				onChange={handleChange}
				autoComplete="email"
			/>
			<Input
				name="password"
				label="Пароль"
				type="password"
				placeholder="Минимум 6 символов"
				value={form.password}
				onChange={handleChange}
				autoComplete="new-password"
			/>
			<Input
				name="confirm"
				label="Подтвердите пароль"
				type="password"
				placeholder="Повторите пароль"
				value={form.confirm}
				onChange={handleChange}
				autoComplete="new-password"
			/>
			{error && <p className="text-red-400 text-sm">{error}</p>}
			<Button type="submit" className="w-full mt-2">
				Зарегистрироваться
			</Button>
			<p className="text-center text-sm text-gray-400">
				Уже есть аккаунт?{' '}
				<a href="/login" className="text-cyan-400 hover:underline">
					Войти
				</a>
			</p>
		</form>
	);
};

export default RegisterForm;
