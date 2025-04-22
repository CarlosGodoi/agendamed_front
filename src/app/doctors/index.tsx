import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { InputSearch } from '@/components/inputSearch';
import { ProgressLoading } from '@/components/loading/progressLoading';
import { DoctorFormModal } from '@/components/modal/doctorFormModal';
import { Paginantion } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { useRequest } from '@/hooks/useRequest';
import { API_ROUTES } from '@/services/api_routes';
import { IDoctor } from '@/utils/interfaces/doctors';
import { Trash } from 'phosphor-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const Doctors: React.FC = () => {
	const [search, setSearch] = useState('');
	const [allDoctors, setAllDoctors] = useState<IDoctor[]>([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	const { apiRequest } = useRequest();

	const fetchDoctors = async () => {
		setLoading(true);

		try {
			const response = await apiRequest(
				'get',
				`${API_ROUTES.doctor.getAll}?take=100`
			);
			setAllDoctors(response.doctors || []);
		} catch (error) {
			console.error('Erro ao buscar especialidades:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDoctors();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [search]);

	const filteredDoctors = useMemo(() => {
		if (!search.trim()) return allDoctors;

		return allDoctors.filter((doctor) =>
			doctor.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [allDoctors, search]);

	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(filteredDoctors.length / itemsPerPage));
	}, [filteredDoctors.length, itemsPerPage]);

	const paginatedDoctors = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;

		return filteredDoctors.slice(startIndex, endIndex);
	}, [filteredDoctors, currentPage, itemsPerPage]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleSubmitSearch = () => {
		setCurrentPage(1);
	};

	const handleDeleteDoctor = async (id: string) => {
		setLoading(true);
		try {
			await apiRequest('delete', API_ROUTES.doctor.delete(id));

			await fetchDoctors();

			toast('Médico deletado com sucesso!', {
				hideProgressBar: true,
				autoClose: 2000,
				type: 'success',
				theme: 'colored',
				style: { backgroundColor: '#22c55e', color: '#fff' },
			});
		} catch (error) {
			console.error('Erro na requisição:', error);

			const errorMessage =
				(error as { message: string })?.message ||
				'Erro inesperado ao tentar excluir. Tente novamente mais tarde.';

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
		<main className="flex flex-col min-h-screen bg-zinc-50">
			<Header />
			<div className="flex justify-between items-center w-full mt-10 px-10">
				<h2 className="text-2xl font-semibold text-gray-900">Médicos</h2>
				<DoctorFormModal onAppointmentCreated={fetchDoctors} />
			</div>

			<section className="flex-1 w-full mt-6">
				<div className="flex items-center gap-4">
					<InputSearch
						search={search}
						onChange={handleSearch}
						onSearch={handleSubmitSearch}
						placeholder="Digite o nome do médico"
					/>
				</div>
				{loading ? (
					<ProgressLoading />
				) : (
					<>
						<div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
 gap-6 px-10 py-8"
						>
							{paginatedDoctors.length > 0 ? (
								paginatedDoctors.map((doctor) => (
									<div
										key={doctor.id}
										className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md p-4"
									>
										<div className="flex justify-between items-center">
											<div className="flex items-center gap-4 mb-2">
												<div className="flex items-center justify-center w-16 h-16 rounded-full object-cover overflow-hidden">
													<img
														src="https://github.com/shadcn.png"
														alt="Foto do rosto do médico"
													/>
												</div>
												<p className="text-lg text-gray-900 font-semibold">
													{doctor.name}
												</p>
											</div>
											<Button
												className="flex"
												variant="outline"
												onClick={() => handleDeleteDoctor(doctor.id)}
											>
												<Trash size={25} weight="bold" color="#192655" />
											</Button>
										</div>

										<div className="flex justify-between items-center mt-4">
											<p className="text-base text-primary font-medium">
												{doctor.crm}
											</p>
											<p className="text-base text-gray_950 font-medium">
												{doctor.specialty.name}
											</p>
										</div>
									</div>
								))
							) : (
								<div className="flex justify-center items-center w-full h-full">
									<p className="text-lg text-gray-500">
										Nenhum médico encontrado.
									</p>
								</div>
							)}
						</div>

						{filteredDoctors.length > 0 && (
							<div className="mb-8">
								<div className="flex w-full px-10">
									<p className="text-center mb-2 text-primary font-medium">
										Mostrando {paginatedDoctors.length} de{' '}
										{filteredDoctors.length} médicos
									</p>
								</div>

								<Paginantion
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									totalPages={totalPages}
								/>
							</div>
						)}
					</>
				)}
			</section>

			<Footer />
		</main>
	);
};

export default Doctors;
