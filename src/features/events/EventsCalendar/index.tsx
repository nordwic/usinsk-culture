import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../../contexts/DataContext';
import { EVENT_TYPES, VILLAGES } from '../../../shared/constants';
import Badge from '../../../shared/ui/Badge';
import Select from '../../../shared/ui/Select';
import Button from '../../../shared/ui/Button';

const MONTHS = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

const EventsCalendar = () => {
	const { events } = useData();
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth());
	const [typeFilter, setTypeFilter] = useState('Все');
	const [locationFilter, setLocationFilter] = useState('Все');

	const prevMonth = () => {
		if (month === 0) {
			setMonth(11);
			setYear((y) => y - 1);
		} else setMonth((m) => m - 1);
	};
	const nextMonth = () => {
		if (month === 11) {
			setMonth(0);
			setYear((y) => y + 1);
		} else setMonth((m) => m + 1);
	};

	const filtered = useMemo(() => {
		return events.filter((e) => {
			if (!e.published) return false;
			const d = new Date(e.date);
			if (d.getFullYear() !== year || d.getMonth() !== month)
				return false;
			if (typeFilter !== 'Все' && e.type !== typeFilter) return false;
			if (locationFilter !== 'Все' && e.location !== locationFilter)
				return false;
			return true;
		});
	}, [events, year, month, typeFilter, locationFilter]);

	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

	const eventsByDay = useMemo(() => {
		const map: Record<number, typeof filtered> = {};
		filtered.forEach((e) => {
			const day = new Date(e.date).getDate();
			if (!map[day]) map[day] = [];
			map[day].push(e);
		});
		return map;
	}, [filtered]);

	return (
		<div className="space-y-4">
			{/* Фильтры */}
			<div className="flex flex-wrap gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
				<Select
					label="Тип"
					value={typeFilter}
					options={EVENT_TYPES.map((t) => ({ value: t, label: t }))}
					onChange={(e) => setTypeFilter(e.target.value)}
				/>
				<Select
					label="Место"
					value={locationFilter}
					options={['Все', ...VILLAGES].map((v) => ({
						value: v,
						label: v,
					}))}
					onChange={(e) => setLocationFilter(e.target.value)}
				/>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => {
						setTypeFilter('Все');
						setLocationFilter('Все');
					}}
				>
					Сбросить
				</Button>
			</div>

			{/* Навигация по месяцам */}
			<div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
				<button
					onClick={prevMonth}
					className="text-gray-400 hover:text-white transition-colors"
				>
					<ChevronLeft size={20} />
				</button>
				<span className="font-semibold text-white">
					{MONTHS[month]} {year}
				</span>
				<button
					onClick={nextMonth}
					className="text-gray-400 hover:text-white transition-colors"
				>
					<ChevronRight size={20} />
				</button>
			</div>

			{/* Сетка календаря */}
			<div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
				<div className="grid grid-cols-7 text-center text-xs text-gray-400 border-b border-white/10">
					{['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
						<div key={d} className="py-2 font-medium">
							{d}
						</div>
					))}
				</div>
				<div className="grid grid-cols-7">
					{Array.from({ length: firstDay }).map((_, i) => (
						<div
							key={`e-${i}`}
							className="h-16 border-b border-r border-white/5"
						/>
					))}
					{Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
						(day) => {
							const dayEvents = eventsByDay[day] ?? [];
							const isToday =
								day === today.getDate() &&
								month === today.getMonth() &&
								year === today.getFullYear();
							return (
								<div
									key={day}
									className="h-16 border-b border-r border-white/5 p-1 relative"
								>
									<span
										className={`text-xs font-medium ${isToday ? 'text-cyan-400' : 'text-gray-300'}`}
									>
										{day}
									</span>
									{dayEvents.map((ev) => (
										<div
											key={ev.id}
											title={ev.title}
											className="text-[10px] bg-cyan-500/30 text-cyan-200 rounded px-1 truncate mt-0.5"
										>
											{ev.title}
										</div>
									))}
								</div>
							);
						},
					)}
				</div>
			</div>

			{/* Список событий */}
			<div className="space-y-3">
				{filtered.length === 0 ? (
					<p className="text-gray-400 text-center py-6">
						В этом месяце событий нет
					</p>
				) : (
					filtered
						.sort((a, b) => a.date.localeCompare(b.date))
						.map((ev) => (
							<div
								key={ev.id}
								className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
							>
								{ev.image && (
									<img
										src={ev.image}
										alt={ev.title}
										className="w-16 h-14 object-cover rounded-lg flex-shrink-0"
									/>
								)}
								<div className="flex flex-col gap-1 min-w-0">
									<div className="flex flex-wrap gap-2">
										<Badge variant="info">{ev.type}</Badge>
										<span className="text-xs text-gray-400">
											{ev.date}
										</span>
										<span className="text-xs text-gray-400">
											📍 {ev.location}
										</span>
									</div>
									<h4 className="font-semibold text-white">
										{ev.title}
									</h4>
									<p className="text-sm text-gray-400 line-clamp-1">
										{ev.description}
									</p>
								</div>
							</div>
						))
				)}
			</div>
		</div>
	);
};

export default EventsCalendar;
