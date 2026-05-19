import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import RegisterForm from '../../features/auth/RegisterForm';
import Card from '../../shared/ui/Card';

const RegisterPage = () => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) return <Navigate to="/" replace />;

	return (
		<div className="min-h-[70vh] flex items-center justify-center px-6 py-10">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold">Регистрация</h1>
					<p className="text-gray-400 mt-2">
						Создайте аккаунт для доступа к расширенным функциям
					</p>
				</div>
				<Card>
					<RegisterForm />
				</Card>
			</div>
		</div>
	);
};

export default RegisterPage;
