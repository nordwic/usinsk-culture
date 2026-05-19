import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import Badge from '../../shared/ui/Badge';

const EventsSection = () => {
	const { events } = useData();
	const upcoming = events
		.filter((e) => e.published)
		.sort((a, b) => a.date.localeCompare(b.date))
		.slice(0, 5);

	return (
		<section className="px-10 py-14 bg-[#061625] max-w-full">
			<div className="max-w-[1700px] mx-auto">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold">Культурные события</h2>
					<Link
						to="/events"
						className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
					>
						Все события →
					</Link>
				</div>

				<div className="flex gap-6 overflow-x-auto pb-2">
					{upcoming.map((event) => (
						<div
							key={event.id}
							className="flex-shrink-0 group cursor-pointer w-52"
						>
							<div className="overflow-hidden rounded-2xl">
								<img
									src={event.image}
									alt={event.title}
									className="w-52 h-36 object-cover group-hover:scale-110 transition duration-300"
								/>
							</div>
							<div className="mt-3 flex flex-col gap-1">
								<div className="flex gap-2 items-center">
									<Badge variant="info">{event.type}</Badge>
									<span className="text-xs text-gray-400">
										{event.date}
									</span>
								</div>
								<p className="text-sm font-semibold text-white">
									{event.title}
								</p>
								<p className="text-xs text-gray-400">
									📍 {event.location}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default EventsSection;
