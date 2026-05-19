import ContactForm from '../../features/feedback/ContactForm';
import Card from '../../shared/ui/Card';

const ContactPage = () => (
	<div className="max-w-[700px] mx-auto px-6 py-10">
		<h1 className="text-3xl font-bold mb-2">Обратная связь</h1>
		<p className="text-gray-400 mb-8">
			Свяжитесь с администрацией портала «Культура Усинского района»
		</p>

		<div className="grid sm:grid-cols-3 gap-4 mb-8">
			<Card className="text-center py-4">
				<div className="text-2xl mb-2">📍</div>
				<p className="text-sm text-gray-400">мкр. Парма, д. 2</p>
				<p className="text-xs text-gray-500">Усинск, Республика Коми</p>
			</Card>
			<Card className="text-center py-4">
				<div className="text-2xl mb-2">📞</div>
				<p className="text-sm text-gray-400">+7 (82144) 2-14-00</p>
				<p className="text-xs text-gray-500">Пн–Пт 9:00–18:00</p>
			</Card>
			<Card className="text-center py-4">
				<div className="text-2xl mb-2">✉️</div>
				<p className="text-sm text-gray-400">info@usinsk-culture.ru</p>
				<p className="text-xs text-gray-500">Ответим в течение суток</p>
			</Card>
		</div>

		<Card>
			<ContactForm />
		</Card>
	</div>
);

export default ContactPage;
