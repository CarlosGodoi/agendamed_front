import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import { Controller, useForm } from 'react-hook-form';
import { FormData, resolver, defaultValues } from './schema';
import { IAppointmentsData } from '@/utils/interfaces/appointments';
import { useState } from 'react';
import { CircularLoading } from '@/components/loading/circularLoading';
import { useRequest } from '@/hooks/useRequest';
import { toast } from 'react-toastify';
import { API_ROUTES } from '@/services/api_routes';

interface updateAppointmentStatusModalProps {
	apointment: IAppointmentsData | null;
	onSuccess?: () => void;
	open: boolean;
	onClose: () => void;
}

export const UpdateAppointmentStatusModal: React.FC<
	updateAppointmentStatusModalProps
> = ({ onClose, open, onSuccess, apointment }) => {
	const [loading, setLoading] = useState(false);

	const { apiRequest } = useRequest();

	const patienId = apointment?.id;

	const statusSelect = [
		{
			id: 1,
			name: 'AGENDADA',
			value: 'SCHEDULED',
		},
		{
			ID: 2,
			name: 'CONCLUÍDA',
			value: 'COMPLETED',
		},
		{
			ID: 3,
			name: 'CANCELADA',
			value: 'CANCELLED',
		},
	];

	const { control, setValue, handleSubmit } = useForm<FormData>({
		resolver,
		defaultValues,
	});

	const handleSumitUpdateStatus = async (data: FormData) => {
		setLoading(true);
		console.log('data', data);

		try {
			const response = await apiRequest(
				'patch',
				`${API_ROUTES.appointments.updateStatusAppointment(patienId || '')}`,
				data
			);

			if (response.appointment) {
				toast('Status atualizado com sucesso!', {
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
			} else {
				toast(
					'Erro ao alterar o status! Verifique os dados e tente novamente.',
					{
						hideProgressBar: true,
						autoClose: 2000,
						type: 'error',
						theme: 'colored',
						style: { backgroundColor: '#ef4444', color: '#fff' },
					}
				);
			}
		} catch (error) {
			const errorMessage =
				(error as { message: string })?.message ||
				'Erro inesperado ao tentar alterar o status. Tente novamente mais tarde.';

			toast(errorMessage, {
				hideProgressBar: true,
				autoClose: 2000,
				type: 'error',
				theme: 'colored',
				style: { backgroundColor: '#ef4444', color: '#fff' },
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogTrigger asChild></DialogTrigger>
			<DialogContent className="max-w-3xl w-full p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl">Alterar Status</DialogTitle>
					<DialogDescription className="text-base text-zinc-700 font-medium">
						Selecione o status desejado para alterá-lo.
					</DialogDescription>
				</DialogHeader>
				<form
					className="space-y-6"
					onSubmit={handleSubmit(handleSumitUpdateStatus)}
				>
					<div className="flex flex-col gap-2">
						<Label className="text-primary text-base font-medium">
							Status:
						</Label>
						<Controller
							control={control}
							name="status"
							render={({ field }) => (
								<Select
									onValueChange={(value) => {
										setValue('status', value);
									}}
									defaultValue={field.value}
								>
									<SelectTrigger className="h-11">
										<SelectValue placeholder="Selecione a especialidade" />
									</SelectTrigger>
									<SelectContent>
										{statusSelect.map((status) => (
											<SelectItem key={status.id} value={status.value}>
												{status.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>

					<div className="flex justify-end">
						<Button
							className="w-40 h-12 bg-primary text-white text-base px-6"
							type="submit"
						>
							{loading ? <CircularLoading /> : 'Salvar'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
