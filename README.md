# Chat Room API

Chat Room é uma aplicação interativa criada para facilitar a conexão entre pessoas através de salas de bate-papo em tempo real. Nela, qualquer usuário pode se cadastrar, fazer login e criar sua própria sala, convidando outros participantes para conversas dinâmicas e instantâneas. Com uma interface amigável e funcionalidade intuitiva, o Chat Room é ideal para quem busca interagir e compartilhar ideias em tempo real, proporcionando uma experiência única de troca e colaboração.

O desenvolvimento do Chat Room foi feito com o framework Nest.js, usando Firebase Authenticator para o gerenciamento seguro de usuários e Firebase Storage para armazenamento de imagem. Para viabilizar o bate-papo em tempo real, foi implementado o WebSocket com a biblioteca Socket.io em conjunto com MongoDB, proporcionando interatividade instantânea entre os participantes.

## Projeto sendo utilizado

https://chat-room-orcin.vercel.app/home

## Tecnologias

- NestJS
- Node.js
- WebSocket
- REST API
- Firebase
- Docker

## Funcionalidades

- Cadastro e Login
- Envio de Email
- Chat em tempo real
- Criação de salas

## Pré-requisitos de configuração

Para utilizar esta API, é importante que você tenha uma noção básica do Firebase. Se você nunca utilizou o Firebase, confira [este guia de introdução ao Firebase](https://firebase.google.com/docs) para aprender a configurar um projeto e ativar os serviços necessários.

### Configurações do Firebase

1. **Criar um projeto no Firebase:**  
   - Acesse o [Firebase Console](https://console.firebase.google.com/) e crie um novo projeto.

2. **Ativar Firebase Authentication e Storage:**  
   - No painel do Firebase, ative o **Firebase Authentication** para o gerenciamento de autenticação de usuários e **Firebase Storage** para armazenamento de imagens.
   - Certifique-se de que esses serviços estejam configurados como públicos para permitir o acesso direto.

### Variáveis de Ambiente

Adicione as seguintes variáveis de ambiente no seu arquivo `.env` para conectar o projeto com o Firebase e MongoDB:

- **MongoDB URI**  
  - `MONGO_URI`: URI de conexão com o MongoDB.

- **Parâmetros do Firebase**  
  - `API_KEY`
  - `AUTH_DOMAIN`
  - `ADMIN_PROJECT_ID`
  - `STORAGE_BUCKET`
  - `MESSAGING_SENDER_ID`
  - `APP_ID`

- **Parâmetros do Firebase Admin**  
  - `TYPE`
  - `PROJECT_ID`
  - `PRIVATE_KEY_ID`
  - `PRIVATE_KEY`
  - `CLIENT_EMAIL`
  - `CLIENT_ID`
  - `AUTH_URI`
  - `TOKEN_URI`
  - `AUTH_PROVIDER_X509_CERT_URL`
  - `CLIENT_X509_CERT_URL`
  - `UNIVERSE_DOMAIN`

- **Configuração da Porta**  
  - `PORT`: Porta para a aplicação (exemplo: 3001).

Essas variáveis são necessárias para autenticação e armazenamento de dados entre o Firebase e o MongoDB.

## Autor

- Portifolio - [jhonatas-anicezio](https://jhonatas-anicezio.vercel.app/)
- GitHub - [github/JhonatasAnicezio](https://github.com/JhonatasAnicezio)
- Linkedin - [@jhonatasanicezio](https://www.linkedin.com/in/jhonatas-anicezio/)

## License

Chat Room API is [MIT licensed](LICENSE).
