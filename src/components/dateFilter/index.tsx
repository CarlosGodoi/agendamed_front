import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export const DateFilter = ({
	onchange,
}: {
	onchange: (value: string) => void;
}) => {
	const [date, setDate] = useState<Date | undefined>();

	const handleDateChange = (selectedDate?: Date) => {
		setDate(selectedDate);
		if (selectedDate) {
			onchange(format(selectedDate, 'yyyy-MM-dd'));
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="h-12 border border-primary text-primary text-base font-medium"
					variant="outline"
				>
					<CalendarIcon
						lang="Portuguese"
						className="max-w-32 w-full mr-2 text-primary text-base font-roboto font-medium"
					/>
					{date ? format(date, 'dd/MM/yyyy') : 'Selecionar Data'}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleDateChange}
					className="rounded-md border"
				/>
			</PopoverContent>
		</Popover>
	);
};
