import { useState } from 'react';
import { useData } from '../../../contexts/DataContext';
import { HERITAGE_TYPES, VILLAGES } from '../../../shared/constants';
import Badge from '../../../shared/ui/Badge';
import Select from '../../../shared/ui/Select';
import Button from '../../../shared/ui/Button';

const HeritageList = () => {
	const { heritage } = useData();
	const [typeFilter, setTypeFilter] = useState('Все');
	const [villageFilter, setVillageFilter] = useState('Все');
	const [search, setSearch] = useState('');

	const filtered = heritage.filter((h) => {
		if (typeFilter !== 'Все' && h.type !== typeFilter) return false;
		if (villageFilter !== 'Все' && h.village !== villageFilter)
			return false;
		if (
			search &&
			!h.title.toLowerCase().includes(search.toLowerCase()) &&
			!h.description.toLowerCase().includes(search.toLowerCase())
		)
			return false;
		return true;
	});

	return (
		<div className="space-y-6">
			{/* Фильтры */}
			<div className="flex flex-wrap gap-4 items-end p-4 bg-white/5 border border-white/10 rounded-xl">
				<div className="flex flex-col gap-1">
					<label className="text-sm text-gray-300">Поиск</label>
					<input
						type="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Название, описание..."
						className="bg-[#0b1d2a] border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 min-w-[200px]"
					/>
				</div>
				<Select
					label="Тип"
					value={typeFilter}
					options={HERITAGE_TYPES.map((t) => ({
						value: t,
						label: t,
					}))}
					onChange={(e) => setTypeFilter(e.target.value)}
				/>
				<Select
					label="Населённый пункт"
					value={villageFilter}
					options={['Все', ...VILLAGES].map((v) => ({
						value: v,
						label: v,
					}))}
					onChange={(e) => setVillageFilter(e.target.value)}
				/>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => {
						setTypeFilter('Все');
						setVillageFilter('Все');
						setSearch('');
					}}
				>
					Сбросить
				</Button>
			</div>

			{/* Список */}
			{filtered.length === 0 ? (
				<p className="text-gray-400 text-center py-10">
					Объекты не найдены
				</p>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((item) => (
						<div
							key={item.id}
							className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
						>
							{item.image && (
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-40 object-cover"
								/>
							)}
							<div className="p-4 flex flex-col gap-2">
								<div className="flex flex-wrap gap-2">
									<Badge variant="info">{item.type}</Badge>
									<Badge variant="default">
										{item.village}
									</Badge>
								</div>
								<h3 className="font-semibold text-white">
									{item.title}
								</h3>
								<p className="text-sm text-gray-400 line-clamp-3">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default HeritageList;
