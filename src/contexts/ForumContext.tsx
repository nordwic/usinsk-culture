import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ForumThread, ForumPost } from '../shared/types';

interface ForumContextType {
	threads: ForumThread[];
	posts: ForumPost[];
	addThread: (thread: Omit<ForumThread, 'id' | 'views'>) => ForumThread;
	deleteThread: (id: number) => void;
	addPost: (post: Omit<ForumPost, 'id'>) => ForumPost;
	deletePost: (id: number) => void;
	incrementViews: (threadId: number) => void;
}

const defaultThreads: ForumThread[] = [
	{
		id: 1,
		categoryId: 'dialogue',
		title: 'Как сохранить традиции коми народа для будущих поколений?',
		authorName: 'admin',
		authorId: 1,
		createdAt: '2026-05-10',
		views: 42,
		pinned: true,
	},
	{
		id: 2,
		categoryId: 'dialogue',
		title: 'Обсуждение фестиваля Йöлöга 2026',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-12',
		views: 28,
	},
	{
		id: 3,
		categoryId: 'dialogue',
		title: 'Коми язык в современном мире — как поддерживать интерес?',
		authorName: 'user1',
		authorId: 3,
		createdAt: '2026-05-14',
		views: 19,
	},
	{
		id: 4,
		categoryId: 'qa',
		title: 'Как добраться до Верхнеколвинска?',
		authorName: 'user1',
		authorId: 3,
		createdAt: '2026-05-14',
		views: 15,
	},
	{
		id: 5,
		categoryId: 'qa',
		title: 'Когда пройдёт следующий фестиваль «Зарни сюр»?',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-17',
		views: 12,
	},
	{
		id: 6,
		categoryId: 'feedback',
		title: 'Предложение: добавить раздел с рецептами коми кухни',
		authorName: 'user1',
		authorId: 3,
		createdAt: '2026-05-15',
		views: 8,
	},
	{
		id: 7,
		categoryId: 'feedback',
		title: 'Пожелание: мобильная версия сайта',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-16',
		views: 11,
	},
	{
		id: 8,
		categoryId: 'support',
		title: 'Не загружаются фотографии в разделе Медиатека',
		authorName: 'user1',
		authorId: 3,
		createdAt: '2026-05-16',
		views: 5,
	},
	{
		id: 9,
		categoryId: 'support',
		title: 'Ошибка при регистрации аккаунта',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-18',
		views: 3,
		pinned: true,
	},
];

const defaultPosts: ForumPost[] = [
	{
		id: 1,
		threadId: 1,
		content:
			'Сохранение традиций — важная задача для всего сообщества. Считаю, что нужно прежде всего работать с молодёжью: проводить мастер-классы, фестивали, включать элементы коми культуры в школьную программу.',
		authorName: 'admin',
		authorId: 1,
		createdAt: '2026-05-10',
	},
	{
		id: 2,
		threadId: 1,
		content:
			'Полностью согласен. Ещё важно документировать фольклор — записывать песни, сказки, легенды от старшего поколения, пока есть возможность.',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-11',
	},
	{
		id: 3,
		threadId: 1,
		content:
			'Можно создать онлайн-архив традиционных ремёсел с видеоуроками. Это поможет освоить ткачество, резьбу по дереву даже дистанционно.',
		authorName: 'user1',
		authorId: 3,
		createdAt: '2026-05-11',
	},
	{
		id: 4,
		threadId: 2,
		content:
			'Фестиваль в этом году порадовал! Особенно понравились выступления коллективов из Колвы и Щельябожа. Очень самобытная программа.',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-12',
	},
	{
		id: 5,
		threadId: 2,
		content:
			'Атмосфера была незабываемая. Надеюсь, в следующем году программа будет ещё насыщеннее. Хочется больше мастер-классов для детей.',
		authorName: 'user1',
		authorId: 3,
		createdAt: '2026-05-13',
	},
	{
		id: 6,
		threadId: 3,
		content:
			'Думаю, что ключевое — это создание современного контента на коми языке: подкасты, ролики, посты в соцсетях. Молодёжь должна видеть, что язык живёт.',
		authorName: 'admin',
		authorId: 1,
		createdAt: '2026-05-14',
	},
	{
		id: 7,
		threadId: 3,
		content:
			'Согласна. В школах можно ввести факультативы по коми языку в игровой форме. Детям нравятся интерактивные методы.',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-14',
	},
	{
		id: 8,
		threadId: 4,
		content:
			'Добраться можно на автобусе от Усинска — ходит по понедельникам, средам и пятницам. Время в пути около 3 часов. Расписание можно уточнить на автовокзале.',
		authorName: 'admin',
		authorId: 1,
		createdAt: '2026-05-14',
	},
	{
		id: 9,
		threadId: 5,
		content:
			'Фестиваль «Зарни сюр» планируется в третьей декаде июня. Следите за разделом «События» на портале — там появится подробная программа.',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-17',
	},
	{
		id: 10,
		threadId: 6,
		content:
			'Отличная идея! Традиционная коми кухня очень самобытная. Передам предложение команде — будем прорабатывать.',
		authorName: 'admin',
		authorId: 1,
		createdAt: '2026-05-15',
	},
	{
		id: 11,
		threadId: 7,
		content:
			'Работы по адаптации мобильной версии уже ведутся. Планируем запуск в третьем квартале 2026 года.',
		authorName: 'admin',
		authorId: 1,
		createdAt: '2026-05-16',
	},
	{
		id: 12,
		threadId: 8,
		content:
			'Спасибо за сообщение! Проблема связана с обновлением сервера. Уже работаем над устранением — ожидайте исправления в течение суток.',
		authorName: 'admin',
		authorId: 1,
		createdAt: '2026-05-16',
	},
	{
		id: 13,
		threadId: 9,
		content:
			'Описание ошибки: при нажатии кнопки «Зарегистрироваться» страница перезагружается, но аккаунт не создаётся. Браузер Chrome, Windows 11.',
		authorName: 'editor',
		authorId: 2,
		createdAt: '2026-05-18',
	},
	{
		id: 14,
		threadId: 9,
		content:
			'Приняли в работу. Проверьте, пожалуйста, отключены ли расширения браузера — некоторые блокировщики рекламы мешают отправке форм.',
		authorName: 'admin',
		authorId: 1,
		createdAt: '2026-05-18',
	},
];

function load<T>(key: string, def: T[]): T[] {
	try {
		const s = localStorage.getItem(key);
		return s ? (JSON.parse(s) as T[]) : def;
	} catch {
		return def;
	}
}
function save<T>(key: string, val: T[]) {
	localStorage.setItem(key, JSON.stringify(val));
}

const ForumContext = createContext<ForumContextType>({} as ForumContextType);

export const ForumProvider = ({ children }: { children: ReactNode }) => {
	const [threads, setThreads] = useState<ForumThread[]>(() =>
		load('forum_threads', defaultThreads),
	);
	const [posts, setPosts] = useState<ForumPost[]>(() =>
		load('forum_posts', defaultPosts),
	);

	const addThread = (
		thread: Omit<ForumThread, 'id' | 'views'>,
	): ForumThread => {
		const newThread: ForumThread = { ...thread, id: Date.now(), views: 0 };
		const updated = [...threads, newThread];
		setThreads(updated);
		save('forum_threads', updated);
		return newThread;
	};

	const deleteThread = (id: number) => {
		const updatedThreads = threads.filter((t) => t.id !== id);
		const updatedPosts = posts.filter((p) => p.threadId !== id);
		setThreads(updatedThreads);
		setPosts(updatedPosts);
		save('forum_threads', updatedThreads);
		save('forum_posts', updatedPosts);
	};

	const addPost = (post: Omit<ForumPost, 'id'>): ForumPost => {
		const newPost: ForumPost = { ...post, id: Date.now() };
		const updated = [...posts, newPost];
		setPosts(updated);
		save('forum_posts', updated);
		return newPost;
	};

	const deletePost = (id: number) => {
		const updated = posts.filter((p) => p.id !== id);
		setPosts(updated);
		save('forum_posts', updated);
	};

	const incrementViews = (threadId: number) => {
		const updated = threads.map((t) =>
			t.id === threadId ? { ...t, views: t.views + 1 } : t,
		);
		setThreads(updated);
		save('forum_threads', updated);
	};

	return (
		<ForumContext.Provider
			value={{
				threads,
				posts,
				addThread,
				deleteThread,
				addPost,
				deletePost,
				incrementViews,
			}}
		>
			{children}
		</ForumContext.Provider>
	);
};

export const useForumContext = () => useContext(ForumContext);
