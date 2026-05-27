import { Link } from 'react-router-dom';
import { useHeritagePreview } from '../../entities/heritage';
import Badge from '../../shared/ui/Badge';
import FallbackImage from '../../shared/ui/FallbackImage';

const HeritageSection = () => {
    const { data: preview, isLoading, error } = useHeritagePreview(4);

    return (
        <section className="px-10 py-14 max-w-[1700px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Культурное наследие</h2>
                <Link
                    to="/heritage"
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                >
                    Весь каталог →
                </Link>
            </div>

            {isLoading ? (
                <p className="text-gray-400 animate-pulse">Загрузка...</p>
            ) : error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {preview.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group"
                        >
                            <div className="overflow-hidden">
                                <FallbackImage
                                    src={item.image_url}
                                    alt={item.title}
                                    icon="🏛️"
                                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <div className="flex flex-wrap gap-1">
                                    <Badge variant="info">{item.type}</Badge>
                                    <Badge>{item.village}</Badge>
                                </div>
                                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                                <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeritageSection;
