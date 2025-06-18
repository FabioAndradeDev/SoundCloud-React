# Backend para o Projeto "Under Sound" (Clone do SoundCloud)

Este documento serve como um guia para a construção da API RESTful necessária para suportar o frontend da aplicação "Under Sound", desenvolvida em React. O backend será construído com Java e o ecossistema Spring, seguindo uma arquitetura moderna, escalável e orientada a eventos.

## Stack Tecnológica Proposta

- **Linguagem:** Java 17+
- **Framework:** Spring Boot 3+
- **Acesso a Dados:** Spring Data MongoDB
- **Banco de Dados:** MongoDB
- **Segurança:** Spring Security (com autenticação baseada em JWT)
- **Mensageria:** RabbitMQ
- **Armazenamento de Arquivos:** AWS S3 (ou MinIO para desenvolvimento local)
- **Containerização:** Docker, Docker Compose
- **Testes:** JUnit 5, Mockito, Testcontainers

---

## Dependências para o Spring Initializr

Ao criar seu projeto no [Spring Initializr](https://start.spring.io/), procure e adicione as seguintes dependências:

- **Spring Web**: Essencial para criar APIs REST.
- **Spring Data MongoDB**: Para conectar e interagir com o banco de dados MongoDB.
- **Spring Security**: Para implementar a autenticação, autorização e segurança geral da aplicação.
- **Spring for RabbitMQ**: Para habilitar a comunicação assíncrona com o RabbitMQ.
- **Lombok**: (Opcional, mas altamente recomendado) Ajuda a reduzir código repetitivo, como getters, setters e construtores.

**Observação sobre JWT:**
As bibliotecas para manipulação de JSON Web Tokens (JWT) geralmente precisam ser adicionadas manualmente ao seu projeto após a criação. O Spring Security oferece suporte robusto para JWT, mas se você optar por gerenciar os tokens manualmente, precisará adicionar dependências como `io.jsonwebtoken:jjwt-api` ao seu arquivo de build (`pom.xml` ou `build.gradle`).

---

## Modelos de Dados (Entidades JPA)

A seguir estão as entidades principais que refletem as necessidades do frontend, adaptadas para um modelo de documento com MongoDB.

**User:**
```java
@Document(collection = "users")
class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password; // Hash
    private String avatarUrl;
    private Instant createdAt;
    // ... roles, etc.
}
```

**Artist:**
```java
@Document(collection = "artists")
class Artist {
    @Id
    private String id;
    private String name;
    private String avatarUrl; // Banner do artista
    private List<String> songIds; // IDs das músicas
    // ... followers count, etc.
}
```

**Song:**
```java
@Document(collection = "songs")
class Song {
    @Id
    private String id;
    private String title;
    private int duration; // em segundos
    private String audioUrl;
    private String coverUrl;
    private long plays;
    private String artistId;
    private Instant createdAt;
    // ... likes count, etc.
}
```

**Playlist:**
```java
@Document(collection = "playlists")
class Playlist {
    @Id
    private String id;
    private String name;
    private String coverUrl;
    private String ownerId;
    private Set<String> songIds;
    private Instant createdAt;
    // ... likes count, etc.
}
```

---

## Definição da API REST

A API deve ser versionada, por exemplo: `/api/v1/...`

### 1. Autenticação (`/auth`)
- **`POST /api/v1/auth/register`**
  - **Descrição:** Registra um novo usuário.
  - **Corpo:** `{ "username": "...", "email": "...", "password": "..." }`
  - **Resposta:** `201 Created` com o objeto do usuário (sem a senha).

- **`POST /api/v1/auth/login`**
  - **Descrição:** Autentica um usuário e retorna um token JWT.
  - **Corpo:** `{ "email": "...", "password": "..." }`
  - **Resposta:** `{ "token": "jwt.token.string" }`

### 2. Usuários (`/users`) - Requer Autenticação
- **`GET /api/v1/users/me`**
  - **Descrição:** Retorna os dados do usuário autenticado (usado pelo `AuthContext` e página de perfil).
  - **Resposta:** Objeto `User`.

- **`PUT /api/v1/users/me`**
  - **Descrição:** Atualiza o nome de usuário do perfil.
  - **Corpo:** `{ "username": "novo_nome" }`
  - **Resposta:** Objeto `User` atualizado.

- **`POST /api/v1/users/me/avatar`**
  - **Descrição:** Faz o upload de um novo avatar para o usuário.
  - **Corpo:** `multipart/form-data` com o arquivo de imagem.
  - **Resposta:** Objeto `User` com a nova `avatarUrl`.

### 3. Músicas (`/songs`)
- **`POST /api/v1/songs`** (Requer Autenticação)
  - **Descrição:** Faz o upload de uma nova música. O request conterá os metadados, o arquivo de áudio e a imagem da capa.
  - **Corpo:** `multipart/form-data` com os campos `title`, `audioFile`, `coverFile`. O `artistId` virá do usuário autenticado.
  - **Resposta:** `202 Accepted`. O processamento será assíncrono.

- **`GET /api/v1/songs`**
  - **Descrição:** Retorna uma lista de músicas, usada na Home e na Busca.
  - **Query Params:** `?search=...`, `?artistId=...`
  - **Resposta:** `[Song, Song, ...]`

- **`POST /api/v1/songs/{id}/like`** (Requer Autenticação)
  - **Descrição:** Curte uma música.
  - **Resposta:** `200 OK`.

### 4. Artistas (`/artists`)
- **`GET /api/v1/artists/{id}`**
  - **Descrição:** Retorna os detalhes de um artista.
  - **Resposta:** Objeto `Artist`.

- **`GET /api/v1/artists/{id}/songs`**
  - **Descrição:** Retorna as músicas de um artista específico.
  - **Resposta:** `[Song, Song, ...]`

### 5. Playlists (`/playlists`) - Requer Autenticação
- **`POST /api/v1/playlists`**
  - **Descrição:** Cria uma nova playlist.
  - **Corpo:** `{ "name": "Minha Playlist de Rock" }`
  - **Resposta:** `201 Created` com o objeto `Playlist`.

- **`GET /api/v1/playlists/my-playlists`**
  - **Descrição:** Retorna as playlists criadas pelo usuário autenticado.
  - **Resposta:** `[Playlist, Playlist, ...]`

- **`GET /api/v1/playlists/{id}`**
  - **Descrição:** Retorna os detalhes de uma playlist, incluindo suas músicas.
  - **Resposta:** Objeto `Playlist` com a lista de `Song`s.

- **`POST /api/v1/playlists/{id}/songs`**
  - **Descrição:** Adiciona uma música a uma playlist.
  - **Corpo:** `{ "songId": "uuid-da-musica" }`
  - **Resposta:** `200 OK`.

### 6. Busca (`/search`)
- **`GET /api/v1/search`**
  - **Descrição:** Endpoint unificado para a funcionalidade de busca.
  - **Query Params:** `?q=texto_buscado`
  - **Resposta:** `{ "songs": [...], "artists": [...], "playlists": [...] }`

---

## Plano de Desenvolvimento em Fases

### Fase 1: Fundação da API e Autenticação
- **Foco:** Criar a estrutura do projeto, entidades e os endpoints de autenticação e visualização.
- **Tecnologias:** Spring Boot, Spring Data MongoDB, Spring Security, MongoDB.
- **Entidades:** `User`, `Artist`, `Song`, `Playlist`.
- **Endpoints a Implementar:**
    - `POST /auth/register`, `POST /auth/login`
    - `GET /users/me`
    - `GET /artists/{id}`, `GET /artists/{id}/songs`
    - `GET /playlists/{id}`
- **Meta:** Ter uma API que serve dados (podem ser "mockados" no início via `CommandLineRunner`) e gerencia sessões de usuário com JWT.

### Fase 2: Criação de Conteúdo e Armazenamento
- **Foco:** Permitir que os usuários criem playlists e façam upload de músicas.
- **Tecnologias:** AWS S3 (ou MinIO).
- **Endpoints a Implementar:**
    - `POST /playlists`, `GET /playlists/my-playlists`, `POST /playlists/{id}/songs`
    - `PUT /users/me`, `POST /users/me/avatar`
    - `POST /songs` (Upload direto, síncrono por enquanto)
- **Meta:** O frontend se torna totalmente interativo, permitindo a criação e gerenciamento de conteúdo.

### Fase 3: Processamento Assíncrono e Ações
- **Foco:** Introduzir uma arquitetura orientada a eventos para o processamento de uploads, tornando a aplicação mais robusta.
- **Tecnologias:** RabbitMQ.
- **Funcionalidades:**
    1.  **Refatorar `POST /songs`**:
        - O controller recebe o upload.
        - Salva os arquivos no S3/MinIO.
        - Salva os metadados da música no banco com status `PROCESSING`.
        - Publica uma mensagem (ex: `song.uploaded`) com o ID da música em uma fila do RabbitMQ.
        - Retorna `202 Accepted` imediatamente.
    2.  **Criar um Worker (`@RabbitListener`)**:
        - Um serviço separado ouve a fila.
        - Ao receber uma mensagem, ele "processa" a música (simula conversão, etc.).
        - Ao final, atualiza o status da música no banco para `AVAILABLE`.
    3.  **Implementar Interações**: `POST /songs/{id}/like`, etc.
- **Meta:** Desacoplar o processo de upload, melhorando a performance e a experiência do usuário.

### Fase 4: Testes, Refinamento e Containerização
- **Foco:** Garantir a qualidade, robustez e portabilidade da aplicação.
- **Tecnologias:** Docker, Docker Compose, JUnit, Mockito, Testcontainers.
- **Funcionalidades:**
    1.  Implementar o endpoint `GET /search`.
    2.  Escrever testes unitários para a lógica de negócio e testes de integração para os controllers da API.
    3.  Criar `Dockerfile` para a aplicação Spring.
    4.  Criar um `docker-compose.yml` para orquestrar a API, o banco de dados (MongoDB) e o RabbitMQ com um único comando.
- **Meta:** Ter uma aplicação completa, testada e pronta para ser executada em qualquer ambiente de forma consistente.
