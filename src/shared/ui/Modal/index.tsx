import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div className="bg-[#0b1d2a] border border-white/10 rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
				<div className="flex items-center justify-between p-5 border-b border-white/10">
					{title && (
						<h2 className="text-lg font-bold text-white">
							{title}
						</h2>
					)}
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white ml-auto transition-colors"
					>
						<X size={20} />
					</button>
				</div>
				<div className="p-5">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
