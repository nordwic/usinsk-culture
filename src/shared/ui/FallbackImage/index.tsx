import { useState } from 'react';

interface FallbackImageProps {
	src: string | null | undefined;
	alt: string;
	className?: string;
	/** Иконка/текст заглушки (по умолчанию 📷) */
	icon?: string;
}

/**
 * <img> с автоматической заглушкой:
 * — когда src отсутствует (null/undefined/'')
 * — когда браузер не смог загрузить изображение (onError)
 */
const FallbackImage = ({
	src,
	alt,
	className = '',
	icon = '📷',
}: FallbackImageProps) => {
	const [failed, setFailed] = useState(false);

	if (!src || failed) {
		return (
			<div
				className={`${className} flex items-center justify-center bg-white/5 text-3xl select-none`}
			>
				{icon}
			</div>
		);
	}

	return (
		<img
			src={src}
			alt={alt}
			className={className}
			onError={() => setFailed(true)}
		/>
	);
};

export default FallbackImage;
