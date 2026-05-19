import { Link } from 'react-router-dom';

const Footer = () => (
	<footer className="bg-[#08141f] px-10 py-8 text-sm text-white">
		<div className="max-w-[1700px] mx-auto">
			<div className="flex flex-wrap justify-between gap-8 mb-6">
				<div>
					<p className="font-semibold mb-3">Платформа</p>
					<ul className="space-y-1.5 text-gray-400">
						<li>
							<Link
								to="/contact"
								className="hover:text-white transition-colors"
							>
								Обратная связь
							</Link>
						</li>
						<li>О нас</li>
						<li>FAQ</li>
					</ul>
				</div>

				<div>
					<p className="font-semibold mb-3">Разделы</p>
					<ul className="space-y-1.5 text-gray-400">
						<li>
							<Link
								to="/news"
								className="hover:text-white transition-colors"
							>
								Новости
							</Link>
						</li>
						<li>
							<Link
								to="/events"
								className="hover:text-white transition-colors"
							>
								События
							</Link>
						</li>
						<li>
							<Link
								to="/heritage"
								className="hover:text-white transition-colors"
							>
								Культурное наследие
							</Link>
						</li>
						<li>
							<Link
								to="/media"
								className="hover:text-white transition-colors"
							>
								Медиатека
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<p className="font-semibold mb-3">Соцсети</p>
					<div className="flex gap-4 text-gray-400">
						<span className="hover:text-white transition-colors cursor-pointer">
							VK
						</span>
						<span className="hover:text-white transition-colors cursor-pointer">
							OK
						</span>
					</div>
				</div>

				<div>
					<p className="font-semibold mb-3">Контакты</p>
					<ul className="space-y-1.5 text-gray-400">
						<li>мкр. Парма, д. 2, Усинск</li>
						<li>+7 (82144) 2-14-00</li>
						<li>info@usinsk-culture.ru</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-white/10 pt-4 text-gray-500 text-center">
				© 2026 Культура Усинского района
			</div>
		</div>
	</footer>
);

export default Footer;
