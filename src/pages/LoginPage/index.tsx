import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../features/auth/LoginForm';
import Card from '../../shared/ui/Card';

const LoginPage = () => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) return <Navigate to="/" replace />;

	return (
		<div className="min-h-[70vh] flex items-center justify-center px-6 py-10">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold">Вход</h1>
					<p className="text-gray-400 mt-2">Войдите в свой аккаунт</p>
				</div>
				<Card>
					<LoginForm />
				</Card>
				<div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400">
					<p className="font-medium text-gray-300 mb-2">
						Тестовые аккаунты:
					</p>
					<p>admin / admin123 — администратор</p>
					<p>editor / editor123 — редактор</p>
					<p>user1 / user123 — пользователь</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
