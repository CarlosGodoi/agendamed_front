export function formatCPF(value: string): string {
	const cleanValue = value.replace(/\D/g, '');

	const cpf = cleanValue.slice(0, 11);

	if (cpf.length <= 3) {
		return cpf;
	} else if (cpf.length <= 6) {
		return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
	} else if (cpf.length <= 9) {
		return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
	} else {
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
	}
}
