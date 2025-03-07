# Prova front-end

## Descrição

Este projeto foi desenvolvido para o processo seletivo do Laboratório de Computação Científica e Visualização (LCCV) da Universidade Federal de Alagoas (UFAL), referente à vaga de desenvolvedor front-end, conforme o edital Nº 005/2025.

A aplicação implementa uma interface web interativa seguindo o protótipo fornecido e integra-se com a API disponibilizada para gerenciar projetos via operações CRUD.

## Instalação e execução

Para executar a aplicação, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/Ashlc/sume-front.git
```

2. Acesse o diretório do projeto:

```bash
cd sume-front
```

3. Instale as dependências:

```bash
npm install
```

4. Execute a aplicação:

```bash
ng serve
```

## Tecnologias utilizadas

- HTML, CSS, JavaScript – Base da aplicação web
- AngularJS – Framework principal utilizado
- Tailwind CSS – Estilização eficiente e responsiva
- PrimeNG – Biblioteca de componentes UI para Angular
- NGX Toastr – Notificações e alertas dinâmicos
- NG Icons – Ícones para melhor experiência visual

## Requisitos da prova

- [x] Interface baseada no protótipo de baixa fidelidade
- [x] Integração com a API fornecida via:
  - [x] Services para comunicação assíncrona
  - [x] Models para tipagem e organização dos dados
- [x] CRUD completo dos projetos
- [x] Pesquisa de projetos
- [x] Exibição de alertas informativos e de erro
- [x] Uso de biblioteca de estilos

## Desafios e Soluções

### AngularJS

Nunca havia utilizado AngularJS antes, então foi necessário um estudo acelerado da documentação e padrões da framework. Aprendi a utilizar componentes, diretivas, serviços, rotas, injeção de dependências, etc. Uma vantagem foi a familiaridade com outras frameworks front-end como React, Svelte e Blade.

### Interpretação do Protótipo

O protótipo de baixa fidelidade apresentava ambiguidade quanto à página inicial. Optei por definir uma estrutura baseada na melhor experiência do usuário.

### Pesquisa de Projetos

A API não fornecia um endpoint específico para busca contendo todos os campos listados pelo protótipo. A solução foi implementar um filtro client-side eficiente para minimizar requisições desnecessárias. Além disso, todos os filtros estão na mesma página que a tabela de projetos, facilitando a interação do usuário.

### Problemas no Modelo ER

Foi identificado um erro de digitação no modelo entidade-relacionamento fornecido, exigindo ajustes na modelagem dos dados. Percebi o erro ao estudar a API e comparar com o modelo.

### Erro de CORS

A API retornava erro de CORS ao processar requisições sem trailing slash no endpoint. A solução envolveu configurar manualmente as URLs para que sempre inclua trailing slash. Não sabia que isso poderia causar problemas, então fui atrás de entender e descobri que está relacionado ao redirecionamento no Django.

## Possíveis melhorias

- [ ] Implementar testes unitários e de integração
- [ ] Adicionar paginação na tabela de projetos
- [ ] Adicionar um theme switcher