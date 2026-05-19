import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
	primary: 'bg-cyan-500 text-white hover:bg-cyan-600',
	secondary: 'bg-gray-600 text-white hover:bg-gray-700',
	danger: 'bg-red-500 text-white hover:bg-red-600',
	outline: 'border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10',
	ghost: 'text-gray-300 hover:bg-white/10',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-6 py-3 text-lg',
};

const Button = ({
	variant = 'primary',
	size = 'md',
	className = '',
	children,
	...props
}: ButtonProps) => (
	<button
		className={`rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
		{...props}
	>
		{children}
	</button>
);

export default Button;
