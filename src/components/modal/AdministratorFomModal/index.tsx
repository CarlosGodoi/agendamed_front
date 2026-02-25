import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { defaultValues, resolver, FormData } from './schema';
import { formatCPF } from '@/utils/cpfMask';
import { CircularLoading } from '@/components/loading/circularLoading';

interface IAdministratorFormModalProps {
	onChange: (value: string) => void;
}
export const AdministratorFormModal: React.FC<IAdministratorFormModalProps> = ({
	onChange,
}) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { register, control, handleSubmit } = useForm<FormData>({
		resolver,
		defaultValues,
	});

	const handleChange = (
		field: { onChange: (value: string) => void },
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const formattedValue = formatCPF(e.target.value);
		field.onChange(formattedValue);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="bg-primary text-lg font-roboto text-white w-44 h-12 hover:bg-primary/90"
					type="button"
				>
					Cadastrar
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl w-full p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl">Cadastro de médicos</DialogTitle>
					<DialogDescription className="text-base text-zinc-700 font-medium">
						Preencha o formulário para cadastrar um novo médico
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-6" onSubmit={handleSubmit(() => {})}>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Nome:
							</Label>
							<Input
								className="h-11"
								type="text"
								placeholder="Digite o nome"
								{...register('name')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								E-mail:
							</Label>
							<Input
								className="h-11"
								type="text"
								placeholder="Digite o email"
								{...register('email')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">CPF:</Label>
							<Controller
								control={control}
								name="cpf"
								render={({ field }) => (
									<Input
										className="h-11"
										type="text"
										placeholder="Digite o CPF"
										{...field}
										onChange={(e) => handleChange(field, e)}
									/>
								)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Senha:
							</Label>
							<Input
								className="h-11"
								type="text"
								placeholder="Digite sua senha"
								{...register('password')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-primary text-base font-medium">
								Perfil:
							</Label>
							<Select onValueChange={onChange}>
								<SelectTrigger className="h-12 text-primary text-base font-roboto font-medium border border-primary">
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ADMIN">Administrador</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex justify-end">
						<Button
							className="w-40 h-12 bg-primary text-white text-base px-6"
							type="submit"
							onClick={() => setOpen(true)}
						>
							{loading ? <CircularLoading /> : 'Salvar'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
