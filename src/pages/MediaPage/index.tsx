import MediaGallery from '../../features/media/MediaGallery';
import ExportButton from '../../features/export/ExportButton';
import { useData } from '../../contexts/DataContext';

const MediaPage = () => {
	const { media } = useData();

	return (
		<div className="max-w-[1400px] mx-auto px-6 py-10">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold">Медиатека</h1>
					<p className="text-gray-400 mt-1">
						Фото- и видеоматериалы культурной жизни района
					</p>
				</div>
				<ExportButton
					data={media}
					filename="media"
					textContent={media
						.map(
							(m) =>
								`[${m.category}] ${m.title} (${m.type}, ${m.date})`,
						)
						.join('\n')}
				/>
			</div>
			<MediaGallery />
		</div>
	);
};

export default MediaPage;
