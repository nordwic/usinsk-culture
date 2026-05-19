import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
	NewsItem,
	EventItem,
	HeritageItem,
	MediaItem,
	Message,
} from '../shared/types';

interface DataContextType {
	news: NewsItem[];
	events: EventItem[];
	heritage: HeritageItem[];
	media: MediaItem[];
	messages: Message[];
	addNews: (item: Omit<NewsItem, 'id'>) => void;
	updateNews: (item: NewsItem) => void;
	deleteNews: (id: number) => void;
	addEvent: (item: Omit<EventItem, 'id'>) => void;
	updateEvent: (item: EventItem) => void;
	deleteEvent: (id: number) => void;
	addHeritage: (item: Omit<HeritageItem, 'id'>) => void;
	updateHeritage: (item: HeritageItem) => void;
	deleteHeritage: (id: number) => void;
	addMedia: (item: Omit<MediaItem, 'id'>) => void;
	updateMedia: (item: MediaItem) => void;
	deleteMedia: (id: number) => void;
	addMessage: (msg: Omit<Message, 'id' | 'date' | 'read'>) => void;
	markMessageRead: (id: number) => void;
}

const defaultNews: NewsItem[] = [
	{
		id: 1,
		title: 'Открытие выставки «Коми орнамент»',
		content:
			'В Усинском доме культуры открылась уникальная выставка традиционного коми орнамента. На выставке представлены работы местных мастеров, объединяющие вековые традиции народного искусства. Посетители могут увидеть вышивку, ткачество и резьбу по дереву с характерными узорами коми культуры.',
		summary: 'Выставка традиционного коми орнамента в доме культуры',
		category: 'Культура',
		image: '/yologa.jpg',
		date: '2026-05-15',
		author: 'admin',
		published: true,
	},
	{
		id: 2,
		title: 'Фестиваль «Зарни сюр» собрал сотни участников',
		content:
			'Ежегодный коми фестиваль «Зарни сюр» прошёл в Усинске. Участники из разных сёл района представили народные песни, танцы и ремёсла. Фестиваль стал настоящим праздником культурного разнообразия региона.',
		summary: 'Ежегодный коми фестиваль прошёл в Усинске',
		category: 'Культура',
		image: '/zarni.jpg',
		date: '2026-05-10',
		author: 'editor',
		published: true,
	},
	{
		id: 3,
		title: 'Мастер-класс по коми ткачеству',
		content:
			'В библиотеке состоялся мастер-класс по традиционному коми ткачеству. Опытная мастерица обучила желающих основам создания традиционных узоров на ткацком станке.',
		summary: 'Обучение традиционному ткачеству для всех желающих',
		category: 'Традиции',
		date: '2026-05-05',
		author: 'editor',
		published: true,
	},
	{
		id: 4,
		title: 'Итоги районного конкурса чтецов',
		content:
			'Завершился районный конкурс чтецов, посвящённый коми поэзии. Конкурс собрал более 50 участников из всех сёл района.',
		summary: 'Подведены итоги конкурса коми поэзии',
		category: 'Образование',
		date: '2026-04-28',
		author: 'admin',
		published: true,
	},
	{
		id: 5,
		title: 'Новые экспонаты в краеведческом музее',
		content:
			'Краеведческий музей Усинска пополнился новыми экспонатами — предметами быта коми народа XIX–XX веков.',
		summary: 'Музей получил новые предметы коми быта',
		category: 'Культура',
		date: '2026-04-20',
		author: 'admin',
		published: true,
	},
];

const defaultEvents: EventItem[] = [
	{
		id: 1,
		title: 'Йöлöга',
		image: '/yologa.jpg',
		description: 'Традиционный коми праздник встречи весны',
		date: '2026-06-10',
		type: 'Фестиваль',
		location: 'Усинск',
		published: true,
	},
	{
		id: 2,
		title: 'Зарни сюр',
		image: '/zarni.jpg',
		description: 'Фестиваль коми культуры и традиций',
		date: '2026-06-20',
		type: 'Фестиваль',
		location: 'Усинск',
		published: true,
	},
	{
		id: 3,
		title: 'Мырпом рöма',
		image: '/myrpom.jpg',
		description: 'Праздник коми народного творчества',
		date: '2026-07-05',
		type: 'Концерт',
		location: 'Колва',
		published: true,
	},
	{
		id: 4,
		title: 'Ми тани олам',
		image: '/mitany.jpg',
		description: 'Культурная программа «Мы здесь живём»',
		date: '2026-07-15',
		type: 'Выставка',
		location: 'Усть-Уса',
		published: true,
	},
	{
		id: 5,
		title: 'Святая Троица',
		image: '/troica.jpg',
		description: 'Праздничные мероприятия на Троицу',
		date: '2026-06-01',
		type: 'Концерт',
		location: 'Верхнеколвинск',
		published: true,
	},
];

const defaultHeritage: HeritageItem[] = [
	{
		id: 1,
		title: 'Церковь Вознесения Господня',
		type: 'Памятник',
		village: 'Усинск',
		description:
			'Православная церковь XIX века, памятник архитектуры федерального значения',
		image: '/troica.jpg',
	},
	{
		id: 2,
		title: 'Традиция Йöлöга',
		type: 'Традиция',
		village: 'Усинск',
		description:
			'Традиционный коми весенний праздник с песнями, хороводами и ритуальными действиями',
		image: '/yologa.jpg',
	},
	{
		id: 3,
		title: 'Коми ткачество',
		type: 'Ремесло',
		village: 'Колва',
		description:
			'Традиционное ткачество с характерными геометрическими узорами коми народа',
	},
	{
		id: 4,
		title: 'Эпос «Перя богатырь»',
		type: 'Фольклор',
		village: 'Щельябож',
		description:
			'Героический эпос коми народа о богатыре Перя, защищавшем родную землю',
	},
	{
		id: 5,
		title: 'Усть-Лыжа',
		type: 'Населённый пункт',
		village: 'Усть-Лыжа',
		description:
			'Старейшее поселение Усинского района с богатой историей охотников и рыболовов',
	},
];

const defaultMedia: MediaItem[] = [
	{
		id: 1,
		title: 'Праздник Йöлöга 2025',
		type: 'photo',
		url: '/yologa.jpg',
		category: 'Праздники',
		description: 'Фотографии с ежегодного праздника',
		date: '2025-06-10',
		uploadedBy: 'admin',
	},
	{
		id: 2,
		title: 'Фестиваль Зарни сюр',
		type: 'photo',
		url: '/zarni.jpg',
		category: 'Праздники',
		description: 'Фотографии с фестиваля коми культуры',
		date: '2025-06-20',
		uploadedBy: 'editor',
	},
	{
		id: 3,
		title: 'Природа Усинского района',
		type: 'photo',
		url: '/myrpom.jpg',
		category: 'Природа',
		description: 'Пейзажи района',
		date: '2025-07-01',
		uploadedBy: 'admin',
	},
	{
		id: 4,
		title: 'Культурная программа',
		type: 'photo',
		url: '/mitany.jpg',
		category: 'События',
		description: 'Мероприятие «Ми тани олам»',
		date: '2025-07-15',
		uploadedBy: 'editor',
	},
	{
		id: 5,
		title: 'Троица в Верхнеколвинске',
		type: 'photo',
		url: '/troica.jpg',
		category: 'Праздники',
		description: 'Праздничные мероприятия',
		date: '2025-06-01',
		uploadedBy: 'admin',
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

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: { children: ReactNode }) => {
	const [news, setNews] = useState<NewsItem[]>(() =>
		load('app_news', defaultNews),
	);
	const [events, setEvents] = useState<EventItem[]>(() =>
		load('app_events', defaultEvents),
	);
	const [heritage, setHeritage] = useState<HeritageItem[]>(() =>
		load('app_heritage', defaultHeritage),
	);
	const [media, setMedia] = useState<MediaItem[]>(() =>
		load('app_media', defaultMedia),
	);
	const [messages, setMessages] = useState<Message[]>(() =>
		load('app_messages', []),
	);

	const addNews = (item: Omit<NewsItem, 'id'>) => {
		const updated = [...news, { ...item, id: Date.now() }];
		setNews(updated);
		save('app_news', updated);
	};
	const updateNews = (item: NewsItem) => {
		const updated = news.map((n) => (n.id === item.id ? item : n));
		setNews(updated);
		save('app_news', updated);
	};
	const deleteNews = (id: number) => {
		const updated = news.filter((n) => n.id !== id);
		setNews(updated);
		save('app_news', updated);
	};

	const addEvent = (item: Omit<EventItem, 'id'>) => {
		const updated = [...events, { ...item, id: Date.now() }];
		setEvents(updated);
		save('app_events', updated);
	};
	const updateEvent = (item: EventItem) => {
		const updated = events.map((e) => (e.id === item.id ? item : e));
		setEvents(updated);
		save('app_events', updated);
	};
	const deleteEvent = (id: number) => {
		const updated = events.filter((e) => e.id !== id);
		setEvents(updated);
		save('app_events', updated);
	};

	const addHeritage = (item: Omit<HeritageItem, 'id'>) => {
		const updated = [...heritage, { ...item, id: Date.now() }];
		setHeritage(updated);
		save('app_heritage', updated);
	};
	const updateHeritage = (item: HeritageItem) => {
		const updated = heritage.map((h) => (h.id === item.id ? item : h));
		setHeritage(updated);
		save('app_heritage', updated);
	};
	const deleteHeritage = (id: number) => {
		const updated = heritage.filter((h) => h.id !== id);
		setHeritage(updated);
		save('app_heritage', updated);
	};

	const addMedia = (item: Omit<MediaItem, 'id'>) => {
		const updated = [...media, { ...item, id: Date.now() }];
		setMedia(updated);
		save('app_media', updated);
	};
	const updateMedia = (item: MediaItem) => {
		const updated = media.map((m) => (m.id === item.id ? item : m));
		setMedia(updated);
		save('app_media', updated);
	};
	const deleteMedia = (id: number) => {
		const updated = media.filter((m) => m.id !== id);
		setMedia(updated);
		save('app_media', updated);
	};

	const addMessage = (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
		const updated = [
			...messages,
			{
				...msg,
				id: Date.now(),
				date: new Date().toISOString().split('T')[0],
				read: false,
			},
		];
		setMessages(updated);
		save('app_messages', updated);
	};

	const markMessageRead = (id: number) => {
		const updated = messages.map((m) =>
			m.id === id ? { ...m, read: true } : m,
		);
		setMessages(updated);
		save('app_messages', updated);
	};

	return (
		<DataContext.Provider
			value={{
				news,
				events,
				heritage,
				media,
				messages,
				addNews,
				updateNews,
				deleteNews,
				addEvent,
				updateEvent,
				deleteEvent,
				addHeritage,
				updateHeritage,
				deleteHeritage,
				addMedia,
				updateMedia,
				deleteMedia,
				addMessage,
				markMessageRead,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
