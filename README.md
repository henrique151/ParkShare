# ParkShare - Gestão Inteligente de Vagas de Estacionamento

## Descrição

O **ParkShare** é uma aplicação web que visa revolucionar a forma como as vagas de estacionamento em condomínios são utilizadas. A plataforma conecta motoristas a vagas ociosas, permitindo que condôminos aluguem seus espaços de forma segura e que síndicos administrem todo o processo de maneira centralizada e eficiente.

Construído com uma arquitetura focada na simplicidade e usabilidade, o projeto utiliza **HTML, CSS e JavaScript puro** para criar uma experiência de usuário direta e funcional. O sistema foi desenhado para ser totalmente responsivo, garantindo acesso fácil tanto em desktops quanto em dispositivos móveis. Além disso, o ParkShare integra a **API do Google Maps** para facilitar a localização de vagas próximas ao destino do usuário, otimizando o tempo e contribuindo para a redução do trânsito e da emissão de CO₂, em alinhamento com a **ODS 13 (Ação Contra a Mudança Global do Clima)**.

## Funcionalidades Principais

### Para Motoristas (Usuários Externos)

- **Cadastro e Autenticação:** Sistema seguro para registro e login de usuários.
- **Busca Inteligente:** Encontre vagas disponíveis próximas ao seu destino com a integração do Google Maps.
- **Agendamento de Vagas:** Reserve vagas por dia, horário ou período de forma intuitiva.
- **Gerenciamento de Veículos:** Cadastre seus veículos para agilizar o processo de reserva e garantir a segurança do condomínio.
- **Comunicação Direta:** Utilize o chat interno para negociar ou alinhar detalhes diretamente com o proprietário da vaga.

### Para Condôminos (Proprietários de Vagas)

- **Gestão de Vagas:** Cadastre e disponibilize suas vagas de estacionamento para aluguel.
- **Controle de Reservas:** Aprove ou recuse solicitações de aluguel com total autonomia.
- **Visualização de Agenda:** Acompanhe o status e os horários de todas as suas vagas reservadas.

### Para Síndicos e Administradores

- **Gerenciamento de Condomínios:** Cadastre e administre múltiplos edifícios na plataforma.
- **Controle de Acessos:** Gerencie as contas de condôminos e usuários externos, garantindo a segurança.
- **Moderação de Atividades:** Monitore e administre os pedidos de reserva, categorizando-os como pendentes, cancelados ou concluídos.

## Arquitetura e Tecnologia

- **Frontend:** A interface foi desenvolvida com **HTML5, CSS3 e JavaScript (ES6+)**, criando uma experiência de usuário fluida e responsiva sem a necessidade de frameworks complexos.
- **Renderização no Cliente (Client-Side Rendering):** A lógica da aplicação é executada diretamente no navegador, permitindo interações dinâmicas e rápidas.
- **Portabilidade:** O design responsivo ("Mobile First") garante que a plataforma funcione perfeitamente em smartphones, tablets e desktops.
- **API Externa:** A **API do Google Maps** é utilizada para a funcionalidade de busca e visualização de vagas no mapa.

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **APIs:** Google Maps API
- **Design:** Foco em responsividade para dispositivos móveis

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
