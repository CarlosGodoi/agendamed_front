import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

export const ProgressLoading = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress >= 80) {
					return 20;
				}
				return prevProgress + 10;
			});
		}, 300);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col justify-center items-center gap-2 w-1/3 h-screen mx-auto">
			<p className="text-lg text-primary font-medium">Carregando...</p>
			<Progress className="w-full" value={progress} />
		</div>
	);
};
