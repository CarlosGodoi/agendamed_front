import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { FormData, resolver, defaultValues } from './schema';
import useAuthContext from '@/hooks/useAuthContext';
import { toast } from 'react-toastify';
import bgLogin from '../../assets/background2.jpg';
import { CircularLoading } from '@/components/loading/circularLoading';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const { signIn } = useAuthContext();

	const navigate = useNavigate();

	const form = useForm<FormData>({ resolver, defaultValues });

	async function onSubmit(data: FormData) {
		setLoading(true);

		const response = await signIn({
			email: data.email,
			password: data.password,
		});

		if (response.status) {
			toast('Login realizado!', {
				hideProgressBar: true,
				autoClose: 2000,
				type: 'success',
				theme: 'colored',
				style: { backgroundColor: '#22c55e', color: '#fff' },
			});
			navigate('/home');
		} else {
			toast('Usuário ou senha inválidos!', {
				hideProgressBar: true,
				autoClose: 2000,
				type: 'error',
				theme: 'colored',
				style: { backgroundColor: '#ef4444', color: '#fff' },
			});
			navigate('/');
		}
		setLoading(false);
	}

	return (
		<main className="h-screen flex">
			<section className="hidden md:block md:w-1/2 relative">
				<img
					className="absolute inset-0 w-full h-full object-cover"
					src={bgLogin}
					alt="Imagem de médica atendendo paciente"
				/>
			</section>

			<section className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
				<h1 className="text-5xl text-zinc-900 font-roboto font-semibold mb-6">
					Login
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full max-w-lg space-y-5 px-6 py-8 "
					>
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-roboto font-medium">
										E-mail
									</FormLabel>
									<FormControl>
										<Input
											className="h-12 text-zinc-900 text-lg font-roboto font-medium placeholder:text-zinc-400 focus:border-primary focus-visible:ring-0 focus:outline-none"
											placeholder="Digite o seu email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-roboto font-medium">
										Senha
									</FormLabel>
									<FormControl>
										<Input
											className="h-12 text-zinc-900 text-lg font-roboto font-medium placeholder:text-zinc-400 focus:border-primary focus-visible:ring-0 focus:outline-none"
											placeholder="Digite o sua senha"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end md:mt-8 max-md:mt-8 max-md:justify-center">
							<Button
								className="bg-primary text-lg font-roboto text-white w-44 h-12 hover:bg-blue-900 max-md:w-full"
								type="submit"
							>
								{loading ? <CircularLoading /> : 'Entrar'}
							</Button>
						</div>
					</form>
				</Form>
			</section>
		</main>
	);
};

export default Login;
