import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { formatCPF } from '@/utils/cpfMask';
import { formatPhoneNumber } from '@/utils/phoneMask';
import { IPatientData } from '@/utils/interfaces/patients';
import { Pencil } from 'phosphor-react';

export const patientsColumns = (
	onEdit: (patient: IPatientData) => void
): ColumnDef<IPatientData>[] => [
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
		accessorFn: (row) => row.name,
		header: 'Nome',
		cell: ({ row }) => <span>{row.original.name}</span>,
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.cpf,
		header: 'CPF',
		cell: ({ row }) => <span>{formatCPF(row.original.cpf)}</span>,
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.phone,
		header: 'Telefone',
		cell: ({ row }) => <span>{formatPhoneNumber(row.original.phone)}</span>,
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.email,
		header: 'E-mail',
		cell: ({ row }) => <span>{row.original.email}</span>,
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.created_at,
		header: 'Criado em',
		cell: ({ row }) => (
			<span>{format(row.original.created_at, 'dd/MM/yyyy')}</span>
		),
		enableSorting: true,
	},
	{
		accessorFn: (row) => row.id,
		header: 'Editar',
		cell: ({ row }) => (
			<button
				className="bg-primary p-2 rounded shadow-md"
				onClick={() => onEdit(row.original)}
			>
				<Pencil size={20} color="#FFF" />
			</button>
		),
		enableSorting: false,
	},
];
