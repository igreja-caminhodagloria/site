const toggler = document.querySelector('.navbar-toggler'); // pega pelo class
const menu = document.getElementById('navbarConteudo'); // ID correto do HTML

if (toggler && menu) {
  toggler.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}


document.addEventListener('DOMContentLoaded', function () {

  // Máscara de telefone para todos os inputs de telefone
  const inputsTelefone = document.querySelectorAll('.telefone-input');

  inputsTelefone.forEach(function(inputTelefone) {
    inputTelefone.addEventListener('input', function (e) {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);

      v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
      v = v.replace(/(\d{5})(\d{4})$/, '$1-$2');
      e.target.value = v;
    });
  });

  // Envio do formulário
  const botoesEnviar = document.querySelectorAll('.enviar-btn');

  botoesEnviar.forEach(function (botao) {
    botao.addEventListener('click', function (e) {
      e.preventDefault();

      const container = botao.closest('.form-container');
      if (!container) return;

      const textarea = container.querySelector('.mensagem-textarea');
      const inputNome = container.querySelector('.nome-input');
      const inputTelefone = container.querySelector('.telefone-input');

      if (!textarea || !inputNome || !inputTelefone) return;

      const mensagem = textarea.value.trim();
      const nome = inputNome.value.trim();
      const telefone = inputTelefone.value.trim();

      if (!mensagem || !nome || !telefone) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
      }

      const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!telefoneRegex.test(telefone)) {
        alert('Telefone inválido! Use o formato (99) 99999-9999');
        return;
      }

    fetch('https://script.google.com/macros/s/AKfycbw6DhneP2MbQgtxC0ZGC_xE2KflL_b_5uzxWxKtYp6gphJYr6QNPL4haQJeCoXNs6RF6Q/exec', {        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nome=${encodeURIComponent(nome)}&telefone=${encodeURIComponent(telefone)}&mensagem=${encodeURIComponent(mensagem)}`
      }).then(() => {
        alert('Mensagem enviada com sucesso!');
        textarea.value = '';
        inputNome.value = '';
        inputTelefone.value = '';
      }).catch(() => {
        alert('Erro ao enviar a mensagem.');
      });
    });
  });

});

function copiarChavePix() {
  const pixKey = document.getElementById('pixKey').innerText;

  navigator.clipboard.writeText(pixKey).then(() => {
    const botao = document.querySelector('.btn-copy-pix');
    const textoOriginal = botao.innerText;

    botao.innerText = 'Copiado!';
    botao.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

    setTimeout(() => {
      botao.innerText = textoOriginal;
      botao.style.background = 'linear-gradient(135deg, var(--primary), var(--light))';
    }, 2000);
  }).catch(() => {
    alert('Erro ao copiar a chave PIX. Tente novamente.');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const noResults = document.getElementById('noResults');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        let visibleCount = 0;

        galleryCards.forEach(card => {
          const tipo = card.getAttribute('data-tipo');

          if (filter === 'todos' || tipo === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
            visibleCount++;
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });

        if (noResults) {
          if (visibleCount === 0) {
            noResults.style.display = 'block';
          } else {
            noResults.style.display = 'none';
          }
        }
      });
    });
  }
});

