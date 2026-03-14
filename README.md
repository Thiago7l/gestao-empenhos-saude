Este é um sistema web desenvolvido para otimizar e modernizar o controle financeiro da Secretaria de Saúde. A aplicação foca na gestão eficiente de empenhos (reservas de verba) e na organização de notas fiscais vinculadas.

 Funcionalidades
Gerenciamento de Empenhos: Registro e acompanhamento detalhado de reservas de verba.

Vinculação de Notas Fiscais: Organização de documentos fiscais atrelados a cada empenho.

Cálculo Automático de Saldo: Monitoramento em tempo real do valor restante em cada reserva.

Alertas de Criticidade: Indicadores visuais que destacam empenhos que precisam de atenção imediata.

Interface Responsiva: Desenvolvida para oferecer uma boa experiência em diferentes dispositivos.

 Tecnologias Utilizadas
React.js: Biblioteca principal para a construção da interface.

JavaScript (ES6+): Lógica de programação do sistema.

CSS3: Estilização personalizada e layouts modernos.

Firebase: Utilizado para autenticação e banco de dados em tempo real (NoSQL).

Create React App: Estrutura base para o desenvolvimento do projeto.

 Estrutura do Projeto
/src: Contém os componentes, contextos e lógica da aplicação.

/public: Arquivos estáticos e o index HTML principal.

package.json: Lista de dependências e scripts do projeto.


Como Executar o Projeto

Caso ainda não possua o github instalado no seu computador, instale com o seguinte comando no powershell: 

winget install --id Git.Git -e --source winget
 
Clone o repositório:

Feche e abra novamente o Powershell e execute o seguinte: 

git clone https://github.com/Thiago7l/gestao-empenhos-saude.git

Instale as dependências:

Na pasta baixada, abra novamente o Powershell e execute o seguinte: 

winget install OpenJS.NodeJS.LTS

Feche e abra novamente o Powershell e execute o seguinte: 

npm install

Inicie o servidor de desenvolvimento:

No Powershell execute o seguinte: 

npm start
