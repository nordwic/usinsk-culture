import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import ContentManager from '../../features/content/ContentManager';
import Badge from '../../shared/ui/Badge';

const AdminPage = () => {
	const { isAuthenticated, hasRole, user } = useAuth();
	const { messages, markMessageRead } = useData();

	if (!isAuthenticated) return <Navigate to="/login" replace />;
	if (!hasRole('editor')) {
		return (
			<div className="max-w-[800px] mx-auto px-6 py-16 text-center">
				<div className="text-5xl mb-4">🔒</div>
				<h1 className="text-2xl font-bold text-white mb-2">
					Доступ запрещён
				</h1>
				<p className="text-gray-400">
					У вас нет прав для просмотра этой страницы.
				</p>
			</div>
		);
	}

	const unread = messages.filter((m) => !m.read).length;

	return (
		<div className="max-w-[1400px] mx-auto px-6 py-10">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Панель управления</h1>
				<p className="text-gray-400 mt-1">
					Роль:{' '}
					<span className="text-cyan-400 capitalize">
						{user?.role}
					</span>{' '}
					· {user?.username}
				</p>
			</div>

			{/* Управление контентом */}
			<section className="mb-12">
				<h2 className="text-xl font-semibold mb-4">
					Управление контентом
				</h2>
				<ContentManager />
			</section>

			{/* Сообщения */}
			{hasRole('admin') && (
				<section>
					<div className="flex items-center gap-3 mb-4">
						<h2 className="text-xl font-semibold">
							Сообщения от пользователей
						</h2>
						{unread > 0 && (
							<Badge variant="danger">{unread} новых</Badge>
						)}
					</div>

					{messages.length === 0 ? (
						<p className="text-gray-400">Сообщений пока нет</p>
					) : (
						<div className="space-y-3">
							{[...messages].reverse().map((msg) => (
								<div
									key={msg.id}
									className={`bg-white/5 border rounded-xl p-4 ${
										msg.read
											? 'border-white/10'
											: 'border-cyan-500/40'
									}`}
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex flex-wrap gap-2 items-center mb-1">
												{!msg.read && (
													<Badge variant="info">
														Новое
													</Badge>
												)}
												<span className="font-semibold text-white">
													{msg.name}
												</span>
												<span className="text-xs text-gray-400">
													{msg.email}
												</span>
												<span className="text-xs text-gray-500">
													{msg.date}
												</span>
											</div>
											{msg.subject && (
												<p className="text-sm font-medium text-gray-300 mb-1">
													Тема: {msg.subject}
												</p>
											)}
											<p className="text-sm text-gray-400">
												{msg.body}
											</p>
										</div>
										{!msg.read && (
											<button
												onClick={() =>
													markMessageRead(msg.id)
												}
												className="text-xs text-cyan-400 hover:text-cyan-300 flex-shrink-0 transition-colors"
											>
												Прочитано
											</button>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</section>
			)}
		</div>
	);
};

export default AdminPage;
