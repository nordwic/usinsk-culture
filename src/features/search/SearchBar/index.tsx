import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
	placeholder?: string;
	initialValue?: string;
}

const SearchBar = ({
	placeholder = 'Поиск по сайту...',
	initialValue = '',
}: SearchBarProps) => {
	const [query, setQuery] = useState(initialValue);
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = query.trim();
		if (trimmed) {
			navigate(`/search?q=${encodeURIComponent(trimmed)}`);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="relative flex items-center">
			<input
				type="search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={placeholder}
				className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
			/>
			<button
				type="submit"
				className="absolute right-3 text-gray-400 hover:text-cyan-400 transition-colors"
			>
				<Search size={18} />
			</button>
		</form>
	);
};

export default SearchBar;
