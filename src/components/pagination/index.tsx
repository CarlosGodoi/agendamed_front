import { Button } from '../ui/button';

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
}
export const Paginantion: React.FC<PaginationProps> = ({
	totalPages,
	currentPage,
	setCurrentPage,
}) => {
	if (!currentPage || !totalPages) return null;

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className="flex justify-center items-center gap-2 mt-4 mb-6">
			<Button
				onClick={handlePreviousPage}
				disabled={currentPage === 1}
				className={`px-4 py-2 bg-primary text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
			>
				Voltar
			</Button>
			<span className="text-lg text-gray_900 font-medium">{`Páginas ${currentPage} de ${totalPages}`}</span>
			<Button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className={`px-4 py-2 bg-primary text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
			>
				Avançar
			</Button>
		</div>
	);
};
