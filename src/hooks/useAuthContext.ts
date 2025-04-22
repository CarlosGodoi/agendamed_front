import { useContext } from 'react';
import { AuthContext, IAuthContext } from '../context/authContext';

function useAuthContext(): IAuthContext {
	const context = useContext(AuthContext);
	return context;
}

export default useAuthContext;
