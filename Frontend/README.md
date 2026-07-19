# Frontend PetShop Manager

Frontend em React + Vite para o sistema de gerenciamento de animais do Pet Shop.

## Visão geral

Esta aplicação fornece a interface do usuário para:

- login de usuário
- listagem de animais cadastrados
- inclusão de novo animal
- edição de animal existente
- exclusão de animal

O frontend consome a API REST do backend .NET através de requisições para `http://localhost:5006/api`.

## Estrutura do projeto

- `src/`
  - `App.jsx` - componente principal que gerencia login e exibição da tela de animais
  - `Login.jsx` - formulário de autenticação e armazenamento do token JWT
  - `Animais.jsx` - listagem de animais, exclusão e navegação para edição
  - `FormularioAnimal.jsx` - cadastro e edição de animais
  - `main.jsx` - ponto de entrada do React
- `package.json` - dependências e scripts de execução

## Dependências

O frontend utiliza:

- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`
- `oxlint` (linter)

## Instalação

No diretório `Frontend` execute:

```bash
cd Frontend
npm install
```

## Execução em desenvolvimento

Para iniciar a aplicação localmente:

```bash
npm run dev
```

A aplicação será iniciada e pode ser acessada pelo endereço fornecido pelo Vite, geralmente `http://localhost:5173`.

## Funcionamento

1. O usuário faz login em `http://localhost:5173`.
2. O frontend solicita um token JWT ao backend em `POST /api/Auth/login`.
3. Após receber o token, o frontend armazena-o em `localStorage`.
4. As chamadas subsequentes para `Animais` usam o header `Authorization: Bearer <token>`.
5. O usuário pode cadastrar, editar, listar e excluir animais.

## Observações

- O frontend atualmente consome a API no backend em `http://localhost:5006`.
- A aplicação não implementa consulta automática ao ViaCEP para preenchimento de endereço.
- A autenticação é obrigatória para acessar as rotas de animais.

## Scripts disponíveis

- `npm run dev` - inicia o servidor de desenvolvimento
- `npm run build` - gera a build de produção
- `npm run preview` - executa a pré-visualização da build gerada
- `npm run lint` - executa o linter Oxlint

## Requisitos

- Node.js instalado
- Backend da API em execução em `http://localhost:5006`

## Ajustes futuros sugeridos

- adicionar integração com ViaCEP para preenchimento automático de endereço
- melhorar validação de formulários
- tratar estados de carregamento e mensagens de erro de forma mais completa
- introduzir controle de sessão mais robusto e logout automático
