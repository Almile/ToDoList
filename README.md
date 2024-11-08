# TodoApp - Gerenciador de Tarefas

Este projeto é uma aplicação simples de lista de tarefas (todoApp) desenvolvida utilizando HTML, CSS (Bootstrap) e JavaScript. A aplicação permite ao usuário criar, editar, excluir e visualizar tarefas, com persistência de dados utilizando o `localStorage`. Isso garante que as tarefas não sejam perdidas ao recarregar a página.

## Funcionalidades

- **Criar Tarefa**: O usuário pode adicionar novas tarefas à lista.
- **Ler Tarefas**: As tarefas são carregadas automaticamente do `localStorage` ao abrir a aplicação.
- **Editar Tarefa**: Cada tarefa tem a opção de ser editada. O usuário pode alterar o texto da tarefa.
- **Excluir Tarefa**: O usuário pode excluir uma tarefa, removendo-a tanto da lista visual quanto do `localStorage`.
- **Marcar como Concluída**: As tarefas podem ser marcadas como concluídas, sendo estilizadas de forma diferenciada (com uma linha através do texto e cor diferente).

## Tecnologias Utilizadas

- **HTML**: Estrutura básica da aplicação.
- **CSS (Bootstrap)**: Para estilização da interface, garantindo um design moderno e responsivo.
- **JavaScript**: Lógica da aplicação, incluindo as funcionalidades de adicionar, editar, excluir, e persistir as tarefas no `localStorage`.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
/ToDoList
    /index.html        # Página principal do aplicativo
    /style.css         # Arquivo de estilos personalizados
    /app.js            # Arquivo JavaScript com a lógica da aplicação
    /README.md         # Este arquivo
```

## Como Executar o Projeto

Para rodar o projeto localmente, siga as instruções abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Almile/ToDoList
   ```

2. **Abra o arquivo `index.html`**:
   Abra o arquivo `index.html` no seu navegador preferido para visualizar a aplicação em funcionamento.

## Como Funciona

1. **Adicionar uma Tarefa**: O usuário insere os detalhes da tarefa (data, tipo, descrição) e clica no botão "Criar". A tarefa é adicionada à lista e salva no `localStorage`.

2. **Exibir Tarefas**: As tarefas são carregadas do `localStorage` automaticamente quando a página é aberta ou recarregada.

3. **Editar uma Tarefa**: Ao clicar no botão "Editar" ao lado de uma tarefa, o modal de edição é exibido com os dados da tarefa. O usuário pode alterar os dados e salvar as mudanças.

4. **Excluir uma Tarefa**: O usuário pode excluir uma tarefa clicando no botão "Excluir", o que remove a tarefa tanto da lista quanto do `localStorage`.

5. **Marcar Tarefa como Concluída**: Ao clicar em uma tarefa na lista, ela é marcada como concluída, o que adiciona uma linha através do texto da tarefa e altera sua cor.

## Funcionalidade Extra

- **Limpar Filtros**: O projeto inclui um botão para limpar todos os filtros aplicados na lista de tarefas e exibir todas as tarefas novamente.
- **Filtros de Tarefa**: O usuário pode filtrar as tarefas por status (concluídas ou não) usando os filtros disponíveis.

## Requisitos

- O aplicativo deve funcionar em qualquer navegador moderno.
  (Testes feitos nos navegadores: Chrome e edge)
- O localStorage é utilizado para persistir os dados das tarefas.
