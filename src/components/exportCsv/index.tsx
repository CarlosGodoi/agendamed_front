import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface ExportCSVProps {
	data: unknown[];
}

export const ExportCSV = ({ data }: ExportCSVProps) => {
	const exportToCSV = () => {
		if (data.length === 0) {
			alert('Nenhuma linha selecionada para exportar.');
			return;
		}

		const csv = Papa.unparse(data);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		saveAs(blob, 'consultas.csv');
	};

	return (
		<Button
			onClick={exportToCSV}
			className="h-12 text-base font-medium bg-primary text-white"
		>
			<Download className="mr-2" /> Exportar CSV
		</Button>
	);
};
