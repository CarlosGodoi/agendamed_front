import { ExportCSV } from '@/components/exportCsv';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { InputSearch } from '@/components/inputSearch';
import { EditPatientFormModal } from '@/components/modal/editPatientModal';
import { patientsColumns } from '@/components/tables/columns/patientsColumns';
import { TableDefault } from '@/components/tables/tableDefault';
import { useRequest } from '@/hooks/useRequest';
import { API_ROUTES } from '@/services/api_routes';
import { IPatientData } from '@/utils/interfaces/patients';
import { useEffect, useState } from 'react';
import { number } from 'zod';

const Patients: React.FC = () => {
	const [search, setSearch] = useState('');
	const [patients, setPatients] = useState<IPatientData[]>([]);
	const [filteredData, setFilteredData] = useState(patients);
	const [selectedRows, setSelectedRows] = useState<typeof patients>([]);

	const [selectedPatient, setSelectedPatient] = useState<IPatientData | null>(
		null
	);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const { apiRequest } = useRequest();

	const fetchPatients = async () => {
		const response = await apiRequest('get', API_ROUTES.patients.getAll, {
			total: number,
			totalPage: number,
		});
		setPatients(response.patients);
	};

	useEffect(() => {
		fetchPatients();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (patients.length > 0) {
			setFilteredData(patients);
		}
	}, [patients]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleFilter = () => {
		const filtered = patients.filter((patient) =>
			patient.cpf.startsWith(search)
		);
		setFilteredData(filtered);
	};

	const updatePatientsList = () => {
		fetchPatients();
	};

	const handleEditPatient = (patient: IPatientData) => {
		setSelectedPatient(patient);
		setIsEditModalOpen(true);
	};

	return (
		<main className="flex flex-col min-h-screen bg-zinc-50">
			<Header />
			<div className="flex justify-between items-center w-full mt-10 px-10">
				<h2 className="text-2xl font-semibold text-gray-900">Pacientes</h2>
			</div>

			<section className="flex-1 flex flex-col items-center w-full h-full">
				<div className="w-full flex items-center gap-6 mt-8">
					<InputSearch
						search={search}
						onChange={handleSearch}
						onSearch={handleFilter}
						placeholder="Digite o CPF do paciente"
					/>
					<ExportCSV data={selectedRows} />
				</div>

				<div className="w-full max-w-7xl bg-white p-5 rounded-lg shadow-lg my-10">
					<TableDefault
						columns={patientsColumns(handleEditPatient)}
						data={filteredData}
						onSelectRows={setSelectedRows}
					/>
				</div>
			</section>

			<EditPatientFormModal
				key={selectedPatient?.id || 'new'}
				patient={selectedPatient}
				onSuccess={updatePatientsList}
				open={isEditModalOpen}
				onClose={() => {
					setIsEditModalOpen(false);
					setSelectedPatient(null);
				}}
			/>
			<Footer />
		</main>
	);
};

export default Patients;
