import { useState } from 'react';
import { useData } from '../../../contexts/DataContext';
import { NEWS_CATEGORIES } from '../../../shared/constants';
import Badge from '../../../shared/ui/Badge';
import Button from '../../../shared/ui/Button';
import Select from '../../../shared/ui/Select';

const ITEMS_PER_PAGE = 5;

const NewsList = () => {
	const { news } = useData();
	const [category, setCategory] = useState('Все');
	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');
	const [page, setPage] = useState(1);

	const published = news.filter((n) => n.published);

	const filtered = published.filter((n) => {
		if (category !== 'Все' && n.category !== category) return false;
		if (dateFrom && n.date < dateFrom) return false;
		if (dateTo && n.date > dateTo) return false;
		return true;
	});

	const total = Math.ceil(filtered.length / ITEMS_PER_PAGE);
	const paginated = filtered.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE,
	);

	const handleCategoryChange = (val: string) => {
		setCategory(val);
		setPage(1);
	};

	return (
		<div className="space-y-6">
			{/* Фильтры */}
			<div className="flex flex-wrap gap-4 items-end p-4 bg-white/5 rounded-xl border border-white/10">
				<Select
					label="Категория"
					value={category}
					options={NEWS_CATEGORIES.map((c) => ({
						value: c,
						label: c,
					}))}
					onChange={(e) => handleCategoryChange(e.target.value)}
				/>
				<div className="flex flex-col gap-1">
					<label className="text-sm text-gray-300">Дата с</label>
					<input
						type="date"
						value={dateFrom}
						onChange={(e) => {
							setDateFrom(e.target.value);
							setPage(1);
						}}
						className="bg-[#0b1d2a] border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-sm text-gray-300">Дата по</label>
					<input
						type="date"
						value={dateTo}
						onChange={(e) => {
							setDateTo(e.target.value);
							setPage(1);
						}}
						className="bg-[#0b1d2a] border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
					/>
				</div>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => {
						setCategory('Все');
						setDateFrom('');
						setDateTo('');
						setPage(1);
					}}
				>
					Сбросить
				</Button>
			</div>

			{/* Список */}
			{paginated.length === 0 ? (
				<p className="text-gray-400 text-center py-10">
					Новости не найдены
				</p>
			) : (
				paginated.map((item) => (
					<article
						key={item.id}
						className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
					>
						{item.image && (
							<img
								src={item.image}
								alt={item.title}
								className="w-28 h-20 object-cover rounded-xl flex-shrink-0"
							/>
						)}
						<div className="flex flex-col gap-2 min-w-0">
							<div className="flex flex-wrap gap-2 items-center">
								<Badge variant="info">{item.category}</Badge>
								<span className="text-xs text-gray-400">
									{item.date}
								</span>
								<span className="text-xs text-gray-500">
									автор: {item.author}
								</span>
							</div>
							<h3 className="font-semibold text-white">
								{item.title}
							</h3>
							<p className="text-sm text-gray-400 line-clamp-2">
								{item.summary}
							</p>
						</div>
					</article>
				))
			)}

			{/* Пагинация */}
			{total > 1 && (
				<div className="flex justify-center gap-2 pt-2">
					{Array.from({ length: total }, (_, i) => i + 1).map((p) => (
						<button
							key={p}
							onClick={() => setPage(p)}
							className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
								p === page
									? 'bg-cyan-500 text-white'
									: 'bg-white/10 text-gray-300 hover:bg-white/20'
							}`}
						>
							{p}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default NewsList;
