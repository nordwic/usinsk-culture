import type { ReactNode } from 'react';

interface BadgeProps {
	children: ReactNode;
	variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
	default: 'bg-white/10 text-gray-300',
	success: 'bg-green-500/20 text-green-300',
	warning: 'bg-yellow-500/20 text-yellow-300',
	danger: 'bg-red-500/20 text-red-300',
	info: 'bg-cyan-500/20 text-cyan-300',
};

const Badge = ({ children, variant = 'default' }: BadgeProps) => (
	<span
		className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}
	>
		{children}
	</span>
);

export default Badge;
