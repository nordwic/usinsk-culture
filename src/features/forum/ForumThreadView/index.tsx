import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Trash2, Pin } from 'lucide-react';
import { useForumContext } from '../../../contexts/ForumContext';
import { useAuth } from '../../../contexts/AuthContext';
import type { ForumThread, ForumPost } from '../../../shared/types';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import Badge from '../../../shared/ui/Badge';

interface Props {
	thread: ForumThread;
	posts: ForumPost[];
	onBack: () => void;
}

const AVATAR_COLORS = [
	'from-cyan-500 to-blue-600',
	'from-purple-500 to-indigo-600',
	'from-amber-500 to-orange-600',
	'from-emerald-500 to-teal-600',
	'from-rose-500 to-pink-600',
];

function avatarColor(name: string) {
	let hash = 0;
	for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const ForumThreadView = ({ thread, posts, onBack }: Props) => {
	const { addPost, deletePost, incrementViews } = useForumContext();
	const { user, isAuthenticated } = useAuth();
	const [form, setForm] = useState({ name: '', content: '' });
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		incrementViews(thread.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [thread.id]);

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
		if (!form.content.trim()) {
			setError('Напишите сообщение');
			return;
		}
		addPost({
			threadId: thread.id,
			content: form.content.trim(),
			authorName,
			authorId: user?.id ?? null,
			createdAt: new Date().toISOString().split('T')[0],
		});
		setForm({ name: '', content: '' });
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 500);
	};

	return (
		<div className="space-y-5">
			{/* Назад */}
			<button
				onClick={onBack}
				className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
			>
				<ChevronLeft size={16} />
				Назад к темам
			</button>

			{/* Заголовок темы */}
			<div className="pb-4 border-b border-white/10">
				<div className="flex items-start gap-3">
					{thread.pinned && (
						<Pin
							size={16}
							className="text-cyan-400 flex-shrink-0 mt-1"
						/>
					)}
					<div className="flex-1">
						<h2 className="text-2xl font-bold text-white leading-snug">
							{thread.title}
						</h2>
						<div className="flex flex-wrap gap-2 items-center mt-2 text-xs text-gray-400">
							{thread.pinned && (
								<Badge variant="info">Закреплено</Badge>
							)}
							<span>Автор: {thread.authorName}</span>
							<span>·</span>
							<span>{thread.createdAt}</span>
							<span>·</span>
							<span>{thread.views} просм.</span>
							<span>·</span>
							<span>{posts.length} сообщений</span>
						</div>
					</div>
				</div>
			</div>

			{/* Сообщения */}
			<div className="space-y-3">
				{posts.length === 0 ? (
					<p className="text-gray-400 text-center py-8">
						Нет сообщений
					</p>
				) : (
					posts.map((post, idx) => (
						<div
							key={post.id}
							className={`flex gap-3 group rounded-2xl p-4 border transition-colors ${
								idx === 0
									? 'bg-cyan-500/10 border-cyan-500/20'
									: 'bg-white/5 border-white/10 hover:bg-white/8'
							}`}
						>
							{/* Аватар */}
							<div
								className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(post.authorName)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 select-none`}
							>
								{post.authorName[0].toUpperCase()}
							</div>

							<div className="flex-1 min-w-0">
								{/* Шапка */}
								<div className="flex items-center justify-between gap-2 flex-wrap">
									<div className="flex items-center gap-2 flex-wrap">
										<span className="font-semibold text-white text-sm">
											{post.authorName}
										</span>
										{idx === 0 && (
											<span className="text-[11px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-medium">
												автор
											</span>
										)}
										{post.authorId === 1 && (
											<span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-medium">
												команда портала
											</span>
										)}
										<span className="text-xs text-gray-500">
											{post.createdAt}
										</span>
									</div>
									{user &&
										(user.role === 'admin' ||
											user.id === post.authorId) && (
											<button
												onClick={() => {
													if (
														confirm(
															'Удалить сообщение?',
														)
													)
														deletePost(post.id);
												}}
												className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
												title="Удалить"
											>
												<Trash2 size={14} />
											</button>
										)}
								</div>

								{/* Текст */}
								<p className="text-gray-200 text-sm mt-2 leading-relaxed whitespace-pre-wrap">
									{post.content}
								</p>
							</div>
						</div>
					))
				)}
			</div>

			<div ref={bottomRef} />

			{/* Форма ответа */}
			<div className="bg-white/5 border border-white/10 rounded-2xl p-5">
				<h3 className="font-semibold text-white mb-4">
					Написать ответ
				</h3>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					{!isAuthenticated ? (
						<Input
							name="name"
							label="Ваше имя *"
							placeholder="Как вас зовут?"
							value={form.name}
							onChange={handleChange}
						/>
					) : (
						<p className="text-sm text-gray-400">
							Отвечаете как:{' '}
							<span className="text-cyan-300 font-medium">
								{user?.username}
							</span>
						</p>
					)}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-300">
							Сообщение *
						</label>
						<textarea
							name="content"
							value={form.content}
							onChange={handleChange}
							rows={4}
							placeholder="Ваш ответ..."
							className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none transition-colors"
						/>
					</div>
					{error && <p className="text-red-400 text-sm">{error}</p>}
					{success && (
						<p className="text-green-400 text-sm">
							✓ Сообщение отправлено!
						</p>
					)}
					<Button type="submit" className="self-start px-8">
						Отправить
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ForumThreadView;
