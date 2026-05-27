import { Link } from 'react-router-dom';
import { useNewsPreview } from '../../entities/news';
import Badge from '../../shared/ui/Badge';
import FallbackImage from '../../shared/ui/FallbackImage';

const NewsSection = () => {
    const { data: published, isLoading, error } = useNewsPreview(4);

    return (
        <section className="px-10 py-14 max-w-[1700px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Последние новости</h2>
                <Link
                    to="/news"
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                >
                    Все новости →
                </Link>
            </div>

            {isLoading ? (
                <p className="text-gray-400 animate-pulse">Загрузка...</p>
            ) : error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : published.length === 0 ? (
                <p className="text-gray-400">Новостей пока нет</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {published.map((item) => (
                        <article
                            key={item.id}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group"
                        >
                            <div className="overflow-hidden">
                                <FallbackImage
                                    src={item.image_url}
                                    alt={item.title}
                                    icon="📰"
                                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant="info">{item.category}</Badge>
                                    <span className="text-xs text-gray-500">{item.date}</span>
                                </div>
                                <h3 className="font-semibold text-white text-sm line-clamp-2 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-400 line-clamp-2">{item.summary}</p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default NewsSection;
