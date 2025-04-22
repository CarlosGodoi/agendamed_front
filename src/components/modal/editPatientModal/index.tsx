import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import { Controller, useForm } from 'react-hook-form';
import { IPatientData } from '@/utils/interfaces/patients';
import { FormData, resolver, defaultValues } from './schema';
import { formatPhoneNumber } from '@/utils/phoneMask';
import { useRequest } from '@/hooks/useRequest';
import { toast } from 'react-toastify';
import { API_ROUTES } from '@/services/api_routes';

interface EditPatientFormModalProps {
	patient: IPatientData | null;
	onSuccess?: () => void;
	open: boolean;
	onClose: () => void;
}

export const EditPatientFormModal: React.FC<EditPatientFormModalProps> = ({
	patient,
	onSuccess,
	open,
	onClose,
}) => {
	const [loading, setLoading] = useState(false);
	const { apiRequest } = useRequest();

	const { register, setValue, handleSubmit, reset, control } =
		useForm<FormData>({
			resolver,
			defaultValues,
		});

	const fetchPatients = useCallback(async () => {
		if (!patient?.id) return;

		setLoading(true);

		try {
			const response = await apiRequest('get', `/patient/${patient.id}`);

			if (response && response.patient) {
				reset({
					name: response.patient.name || '',
					email: response.patient.email || '',
					phone: response.patient.phone || '',
					cpf: response.patient.cpf || '',
					created_at: response.patient.created_at || '',
					updated_at: response.patient.updated_at || '',
				});
			} else {
				console.error(
					'Erro: Dados do paciente não encontrados na response',
					response
				);
			}
		} catch (error) {
			console.error('Error fetching patient data:', error);
		} finally {
			setLoading(false);
		}
	}, [apiRequest, patient?.id, reset]);

	useEffect(() => {
		if (open && patient?.id) {
			fetchPatients();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, patient?.id]);

	const handlePhoneChange = (
		value: string | React.ChangeEvent<HTMLInputElement>
	) => {
		const phoneValue = typeof value === 'string' ? value : value.target.value;
		const formattedPhone = formatPhoneNumber(phoneValue);
		setValue('phone', formattedPhone, { shouldValidate: true });
	};

	const onSubmitEditForm = async (data: FormData) => {
		setLoading(true);

		try {
			await apiRequest('put', API_ROUTES.patients.update(patient?.id || ''), {
				...data,
			});

			toast('Dados editados com sucesso!', {
				hideProgressBar: true,
				autoClose: 2000,
				type: 'success',
				theme: 'colored',
				style: { backgroundColor: '#22c55e', color: '#fff' },
			});

			if (onSuccess) {
				onSuccess();
			}
			onClose();
		} catch (error) {
			const errorMessage =
				(error as { message: string })?.message ||
				'Erro inesperado ao tentar editar os dados. Tente novamente mais tarde.';

			toast(errorMessage, {
				hideProgressBar: true,
				autoClose: 2000,
				type: 'error',
				theme: 'colored',
				style: { backgroundColor: '#ef4444', color: '#fff' },
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogTrigger asChild></DialogTrigger>
			<DialogContent className="max-w-3xl w-full p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl">Editar Paciente</DialogTitle>
					<DialogDescription className="text-base text-zinc-700 font-medium">
						Atualize os dados do paciente
					</DialogDescription>
				</DialogHeader>
				{loading ? (
					<div className="flex justify-center items-center h-40">
						<p>Carregando dados do paciente...</p>
					</div>
				) : (
					<form className="space-y-6" onSubmit={handleSubmit(onSubmitEditForm)}>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<Label className="text-primary text-base font-medium">
									Nome:
								</Label>
								<Input
									className="h-11"
									type="text"
									placeholder="Digite o nome"
									{...register('name')}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-primary text-base font-medium">
									CPF:
								</Label>
								<Controller
									name="cpf"
									control={control}
									render={({ field }) => (
										<Input
											className="h-11"
											type="text"
											placeholder="Digite o CPF"
											{...field}
											disabled
										/>
									)}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-primary text-base font-medium">
									E-mail:
								</Label>
								<Input
									className="h-11"
									type="email"
									placeholder="Digite o email"
									{...register('email')}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-primary text-base font-medium">
									Telefone:
								</Label>
								<Controller
									name="phone"
									control={control}
									render={({ field }) => (
										<Input
											className="h-11"
											type="text"
											placeholder="Digite o telefone"
											{...field}
											onChange={handlePhoneChange}
										/>
									)}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label className="text-primary text-base font-medium">
									Data do cadastro:
								</Label>
								<Input
									className="h-11"
									type="text"
									{...register('created_at')}
									disabled
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label className="text-primary text-base font-medium">
									Cadastro editado em:
								</Label>
								<Input
									className="h-11"
									type="date"
									{...register('updated_at')}
								/>
							</div>
						</div>
						<div className="flex justify-end">
							<Button
								className="w-40 h-12 bg-primary text-white text-base px-6"
								type="submit"
								disabled={loading}
							>
								{loading ? 'Salvando...' : 'Salvar'}
							</Button>
						</div>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};
