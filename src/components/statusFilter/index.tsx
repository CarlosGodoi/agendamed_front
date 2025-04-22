import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export const StatusFilter = ({
	onChange,
}: {
	onChange: (value: string) => void;
}) => {
	return (
		<Select onValueChange={onChange}>
			<SelectTrigger className="max-w-40 w-full h-12 text-primary text-base font-roboto font-medium border border-primary">
				<SelectValue placeholder="Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="SCHEDULED">Agendada</SelectItem>
				<SelectItem value="COMPLETED">Concluída</SelectItem>
				<SelectItem value="CANCELLED">Cancelada</SelectItem>
			</SelectContent>
		</Select>
	);
};
