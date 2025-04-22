import api from '@/services/api';
import { AxiosError } from 'axios';
import { useState } from 'react';
// import { toast } from 'react-toastify'

export interface RequestError {
	type: 'axios' | 'unauthorized' | 'unknown';
	message: string;
}

export const useRequest = () => {
	const [loading, setLoading] = useState(false);

	const apiRequest = async (
		method: 'put' | 'post' | 'get' | 'delete' | 'patch',
		url: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		dataOrParams?: any
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<any> => {
		setLoading(true);

		if (method === 'get') {
			if (dataOrParams) {
				url +=
					'?' +
					Object.keys(dataOrParams)
						.map((key) => {
							return `${key}=${dataOrParams[key]}&`;
						})
						.toString()
						.replace(',', '');
			}
		}

		try {
			const response = await api[method](url, dataOrParams, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setLoading(false);
			return response.data;
		} catch (error) {
			setLoading(false);
			if (error instanceof AxiosError) {
				// Lançar erro customizado no caso de erro 401
				if (error.response?.status == 401) {
					return Promise.reject<RequestError>({
						type: 'unauthorized',
						message: 'Unauthorized access',
					});
				}
				return Promise.reject<RequestError>({
					type: 'axios',
					message:
						error?.response?.data?.error ||
						'Erro de comunicação com o servidor',
				});
			}
			return Promise.reject<RequestError>({
				type: 'unknown',
				message: 'Erro desconhecido',
			});
		}
	};

	return { apiRequest, loading };
};
