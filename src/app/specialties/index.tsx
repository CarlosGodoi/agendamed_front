import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { InputSearch } from '@/components/inputSearch';
import { ProgressLoading } from '@/components/loading/progressLoading';

import { Paginantion } from '@/components/pagination';
import { useRequest } from '@/hooks/useRequest';
import { API_ROUTES } from '@/services/api_routes';
import { ISpecialties } from '@/utils/interfaces/specialties';
import { useEffect, useState, useMemo } from 'react';
import { FirstAid, Trash } from 'phosphor-react';
import { SpecialtyFormModal } from '@/components/modal/specialtyFormModal';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const Specialties: React.FC = () => {
	const [search, setSearch] = useState('');
	const [allSpecialties, setAllSpecialties] = useState<ISpecialties[]>([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12; // Ajuste conforme necessário

	const { apiRequest } = useRequest();

	const fetchSpecialties = async () => {
		setLoading(true);

		try {
			// Usamos take=100 para garantir que todos os itens sejam retornados
			const response = await apiRequest(
				'get',
				`${API_ROUTES.specialties.getAll}?take=100`
			);
			setAllSpecialties(response.specialties || []);
			setLoading(false);
		} catch (error) {
			console.error('Erro ao buscar especialidades:', error);
			setLoading(false);
		}
	};

	// Carrega os dados iniciais
	useEffect(() => {
		fetchSpecialties();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Reseta para a primeira página quando a busca muda
	useEffect(() => {
		setCurrentPage(1);
	}, [search]);

	// Filtra as especialidades baseado no termo de busca
	const filteredSpecialties = useMemo(() => {
		if (!search.trim()) return allSpecialties;

		return allSpecialties.filter((specialty) =>
			specialty.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [allSpecialties, search]);

	// Calcula o total de páginas
	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(filteredSpecialties.length / itemsPerPage));
	}, [filteredSpecialties.length, itemsPerPage]);

	// Obtém apenas os itens da página atual
	const paginatedSpecialties = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredSpecialties.slice(startIndex, endIndex);
	}, [filteredSpecialties, currentPage, itemsPerPage]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleSubmitSearch = () => {
		setCurrentPage(1);
	};

	const handleDeleteSpecialty = async (id: string) => {
		setLoading(true);
		try {
			await apiRequest('delete', API_ROUTES.specialties.delete(id));

			await fetchSpecialties();

			toast('Especialidade deletada com sucesso!', {
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
				<h2 className="text-2xl font-semibold text-gray-900">Especialidades</h2>
				<SpecialtyFormModal onAppointmentCreated={fetchSpecialties} />
			</div>

			<section className="flex-1 w-full mt-6">
				<div className="flex items-center gap-4">
					<InputSearch
						search={search}
						onChange={handleSearch}
						onSearch={handleSubmitSearch}
						placeholder="Digite o nome da especialidade"
					/>
				</div>
				{loading ? (
					<ProgressLoading />
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-10 py-8">
							{paginatedSpecialties.length > 0 ? (
								paginatedSpecialties.map((specialty) => (
									<div
										key={specialty.id}
										className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md p-4"
									>
										<div className="flex w-full justify-between items-center p-2">
											<div className="flex gap-4">
												<p className="text-lg text-gray-900 font-semibold">
													{specialty.name}
												</p>
												<FirstAid size={30} weight="fill" color="#192655" />
											</div>
											<Button
												className="flex"
												variant="outline"
												onClick={() => handleDeleteSpecialty(specialty.id)}
											>
												<Trash size={25} weight="bold" color="#192655" />
											</Button>
										</div>
									</div>
								))
							) : (
								<div className="col-span-full text-center py-10">
									<p>Nenhuma especialidade encontrada.</p>
								</div>
							)}
						</div>

						{filteredSpecialties.length > 0 && (
							<div className="mb-8">
								<div className="flex w-full px-10">
									<p className="text-center mb-2 text-primary font-medium">
										Mostrando {paginatedSpecialties.length} de{' '}
										{filteredSpecialties.length} especialidades
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

export default Specialties;
