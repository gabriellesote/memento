<div align="center">
  <img src="banner_memento.png" alt="Banner do projeto escrito 'memento'"/>
</div>

## 🎯 Sobre o Projeto

<p>
  <strong>Memento</strong> é um projeto desenvolvido como parte do desafio técnico para o processo seletivo da empresa Corporate Web.
</p>
<p>
  O desafio consiste em desenvolver uma aplicação web com um CRUD completo (Criar, Ler, Editar e Deletar) para gerenciar anotações. O projeto engloba tanto o desenvolvimento do <strong>backend</strong>, responsável pela lógica de negócio e persistência de dados, quanto do <strong>frontend</strong>, que oferece uma interface de usuário moderna e reativa.
</p>

As especificações técnicas obrigatórias para o desenvolvimento foram:
-   **Frontend:** React ou Vue.
-   **Backend:** NestJS.
-   **Banco de Dados:** Um banco de dados local.

---

<details>
<summary> <h2>⚙️ Tecnologias e Ferramentas </h2>

</summary>


<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vue,pinia,vite,ts,nestjs,sqlite,nodejs,npm,git,github,postman&perline=6" />
  </a>
</div>

#### 📦 Backend

-   **Framework:** [NestJS](https://nestjs.com/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **ORM:** [TypeORM](https://typeorm.io/)

#### 🗃️ Banco de Dados

-   **SGBD:** [SQLite](https://www.sqlite.org/index.html) (Banco de dados local baseado em arquivo)

#### 🎨 Frontend

-   **Framework:** [Vue.js 3](https://vuejs.org/) (utilizando a Composition API)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Gerenciador de Estado:** [Pinia](https://pinia.vuejs.org/)
-   **Cliente HTTP:** [Axios](https://axios-http.com/)

#### 🛠️ Ferramentas e Metodologia

-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Gerenciador de Pacotes:** [npm](https://www.npmjs.com/)
-   **Versionamento:** [Git](https://git-scm.com/) & [GitHub](https://github.com)
-   **Metodologia:** [Git Flow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow)
-   **Testes de API:** [Postman](https://www.postman.com/)

</details>


<details>
  <summary>
    <h2> 📁 Estrutura do Projeto </h2>
  </summary>

 
### Backend (`/backend`)

```
```
### Frontend (`/frontend`)


```
```
  
</details>



 <details>
   <summary> <h2> 📍 Endpoints</h2></summary>

  ### URL Base:  `http://localhost:3000 `
 
 </details>





<details>
  <summary>
    <h2> 🚀 Rodando a Aplicação </h2>
  </summary>


Para rodar a aplicação completa (Backend e Frontend) localmente, siga os passos abaixo.

### ⚙️ Pré-requisitos

É necessário ter as seguintes ferramentas instaladas na sua máquina:

-   💻 **Node.js** (versão 18.x ou superior)
-   📦 **npm** (geralmente instalado junto com o Node.js)
-   🐙 **Git**

### 📌 Instalação

 **Clone o repositório:**

  ```bash
  git clone https://github.com/gabriellesote/memento.git
  cd memento
  ```
   

---

### 🔥 Rodando o Backend (API)

<p>
Abra um terminal na pasta do projeto.

Navegue até a pasta do backend:

</p>

```bash
cd backend
```

 
### ⚠️ Crie o arquivo de variáveis de ambiente (Passo Importante):
 
<p>

Crie uma cópia do arquivo .env.example e renomeie-a para .env.

Este passo é essencial! O arquivo .env é usado para configurar o nome do seu banco de dados e outras informações sensíveis. Sem ele, o backend não irá rodar apropriadamente.

Você pode usar o seguinte comando no seu terminal para fazer a cópia :
</p>

## No Linux ou macOS
```bash
cp .env.example .env
```


## No Windows

```bash
copy .env.example .env
```

<p>
Após criar o arquivo, você pode abri-lo e alterar o nome do banco de dados, se desejar.


</p>

### Instale as dependências:
```bash
npm install
```

### Inicie o servidor de desenvolvimento:

```bash
npm run start:dev
```

✅ O servidor da API estará rodando em http://localhost:3000. Deixe este terminal aberto.

---

### 🎨 Rodando o Frontend (Interface)

Abra um **novo terminal** na pasta do projeto.

1.  **Navegue até a pasta do frontend:**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env.local` na raiz da pasta `frontend/` e adicione a seguinte variável:
    ```
    VITE_API_URL=http://localhost:3000
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    ✅ A aplicação estará disponível no seu navegador em `http://localhost:5173` (ou na porta indicada pelo Vite).

---

## ▶️ Aplicação em Funcionamento

Com os dois terminais rodando (um para o backend e um para o frontend), acesse `http://localhost:5173` no seu navegador para usar o **Memento**!
  
</details>





