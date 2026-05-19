import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const Input = ({ label, error, className = '', ...props }: InputProps) => (
	<div className="flex flex-col gap-1">
		{label && <label className="text-sm text-gray-300">{label}</label>}
		<input
			className={`bg-white/10 border ${error ? 'border-red-400' : 'border-white/20'} rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors ${className}`}
			{...props}
		/>
		{error && <p className="text-xs text-red-400">{error}</p>}
	</div>
);

export default Input;
