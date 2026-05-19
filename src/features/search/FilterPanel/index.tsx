import Select from '../../../shared/ui/Select';

interface FilterPanelProps {
	filters: { key: string; label: string; options: string[] }[];
	values: Record<string, string>;
	onChange: (key: string, value: string) => void;
}

const FilterPanel = ({ filters, values, onChange }: FilterPanelProps) => (
	<div className="flex flex-wrap gap-4 items-end">
		{filters.map((f) => (
			<Select
				key={f.key}
				label={f.label}
				value={values[f.key] ?? ''}
				options={f.options.map((o) => ({ value: o, label: o }))}
				onChange={(e) => onChange(f.key, e.target.value)}
				className="min-w-[150px]"
			/>
		))}
	</div>
);

export default FilterPanel;
