import EventsCalendar from '../../features/events/EventsCalendar';
import ExportButton from '../../features/export/ExportButton';
import { useData } from '../../contexts/DataContext';

const EventsPage = () => {
	const { events } = useData();

	return (
		<div className="max-w-[1200px] mx-auto px-6 py-10">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold">Календарь событий</h1>
					<p className="text-gray-400 mt-1">
						Культурные мероприятия Усинского района
					</p>
				</div>
				<ExportButton
					data={events.filter((e) => e.published)}
					filename="events"
					textContent={events
						.filter((e) => e.published)
						.map(
							(e) =>
								`${e.date} — ${e.title} (${e.type}, ${e.location})\n${e.description}`,
						)
						.join('\n\n')}
				/>
			</div>
			<EventsCalendar />
		</div>
	);
};

export default EventsPage;
