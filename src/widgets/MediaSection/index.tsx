import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import Badge from '../../shared/ui/Badge';

const MediaSection = () => {
	const { media } = useData();
	const preview = media.slice(0, 8);

	return (
		<section className="px-10 py-14 bg-[#061625] max-w-full">
			<div className="max-w-[1700px] mx-auto">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold">Медиатека</h2>
					<Link
						to="/media"
						className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
					>
						Вся галерея →
					</Link>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{preview.map((item) => (
						<div
							key={item.id}
							className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
						>
							<img
								src={item.url}
								alt={item.title}
								className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end p-2">
								<div className="opacity-0 group-hover:opacity-100 transition-opacity w-full">
									<Badge variant="info">
										{item.category}
									</Badge>
									<p className="text-xs text-white mt-1 truncate">
										{item.title}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default MediaSection;
