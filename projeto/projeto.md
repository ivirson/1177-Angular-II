---
marp: true
---

# Angular II - Projeto final

## O que?

Desenvolver, utilizando os conceitos abordados ao longo do módulo, uma aplicação de gerenciamento de consultas médicas.

---

## Como?

A aplicação consiste em um sistema de gerenciamento de consultas médicas, que deverá ter, obrigatoriamente:

- Uma tela de cadastro de usuário, levando em conta os perfis possíveis (`USER` e `ADMIN`).

- Uma tela de login, onde o usuário poderá autenticar-se na aplicação.

- Uma tela de dashboard, onde o usuário poderá visualizar e gerenciar as consultas.

---

- De acordo com o perfil do usuário autenticado, apresentar as telas e recursos possíveis a esse usuário:

- `ADMIN`

  - Verá todas as consultas agendadas, para todos os usuários, e poderá cancelar ou marcar como concluída cada uma delas.

- `USER`

  - Verá somente as suas próprias consultas, podendo editar ou cancelar qualquer uma delas
  - Uma consulta concluída não poderá ser editada ou cancelada, assim como uma consulta cancelada nao pode ser editada ou marcada como concluída

- Os status possíveis para uma consulta são `SCHEDULED` (agendada, valor padrão definido na api, quando uma consulta é criada), `DONE` (concluída) e `CANCELED` (cancelada)

---

## Entrega

Última aula, dia 06/12

---

## Observações

Para a persistência das consultas, utilizaremos uma API, similar à utilizada em aula, que está disponível neste [repositório](https://github.com/ivirson/appointments-api).
