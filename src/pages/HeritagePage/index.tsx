import HeritageList from '../../features/heritage/HeritageList';
import ExportButton from '../../features/export/ExportButton';
import { useData } from '../../contexts/DataContext';

const HeritagePage = () => {
	const { heritage } = useData();

	return (
		<div className="max-w-[1400px] mx-auto px-6 py-10">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold">Культурное наследие</h1>
					<p className="text-gray-400 mt-1">
						Каталог объектов культурного наследия Усинского района
					</p>
				</div>
				<ExportButton
					data={heritage}
					filename="heritage"
					textContent={heritage
						.map(
							(h) =>
								`[${h.type}] ${h.title} — ${h.village}\n${h.description}`,
						)
						.join('\n\n')}
				/>
			</div>
			<HeritageList />
		</div>
	);
};

export default HeritagePage;
