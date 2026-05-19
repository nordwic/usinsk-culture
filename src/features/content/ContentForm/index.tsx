import { useState, useEffect } from 'react';
import { useData } from '../../../contexts/DataContext';
import type {
	NewsItem,
	EventItem,
	HeritageItem,
	MediaItem,
} from '../../../shared/types';
import {
	EVENT_TYPES,
	NEWS_CATEGORIES,
	HERITAGE_TYPES,
	MEDIA_CATEGORIES,
	VILLAGES,
} from '../../../shared/constants';
import Input from '../../../shared/ui/Input';
import Select from '../../../shared/ui/Select';
import Button from '../../../shared/ui/Button';

type ContentType = 'news' | 'events' | 'heritage' | 'media';

interface ContentFormProps {
	contentType: ContentType;
	editItem?: NewsItem | EventItem | HeritageItem | MediaItem | null;
	onDone: () => void;
}

const ContentForm = ({ contentType, editItem, onDone }: ContentFormProps) => {
	const {
		addNews,
		updateNews,
		addEvent,
		updateEvent,
		addHeritage,
		updateHeritage,
		addMedia,
		updateMedia,
	} = useData();

	const [form, setForm] = useState<Record<string, string>>({});

	useEffect(() => {
		if (editItem) {
			const mapped: Record<string, string> = {};
			Object.entries(editItem).forEach(([k, v]) => {
				if (k !== 'id') mapped[k] = String(v);
			});
			setForm(mapped);
		} else {
			setForm(getDefaults(contentType));
		}
	}, [editItem, contentType]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (contentType === 'news') {
			const item = {
				title: form.title ?? '',
				content: form.content ?? '',
				summary: form.summary ?? '',
				category: form.category ?? '',
				image: form.image,
				date: form.date ?? '',
				author: form.author ?? '',
				published: form.published === 'true',
			};
			editItem
				? updateNews({ ...(editItem as NewsItem), ...item })
				: addNews(item);
		} else if (contentType === 'events') {
			const item = {
				title: form.title ?? '',
				description: form.description ?? '',
				image: form.image ?? '',
				date: form.date ?? '',
				type: form.type ?? '',
				location: form.location ?? '',
				published: form.published === 'true',
			};
			editItem
				? updateEvent({ ...(editItem as EventItem), ...item })
				: addEvent(item);
		} else if (contentType === 'heritage') {
			const item = {
				title: form.title ?? '',
				type: form.type ?? '',
				village: form.village ?? '',
				description: form.description ?? '',
				image: form.image,
			};
			editItem
				? updateHeritage({ ...(editItem as HeritageItem), ...item })
				: addHeritage(item);
		} else {
			const item = {
				title: form.title ?? '',
				type: (form.type === 'video' ? 'video' : 'photo') as
					| 'photo'
					| 'video',
				url: form.url ?? '',
				category: form.category ?? '',
				description: form.description,
				date: form.date ?? '',
				uploadedBy: form.uploadedBy ?? '',
			};
			editItem
				? updateMedia({ ...(editItem as MediaItem), ...item })
				: addMedia(item);
		}
		onDone();
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3">
			{contentType === 'news' && (
				<>
					<Input
						name="title"
						label="Заголовок *"
						value={form.title ?? ''}
						onChange={handleChange}
						required
					/>
					<Input
						name="summary"
						label="Краткое описание *"
						value={form.summary ?? ''}
						onChange={handleChange}
						required
					/>
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-300">Текст *</label>
						<textarea
							name="content"
							value={form.content ?? ''}
							onChange={handleChange}
							rows={4}
							required
							className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
						/>
					</div>
					<Select
						name="category"
						label="Категория"
						value={form.category ?? ''}
						options={NEWS_CATEGORIES.slice(1).map((c) => ({
							value: c,
							label: c,
						}))}
						onChange={handleChange}
					/>
					<Input
						name="image"
						label="URL изображения"
						value={form.image ?? ''}
						onChange={handleChange}
					/>
					<Input
						name="date"
						label="Дата *"
						type="date"
						value={form.date ?? ''}
						onChange={handleChange}
						required
					/>
					<Input
						name="author"
						label="Автор *"
						value={form.author ?? ''}
						onChange={handleChange}
						required
					/>
					<Select
						name="published"
						label="Опубликовано"
						value={form.published ?? 'true'}
						options={[
							{ value: 'true', label: 'Да' },
							{ value: 'false', label: 'Нет' },
						]}
						onChange={handleChange}
					/>
				</>
			)}
			{contentType === 'events' && (
				<>
					<Input
						name="title"
						label="Название *"
						value={form.title ?? ''}
						onChange={handleChange}
						required
					/>
					<Input
						name="description"
						label="Описание *"
						value={form.description ?? ''}
						onChange={handleChange}
						required
					/>
					<Input
						name="image"
						label="URL изображения"
						value={form.image ?? ''}
						onChange={handleChange}
					/>
					<Input
						name="date"
						label="Дата *"
						type="date"
						value={form.date ?? ''}
						onChange={handleChange}
						required
					/>
					<Select
						name="type"
						label="Тип"
						value={form.type ?? ''}
						options={EVENT_TYPES.slice(1).map((t) => ({
							value: t,
							label: t,
						}))}
						onChange={handleChange}
					/>
					<Select
						name="location"
						label="Место"
						value={form.location ?? ''}
						options={VILLAGES.map((v) => ({ value: v, label: v }))}
						onChange={handleChange}
					/>
					<Select
						name="published"
						label="Опубликовано"
						value={form.published ?? 'true'}
						options={[
							{ value: 'true', label: 'Да' },
							{ value: 'false', label: 'Нет' },
						]}
						onChange={handleChange}
					/>
				</>
			)}
			{contentType === 'heritage' && (
				<>
					<Input
						name="title"
						label="Название *"
						value={form.title ?? ''}
						onChange={handleChange}
						required
					/>
					<Select
						name="type"
						label="Тип"
						value={form.type ?? ''}
						options={HERITAGE_TYPES.slice(1).map((t) => ({
							value: t,
							label: t,
						}))}
						onChange={handleChange}
					/>
					<Select
						name="village"
						label="Населённый пункт"
						value={form.village ?? ''}
						options={VILLAGES.map((v) => ({ value: v, label: v }))}
						onChange={handleChange}
					/>
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-300">
							Описание *
						</label>
						<textarea
							name="description"
							value={form.description ?? ''}
							onChange={handleChange}
							rows={3}
							required
							className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
						/>
					</div>
					<Input
						name="image"
						label="URL изображения"
						value={form.image ?? ''}
						onChange={handleChange}
					/>
				</>
			)}
			{contentType === 'media' && (
				<>
					<Input
						name="title"
						label="Название *"
						value={form.title ?? ''}
						onChange={handleChange}
						required
					/>
					<Select
						name="type"
						label="Тип"
						value={form.type ?? 'photo'}
						options={[
							{ value: 'photo', label: 'Фото' },
							{ value: 'video', label: 'Видео' },
						]}
						onChange={handleChange}
					/>
					<Input
						name="url"
						label="URL файла *"
						value={form.url ?? ''}
						onChange={handleChange}
						required
					/>
					<Select
						name="category"
						label="Категория"
						value={form.category ?? ''}
						options={MEDIA_CATEGORIES.slice(1).map((c) => ({
							value: c,
							label: c,
						}))}
						onChange={handleChange}
					/>
					<Input
						name="description"
						label="Описание"
						value={form.description ?? ''}
						onChange={handleChange}
					/>
					<Input
						name="date"
						label="Дата *"
						type="date"
						value={form.date ?? ''}
						onChange={handleChange}
						required
					/>
					<Input
						name="uploadedBy"
						label="Загружено"
						value={form.uploadedBy ?? ''}
						onChange={handleChange}
					/>
				</>
			)}
			<div className="flex gap-3 pt-2">
				<Button type="submit" className="flex-1">
					{editItem ? 'Сохранить' : 'Добавить'}
				</Button>
				<Button type="button" variant="ghost" onClick={onDone}>
					Отмена
				</Button>
			</div>
		</form>
	);
};

function getDefaults(type: ContentType): Record<string, string> {
	const today = new Date().toISOString().split('T')[0];
	switch (type) {
		case 'news':
			return {
				title: '',
				summary: '',
				content: '',
				category: 'Культура',
				image: '',
				date: today,
				author: '',
				published: 'true',
			};
		case 'events':
			return {
				title: '',
				description: '',
				image: '',
				date: today,
				type: 'Фестиваль',
				location: 'Усинск',
				published: 'true',
			};
		case 'heritage':
			return {
				title: '',
				type: 'Памятник',
				village: 'Усинск',
				description: '',
				image: '',
			};
		case 'media':
			return {
				title: '',
				type: 'photo',
				url: '',
				category: 'Праздники',
				description: '',
				date: today,
				uploadedBy: '',
			};
	}
}

export default ContentForm;
