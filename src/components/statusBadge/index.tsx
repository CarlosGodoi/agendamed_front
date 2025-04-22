import { StatusType } from '@/utils/interfaces/status';
import { Badge } from '../ui/badge';

export const StatusBadge = ({ status }: { status: string }) => {
	const statusDictionary: Record<string, StatusType> = {
		SCHEDULED: 'AGENDADA',
		COMPLETED: 'CONCLUÍDA',
		CANCELLED: 'CANCELADA',
		NO_SHOW: 'CANCELADA',
	};

	const translatedStatus = statusDictionary[status] || 'AGENDADA';

	const statusColors = {
		AGENDADA: 'bg-yellow-500',
		CONCLUÍDA: 'bg-green-500',
		CANCELADA: 'bg-red-500',
	};

	return (
		<Badge
			className={`${statusColors[translatedStatus]} text-white px-2 py-1 cursor-pointer`}
		>
			{translatedStatus}
		</Badge>
	);
};
