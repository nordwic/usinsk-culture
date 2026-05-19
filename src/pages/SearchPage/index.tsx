import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import SearchBar from '../../features/search/SearchBar';
import Badge from '../../shared/ui/Badge';
import ExportButton from '../../features/export/ExportButton';

type Tab = 'all' | 'news' | 'events' | 'heritage';

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q') ?? '';
	const { news, events, heritage } = useData();
	const [tab, setTab] = useState<Tab>('all');

	const q = query.toLowerCase();

	const matchedNews = news.filter(
		(n) =>
			n.published &&
			(n.title.toLowerCase().includes(q) ||
				n.summary.toLowerCase().includes(q) ||
				n.content.toLowerCase().includes(q)),
	);
	const matchedEvents = events.filter(
		(e) =>
			e.published &&
			(e.title.toLowerCase().includes(q) ||
				e.description.toLowerCase().includes(q) ||
				e.location.toLowerCase().includes(q)),
	);
	const matchedHeritage = heritage.filter(
		(h) =>
			h.title.toLowerCase().includes(q) ||
			h.description.toLowerCase().includes(q) ||
			h.village.toLowerCase().includes(q),
	);

	const total =
		matchedNews.length + matchedEvents.length + matchedHeritage.length;

	const exportData = {
		news: matchedNews,
		events: matchedEvents,
		heritage: matchedHeritage,
	};

	return (
		<div className="max-w-[1000px] mx-auto px-6 py-10">
			<div className="mb-8 space-y-4">
				<h1 className="text-3xl font-bold">Поиск</h1>
				<SearchBar
					initialValue={query}
					placeholder="Поиск по сайту..."
				/>
				{query && (
					<p className="text-gray-400 text-sm">
						По запросу «{query}» найдено {total} результатов
					</p>
				)}
			</div>

			{query && (
				<>
					{/* Табы */}
					<div className="flex gap-2 mb-6 flex-wrap items-center">
						{(
							[
								['all', `Все (${total})`],
								['news', `Новости (${matchedNews.length})`],
								['events', `События (${matchedEvents.length})`],
								[
									'heritage',
									`Наследие (${matchedHeritage.length})`,
								],
							] as [Tab, string][]
						).map(([t, label]) => (
							<button
								key={t}
								onClick={() => setTab(t)}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									tab === t
										? 'bg-cyan-500 text-white'
										: 'bg-white/10 text-gray-300 hover:bg-white/20'
								}`}
							>
								{label}
							</button>
						))}
						<div className="ml-auto">
							<ExportButton
								data={exportData}
								filename={`search-${query}`}
							/>
						</div>
					</div>

					{total === 0 ? (
						<p className="text-gray-400 text-center py-10">
							По вашему запросу ничего не найдено
						</p>
					) : (
						<div className="space-y-3">
							{(tab === 'all' || tab === 'news') &&
								matchedNews.map((n) => (
									<div
										key={`news-${n.id}`}
										className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
									>
										{n.image && (
											<img
												src={n.image}
												alt={n.title}
												className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
											/>
										)}
										<div className="flex flex-col gap-1 min-w-0">
											<div className="flex gap-2 items-center">
												<Badge variant="info">
													{n.category}
												</Badge>
												<span className="text-xs text-gray-400">
													Новость · {n.date}
												</span>
											</div>
											<h3 className="font-semibold text-white">
												{n.title}
											</h3>
											<p className="text-sm text-gray-400 line-clamp-2">
												{n.summary}
											</p>
										</div>
									</div>
								))}

							{(tab === 'all' || tab === 'events') &&
								matchedEvents.map((e) => (
									<div
										key={`event-${e.id}`}
										className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
									>
										{e.image && (
											<img
												src={e.image}
												alt={e.title}
												className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
											/>
										)}
										<div className="flex flex-col gap-1 min-w-0">
											<div className="flex gap-2 items-center">
												<Badge variant="warning">
													{e.type}
												</Badge>
												<span className="text-xs text-gray-400">
													Событие · {e.date} ·{' '}
													{e.location}
												</span>
											</div>
											<h3 className="font-semibold text-white">
												{e.title}
											</h3>
											<p className="text-sm text-gray-400 line-clamp-2">
												{e.description}
											</p>
										</div>
									</div>
								))}

							{(tab === 'all' || tab === 'heritage') &&
								matchedHeritage.map((h) => (
									<div
										key={`heritage-${h.id}`}
										className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
									>
										{h.image && (
											<img
												src={h.image}
												alt={h.title}
												className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
											/>
										)}
										<div className="flex flex-col gap-1 min-w-0">
											<div className="flex gap-2 items-center">
												<Badge variant="success">
													{h.type}
												</Badge>
												<span className="text-xs text-gray-400">
													Наследие · {h.village}
												</span>
											</div>
											<h3 className="font-semibold text-white">
												{h.title}
											</h3>
											<p className="text-sm text-gray-400 line-clamp-2">
												{h.description}
											</p>
										</div>
									</div>
								))}
						</div>
					)}
				</>
			)}

			{!query && (
				<p className="text-gray-400 text-center py-10">
					Введите запрос для поиска
				</p>
			)}
		</div>
	);
};

export default SearchPage;
