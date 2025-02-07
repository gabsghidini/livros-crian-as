function scheduleBooks(criancas, livros) {
	// Verifica se os arrays foram informados corretamente
	if (!Array.isArray(criancas) || !Array.isArray(livros)) {
		console.error("Os parâmetros 'criancas' e 'livros' devem ser arrays.");
		return;
	}

	const n = criancas.length;

	// Preenche os livros que não foram informados com "Livro Crianca {nome}"
	const livrosCompletos = livros.map((livro, index) => {
		if (!livro || livro.trim() === "") {
			return `Livro Crianca ${criancas[index]}`;
		}
		return livro;
	});

	// Cria a tabela de schedule:
	// Cada semana é representada por um array de objetos { crianca, livro }
	const schedule = [];

	// Para cada semana, usamos um offset que garante que nenhum índice coincida com o da criança.
	// A ideia é: para a semana 'semana', atribuímos a criança i o livro no índice (i + offset) mod n.
	// Utilizamos offset = (semana + 1) % n; se o resultado for 0, usamos offset = 1 para não permitir
	// que a criança receba seu próprio livro.
	for (let semana = 0; semana < n; semana++) {
		let offset = (semana + 1) % n;
		if (offset === 0) {
			offset = 1;
		}
		const scheduleSemana = [];
		for (let i = 0; i < n; i++) {
			const indexLivro = (i + offset) % n;
			scheduleSemana.push({
				crianca: criancas[i],
				livro: livrosCompletos[indexLivro],
			});
		}
		schedule.push(scheduleSemana);
	}

	// Monta uma tabela HTML para exibir o schedule
	let html = `<table border="1" cellspacing="0" cellpadding="5"><thead><tr><th>Semana</th>`;
	criancas.forEach((crianca) => {
		html += `<th>${crianca}</th>`;
	});
	html += `</tr></thead><tbody>`;

	schedule.forEach((scheduleSemana, indiceSemana) => {
		html += `<tr><td>Semana ${indiceSemana + 1}</td>`;
		scheduleSemana.forEach((item) => {
			html += `<td>${item.livro}</td>`;
		});
		html += `</tr>`;
	});
	html += `</tbody></table>`;

	// Exibe a tabela HTML no console
	console.log(schedule);

	// Retorna o schedule (estrutura com os dados) e o HTML gerado
	return { schedule, html };
}

const criancas = [
	"Alice",
	"Bento",
	"Helena",
	"Isabella",
	"Laura",
	"Mariah",
	"Mariana M.",
	"Mariana R.",
	"Maria Laura",
	"Maria Luiza",
	"Matias",
	"Miguel",
	"Teresa",
];

const livros = [
	"O almoço da Capivara",
	"Um dia muito mal humorado",
	"A Irmã do Gildo",
	"A Cigarra e a Formiga",
	"Livro Laura",
	"Just me and my mom",
	"Os filhotes saltam a colheira – paw patrol",
	"A Vaquinha indecisa",
	"Quem sou eu?",
	"Pip e Posy – A pequena poça",
	"Não é uma caixa, mamãe!",
	"Livro Miguel",
	"Nós agora somos quatro",
];

const resultado = scheduleBooks(criancas, livros);

// Se estiver num ambiente browser, insere a tabela no body da página
const container = document.getElementById("container");

container.appendChild(document.createElement("hr"));
container.insertAdjacentHTML("beforeend", resultado.html);
container.appendChild(document.createElement("hr"));
