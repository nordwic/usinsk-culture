import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../../features/search/SearchBar';

const NAV_LINKS = [
	{ to: '/', label: 'Главная' },
	{ to: '/news', label: 'Новости' },
	{ to: '/map', label: 'Культурная карта района' },
	{ to: '/media', label: 'Фотогалерея' },
	{ to: '/forum', label: 'Культурный диалог' },
];

const Header = () => {
	const { user, logout, isAuthenticated, hasRole } = useAuth();
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<header className="sticky top-0 z-40 bg-white text-black shadow-md">
			<div className="flex items-center justify-between px-6 py-3 max-w-[1700px] mx-auto">
				{/* Логотип */}
				<Link to="/" className="flex items-center gap-3 flex-shrink-0">
					<img
						src="/logo.png"
						alt="logo"
						className="h-10 w-16 object-contain"
					/>
				</Link>

				{/* Навигация — десктоп */}
				<nav className="hidden lg:flex gap-6 text-base font-semibold">
					{NAV_LINKS.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.to === '/'}
							className={({ isActive }) =>
								`hover:text-blue-500 transition-colors ${isActive ? 'text-blue-600' : ''}`
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>

				{/* Правая часть */}
				<div className="flex items-center gap-3">
					{/* Поиск */}
					<button
						onClick={() => setSearchOpen((v) => !v)}
						className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
						title="Поиск"
					>
						<Search size={18} />
					</button>

					{isAuthenticated ? (
						<div className="flex items-center gap-2">
							{hasRole('admin') && (
								<Link
									to="/admin"
									title="Панель администратора"
									className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
								>
									<Shield size={18} />
								</Link>
							)}
							<span className="text-sm font-medium hidden sm:block text-gray-600">
								{user?.username}
							</span>
							<button
								onClick={handleLogout}
								title="Выйти"
								className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
							>
								<LogOut size={18} />
							</button>
						</div>
					) : (
						<Link
							to="/login"
							className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
						>
							<User size={15} />
							Войти
						</Link>
					)}

					{/* Бургер-меню */}
					<button
						className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
						onClick={() => setMenuOpen((v) => !v)}
					>
						{menuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Поиск (раскрывающийся) */}
			{searchOpen && (
				<div className="border-t border-gray-200 px-6 py-3 bg-white">
					<SearchBar placeholder="Поиск новостей, событий, объектов..." />
				</div>
			)}

			{/* Мобильное меню */}
			{menuOpen && (
				<nav className="lg:hidden border-t border-gray-200 bg-white px-6 py-4 flex flex-col gap-3">
					{NAV_LINKS.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.to === '/'}
							onClick={() => setMenuOpen(false)}
							className={({ isActive }) =>
								`font-semibold hover:text-blue-500 transition-colors ${isActive ? 'text-blue-600' : ''}`
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>
			)}
		</header>
	);
};

export default Header;
