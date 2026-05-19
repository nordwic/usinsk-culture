import { useState } from 'react';
import { Printer, Download, ChevronDown } from 'lucide-react';
import {
	printPage,
	downloadAsText,
	downloadAsJSON,
} from '../../../shared/utils/exportUtils';
import Button from '../../../shared/ui/Button';

interface ExportButtonProps {
	data?: unknown;
	filename?: string;
	textContent?: string;
}

const ExportButton = ({
	data,
	filename = 'export',
	textContent,
}: ExportButtonProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative inline-block">
			<Button
				variant="outline"
				size="sm"
				onClick={() => setOpen((v) => !v)}
				className="flex items-center gap-2"
			>
				<Download size={14} />
				Экспорт
				<ChevronDown size={14} />
			</Button>

			{open && (
				<div className="absolute right-0 top-full mt-1 z-20 bg-[#0b1d2a] border border-white/20 rounded-xl shadow-lg overflow-hidden min-w-[160px]">
					<button
						onClick={() => {
							printPage();
							setOpen(false);
						}}
						className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 transition-colors"
					>
						<Printer size={14} /> Печать
					</button>
					{data != null && (
						<button
							onClick={() => {
								downloadAsJSON(data, `${filename}.json`);
								setOpen(false);
							}}
							className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 transition-colors"
						>
							<Download size={14} /> Скачать JSON
						</button>
					)}
					{textContent && (
						<button
							onClick={() => {
								downloadAsText(textContent, `${filename}.txt`);
								setOpen(false);
							}}
							className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 transition-colors"
						>
							<Download size={14} /> Скачать TXT
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default ExportButton;
