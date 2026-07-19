# PetShop Manager API

Sistema completo de gerenciamento de animais para um Pet Shop, com backend em ASP.NET Core e frontend em React + Vite.

## Participantes

- Heliel William Da Silva
- Maria Clara Nunes Linhares
- Raynara Gustavo da Costa
- Riane Ramaiane Delgado de Brito

## Visão geral

O projeto consiste em:
- um backend RESTful em .NET 10 com autenticação JWT e suporte a SQL Server via Entity Framework Core;
- um frontend em React + Vite que consome a API e permite login, listagem, cadastro, edição e exclusão de animais.

Funcionalidades principais:
- CRUD completo para animais
- Autenticação de usuário via JWT
- Interface de login, listagem de animais, cadastro e edição
- Uso de SQL Server via Entity Framework Core
- Swagger para documentação e testes dos endpoints

## Estrutura do repositório

- `Backend/`
  - `PetShopManagerAPI.csproj` - projeto ASP.NET Core
  - `Program.cs` - configurações de serviços, autenticação, CORS e Swagger
  - `Data/AppDbContext.cs` - contexto EF Core
  - `Models/Animal.cs`, `Models/Usuario.cs`, `Models/LoginDTO.cs` - entidades do domínio
  - `Controllers/AnimaisController.cs` - endpoints CRUD para animais (autenticados)
  - `Controllers/AuthController.cs` - endpoint de login e emissão de token JWT
  - `appsettings.json` / `appsettings.Development.json` - configurações de banco e JWT
  - `Properties/launchSettings.json` - URLs de execução local
- `Frontend/`
  - `package.json` - dependências e scripts do frontend
  - `src/` - código React para login e gerenciamento de animais
- `banco_petshop.sql` - script SQL para criação do banco de dados e tabelas

## Tecnologias

- .NET 10
- ASP.NET Core Web API
- Entity Framework Core com SQL Server
- JWT Bearer Authentication
- Swashbuckle / Swagger
- React
- Vite
- JavaScript

## Banco de dados

O script `banco_petshop.sql` cria o banco `PetShopDB` com as tabelas necessárias.

Tabelas principais:
- `Usuarios` (`Id`, `Nome`, `Email`, `Senha`)
- `Animais` (`Id`, `Nome`, `Idade`, `Peso`, `DataNascimento`, `Foto`, `Especie`, `NomeTutor`, `Cep`, `Logradouro`, `Numero`, `Bairro`, `Cidade`, `UF`)

Observação: a coluna `Foto` é opcional.

## Dependências do backend

As dependências já estão declaradas em `Backend/PetShopManagerAPI.csproj`:
- `Microsoft.EntityFrameworkCore.SqlServer`
- `Microsoft.EntityFrameworkCore.Tools`
- `Microsoft.AspNetCore.Authentication.JwtBearer`
- `Swashbuckle.AspNetCore`

Caso seja necessário instalar novamente:

```bash
cd Backend
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Swashbuckle.AspNetCore
```

## Configuração e execução do backend

1. Garanta que o SQL Server esteja instalado e acessível localmente.
2. Execute o script `banco_petshop.sql` em seu gerenciador de banco de dados.
3. No diretório `Backend`, restaure e execute o projeto:

```bash
cd Backend
dotnet restore
dotnet build
dotnet run
```

A API estará disponível em:
- `http://localhost:5006`
- `https://localhost:7144`

## Swagger

Durante o desenvolvimento, o Swagger está habilitado para inspeção e teste dos endpoints:

- `http://localhost:5006/swagger`
- `https://localhost:7144/swagger`

## Autenticação e endpoints

O backend protege o controller de animais com JWT. O login retorna um token que deve ser enviado no cabeçalho `Authorization`.

### Login

Endpoint:
- `POST /api/Auth/login`

Payload de autenticação:

```json
{
  "email": "admin@petshop.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "token": "<jwt_token>"
}
```

### Endpoints de animais

Requerem o cabeçalho:

```
Authorization: Bearer <jwt_token>
```

- `GET /api/Animais`
- `GET /api/Animais/{id}`
- `POST /api/Animais`
- `PUT /api/Animais/{id}`
- `DELETE /api/Animais/{id}`

## Configuração e execução do frontend

No diretório `Frontend`, instale as dependências e execute a aplicação:

```bash
cd Frontend
npm install
npm run dev
```

A aplicação será iniciada no endereço informado pelo Vite, normalmente:

```
http://localhost:5173
```

O frontend consome a API disponível em:

```
http://localhost:5006/api
```

Fluxo de funcionamento:

1. O usuário realiza login.
2. O frontend envia as credenciais para `POST /api/Auth/login`.
3. O backend retorna um token JWT.
4. O token é armazenado em `localStorage`.
5. As requisições para os endpoints de animais enviam o cabeçalho:

```
Authorization: Bearer <jwt_token>
```

Scripts disponíveis:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

Requisitos:

- Node.js instalado.
- Backend em execução.

## Observações do projeto

- O frontend atual está implementado em React + Vite, não em Angular.
- O requisito de CRUD para animais e autenticação de acesso está atendido.
- A integração com ViaCEP não está presente no frontend atual.
- A senha do usuário é armazenada em texto simples no banco; recomendo usar hashing para ambientes reais.

## Notas adicionais

Se preferir trabalhar com migrations do Entity Framework Core:

```bash
dotnet tool install --global dotnet-ef
```

Depois, use:

```bash
dotnet ef migrations add NomeDaMigration
dotnet ef database update
```

O arquivo `banco_petshop.sql` serve como script inicial para a criação do esquema de banco.