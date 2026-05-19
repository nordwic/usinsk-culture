import { useState } from 'react';
import { FORUM_CATEGORIES } from '../../shared/constants';
import { useForumContext } from '../../contexts/ForumContext';
import ForumCategoryCard from '../../features/forum/ForumCategoryCard';
import ForumThreadList from '../../features/forum/ForumThreadList';
import ForumThreadView from '../../features/forum/ForumThreadView';

type ForumView =
	| { type: 'categories' }
	| { type: 'threads'; categoryId: string }
	| { type: 'thread'; threadId: number; categoryId: string };

const ForumPage = () => {
	const { threads, posts } = useForumContext();
	const [view, setView] = useState<ForumView>({ type: 'categories' });

	const goToCategory = (categoryId: string) =>
		setView({ type: 'threads', categoryId });

	const goToThread = (threadId: number, categoryId: string) =>
		setView({ type: 'thread', threadId, categoryId });

	const goToCategories = () => setView({ type: 'categories' });

	const goToThreadList = (categoryId: string) =>
		setView({ type: 'threads', categoryId });

	/* ─── Categories ─────────────────────────────────────────────── */
	if (view.type === 'categories') {
		return (
			<div className="max-w-[900px] mx-auto px-6 py-10">
				<h1 className="text-3xl font-bold text-white mb-2">Форум</h1>
				<p className="text-gray-400 mb-8">
					Обсуждения, вопросы и культурный диалог сообщества Усинского
					района
				</p>
				<div className="flex flex-col gap-3">
					{FORUM_CATEGORIES.map((cat) => (
						<ForumCategoryCard
							key={cat.id}
							category={cat}
							threads={threads.filter(
								(t) => t.categoryId === cat.id,
							)}
							posts={posts}
							onClick={() => goToCategory(cat.id)}
						/>
					))}
				</div>
			</div>
		);
	}

	/* ─── Thread list ─────────────────────────────────────────────── */
	if (view.type === 'threads') {
		const category = FORUM_CATEGORIES.find(
			(c) => c.id === view.categoryId,
		)!;
		const categoryThreads = threads.filter(
			(t) => t.categoryId === view.categoryId,
		);

		return (
			<div className="max-w-[900px] mx-auto px-6 py-10">
				<ForumThreadList
					category={category}
					threads={categoryThreads}
					posts={posts}
					onSelectThread={(id) => goToThread(id, view.categoryId)}
					onBack={goToCategories}
				/>
			</div>
		);
	}

	/* ─── Thread view ─────────────────────────────────────────────── */
	const thread = threads.find((t) => t.id === view.threadId);
	const threadPosts = posts.filter((p) => p.threadId === view.threadId);

	// Тема могла быть удалена — возвращаемся к списку тем
	if (!thread) {
		setView({ type: 'threads', categoryId: view.categoryId });
		return null;
	}

	return (
		<div className="max-w-[900px] mx-auto px-6 py-10">
			<ForumThreadView
				thread={thread}
				posts={threadPosts}
				onBack={() => goToThreadList(view.categoryId)}
			/>
		</div>
	);
};

export default ForumPage;
