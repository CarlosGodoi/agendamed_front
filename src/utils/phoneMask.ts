export const formatPhoneNumber = (value: string) => {
	// Remove todos os caracteres que não são dígitos
	const cleaned = value.replace(/\D/g, '');

	// Formata o número de telefone
	const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

	if (match) {
		return `(${match[1]})${match[2]}-${match[3]}`;
	}

	return value;
};
