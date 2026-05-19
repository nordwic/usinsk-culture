import { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../../../contexts/DataContext';
import { MEDIA_CATEGORIES } from '../../../shared/constants';
import Badge from '../../../shared/ui/Badge';
import Select from '../../../shared/ui/Select';

const MediaGallery = () => {
	const { media } = useData();
	const [category, setCategory] = useState('Все');
	const [typeFilter, setTypeFilter] = useState<'all' | 'photo' | 'video'>(
		'all',
	);
	const [lightbox, setLightbox] = useState<null | (typeof media)[0]>(null);

	const filtered = media.filter((m) => {
		if (category !== 'Все' && m.category !== category) return false;
		if (typeFilter !== 'all' && m.type !== typeFilter) return false;
		return true;
	});

	return (
		<div className="space-y-4">
			{/* Фильтры */}
			<div className="flex flex-wrap gap-4 items-end p-4 bg-white/5 border border-white/10 rounded-xl">
				<Select
					label="Категория"
					value={category}
					options={MEDIA_CATEGORIES.map((c) => ({
						value: c,
						label: c,
					}))}
					onChange={(e) => setCategory(e.target.value)}
				/>
				<div className="flex flex-col gap-1">
					<label className="text-sm text-gray-300">Тип</label>
					<div className="flex gap-2">
						{(['all', 'photo', 'video'] as const).map((t) => (
							<button
								key={t}
								onClick={() => setTypeFilter(t)}
								className={`px-3 py-2 rounded-lg text-sm transition-colors ${
									typeFilter === t
										? 'bg-cyan-500 text-white'
										: 'bg-white/10 text-gray-300 hover:bg-white/20'
								}`}
							>
								{t === 'all'
									? 'Все'
									: t === 'photo'
										? 'Фото'
										: 'Видео'}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Сетка */}
			{filtered.length === 0 ? (
				<p className="text-gray-400 text-center py-10">
					Материалы не найдены
				</p>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
					{filtered.map((item) => (
						<div
							key={item.id}
							className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
							onClick={() => setLightbox(item)}
						>
							<img
								src={item.url}
								alt={item.title}
								className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end p-2">
								<div className="opacity-0 group-hover:opacity-100 transition-opacity">
									<Badge variant="info">
										{item.category}
									</Badge>
									<p className="text-xs text-white mt-1 line-clamp-1">
										{item.title}
									</p>
								</div>
							</div>
							{item.type === 'video' && (
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
									<div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
										<div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-transparent border-l-white ml-1" />
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}

			{/* Lightbox */}
			{lightbox && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
					onClick={() => setLightbox(null)}
				>
					<div
						className="relative max-w-3xl w-full mx-4"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setLightbox(null)}
							className="absolute -top-10 right-0 text-gray-300 hover:text-white"
						>
							<X size={24} />
						</button>
						<img
							src={lightbox.url}
							alt={lightbox.title}
							className="w-full rounded-2xl object-contain max-h-[75vh]"
						/>
						<div className="mt-3 flex flex-wrap gap-2 items-start">
							<Badge variant="info">{lightbox.category}</Badge>
							<span className="text-xs text-gray-400">
								{lightbox.date}
							</span>
							<h3 className="text-white font-semibold w-full">
								{lightbox.title}
							</h3>
							{lightbox.description && (
								<p className="text-sm text-gray-400">
									{lightbox.description}
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MediaGallery;
