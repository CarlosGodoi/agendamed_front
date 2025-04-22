import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { FormData, defaultValues, resolver } from './schema';
import { CircularLoading } from '@/components/loading/circularLoading';
import { Label } from '@/components/ui/label';
import { useRequest } from '@/hooks/useRequest';
import { API_ROUTES } from '@/services/api_routes';
import { toast } from 'react-toastify';

interface SpecialtyFormModalProps {
	onAppointmentCreated?: () => void;
}

export const SpecialtyFormModal: React.FC<SpecialtyFormModalProps> = ({
	onAppointmentCreated,
}) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { apiRequest } = useRequest();

	const { register, handleSubmit, reset } = useForm<FormData>({
		resolver,
		defaultValues,
	});

	const onHandleSubmitSpecialtyForm = async (data: FormData) => {
		setLoading(true);

		try {
			const response = await apiRequest(
				'post',
				API_ROUTES.specialties.register,
				data
			);

			if (response) {
				toast('Especialidade cadastrada com sucesso!', {
					hideProgressBar: true,
					autoClose: 2000,
					type: 'success',
					theme: 'colored',
					style: { backgroundColor: '#22c55e', color: '#fff' },
				});
				setOpen(false);

				if (onAppointmentCreated) {
					onAppointmentCreated();
				}
				reset();
			}
		} catch (error) {
			console.error('Erro na requisição:', error);

			const errorMessage =
				(error as { message: string })?.message ||
				'Erro inesperado ao tentar cadastar. Tente novamente mais tarde.';

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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="bg-primary text-lg font-roboto text-white w-44 h-12 hover:bg-primary/90"
					type="button"
				>
					Cadastrar
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl w-full p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl">
						Cadastro de especialidade
					</DialogTitle>
					<DialogDescription className="text-base text-zinc-700 font-medium">
						Preencha o formulário para cadastrar uma nova especialidade
					</DialogDescription>
				</DialogHeader>
				<form
					className="space-y-6"
					onSubmit={handleSubmit(onHandleSubmitSpecialtyForm)}
				>
					<div className="grid grid-cols-1 gap-4">
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Especialidade:
							</Label>
							<Input
								className="h-11"
								type="text"
								placeholder="Digite o nome da especialidade"
								{...register('name')}
							/>
						</div>
					</div>
					<div className="flex justify-end">
						<Button
							className="w-40 h-12 bg-primary text-white text-base px-6"
							type="submit"
							onClick={() => setOpen(true)}
						>
							{loading ? <CircularLoading /> : 'Salvar'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
