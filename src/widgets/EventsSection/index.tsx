import { Link } from 'react-router-dom';
import { useEventsPreview } from '../../entities/events';
import Badge from '../../shared/ui/Badge';
import FallbackImage from '../../shared/ui/FallbackImage';

const EventsSection = () => {
    const { data: upcoming, isLoading, error } = useEventsPreview(5);

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

                {isLoading ? (
                    <p className="text-gray-400 animate-pulse">Загрузка...</p>
                ) : error ? (
                    <p className="text-red-400 text-sm">{error}</p>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-2">
                        {upcoming.map((event) => (
                            <div
                                key={event.id}
                                className="flex-shrink-0 group cursor-pointer w-52"
                            >
                                <div className="overflow-hidden rounded-2xl">
                                    <FallbackImage
                                        src={event.image_url}
                                        alt={event.title}
                                        icon="🎭"
                                        className="w-52 h-36 object-cover group-hover:scale-110 transition duration-300"
                                    />
                                </div>
                                <div className="mt-3 flex flex-col gap-1">
                                    <div className="flex gap-2 items-center">
                                        <Badge variant="info">{event.type}</Badge>
                                        <span className="text-xs text-gray-400">{event.date}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-white">{event.title}</p>
                                    <p className="text-xs text-gray-400">📍 {event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventsSection;
