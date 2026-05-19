import type { ForumThread, ForumPost } from '../../../shared/types';

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
	onClick: () => void;
}

const ForumCategoryCard = ({ category, threads, posts, onClick }: Props) => {
	const postCount = posts.filter((p) =>
		threads.some((t) => t.id === p.threadId),
	).length;
	const lastThread = [...threads].sort((a, b) =>
		b.createdAt.localeCompare(a.createdAt),
	)[0];

	return (
		<div
			onClick={onClick}
			className="flex items-start gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-200 group"
		>
			<div className="text-4xl flex-shrink-0 mt-1 select-none">
				{category.icon}
			</div>

			<div className="flex-1 min-w-0">
				<h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
					{category.name}
				</h3>
				<p className="text-sm text-gray-400 mt-1">
					{category.description}
				</p>

				{lastThread ? (
					<p className="mt-3 text-xs text-gray-500 truncate">
						Последняя тема:{' '}
						<span className="text-gray-300">
							{lastThread.title}
						</span>
						{' · '}
						{lastThread.authorName}
						{' · '}
						{lastThread.createdAt}
					</p>
				) : (
					<p className="mt-3 text-xs text-gray-600">Тем пока нет</p>
				)}
			</div>

			<div className="flex flex-col items-end gap-1.5 flex-shrink-0 text-sm text-gray-400">
				<span>
					<span className="text-white font-semibold">
						{threads.length}
					</span>{' '}
					тем
				</span>
				<span>
					<span className="text-white font-semibold">
						{postCount}
					</span>{' '}
					сообщений
				</span>
			</div>
		</div>
	);
};

export default ForumCategoryCard;
