import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import React, { useEffect, useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import { useRequest } from '@/hooks/useRequest';
import {
	useForm,
	Controller,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { CircularLoading } from '../../loading/circularLoading';
import { formatCPF } from '@/utils/cpfMask';
import { FormData, resolver, defaultValues } from './schema';
import { API_ROUTES } from '@/services/api_routes';
import { crmMask } from '@/utils/cmMask';

interface Specialty {
	id: number;
	name: string;
	doctors: {
		id: string;
		name: string;
	}[];
}

interface AppointmentFormModalProps {
	onAppointmentCreated?: () => void;
}

export const DoctorFormModal: React.FC<AppointmentFormModalProps> = ({
	onAppointmentCreated,
}) => {
	const [specialties, setSpecialties] = useState<Specialty[]>([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const { apiRequest } = useRequest();

	const { register, control, handleSubmit, reset, setValue } =
		useForm<FormData>({
			resolver,
			defaultValues,
		});

	useEffect(() => {
		const fetchSpecialties = async () => {
			setLoading(true);
			const response = await apiRequest(
				'get',
				`${API_ROUTES.specialties.getAll}?take=100`
			);

			setSpecialties(response.specialties);
			setLoading(false);
		};

		fetchSpecialties();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmitDoctorsForm = async (data: FormData) => {
		setLoading(true);

		try {
			const response = await apiRequest('post', API_ROUTES.doctor.create, data);
			console.log('response_doctor =>', response);

			if (response) {
				toast('Médico cadastrado com sucesso!', {
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

	const handleChange = (
		field: { onChange: (value: string) => void },
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const formattedValue = formatCPF(e.target.value);
		field.onChange(formattedValue);
	};

	const handleChangeCrmMask = (
		e: React.ChangeEvent<HTMLInputElement>,
		register: UseFormRegister<FormData>,
		setValue: UseFormSetValue<FormData>
	) => {
		// Primeiro mantém o comportamento padrão do register
		register('crm').onChange(e);
		// Depois aplica a máscara
		crmMask(e.target);
		// Informa o React Hook Form da mudança
		setValue('crm', e.target.value);
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
					<DialogTitle className="text-2xl">Cadastro de médicos</DialogTitle>
					<DialogDescription className="text-base text-zinc-700 font-medium">
						Preencha o formulário para cadastrar um novo médico
					</DialogDescription>
				</DialogHeader>
				<form
					className="space-y-6"
					onSubmit={handleSubmit(onSubmitDoctorsForm)}
				>
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
							<Label className="text-primary text-base font-medium">CPF:</Label>
							<Controller
								control={control}
								name="cpf"
								render={({ field }) => (
									<Input
										className="h-11"
										type="text"
										placeholder="Digite o CPF"
										{...field}
										onChange={(e) => handleChange(field, e)}
									/>
								)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">CRM:</Label>
							<Input
								className="h-11"
								type="text"
								placeholder="Digite o CRM + UF (Ex: CRM/SP 123456)"
								{...register('crm')}
								onChange={(e) => handleChangeCrmMask(e, register, setValue)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Especialidade:
							</Label>
							<Controller
								control={control}
								name="specialtyId"
								render={({ field }) => (
									<Select
										onValueChange={(value) => {
											field.onChange(value);
										}}
										value={field.value}
									>
										<SelectTrigger className="h-11">
											<SelectValue placeholder="Selecione a especialidade" />
										</SelectTrigger>
										<SelectContent>
											{specialties.map((specialty) => (
												<SelectItem
													key={specialty.id}
													value={specialty.id.toString()}
												>
													{specialty.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
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
