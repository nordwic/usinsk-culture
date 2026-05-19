import { useState } from 'react';
import { ChevronLeft, Pin, Plus, Trash2 } from 'lucide-react';
import { useForumContext } from '../../../contexts/ForumContext';
import { useAuth } from '../../../contexts/AuthContext';
import type { ForumThread, ForumPost } from '../../../shared/types';
import Modal from '../../../shared/ui/Modal';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import Badge from '../../../shared/ui/Badge';

interface ForumCategory {
	id: string;
	name: string;
	description: string;
	icon: string;
}

interface Props {
	category: ForumCategory;
	threads: ForumThread[];
	posts: ForumPost[];
	onSelectThread: (threadId: number) => void;
	onBack: () => void;
}

const ForumThreadList = ({
	category,
	threads,
	posts,
	onSelectThread,
	onBack,
}: Props) => {
	const { addThread, addPost, deleteThread } = useForumContext();
	const { user, isAuthenticated } = useAuth();
	const [modalOpen, setModalOpen] = useState(false);
	const [form, setForm] = useState({ name: '', title: '', content: '' });
	const [error, setError] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		const authorName = isAuthenticated ? user!.username : form.name.trim();
		if (!authorName) {
			setError('Введите ваше имя');
			return;
		}
		if (!form.title.trim()) {
			setError('Введите заголовок темы');
			return;
		}
		if (!form.content.trim()) {
			setError('Напишите первое сообщение');
			return;
		}
		const thread = addThread({
			categoryId: category.id,
			title: form.title.trim(),
			authorName,
			authorId: user?.id ?? null,
			createdAt: new Date().toISOString().split('T')[0],
		});
		addPost({
			threadId: thread.id,
			content: form.content.trim(),
			authorName,
			authorId: user?.id ?? null,
			createdAt: new Date().toISOString().split('T')[0],
		});
		setModalOpen(false);
		setForm({ name: '', title: '', content: '' });
	};

	const getReplyCount = (threadId: number) =>
		posts.filter((p) => p.threadId === threadId).length;

	const sortedThreads = [...threads].sort((a, b) => {
		if (a.pinned && !b.pinned) return -1;
		if (!a.pinned && b.pinned) return 1;
		return b.createdAt.localeCompare(a.createdAt);
	});

	return (
		<div className="space-y-4">
			{/* Breadcrumb + создать тему */}
			<div className="flex items-center justify-between">
				<button
					onClick={onBack}
					className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
				>
					<ChevronLeft size={16} />
					Все разделы
				</button>
				<Button
					size="sm"
					onClick={() => setModalOpen(true)}
					className="flex items-center gap-1.5"
				>
					<Plus size={14} />
					Создать тему
				</Button>
			</div>

			{/* Заголовок раздела */}
			<div className="flex items-center gap-4 py-4 border-b border-white/10">
				<span className="text-3xl select-none">{category.icon}</span>
				<div>
					<h2 className="text-xl font-bold text-white">
						{category.name}
					</h2>
					<p className="text-sm text-gray-400">
						{category.description}
					</p>
				</div>
				<div className="ml-auto text-right text-sm text-gray-400">
					<p>
						<span className="text-white font-semibold">
							{threads.length}
						</span>{' '}
						тем
					</p>
					<p>
						<span className="text-white font-semibold">
							{
								posts.filter((p) =>
									threads.some((t) => t.id === p.threadId),
								).length
							}
						</span>{' '}
						сообщений
					</p>
				</div>
			</div>

			{/* Список тем */}
			{sortedThreads.length === 0 ? (
				<div className="text-center py-16 text-gray-400">
					<div className="text-5xl mb-4">💬</div>
					<p className="text-lg">Тем пока нет</p>
					<p className="text-sm mt-1">
						Будьте первым, кто начнёт обсуждение!
					</p>
				</div>
			) : (
				<div className="space-y-2">
					{sortedThreads.map((thread) => {
						const replyCount = getReplyCount(thread.id);
						return (
							<div
								key={thread.id}
								className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 hover:bg-white/10 transition-colors group"
							>
								{/* Значок закреплённой темы */}
								<div className="flex-shrink-0 w-8 flex items-center justify-center">
									{thread.pinned ? (
										<Pin
											size={14}
											className="text-cyan-400"
										/>
									) : (
										<div className="w-2 h-2 rounded-full bg-white/20" />
									)}
								</div>

								{/* Тема */}
								<div
									className="flex-1 min-w-0 cursor-pointer"
									onClick={() => onSelectThread(thread.id)}
								>
									<div className="flex items-center gap-2 flex-wrap">
										{thread.pinned && (
											<Badge variant="info">
												Закреплено
											</Badge>
										)}
										<h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
											{thread.title}
										</h3>
									</div>
									<p className="text-xs text-gray-500 mt-1">
										{thread.authorName} · {thread.createdAt}
									</p>
								</div>

								{/* Статистика */}
								<div className="hidden sm:flex flex-col items-center gap-0.5 flex-shrink-0 text-center min-w-[60px]">
									<span className="text-white font-semibold text-sm">
										{replyCount}
									</span>
									<span className="text-xs text-gray-500">
										ответов
									</span>
								</div>
								<div className="hidden sm:flex flex-col items-center gap-0.5 flex-shrink-0 text-center min-w-[60px]">
									<span className="text-white font-semibold text-sm">
										{thread.views}
									</span>
									<span className="text-xs text-gray-500">
										просм.
									</span>
								</div>

								{/* Удаление */}
								{user &&
									(user.role === 'admin' ||
										user.id === thread.authorId) && (
										<button
											onClick={(e) => {
												e.stopPropagation();
												if (
													confirm(
														'Удалить тему и все её сообщения?',
													)
												)
													deleteThread(thread.id);
											}}
											className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
											title="Удалить"
										>
											<Trash2 size={15} />
										</button>
									)}
							</div>
						);
					})}
				</div>
			)}

			{/* Модальное окно создания темы */}
			<Modal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setError('');
					setForm({ name: '', title: '', content: '' });
				}}
				title="Создать новую тему"
			>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{!isAuthenticated && (
						<Input
							name="name"
							label="Ваше имя *"
							placeholder="Как вас зовут?"
							value={form.name}
							onChange={handleChange}
						/>
					)}
					{isAuthenticated && (
						<p className="text-sm text-gray-400">
							Публикация от имени:{' '}
							<span className="text-cyan-300 font-medium">
								{user?.username}
							</span>
						</p>
					)}
					<Input
						name="title"
						label="Заголовок темы *"
						placeholder="Введите заголовок"
						value={form.title}
						onChange={handleChange}
					/>
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-300">
							Первое сообщение *
						</label>
						<textarea
							name="content"
							value={form.content}
							onChange={handleChange}
							rows={5}
							placeholder="Расскажите подробнее..."
							className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none transition-colors"
						/>
					</div>
					{error && <p className="text-red-400 text-sm">{error}</p>}
					<div className="flex gap-3 pt-1">
						<Button type="submit" className="flex-1">
							Создать тему
						</Button>
						<Button
							type="button"
							variant="ghost"
							onClick={() => setModalOpen(false)}
						>
							Отмена
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default ForumThreadList;
