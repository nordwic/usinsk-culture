import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useData } from '../../../contexts/DataContext';
import type {
	NewsItem,
	EventItem,
	HeritageItem,
	MediaItem,
} from '../../../shared/types';
import ContentForm from '../ContentForm';
import Modal from '../../../shared/ui/Modal';
import Button from '../../../shared/ui/Button';
import Badge from '../../../shared/ui/Badge';

type ContentType = 'news' | 'events' | 'heritage' | 'media';

const LABELS: Record<ContentType, string> = {
	news: 'Новости',
	events: 'События',
	heritage: 'Культурное наследие',
	media: 'Медиатека',
};

const ContentManager = () => {
	const data = useData();
	const [activeType, setActiveType] = useState<ContentType>('news');
	const [modalOpen, setModalOpen] = useState(false);
	const [editItem, setEditItem] = useState<
		NewsItem | EventItem | HeritageItem | MediaItem | null
	>(null);

	const items: (NewsItem | EventItem | HeritageItem | MediaItem)[] = {
		news: data.news,
		events: data.events,
		heritage: data.heritage,
		media: data.media,
	}[activeType];

	const handleDelete = (id: number) => {
		if (!confirm('Удалить запись?')) return;
		if (activeType === 'news') data.deleteNews(id);
		else if (activeType === 'events') data.deleteEvent(id);
		else if (activeType === 'heritage') data.deleteHeritage(id);
		else data.deleteMedia(id);
	};

	const openAdd = () => {
		setEditItem(null);
		setModalOpen(true);
	};
	const openEdit = (item: typeof editItem) => {
		setEditItem(item);
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
		setEditItem(null);
	};

	const getTitle = (item: NewsItem | EventItem | HeritageItem | MediaItem) =>
		'title' in item ? item.title : '';

	const getExtra = (
		item: NewsItem | EventItem | HeritageItem | MediaItem,
	) => {
		if (activeType === 'news') {
			const n = item as NewsItem;
			return (
				<>
					<Badge variant="info">{n.category}</Badge>{' '}
					<span className="text-xs text-gray-400">{n.date}</span>
				</>
			);
		}
		if (activeType === 'events') {
			const e = item as EventItem;
			return (
				<>
					<Badge variant="info">{e.type}</Badge>{' '}
					<span className="text-xs text-gray-400">
						{e.date} · {e.location}
					</span>
				</>
			);
		}
		if (activeType === 'heritage') {
			const h = item as HeritageItem;
			return (
				<>
					<Badge variant="info">{h.type}</Badge>{' '}
					<Badge>{h.village}</Badge>
				</>
			);
		}
		if (activeType === 'media') {
			const m = item as MediaItem;
			return (
				<>
					<Badge variant={m.type === 'photo' ? 'success' : 'warning'}>
						{m.type === 'photo' ? 'Фото' : 'Видео'}
					</Badge>{' '}
					<Badge>{m.category}</Badge>
				</>
			);
		}
	};

	return (
		<div className="space-y-4">
			{/* Выбор типа */}
			<div className="flex flex-wrap gap-2">
				{(Object.keys(LABELS) as ContentType[]).map((t) => (
					<button
						key={t}
						onClick={() => setActiveType(t)}
						className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
							activeType === t
								? 'bg-cyan-500 text-white'
								: 'bg-white/10 text-gray-300 hover:bg-white/20'
						}`}
					>
						{LABELS[t]}{' '}
						<span className="opacity-70">
							(
							{
								{
									news: data.news,
									events: data.events,
									heritage: data.heritage,
									media: data.media,
								}[t].length
							}
							)
						</span>
					</button>
				))}
				<Button
					size="sm"
					onClick={openAdd}
					className="flex items-center gap-1 ml-auto"
				>
					<Plus size={14} /> Добавить
				</Button>
			</div>

			{/* Таблица */}
			<div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
				{items.length === 0 ? (
					<p className="text-gray-400 text-center py-8">
						Нет записей
					</p>
				) : (
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-white/10 text-gray-400">
								<th className="text-left p-3">Название</th>
								<th className="text-left p-3 hidden sm:table-cell">
									Метки
								</th>
								<th className="text-right p-3">Действия</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr
									key={item.id}
									className="border-b border-white/5 hover:bg-white/5 transition-colors"
								>
									<td className="p-3 text-white font-medium">
										{getTitle(item)}
									</td>
									<td className="p-3 hidden sm:table-cell">
										<div className="flex flex-wrap gap-1">
											{getExtra(item)}
										</div>
									</td>
									<td className="p-3">
										<div className="flex gap-2 justify-end">
											<button
												onClick={() => openEdit(item)}
												className="text-gray-400 hover:text-cyan-400 transition-colors"
												title="Редактировать"
											>
												<Pencil size={15} />
											</button>
											<button
												onClick={() =>
													handleDelete(item.id)
												}
												className="text-gray-400 hover:text-red-400 transition-colors"
												title="Удалить"
											>
												<Trash2 size={15} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
				title={
					editItem
						? `Редактировать — ${LABELS[activeType]}`
						: `Добавить — ${LABELS[activeType]}`
				}
			>
				<ContentForm
					contentType={activeType}
					editItem={editItem}
					onDone={closeModal}
				/>
			</Modal>
		</div>
	);
};

export default ContentManager;
