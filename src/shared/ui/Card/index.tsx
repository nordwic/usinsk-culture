import type { ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}

const Card = ({ children, className = '', onClick }: CardProps) => (
	<div
		className={`bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm ${onClick ? 'cursor-pointer hover:bg-white/10 transition-colors' : ''} ${className}`}
		onClick={onClick}
	>
		{children}
	</div>
);

export default Card;
