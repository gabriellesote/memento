
<img src="banner_memento.png" alt="Banner do projeto escrito 'memento'"/>

## Sobre o Projeto

<p>

Memento é um projeto desenvolvido como parte do desafio técnico para o processo seletivo da empresa Corporate Web.

O desafio consiste em desenvolver uma aplicação web com um CRUD completo (Criar, Ler, Editar e Deletar) para gerenciar anotações. O projeto engloba tanto o desenvolvimento do backend quanto do frontend.

As especificações técnicas obrigatórias para o desenvolvimento foram:

- Frontend: React ou Vue.
- Backend: NestJS.
- Banco de Dados: Um banco de dados local.
  
</p>




## ⚙️ Tecnologias e Ferramentas Utilizadas

<div align=center>

 [![My Skills](https://skillicons.dev/icons?i=git,github,npm,postman,ts,vue,nestjs,nodejs,sqlite	)](https://skillicons.dev)

  
</div>



  - **Backend:**
      - **Framework:** [NestJS](https://nestjs.com/)
      - **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
  - **Banco de Dados:**
      - **SGBD:** [SQLite](https://www.sqlite.org/index.html) (Banco de dados local baseado em arquivo)
      - **ORM:** [TypeORM](https://typeorm.io/)
  - **Ambiente e Configuração:**
      - **Runtime:** [Node.js](https://nodejs.org/)
      - **Gerenciador de Pacotes:** [npm](https://www.npmjs.com/)
  - **Ferramentas e Metodologias:**
      - **Versionamento de Código:** [Git](https://git-scm.com/)
      - **Metodologia de Branches:** [Git Flow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow)
      - **Testes de API:** [Postman](https://www.postman.com/)

## Começando

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

É necessário ter as seguintes ferramentas instaladas na sua máquina:

  - **Node.js (versão 16 ou superior)**
  - **npm (geralmente instalado junto com o Node.js)**
  - **Git**

**Como Instalar os Requisitos:**

  - **Node.js e npm:** Baixe e instale a partir do [site oficial do Node.js](https://nodejs.org/).
  - **Git:** Baixe e instale a partir do [site oficial do Git](https://git-scm.com/downloads).
  - *(Opcional)* Um cliente de API como o [Postman](https://www.postman.com/downloads/) é recomendado para testar os endpoints.

### Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/memento.git
    ```

2.  **Navegue até a pasta do backend:**

    ```bash
    cd memento/backend
    ```

3.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    O projeto utiliza um arquivo `.env` para gerenciar as configurações. Para criar o seu, basta copiar o arquivo de exemplo:

    ```bash
    cp .env.example .env
    ```

    Para o ambiente de desenvolvimento padrão, você não precisa alterar nenhuma variável no arquivo `.env` recém-criado.

### Rodando a Aplicação

Com tudo instalado e configurado, inicie o servidor de desenvolvimento:

```bash
npm run start:dev
```

Este comando iniciará a aplicação em modo de "watch", reiniciando o servidor automaticamente a cada alteração nos arquivos.

A API estará disponível em **`http://localhost:3000`**.

