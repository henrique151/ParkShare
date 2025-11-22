# ParkShare

## Ideia do Projeto

O ParkShare é um sistema projetado para otimizar o gerenciamento e a utilização de vagas de estacionamento em condomínios. A ideia central é permitir que moradores e síndicos tenham uma plataforma centralizada para visualizar, alocar e administrar as vagas disponíveis, facilitando a organização e evitando conflitos. O sistema visa modernizar a forma como as vagas são compartilhadas e controladas, oferecendo uma solução digital e eficiente.

## Funcionalidades do Sistema

Aqui está um resumo do que já foi implementado e do que ainda está planejado para o projeto.

### Funcionalidades Existentes

- **Tela de Gerenciar Síndico:** Painel para o síndico administrar funcionalidades do sistema.
- **Tela de Gerenciar Moradores (Condôminos):** Interface para visualizar e gerenciar os moradores cadastrados.
- **Tela de Gerenciar Vagas:** Visualização e gerenciamento das vagas de estacionamento (possivelmente através do mapa ou painel de edifício).
- **Painel do Administrador:** Interface de administração geral do sistema.

- **Chat:** Funcionalidade de comunicação interna.

### Funcionalidades Planejadas (Não implementadas)

- **Tela de Login:** Feito!
- **Tela de Registro de Usuário (Cadastro):** Feito!
- **Tela de Esqueci minha Senha / Recuperar Senha:** Feito!
- **Visualização de Perfil: Tela para os usuários verem seus próprios perfis:** Não tem. 
- **Tela de Alterar Senha (após login):** Feito!
- **Tela de Registrar Condomínio:** Não tem.
- **Tela de Gerenciar Condomínios:** Não tem.
- **Tela de Registrar Síndico:** Não tem.
- **Tela de Registrar Veículo:** Não tem.
- **Tela de Registrar Local da Vaga:** Não tem.
- **Tela de Alocar / Liberar Vaga:** Não tem. (Pode ser um card com QR Code).
- **Tela de Gerenciar Perfil de Usuário:** Não tem.
- **Tela de Permissões / Perfis de Acesso:** Status incerto.

---

## 📚 Guia de Git e GitHub para Colaboradores

Este guia prático serve para alinhar o uso do Git e GitHub em nosso projeto.

**Nota:** Este guia segue um modelo de repositório compartilhado, onde todos os colaboradores têm acesso de escrita ao repositório principal. Para contribuições externas, o modelo de Fork e Pull Request é o mais recomendado.

### 1. Configuração Inicial (Apenas uma vez)

Se você nunca usou o Git, configure seu nome e e-mail. Eles serão usados para identificar seus commits.

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"
```

### 2. Criando uma Branch para Trabalhar

Nunca trabalhe diretamente na branch `main`. Sempre crie uma nova branch para cada funcionalidade ou correção.

Primeiro, garanta que sua `main` local está atualizada:

```bash
git checkout main
git pull origin main
```

Agora, crie sua nova branch e mude para ela:

```bash
# Exemplo: criando uma feature de login
git checkout -b feature/adicionar-login
```

Para verificar em qual branch você está, use: `git branch` (a branch atual terá um `*`).

### 3. Fazendo Alterações e Salvando (Commit)

Após modificar os arquivos, adicione-os e faça um "commit" com uma mensagem clara.

```bash
# Adiciona todos os arquivos modificados
git add .

# Salva as alterações com uma mensagem descritiva
git commit -m "feat: Adiciona funcionalidade de login"
```

### 4. Enviando as Alterações para o GitHub

Envie sua branch para o repositório remoto no GitHub.

```bash
git push -u origin feature/adicionar-login
```

### 5. Criando um Pull Request (PR) para Revisão

Depois de enviar suas alterações com `git push`, o próximo passo é pedir para que o time revise seu código. Isso é feito através de um Pull Request (PR).

**Passo 1: Encontre o Link no Terminal**

Logo após o `git push`, o terminal mostrará uma mensagem com um link para criar o Pull Request. É a maneira mais fácil de começar.

```
... (outras mensagens do git)
remote: Create a pull request for 'feature/teste2' on GitHub by visiting:
remote:   https://github.com/henrique151/cli-consulta-meteorologica/pull/new/feature/teste2
```

**Passo 2: Crie o Pull Request**

Clique no link que apareceu no seu terminal. Ele te levará direto para a página de criação do PR no GitHub.

- **Escreva um Título claro.** O título é a primeira coisa que o time verá.
  - _Exemplo de um bom título:_ `feat: Adiciona campo de busca de cidade na tela inicial`
  - _Evite títulos vagos como "minhas alterações" ou "correção"._
- **Escreva uma Descrição útil.** Explique o que você fez e por quê. Não precisa ser um texto longo, mas deve ajudar os outros a entenderem a mudança.

  - _Exemplo de uma boa descrição:_

    ```
    Adicionei a funcionalidade de busca de cidade na página principal.

    - Criei o input de texto no HTML.
    - Adicionei o CSS para estilizar o campo.
    - O botão "Buscar" agora chama a API com a cidade digitada.
    ```

- Clique em **"Create pull request"**.

Pronto! Agora é só aguardar o feedback do time. Eles podem aprovar ou pedir ajustes no seu código.

### 6. Resolvendo Conflitos de Merge

Conflitos acontecem quando duas pessoas alteram a mesma linha de um arquivo. Se o GitHub acusar um conflito, siga estes passos:

1.  Atualize sua branch local com a `main` remota:
    ```bash
    git pull origin main
    ```
2.  **Abra os arquivos com conflito:** O Git marcará as áreas problemáticas com `<<<<<<<`, `=======`, e `>>>>>>>`.
3.  **Edite os arquivos:** Apague as marcações do Git e decida qual código deve permanecer (o seu, o da `main`, ou uma mistura dos dois).
4.  **Salve as correções:**
    ```bash
    git add .
    git commit -m "fix: Resolve conflitos de merge com a main"
    git push
    ```

⚠️ **Nota Importante sobre o Git e Mensagem de Commit no Merge**
Quando você executar um `git pull` e houver conflitos ou o Git precisar fazer um merge, pode abrir uma tela de texto padrão do Git (geralmente o Vim). Essa tela serve para você confirmar ou editar a mensagem de commit do merge.

**O que está acontecendo:**

Você executou um `git pull`, e como havia alterações remotas e locais, o Git está fazendo um merge. Agora ele quer que você confirme ou edite a mensagem de commit.

**O que você pode fazer:**

Para aceitar a mensagem padrão e continuar, siga estes passos:

1.  Pressione a tecla `Esc` para sair do modo de edição.
2.  Digite `:wq` (write e quit — salvar e sair).
3.  Pressione `Enter`.

Isso vai salvar a mensagem de commit e finalizar o merge.

### 🚀 Dicas Extras

- Use `git status` com frequência para ver o que está acontecendo.
- Em caso de erro, leia com atenção a mensagem do Git.
- Nomeie bem as branches, ex: `feature/cadastro-usuario`, `bugfix/login`

### 7. Comandos Rápidos e Úteis

| Comando                | Descrição                                            |
| ---------------------- | ---------------------------------------------------- |
| `git status`           | Vê o status dos arquivos (modificados, novos, etc.). |
| `git branch`           | Lista todas as branches e mostra a atual.            |
| `git checkout <nome>`  | Muda para outra branch.                              |
| `git pull origin main` | Atualiza sua branch atual com a `main`.              |
| `git log`              | Mostra o histórico de commits.                       |

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
