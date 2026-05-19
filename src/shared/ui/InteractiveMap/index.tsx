export interface MapPin {
	id: number;
	top: string;
	left: string;
}

interface Props {
	pins: MapPin[];
	activeId: number | null;
	onPinClick: (id: number) => void;
	/** Extra class names for the outer wrapper (e.g. drop-shadow) */
	className?: string;
	/** Width of each settlement image in px. Default: 105 */
	pinSize?: number;
}

/**
 * Dumb interactive map component.
 * Renders /map.png as the base layer and places /settlements/{id}.png
 * at each pin's position. All interactivity is delegated via props.
 */
const InteractiveMap = ({
	pins,
	activeId,
	onPinClick,
	className = '',
	pinSize = 105,
}: Props) => {
	return (
		<div className={`relative w-full ${className}`}>
			<img
				src="/map.png"
				alt="Карта Усинского района"
				className="w-full object-contain select-none"
				draggable={false}
			/>

			{pins.map((pin) => {
				const isActive = activeId === pin.id;
				return (
					<button
						key={pin.id}
						onClick={() => onPinClick(pin.id)}
						className="absolute cursor-pointer focus:outline-none p-2 -m-2 group"
						style={{
							top: pin.top,
							left: pin.left,
							transform: 'translate(-50%, -50%)',
						}}
					>
						<img
							src={`/settlements/${pin.id}.png`}
							alt={`Населённый пункт ${pin.id}`}
							draggable={false}
							className="select-none object-contain transition-all duration-200 group-hover:scale-110 group-hover:brightness-125"
							style={{
								width: isActive
									? pin.id === 9
										? 150 * 1.25
										: pin.id === 10 || pin.id === 7
											? 50 * 1.25
											: pinSize * 1.25
									: pin.id === 9
										? 150
										: pin.id === 10 || pin.id === 7
											? 50
											: pinSize,
								height: 'auto',
								filter: isActive
									? 'drop-shadow(0 0 10px rgba(34,211,238,0.9)) brightness(1.15)'
									: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
								opacity: isActive ? 1 : 0.9,
							}}
						/>
					</button>
				);
			})}
		</div>
	);
};

export default InteractiveMap;
