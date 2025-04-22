import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/global.css';
import { ToastContainer } from 'react-toastify';
import { MappedRoutes } from './routes';
import { AuthProvider } from './context/authProvider';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<ToastContainer />
			<MappedRoutes />
		</AuthProvider>
	</StrictMode>
);
