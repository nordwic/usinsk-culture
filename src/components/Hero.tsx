import { useState } from 'react';

type Village = {
	id: number;
	name: string;
	top: string;
	left: string;
};

const villages: Village[] = [
	{
		id: 1,
		name: 'Верхнеколвинск',
		top: '24%',
		left: '58%',
	},

	{
		id: 2,
		name: 'Возей',
		top: '39%',
		left: '66%',
	},

	{
		id: 3,
		name: 'Захарвань',
		top: '50%',
		left: '39%',
	},

	{
		id: 4,
		name: 'Щельябож',
		top: '52%',
		left: '52%',
	},

	{
		id: 5,
		name: 'Мутный Материк',
		top: '72%',
		left: '23%',
	},

	{
		id: 6,
		name: 'Новикбож',
		top: '64%',
		left: '57%',
	},

	{
		id: 7,
		name: 'Усть-Уса',
		top: '73%',
		left: '61%',
	},

	{
		id: 8,
		name: 'Колва',
		top: '66%',
		left: '74%',
	},

	{
		id: 9,
		name: 'Парма',
		top: '78%',
		left: '77%',
	},

	{
		id: 10,
		name: 'Усинск',
		top: '71%',
		left: '84%',
	},

	{
		id: 11,
		name: 'Усть-Лыжа',
		top: '90%',
		left: '57%',
	},
];

const Hero: React.FC = () => {
	const [activeVillage, setActiveVillage] = useState<string>('Усинск');

	return (
		<section className="relative overflow-hidden min-h-screen bg-[#021225]">
			{/* background */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0ea5e930,transparent_40%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#06b6d420,transparent_40%)]" />
			</div>

			<div className="relative z-10 max-w-[1700px] mx-auto px-10 py-16">
				<div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
					{/* LEFT */}
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

						{/* buttons */}
						{/* <div className="flex flex-wrap gap-3 mt-10">
							{villages.map((village) => (
								<button
									key={village.id}
									onClick={() =>
										setActiveVillage(village.name)
									}
									className={`px-5 py-3 rounded-xl transition-all duration-300 border border-white/10 backdrop-blur-md ${
										activeVillage === village.name
											? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/40 scale-105'
											: 'bg-white/10 text-gray-200 hover:bg-white/20'
									}
                  `}
								>
									{village.name}
								</button>
							))}
						</div> */}

						{/* info */}
						<div className="mt-14">
							<div className="max-w-2xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">
								<p className="text-cyan-300 text-sm uppercase tracking-wider mb-2">
									Выбранный населённый пункт
								</p>

								<h2 className="text-4xl font-bold text-white mb-4">
									{activeVillage}
								</h2>

								<p className="text-gray-300 leading-relaxed">
									Нажмите на метку на карте или кнопку
									населённого пункта для перехода к
									материалам, событиям, фотографиям и
									культурным объектам выбранного раздела.
								</p>
							</div>
						</div>
					</div>

					{/* RIGHT */}
					<div className="relative flex items-start justify-end pt-4">
						{/* glow */}
						<div className="absolute w-[700px] h-[700px] bg-cyan-400/10 blur-3xl rounded-full right-0 top-10" />

						{/* map */}
						<div className="relative w-full max-w-[820px] overflow-hidden">
							<img
								src="/map.png"
								alt="Интерактивная карта"
								className="
                  w-full
                  object-contain
                  select-none
                  drop-shadow-[0_0_45px_rgba(34,211,238,0.25)]
                "
							/>

							{/* points */}
							{villages.map((village) => (
								<button
									key={village.id}
									onClick={() =>
										setActiveVillage(village.name)
									}
									className="absolute group"
									style={{
										top: village.top,
										left: village.left,
										transform: 'translate(-50%, -50%)',
									}}
								>
									{/* icon */}
									<div
										className={`
                      relative transition-all duration-300
                      ${
							activeVillage === village.name
								? 'scale-125'
								: 'hover:scale-110'
						}
                    `}
									>
										{/* glow */}
										<div
											className={`
                        absolute inset-0 rounded-full blur-md
                        ${
							activeVillage === village.name
								? 'bg-red-500/60'
								: 'bg-red-400/30'
						}
                      `}
										/>

										{/* point */}
										<img
											src="/dot.png"
											alt="point"
											className={`
                        relative z-10 object-contain
                        ${
							activeVillage === village.name
								? 'w-10 h-10'
								: 'w-7 h-7'
						}
                      `}
										/>
									</div>

									{/* label */}
									<div
										className={`
                      absolute whitespace-nowrap
                      text-sm font-semibold
                      transition-all duration-300
                      left-1/2 top-7 -translate-x-1/2
                      ${
							activeVillage === village.name
								? 'text-white scale-105'
								: 'text-gray-100'
						}
                    `}
										style={{
											textShadow:
												'0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,0,0,0.6)',
										}}
									>
										{village.name}
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
