import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/global.css';
import { ToastContainer } from 'react-toastify';
import { MappedRoutes } from './routes';
import { AuthProvider } from './context/authProvider';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ToastContainer />
				<MappedRoutes />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
