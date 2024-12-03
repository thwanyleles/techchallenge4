# Bloguinho - Mobile Blogging Application

## Índice

- [Introdução](#introdução)
- [Prototipo](#prototipo)
- [Repositório do Back-End](#repositório-do-back-end)
- [Requisitos do Projeto](#requisitos-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
- [Guia de Uso](#guia-de-uso)
- [Experiências e Desafios](#experiências-e-desafios)
- [Equipe](#equipe)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Introdução

Bloguinho é um projeto desenvolvido como parte do Tech Challenge da Fase 4 do curso Full Stack Development. O objetivo é criar uma aplicação mobile para blogging utilizando React Native. A aplicação permite que docentes e alunos interajam com diversos endpoints REST implementados no back-end.

## Prototipo

O design da aplicação pode ser encontrado no Figma: [Prototipo no Figma](https://www.figma.com/design/OSgtCQF4nhUUJwsLzZWl0e/Desafio-%234?node-id=0-1&t=BZLZlMvBKl4FTXhO-1)

## Repositório do Back-End

O back-end necessário para rodar este projeto pode ser encontrado aqui: [Repositório do Back-End](https://github.com/FullStack24/techchallenge2)

## Requisitos do Projeto

### Funcionalidades

- Tela de Login e Registro para autenticação de professores e alunos.
- Listagem, criação, edição e exclusão de posts.
- Listagem, criação, edição e exclusão de professores e alunos.
- Comentários nos posts com opção de resposta.
- Curtidas nos posts.
- Autorização baseada em papéis (professores podem criar/editar posts, alunos apenas visualizam).

### Requisitos Técnicos

- Desenvolvido em React Native.
- Utilização de hooks e componentes funcionais.
- Integração com back-end através de chamadas REST.
- Gerenciamento de estado com Context API.
- Estilização personalizada baseada no protótipo Figma.

## Instalação e Configuração

1. **Clone o Repositório**

   Primeiro, clone o repositório do projeto para o seu ambiente local:

   ```bash
   git clone https://github.com/thwanyleles/techchallenge4.git
   cd techchallenge4
   ```

2. **Instale as Dependências**

   Certifique-se de que você tem o Node.js, npm e o Expo CLI instalados. Caso ainda não tenha o Expo CLI, você pode instalá-lo globalmente via npm:

   ```bash
   npm install -g expo-cli
   ```

   Em seguida, instale as dependências do projeto:

   ```bash
   npm install
   ```

3. **Configuração do Back-End**

   - Clone o repositório do back-end:

     ```bash
     git clone https://github.com/FullStack24/techchallenge2.git
     cd techchallenge2
     ```

   - Siga as instruções fornecidas no repositório do back-end para configurar e iniciar o servidor. Certifique-se de que o servidor está rodando e acessível a partir do seu dispositivo.

4. **Inicie o Aplicativo com Expo**

   Utilize o comando abaixo para iniciar o aplicativo com o Expo:

   ```bash
   expo start
   ```

   Isso abrirá uma janela no seu navegador com o Expo Dev Tools. A partir daí, você pode escanear o QR code com o aplicativo Expo Go no seu dispositivo móvel ou escolher executar em um emulador.

## Arquitetura da Aplicação

### Visão Geral

A aplicação é um sistema de blogging mobile desenvolvido em React Native, utilizando Expo para facilitar o desenvolvimento e a execução em dispositivos móveis. A comunicação com o back-end é feita através de API RESTful, permitindo a interação com dados de posts, usuários e comentários.

### Estrutura de Diretórios

- **app/**: Contém a lógica principal da aplicação, dividida em sub-diretórios por funcionalidades.
   - **auth/**: Gerenciamento de autenticação e telas de login/registro.
   - **home/**: Tela inicial com a listagem de posts.
   - **posts/**: Funcionalidades de criação, edição e visualização de posts.
   - **students/teachers/**: Gerenciamento de usuários (alunos e professores).
   - **services/**: Funções de serviço para chamadas de API.
   - **components/**: Componentes reutilizáveis e funcionais.
- **assets/**: Arquivos estáticos como imagens e ícones.
- **constants/**: Constantes e configurações globais.
- **hooks/**: Custom hooks para lógica de estado e efeitos.
- **interfaces/**: Definições de tipos e interfaces TypeScript.

### Fluxo de Dados

A aplicação utiliza o Context API para gerenciamento de estado global, especialmente para lidar com a autenticação de usuários. As chamadas à API são centralizadas em arquivos de serviço, que encapsulam a lógica de requisição e resposta, garantindo um código mais limpo e organizado.

### Gerenciamento de Estado

- **AuthContext**: Gerencia o estado de autenticação do usuário, incluindo login, logout e persistência de sessão.
- **PostContext (opcional)**: Pode ser usado para gerenciar o estado dos posts, facilitando a atualização em tempo real quando um post é criado ou editado.

### Estilização

A estilização segue o design especificado no Figma, utilizando o StyleSheet do React Native para definir estilos de componentes de maneira eficiente e modular.

### Integração com Back-End

- **Autenticação**: Utiliza tokens JWT para autenticação segura. Os tokens são armazenados no AsyncStorage para persistência de sessão.
- **Endpoints**: Chamadas para criação, leitura, atualização e exclusão de dados de posts e usuários são realizadas através de serviços definidos em `services/`.

## Guia de Uso

1. **Login e Registro**

   - Professores e alunos podem se registrar e fazer login.
   - Professores têm acesso a funcionalidades adicionais de criação/edição.

2. **Gerenciamento de Posts**

   - Professores podem criar, editar e excluir posts.
   - Alunos podem visualizar, comentar e curtir posts.

3. **Gerenciamento de Usuários**

   - Professores podem adicionar, editar e excluir alunos e outros professores.

4. **Interação com Comentários**

   - Usuários podem adicionar comentários nos posts. Professores podem excluir comentários.

5. **Curtidas nos Posts**

   - Usuários podem curtir posts, incrementando o contador de curtidas.

## Experiências e Desafios

Durante o desenvolvimento, a equipe enfrentou desafios na integração com o back-end e na implementação das funcionalidades de gerenciamento de usuários. A escolha de ferramentas como Context API para gerenciamento de estado facilitou o desenvolvimento, apesar de também apresentar uma curva de aprendizado.

## Equipe

- Ariel Andrielli Rodrigues da Silva
- José Luccas Gabriel Francisco de Andrade Santos
- Vitor Wilton Laurentino
- Thwany Leles

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, enviar pull requests ou sugerir melhorias.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).