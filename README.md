# Treinamento-COM3
PROJETO
Este projeto consiste em criar uma aplicação e seu banco de dados que funcione como uma 'rede social' de uma empresa. Funcionará com posts e suas categorias, além de filtros por categorias e um sistema de 'níveis de acesso', onde apenas a staff da empresa consiga editar e apagar qualquer post além de adicionar ou remover categorias.

O app deverá ser criado utilizando laravel, inertia + react, react native e tailwind css.

Usuários do app:
- Usuário comum: cria posts e comentários, podem editar e apagar seus próprios posts e comentários
- Administradores: pode apagar qualquer post e comentário, acessa relatórios

Funções do app web:
- Login
- CRUD de Posts
	- Os posts podem ter várias Categorias, e Categorias podem pertencer a muitos posts (N para N)
	- Os posts Podem ter vários comentários, e os comentários pertencem a um post (1 para N), e a um usuário (1 para N)
	- O post possui um autor (1 para N)
	- Os posts e comentários podem ter vários anexos (N para N) - polymorphic
	- A listagem de posts deverá ter um filtro por categoria
- Envio de email para o autor quando o post receber 1 novo comentário
- Relatórios de posts criados em PDF e Planilha

instructions: "Para testar esse aplicativo fullstack, é necessário primeiramente instalar as dependencias com npm install, depois iniciar o banco de dados com o sail utilizando o comando ./vendor/bin/sail up e por fim rodá-lo com npm run dev"
  
