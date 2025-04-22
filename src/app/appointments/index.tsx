import React, { useEffect, useState } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

import { TableDefault } from '@/components/tables/tableDefault';
import { appointmentsColumns } from '@/components/tables/columns/appointmentsColumns';
import { DateFilter } from '@/components/dateFilter';
import { StatusFilter } from '@/components/statusFilter';
import { ExportCSV } from '@/components/exportCsv';
import { AppointmentFormModal } from '@/components/modal/appointmentFormModal';

import { InputSearch } from '@/components/inputSearch';
import { parseISO, parse, format, isValid } from 'date-fns';
import { useRequest } from '@/hooks/useRequest';
import { number } from 'zod';
import { IAppointmentsData } from '@/utils/interfaces/appointments';
import { UpdateAppointmentStatusModal } from '@/components/modal/updateAppointmentStatusModal';
import { API_ROUTES } from '@/services/api_routes';

const Appointments: React.FC = () => {
	const [search, setSearch] = useState('');
	const [appointments, setAppointments] = useState<IAppointmentsData[]>([]);
	const [filteredData, setFilteredData] = useState(appointments);
	const [selectedRows, setSelectedRows] = useState<typeof appointments>([]);

	const [selectedAppointment, setSelectedAppointment] =
		useState<IAppointmentsData | null>(null);
	const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);

	const { apiRequest } = useRequest();

	const fetchAppointments = async () => {
		const response = await apiRequest('get', API_ROUTES.appointments.getAll, {
			total: number,
			totalPage: number,
		});
		setAppointments(response.appointments);
	};

	useEffect(() => {
		fetchAppointments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (appointments.length > 0) {
			setFilteredData(appointments);
		}
	}, [appointments]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleFilter = () => {
		const filtered = appointments.filter((appointment) =>
			appointment.patient.cpf.startsWith(search)
		);
		setFilteredData(filtered);
	};

	const handleStatusFilter = (status: string) => {
		const statusFiltered = appointments.filter(
			(appointment) => appointment.status === status
		);
		setFilteredData(statusFiltered);
	};

	const handleDateFilter = (date: string) => {
		const dateFiltered = appointments.filter((appointment) => {
			if (!appointment.created_at) return false;

			let parsedDate;

			try {
				if (appointment.created_at.includes('-')) {
					// Tenta parsear como ISO ou 'YYYY-MM-DD'
					parsedDate = parseISO(appointment.created_at);
				} else if (appointment.created_at.includes('/')) {
					// Se estiver no formato 'DD/MM/YYYY'
					parsedDate = parse(appointment.created_at, 'dd/MM/yyyy', new Date());
				} else {
					console.warn('Formato de data desconhecido:', appointment.created_at);
					return false;
				}

				if (!isValid(parsedDate)) {
					console.error('Data inválida:', appointment.created_at);
					return false;
				}

				const formattedDate = format(parsedDate, 'yyyy-MM-dd');
				console.log('Comparando:', formattedDate, 'com', date);

				return formattedDate === date;
			} catch (error) {
				console.error('Erro ao converter data:', appointment.created_at, error);
				return false;
			}
		});
		setFilteredData(dateFiltered);
	};

	const handleUpateStatus = (appointment: IAppointmentsData) => {
		setSelectedAppointment(appointment);
		setIsUpdateStatusModalOpen(true);
	};

	return (
		<main className="flex flex-col min-h-screen bg-zinc-50">
			<Header />

			<div className="flex justify-between items-center w-full mt-10 px-10">
				<h1 className="text-2xl font-semibold text-gray-900">
					Consultas Agendadas
				</h1>
				<AppointmentFormModal onAppointmentCreated={fetchAppointments} />
			</div>

			<section className="flex-1 flex flex-col items-center w-full h-full">
				<div className="w-full flex items-center gap-6 mt-8">
					<InputSearch
						search={search}
						onChange={handleSearch}
						onSearch={handleFilter}
						placeholder="Digite o CPF do paciente"
					/>
					<DateFilter onchange={handleDateFilter} />
					<StatusFilter onChange={(status) => handleStatusFilter(status)} />
					<ExportCSV data={selectedRows} />
				</div>

				<div className="w-full max-w-7xl bg-white p-5 rounded-lg shadow-lg my-10">
					<TableDefault
						columns={appointmentsColumns(handleUpateStatus)}
						data={filteredData}
						onSelectRows={setSelectedRows}
					/>
				</div>
			</section>
			<UpdateAppointmentStatusModal
				key={selectedAppointment?.id || 'new'}
				apointment={selectedAppointment}
				open={isUpdateStatusModalOpen}
				onSuccess={fetchAppointments}
				onClose={() => {
					setIsUpdateStatusModalOpen(false);
					setSelectedAppointment(null);
				}}
			/>
			<Footer />
		</main>
	);
};

export default Appointments;
