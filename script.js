let menuIcon = document.querySelector('#menu-icon'); // Seleciona o ícone do menu
let navbar = document.querySelector('.navbar'); // Seleciona a barra de navegação

let sections = document.querySelectorAll('section'); // Seleciona todas as seções
let navLinks = document.querySelectorAll('header nav a'); // Seleciona todos os links de navegação

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY; // Obtém a posição do scroll
        let offset = sec.offsetTop - 150; // Calcula o offset da seção
        let height = sec.offsetHeight; // Obtém a altura da seção
        let id = sec.getAttribute('id'); // Obtém o ID da seção

        // Verifica se a seção está visível na tela
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active'); // Remove a classe 'active' de todos os links
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active'); // Adiciona 'active' ao link correspondente
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Alterna a classe do ícone do menu
    navbar.classList.toggle('active'); // Alterna a classe da barra de navegação
};

// Inicializa o EmailJS com o ID do usuário
(function() {
    emailjs.init("ixLdtWLT2qLGScwT5");
})();

// Função para formatar o número de telefone no padrão brasileiro (8 ou 9 dígitos)
function formatPhoneNumberOnInput(event) {
    const input = event.target; // Obtém o campo de entrada
    let phoneNumber = input.value.replace(/\D/g, ''); // Remove tudo que não é número

    // Mantém o número intacto se o usuário estiver deletando
    if (event.inputType === 'deleteContentBackward') {
        return;
    }

    // Formata o número de telefone com base na quantidade de dígitos
    if (phoneNumber.length > 2 && phoneNumber.length <= 10) {
        // Formato para números com 8 dígitos
        input.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
    } else if (phoneNumber.length === 11) {
        // Formato para números com 9 dígitos
        input.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    } else if (phoneNumber.length <= 2) {
        // Exibe apenas os dígitos até o DDD
        input.value = phoneNumber;
    }
}

// Função para enviar o e-mail
function sendEmail(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = document.getElementById('contact-form'); // Obtém o formulário
    const submitButton = document.getElementById('submit-btn'); // Obtém o botão de envio
    const originalButtonText = submitButton.value; // Armazena o texto original do botão

    // Verifica se o formulário é válido antes de enviar
    if (form.checkValidity()) {
        submitButton.value = 'Enviando...'; // Altera o texto do botão durante o envio
        submitButton.disabled = true; // Desabilita o botão para evitar envios múltiplos

        emailjs.sendForm('service_4vvs43s', 'template_55yr3ou', form)
            .then(function(response) {
                console.log('Mensagem enviada com sucesso!', response.status, response.text);
                alert('Mensagem enviada com sucesso!'); // Alerta de sucesso
                form.reset(); // Reseta o formulário
            }, function(error) {
                console.error('Erro ao enviar mensagem:', error);
                alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.'); // Alerta de erro
            })
            .finally(function() {
                submitButton.value = originalButtonText; // Restaura o texto original do botão
                submitButton.disabled = false; // Reabilita o botão
            });
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.'); // Alerta de campos obrigatórios não preenchidos
        form.reportValidity(); // Reporta validade do formulário
    }
}

// Adiciona eventos ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone'); // Obtém o campo de telefone

    // Aplica a formatação conforme o usuário digita
    phoneInput.addEventListener('input', formatPhoneNumberOnInput);

    // Listener para envio do formulário
    document.getElementById('contact-form').addEventListener('submit', sendEmail);
});

// Atualiza o ano no footer automaticamente
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year'); // Obtém o elemento do ano atual
    const currentYear = new Date().getFullYear(); // Obtém o ano atual
    currentYearElement.textContent = currentYear; // Atualiza o conteúdo do elemento
});