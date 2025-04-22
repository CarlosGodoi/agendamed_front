import { StatusType } from '../interfaces/status';

export const statusDictionary: Record<string, StatusType> = {
	SCHEDULED: 'AGENDADA',
	COMPLETED: 'CONCLUÍDA',
	CANCELLED: 'CANCELADA',
	NO_SHOW: 'CANCELADA',
};
