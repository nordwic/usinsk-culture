import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ForumProvider } from './contexts/ForumContext';
import Header from './widgets/Header';
import Footer from './shared/ui/Footer';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import HeritagePage from './pages/HeritagePage';
import EventsPage from './pages/EventsPage';
import MapPage from './pages/MapPage';
import MediaPage from './pages/MediaPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import ForumPage from './pages/ForumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<DataProvider>
					<ForumProvider>
						<div className="bg-[#0b1d2a] text-white min-h-screen flex flex-col">
							<Header />
							<main className="flex-1">
								<Routes>
									<Route path="/" element={<HomePage />} />
									<Route
										path="/news"
										element={<NewsPage />}
									/>
									<Route
										path="/heritage"
										element={<HeritagePage />}
									/>
									<Route
										path="/events"
										element={<EventsPage />}
									/>
									<Route path="/map" element={<MapPage />} />
									<Route
										path="/media"
										element={<MediaPage />}
									/>
									<Route
										path="/search"
										element={<SearchPage />}
									/>
									<Route
										path="/admin"
										element={<AdminPage />}
									/>
									<Route
										path="/contact"
										element={<ContactPage />}
									/>
									<Route
										path="/forum"
										element={<ForumPage />}
									/>
									<Route
										path="/login"
										element={<LoginPage />}
									/>
									<Route
										path="/register"
										element={<RegisterPage />}
									/>
								</Routes>
							</main>
							<Footer />
						</div>
					</ForumProvider>
				</DataProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
