import { useState } from 'react';
import { useData } from '../../../contexts/DataContext';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';

const ContactForm = () => {
	const { addMessage } = useData();
	const [form, setForm] = useState({
		name: '',
		email: '',
		subject: '',
		body: '',
	});
	const [sent, setSent] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		if (!form.name.trim() || !form.email.trim() || !form.body.trim()) {
			setError('Заполните обязательные поля');
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			setError('Некорректный e-mail');
			return;
		}
		addMessage({
			name: form.name.trim(),
			email: form.email.trim(),
			subject: form.subject.trim() || 'Без темы',
			body: form.body.trim(),
		});
		setSent(true);
		setForm({ name: '', email: '', subject: '', body: '' });
	};

	if (sent) {
		return (
			<div className="text-center py-10 space-y-4">
				<div className="text-4xl">✉️</div>
				<h3 className="text-xl font-semibold text-white">
					Сообщение отправлено!
				</h3>
				<p className="text-gray-400">
					Мы свяжемся с вами в ближайшее время.
				</p>
				<Button onClick={() => setSent(false)} variant="outline">
					Отправить ещё
				</Button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<Input
				name="name"
				label="Ваше имя *"
				placeholder="Иван Иванов"
				value={form.name}
				onChange={handleChange}
				autoComplete="name"
			/>
			<Input
				name="email"
				label="E-mail *"
				type="email"
				placeholder="ivan@mail.ru"
				value={form.email}
				onChange={handleChange}
				autoComplete="email"
			/>
			<Input
				name="subject"
				label="Тема"
				placeholder="Тема обращения"
				value={form.subject}
				onChange={handleChange}
			/>
			<div className="flex flex-col gap-1">
				<label className="text-sm text-gray-300">Сообщение *</label>
				<textarea
					name="body"
					value={form.body}
					onChange={handleChange}
					placeholder="Текст вашего обращения..."
					rows={5}
					className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none transition-colors"
				/>
			</div>
			{error && <p className="text-red-400 text-sm">{error}</p>}
			<Button type="submit" className="w-full">
				Отправить сообщение
			</Button>
		</form>
	);
};

export default ContactForm;
