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
import { Textarea } from '../../ui/textarea';
// import { selectSpecialties } from '@/utils/mocks/selectSpecialties';
import { useRequest } from '@/hooks/useRequest';
import { useForm, Controller } from 'react-hook-form';
import { FormData, resolver, defaultValues } from './schema';
import { toast } from 'react-toastify';
import { CircularLoading } from '../../loading/circularLoading';
import { format } from 'date-fns';
import { formatCPF } from '@/utils/cpfMask';
import { formatPhoneNumber } from '@/utils/phoneMask';
import { API_ROUTES } from '@/services/api_routes';

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

export const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
	onAppointmentCreated,
}) => {
	const [specialties, setSpecialties] = useState<Specialty[]>([]);
	const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const { apiRequest } = useRequest();

	const { register, control, setValue, handleSubmit } = useForm<FormData>({
		resolver,
		defaultValues,
	});

	useEffect(() => {
		const fetchSpecialties = async () => {
			const response = await apiRequest(
				'get',
				`${API_ROUTES.specialties.getAll}?take=100`,
				{ total: Number, totalPage: Number }
			);

			setSpecialties(response.specialties);

			const extractedDoctors: { id: string; name: string }[] =
				response.specialties
					.flatMap((specialty: Specialty) => specialty.doctors)
					.filter(
						(
							doctor: { id: string; name: string } | undefined
						): doctor is { id: string; name: string } => doctor !== undefined
					);

			setDoctors(extractedDoctors);
		};

		fetchSpecialties();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmitForm = async (data: FormData) => {
		setLoading(true);

		const formattedDateTime = format(
			new Date(data.appointmentDateTime),
			"yyyy-MM-dd'T'HH:mm:ss"
		);

		const formattedData = {
			...data,
			appointmentDateTime: formattedDateTime,
		};

		try {
			const response = await apiRequest(
				'post',
				API_ROUTES.appointments.create,
				formattedData
			);

			if (response?.appointment) {
				toast('Consulta agendada com sucesso!', {
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
			} else {
				toast(
					'Erro ao agendar consulta! Verifique os dados e tente novamente.',
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
			console.error('Erro na requisição:', error);

			const errorMessage =
				(error as { message: string })?.message ||
				'Erro inesperado ao tentar agendar. Tente novamente mais tarde.';

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

	const handlePhoneChange = (
		value: string | React.ChangeEvent<HTMLInputElement>
	) => {
		const phoneValue = typeof value === 'string' ? value : value.target.value;
		const formattedPhone = formatPhoneNumber(phoneValue);
		setValue('patient.phone', formattedPhone, { shouldValidate: true });
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="bg-primary text-lg font-roboto text-white w-44 h-12 hover:bg-primary/90"
					type="button"
				>
					Agendar
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl w-full p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl">Agendar Consulta</DialogTitle>
					<DialogDescription className="text-base text-zinc-700 font-medium">
						Preencha o formulário para agendar uma consulta
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Nome:
							</Label>
							<Input
								className="h-11"
								type="text"
								placeholder="Digite o nome"
								{...register('patient.name')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">CPF:</Label>
							<Controller
								control={control}
								name="patient.cpf"
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
							<Label className="text-primary text-base font-medium">
								E-mail:
							</Label>
							<Input
								className="h-11"
								type="email"
								placeholder="Digite o email"
								{...register('patient.email')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Telefone:
							</Label>
							<Controller
								control={control}
								name="patient.phone"
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
								Especialidade:
							</Label>
							<Controller
								control={control}
								name="specialtyId"
								render={({ field }) => (
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											const specialty = specialties.find(
												(s) => s.id.toString() === value
											);
											setDoctors(specialty ? specialty.doctors : []);
											setValue('doctorName', ''); // Reseta o médico ao trocar de especialidade
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

						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Médicos:
							</Label>
							<Controller
								control={control}
								name="doctorName"
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={doctors.length === 0}
									>
										<SelectTrigger className="h-11">
											<SelectValue placeholder="Selecione o médico" />
										</SelectTrigger>
										<SelectContent>
											{doctors.map((doctor) => (
												<SelectItem key={doctor.id} value={doctor.name}>
													{doctor.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Data da consulta:
							</Label>
							<Input
								className="h-11"
								type="date"
								{...register('appointmentDateTime')}
							/>
						</div>
						<div className="col-span-2 flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Observações:
							</Label>
							<Textarea
								placeholder="Digite suas observações aqui."
								id="message"
								{...register('observation')}
							/>
						</div>
					</div>
					<div className="flex justify-end">
						<Button
							className="w-40 h-12 bg-primary text-white text-base px-6"
							type="submit"
							onClick={() => setOpen(true)}
						>
							{loading ? <CircularLoading /> : 'Agendar'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
