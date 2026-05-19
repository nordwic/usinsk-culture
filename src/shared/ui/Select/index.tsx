import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	options: { value: string; label: string }[];
}

const Select = ({ label, options, className = '', ...props }: SelectProps) => (
	<div className="flex flex-col gap-1">
		{label && <label className="text-sm text-gray-300">{label}</label>}
		<select
			className={`bg-[#0b1d2a] border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-colors ${className}`}
			{...props}
		>
			{options.map((o) => (
				<option key={o.value} value={o.value}>
					{o.label}
				</option>
			))}
		</select>
	</div>
);

export default Select;
