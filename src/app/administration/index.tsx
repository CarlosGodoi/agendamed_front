import { ExportCSV } from '@/components/exportCsv';
import { Header } from '@/components/header';
import { InputSearch } from '@/components/inputSearch';
import { AdministratorFormModal } from '@/components/modal/AdministratorFomModal';
import { TableDefault } from '@/components/tables/tableDefault';

const Administration: React.FC = () => {
	return (
		<main className="flex flex-col min-h-screen bg-zinc-50">
			<Header />

			<div className="flex justify-between items-center w-full mt-10 px-10">
				<h2 className="text-2xl font-semibold text-gray-900">Administração</h2>

				<AdministratorFormModal onChange={() => {}} />
			</div>

			<section className="flex-1 flex flex-col items-center w-full h-full">
				<div className="w-full flex items-center gap-6 mt-8">
					<InputSearch
						search={''}
						onChange={() => {}}
						onSearch={() => {}}
						placeholder="Digite o nome do administrador"
					/>
					<ExportCSV data={[]} />
				</div>

				<div className="w-full max-w-7xl bg-white p-5 rounded-lg shadow-lg my-10">
					<TableDefault columns={[]} data={[]} onSelectRows={() => {}} />
				</div>
			</section>
		</main>
	);
};

export default Administration;
