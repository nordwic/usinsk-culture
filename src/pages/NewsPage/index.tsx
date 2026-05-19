import NewsList from '../../features/news/NewsList';
import ExportButton from '../../features/export/ExportButton';
import { useData } from '../../contexts/DataContext';

const NewsPage = () => {
	const { news } = useData();

	return (
		<div className="max-w-[1200px] mx-auto px-6 py-10">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold">Новости</h1>
				<ExportButton
					data={news.filter((n) => n.published)}
					filename="news"
					textContent={news
						.filter((n) => n.published)
						.map((n) => `${n.date} — ${n.title}\n${n.summary}`)
						.join('\n\n')}
				/>
			</div>
			<NewsList />
		</div>
	);
};

export default NewsPage;
