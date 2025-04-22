export function crmMask(input: HTMLInputElement): string {
	// Guarda a posição do cursor
	const inicioSelecao = input.selectionStart;
	const valorOriginal: string = input.value;

	// Remove formatação existente (para evitar duplicações ao editar)
	const valor: string = valorOriginal.replace(/CRM\/+/gi, '').trim();

	// Expressão regular para identificar o padrão "crm XX 123456"
	const regex: RegExp = /^crm\s*([a-z]{2})\s*(\d+)$/i;
	const match: RegExpMatchArray | null = valor.match(regex);

	let valorFormatado: string;

	if (match) {
		// Formata para "CRM/XX 123456"
		const uf: string = match[1].toUpperCase();
		const numero: string = match[2];
		valorFormatado = `CRM/${uf} ${numero}`;
	} else {
		// Se não corresponder ao padrão completo, mantém o valor original
		valorFormatado = valorOriginal;
	}

	// Atualiza o valor do input
	input.value = valorFormatado;

	// Ajusta a posição do cursor após a formatação
	// Se o input mudou para o formato CRM/XX, move o cursor para depois da barra
	if (valorFormatado !== valorOriginal && valorFormatado.includes('CRM/')) {
		const novaPosicao: number =
			inicioSelecao !== null
				? inicioSelecao + (valorFormatado.length - valorOriginal.length)
				: 0;
		input.setSelectionRange(novaPosicao, novaPosicao);
	}

	// Retorna o valor formatado
	return valorFormatado;
}
