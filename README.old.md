#  Gestão de Empenhos - Saúde Sete Lagoas

Sistema de controle financeiro desenvolvido para gerenciar empenhos e notas fiscais da Secretaria de Saúde de Sete Lagoas/MG.

##  Sobre o Projeto
Este projeto foi criado como parte do **Projeto Integrador da Gran Faculdade**. O objetivo é solucionar o problema de controle manual de verbas públicas, permitindo que gestores visualizem o saldo residual de cada empenho em tempo real, evitando gastos acima do orçamento e garantindo a continuidade dos serviços de saúde.

##  Funcionalidades
- **Gestão de Empenhos:** Cadastro de fornecedores e valores reservados.
- **Vínculo de Notas Fiscais:** Adição de notas com valor e link para o comprovante (Google Drive/Cloud).
- **Cálculo Automático:** O sistema subtrai o valor das notas do total do empenho.
- **Status Visual:** Alerta de **SALDO CRÍTICO** em vermelho quando o saldo é negativo.

##  Tecnologias Utilizadas
- [React.js](https://reactjs.org/)
- [Firebase Firestore](https://firebase.google.com/) (Banco de dados em tempo real)
- [Tailwind CSS](https://tailwindcss.com/) (Estilização)
- [Lucide React](https://lucide.dev/) (Ícones)
