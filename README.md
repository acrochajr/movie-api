# Movie API

Este é um projeto de API de filmes que permite gerenciar e recuperar informações sobre filmes.

## Getting Started

O documento cvs "movielist (2).cvs" que foi disponibilizado no teste ,
se encontra na raiz do projeto, quando o projeto inicializa
é realizado a importação do arquivo direto para memoria.

Para começar o projeto, siga estas etapas:

1.  Clone o repositório:

    ```bash
    git clone https://github.com/acrochajr/movie-api.git

    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Inicie o servidor, esta configurado para rodar a porta "3000":
    ```
    npm run start

        ```

    ou

        ```
        npm run dev

        ```
        Inicia  a versão dev com nodemon.

4.  Testando as rotas

Foi adicionado um arquivo json com o nome "textoIt.postman_collection.json"
na raiz do projeto para importa para o Postman, caso se sinta mais a vontade
para testar, segue as para teste:

A. Todos os filmes

```
Get:  http://localhost:3000/movies/getall

```

B. Filmes com intervalos entre prêmios.

```
Get: http://localhost:3000/movies/intervals

```
