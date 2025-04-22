import { Footer } from '@/components/footer';
import { BarGraphic } from '@/components/graphics/barGraphic';
import { LineGraphic } from '@/components/graphics/LineGraphic';
import { Header } from '@/components/header';
import { ProgressLoading } from '@/components/loading/progressLoading';
import { useRequest } from '@/hooks/useRequest';
import { API_ROUTES } from '@/services/api_routes';
import React, { useEffect, useState } from 'react';

interface MonthlyAppointmentsData {
	month: number;
	totalAppointments: number;
	attendedAppointments: number;
	scheduledAppointments: number;
	cancelledAppointments: number;
}

export interface AppointmentsReportsResponse {
	year: number;
	monthlyData: MonthlyAppointmentsData[];
	totalAppointmentsAttended: number;
	totalAppointmentsCanceled: number;
}

const Home: React.FC = () => {
	const { apiRequest } = useRequest();
	const [totalAppointmentAttended, setTotalAppointmentAttended] =
		useState<number>(0);
	const [totalAppointmentsCanceled, setTotalAppointmentsCanceled] =
		useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [reports, setReports] = useState<AppointmentsReportsResponse>({
		year: 2025,
		monthlyData: [],
		totalAppointmentsAttended: 0,
		totalAppointmentsCanceled: 0,
	});

	const fetchAppointmentsReports = async () => {
		setLoading(true);
		try {
			const response = await apiRequest('get', API_ROUTES.appointments.reports);

			setTotalAppointmentAttended(response.totalAppointmentsAttended);
			setTotalAppointmentsCanceled(response.totalAppointmentsCanceled);

			if (response.monthlyData && response.monthlyData.length > 0) {
				setReports(response);
			}
		} catch (error) {
			console.error('Erro ao buscar os dados:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAppointmentsReports();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<main className="min-h-screen flex flex-col bg-zinc-50">
			<Header />
			<h1 className="text-2xl text-gray_900 font-semibold px-10 mt-10">
				Dashboard
			</h1>
			<section className="flex-1 w-full flex flex-col">
				{loading ? (
					<div className="w-full flex justify-center items-center">
						<ProgressLoading />
					</div>
				) : (
					<>
						<div className="w-full flex justify-around items-center mt-10">
							<div className="flex flex-col items-center gap-5 w-[380px] bg-white border border-green-300 p-5 rounded-lg shadow-md">
								<div className="flex flex-col items-center gap-2">
									<p className="text-lg text-gray_900 font-semibold">
										Total de consultas
									</p>
									<span className="text-lg text-green-500 font-semibold">
										{totalAppointmentAttended}
									</span>
								</div>
							</div>
							<div className="flex flex-col items-center gap-5 w-[380px] bg-white border border-red-400 p-5 rounded-lg shadow-md">
								<div className="flex flex-col items-center gap-2">
									<p className="text-lg text-gray_900 font-semibold">
										Total de consultas desmarcadas
									</p>
									<span className="text-lg text-red-500 font-semibold">
										{totalAppointmentsCanceled}
									</span>
								</div>
							</div>
						</div>

						<div className="flex-1 flex w-full justify-center items-center gap-5 p-5">
							<BarGraphic data={reports} />
							<LineGraphic data={reports} />
						</div>
					</>
				)}
			</section>

			<Footer />
		</main>
	);
};

export default Home;
