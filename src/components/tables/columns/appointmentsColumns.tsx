import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '../../statusBadge';
import { IAppointmentsData } from '@/utils/interfaces/appointments';
import { format } from 'date-fns';
import { StatusType } from '@/utils/interfaces/status';
import { formatCPF } from '@/utils/cpfMask';
import { formatPhoneNumber } from '@/utils/phoneMask';
import { Button } from '@/components/ui/button';
import { DotsThreeVertical } from 'phosphor-react';

export const appointmentsColumns = (
	handleOpenStatusModal: (appointment: IAppointmentsData) => void
): ColumnDef<IAppointmentsData>[] => [
	{
		id: 'select',
		header: ({ table }) => (
			<input
				type="checkbox"
				checked={table.getIsAllRowsSelected()}
				onChange={table.getToggleAllRowsSelectedHandler()}
			/>
		),
		cell: ({ row }) => (
			<input
				type="checkbox"
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
			/>
		),
		enableSorting: false,
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => row.patient.name,
		header: 'Nome',
		cell: ({ row }) => <span>{row.original.patient.name}</span>,
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.patient.cpf,
		header: 'CPF',
		cell: ({ row }) => <span>{formatCPF(row.original.patient.cpf)}</span>,
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.patient.phone,
		header: 'Telefone',
		cell: ({ row }) => (
			<span>{formatPhoneNumber(row.original.patient.phone)}</span>
		),
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.created_at,
		header: 'Agendado em',
		cell: ({ row }) => (
			<span>{format(row.original.created_at, 'dd/MM/yyyy')}</span>
		),
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.doctor.name,
		header: 'Médico',
		cell: ({ row }) => <span>{row.original.doctor.name}</span>,
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.status,
		header: 'Status',
		cell: ({ row }: { row: { original: IAppointmentsData } }) => (
			<div className="flex justify-center">
				<StatusBadge status={row.original.status as StatusType} />
			</div>
		),
	},
	{
		id: 'actions',
		header: 'Ações',
		cell: ({ row }) => (
			<Button
				variant="default"
				size="sm"
				onClick={() => handleOpenStatusModal(row.original)}
				className="text-primary"
			>
				<DotsThreeVertical size={32} color="#FFF" weight="bold" />
			</Button>
		),
		enableSorting: false,
		enableColumnFilter: false,
	},
];
