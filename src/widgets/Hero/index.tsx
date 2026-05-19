import { useState } from 'react';
import InteractiveMap from '../../shared/ui/InteractiveMap';
import { MAP_PINS } from '../../shared/constants';
import type { Village } from '../../shared/types/village';

const villages: Village[] = MAP_PINS.map((p, i) => ({
	...p,
	name: [
		'Верхнеколвинск',
		'Возей',
		'Захарвань',
		'Щельябож',
		'Мутный Материк',
		'Новикбож',
		'Усть-Уса',
		'Колва',
		'Парма',
		'Усинск',
		'Усть-Лыжа',
	][i],
}));

const Hero = () => {
	const [activeId, setActiveId] = useState<number | null>(null);

	return (
		<section className="relative overflow-hidden min-h-screen">
			{/* Фоновая картинка */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: 'url(/BGorig.jpg)' }}
			/>
			{/* Затемняющий оверлей */}
			<div className="absolute inset-0 bg-[#021225]/70" />
			{/* Цветовые акценты */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0ea5e920,transparent_40%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#06b6d415,transparent_40%)]" />
			</div>

			<div className="relative z-10 max-w-[1700px] mx-auto px-10 py-16">
				<div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
					{/* ЛЕВАЯ ЧАСТЬ */}
					<div className="text-white pt-8 max-w-[620px]">
						<h1 className="text-6xl leading-tight font-bold mb-8">
							Добро пожаловать в цифровое пространство нашей
							культуры!
						</h1>

						<div className="space-y-5 text-lg text-gray-300 leading-relaxed">
							<p>
								Интерактивная платформа объединяет культурное
								наследие, историю и традиции населённых пунктов
								Усинского района.
							</p>
							<p>
								Изучайте культурные объекты, архивные материалы,
								события и участвуйте в обсуждениях сообщества.
							</p>
							<p>
								Каждое село содержит отдельный раздел с
								материалами, фотографиями, событиями и
								культурными объектами.
							</p>
						</div>

						<div className="mt-14">
							<div className="max-w-2xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">
								<p className="text-cyan-300 text-sm uppercase tracking-wider mb-2">
									Населённый пункт
								</p>
								<h2 className="text-4xl font-bold text-white mb-4">
									{activeId
										? `Пункт ${villages.find((v) => v.id === activeId)?.name}`
										: 'Выберите на карте'}
								</h2>
								<p className="text-gray-300 leading-relaxed">
									Нажмите на метку на карте для перехода к
									материалам, событиям, фотографиям и
									культурным объектам выбранного раздела.
								</p>
							</div>
						</div>
					</div>

					{/* ПРАВАЯ ЧАСТЬ — карта */}
					<div className="relative flex items-start justify-end pt-4">
						<div className="absolute w-[700px] h-[700px] bg-cyan-400/10 blur-3xl rounded-full right-0 top-10 pointer-events-none" />
						<InteractiveMap
							pins={villages}
							activeId={activeId}
							onPinClick={(id) =>
								setActiveId((cur) => (cur === id ? null : id))
							}
							className="max-w-[820px] drop-shadow-[0_0_45px_rgba(34,211,238,0.25)]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
