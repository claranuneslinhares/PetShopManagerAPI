CREATE DATABASE PetShopDB;
GO
USE PetShopDB;
GO

-- ===========================
-- Tabela de Usuários
-- ===========================

CREATE TABLE Usuarios
(
    Id INT IDENTITY(1,1) PRIMARY KEY,

    Nome NVARCHAR(100) NOT NULL,

    Email NVARCHAR(100) NOT NULL UNIQUE,

    Senha NVARCHAR(100) NOT NULL
);

-- ===========================
-- Tabela de Animais
-- ===========================

CREATE TABLE Animais
(
    Id INT IDENTITY(1,1) PRIMARY KEY,

    Nome NVARCHAR(100) NOT NULL,

    Idade INT NOT NULL,

    Peso FLOAT NOT NULL,

    DataNascimento DATE NOT NULL,

    Foto NVARCHAR(MAX),

    Especie NVARCHAR(50) NOT NULL,

    NomeTutor NVARCHAR(100) NOT NULL,

    Cep NVARCHAR(10) NOT NULL,

    Logradouro NVARCHAR(100) NOT NULL,

    Numero NVARCHAR(20) NOT NULL,

    Bairro NVARCHAR(100) NOT NULL,

    Cidade NVARCHAR(100) NOT NULL,

    UF CHAR(2) NOT NULL
);

INSERT INTO Usuarios
(
    Nome,
    Email,
    Senha
)

VALUES
(
    'Administrador',
    'admin@petshop.com',
    '123456'
);