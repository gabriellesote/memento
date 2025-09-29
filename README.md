<div align="center">
  <img src="https://github.com/gabriellesote/memento/blob/main/assets_readme/banner_memento.png" alt="Banner do projeto escrito 'memento'"/>
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
  <summary>
    <h2> 🎨 Design e Conceito Visual <h2/>
  </summary>


#### A identidade visual do "projeto Memo" foi concebida para evocar a sensação tátil e pessoal de um caderno de anotações físico.

### 📖 A Inspiração: Um Caderno de Anotações

A ideia central do design foi simples: já que o projeto é um site de anotações, a interface deveria parecer um caderno. Buscamos uma estética que trouxesse a sensação familiar de um bloco de notas físico para o ambiente digital, tornando a tarefa de criar e gerenciar lembretes mais agradável.

### 🖍️ O Protótipo no Figma

Para materializar essa visão, foi desenvolvido um protótipo no Figma que serviu como nosso guia conceitual. Ele explorou uma estética mais lúdica e artesanal, com fontes que imitam a escrita à mão e componentes de interface com um aspecto de "desenhado".

<details>
<summary> <h3> 🖼️ Imagens </h3> </summary>

<div align=center>
  <img src="https://github.com/gabriellesote/memento/blob/main/assets_readme/tela%20inicial.png" alt="tela inicial" width=40%/>
  <img src="https://github.com/gabriellesote/memento/blob/main/assets_readme/abrir%20notas.png" alt="abrir notas" width=40%/>
  <img src="https://github.com/gabriellesote/memento/blob/main/assets_readme/editando.png" alt="editar notas" width=40%/>
</div>

  
</details>
 

### 📌 A Implementação Final

Durante o desenvolvimento, o design foi adaptado para priorizar a usabilidade, a performance e a agilidade na implementação. Embora a versão final do site tenha uma abordagem visual mais minimalista e não seja uma réplica exata do protótipo, ela busca manter o **espírito** do conceito original: um ambiente digital simples, intuitivo e funcional para suas anotações, preservando a essência de um espaço pessoal para ideias.



</details>


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
memento/
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  │  ├─ database.config.ts
│  │  ├─ notes/
│  │  │  ├─ dto/
│  │  │  │  ├─ create-note.dto.ts
│  │  │  │  ├─ update-note.dto.ts
│  │  │  ├─ entities/
│  │  │  │  ├─ note.entity.ts
│  │  │  ├─ notes.controller.ts
│  │  │  ├─ notes.module.ts
│  │  │  ├─ notes.service.ts
│  ├─ .env.example

```
### Frontend (`/frontend`)


```
memento/
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  │  ├─ Card.vue
│  │  │  ├─ NoteFormModal.vue
│  │  │  ├─ NotesGrid.vue
│  │  ├─ router/
│  │  │  ├─ index.ts
│  │  ├─ services/
│  │  │  ├─ api.ts
│  │  │  ├─ noteService.ts
│  │  ├─ stores/
│  │  │  ├─ noteStore.ts
│  │  ├─ types/
│  │  │  ├─ Notes.ts
│  │  ├─ views/
│  │  │  ├─ HomeView.vue
│  │  ├─ App.vue
│  │  ├─ main.ts
│  ├─ .env.example
│  ├─ index.html

```
  
</details>



 <details>
   <summary> <h2> 📍 Endpoints</h2></summary>

  ### URL Base:  `http://localhost:3000 `

  ### Resumo Rápido

| Método HTTP | Endpoint       | Descrição                              |
| :---------- | :------------- | :--------------------------------------- |
| `POST`      | `/notes`       | Cria uma nova anotação.                  |
| `GET`       | `/notes`       | Lista todas as anotações.                |
| `GET`       | `/notes/:id`   | Busca uma anotação específica por ID.    |
| `PATCH`       | `/notes/:id`   | Atualiza uma anotação existente por ID.  |
| `DELETE`    | `/notes/:id`   | Deleta uma anotação por ID.              |

----


 
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

 **Navegue até a pasta do frontend:**

  ```bash
    cd frontend
  ```

  **Instale as dependências:**

  ```bash
    npm install
  ```

  ### ⚠️ Crie o arquivo de variáveis de ambiente (Passo Importante):

  Crie um arquivo chamado `.env.local` na raiz da pasta `frontend/` e adicione a seguinte variável:

  ```
    VITE_API_URL=http://localhost:3000
  ```

  **Inicie o servidor de desenvolvimento:**

  ```bash
    npm run dev
  ```

    ✅ A aplicação estará disponível no seu navegador em `http://localhost:5173` (ou na porta indicada pelo Vite).

---

##   🚀 Aplicação em Funcionamento

Com os dois terminais rodando (um para o backend e um para o frontend), acesse `http://localhost:5173` no seu navegador para usar o **Memento**!
  
</details>





