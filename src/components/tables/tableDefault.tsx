import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { useEffect, useState } from 'react';
import { ArrowSquareUp, ArrowSquareDown } from 'phosphor-react';
import { Button } from '../ui/button';

interface AppointmentsTableProps<TData> {
	columns: ColumnDef<TData>[];
	data: TData[];
	onSelectRows: (selectedRows: TData[]) => void;
}

export const TableDefault = <TData,>({
	columns,
	data,
	onSelectRows,
}: AppointmentsTableProps<TData>) => {
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize] = useState(5);
	const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable<TData>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		enableRowSelection: true,
		pageCount: Math.ceil(data.length / pageSize),
		state: {
			pagination: { pageIndex, pageSize },
			sorting,
			rowSelection,
		},
		getRowId: (_, index) => index.toString(),
		onRowSelectionChange: setRowSelection,
		onSortingChange: (updater) => {
			const newSorting =
				typeof updater === 'function' ? updater(sorting) : updater;
			setSorting(newSorting);
		},
		onPaginationChange: (updater) => {
			const newState =
				typeof updater === 'function'
					? updater({ pageIndex, pageSize })
					: updater;
			setPageIndex(newState.pageIndex);
		},
	});

	useEffect(() => {
		if (Object.keys(rowSelection).length > 0) {
			const selectedData = table
				.getSelectedRowModel()
				.rows.map((row) => row.original);
			onSelectRows(selectedData);
		}
	}, [onSelectRows, rowSelection, table]);

	return (
		<div className="space-y-4">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							className="bg-primary hover:bg-primary"
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => {
								const sortedColumn = sorting.find((s) => s.id === header.id);
								return (
									<TableHead
										className="h-12 text-white text-lg font-medium cursor-pointer select-none"
										key={header.id}
										onClick={
											header.column.getCanSort()
												? header.column.getToggleSortingHandler()
												: undefined
										}
									>
										<div className="flex items-center gap-2">
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}

											{header.column.getCanSort() && (
												<div className="flex flex-col">
													<ArrowSquareUp
														size={18}
														weight={
															sortedColumn?.desc === false ? 'fill' : 'regular'
														}
														className="text-white"
													/>
													<ArrowSquareDown
														size={18}
														weight={
															sortedColumn?.desc === true ? 'fill' : 'regular'
														}
														className="text-white"
													/>
												</div>
											)}
										</div>
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>

				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								// Modificação aqui: Remova o onClick da linha inteira
								className={`${row.getIsSelected() ? 'bg-blue-100' : ''}`}
							>
								{row.getVisibleCells().map((cell) => {
									// Para a célula do checkbox, adicionamos o manipulador de clique específico
									if (cell.column.id === 'select') {
										return (
											<TableCell
												className="text-gray_800 text-base cursor-pointer"
												key={cell.id}
												onClick={row.getToggleSelectedHandler()}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										);
									}
									// Para as outras células, não incluímos o onClick
									return (
										<TableCell
											className="text-gray_800 text-base"
											key={cell.id}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length + 1}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{/* Paginação */}
			<div className="flex items-center justify-between mt-4">
				<span className="text-base text-gray-500 font-medium">
					Página {table.getState().pagination.pageIndex + 1} de{' '}
					{table.getPageCount()}
				</span>

				<div className="flex gap-2">
					<Button
						className="w-32 h-11 border border-primary text-primary"
						variant="outline"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>

					<Button
						className="w-32 h-11 bg-primary text-white"
						variant="outline"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Próximo
					</Button>
				</div>
			</div>
		</div>
	);
};
