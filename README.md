# FrotaCheck

Aplicação Next.js para acompanhar a revisão de checklists de veículos da frota.

## Funcionalidades

- Visualizar os veículos e seu progresso de revisão.
- Abrir o checklist de cada veículo.
- Marcar itens como aprovados ou reprovados.
- Salvar o resultado e atualizar o status do veículo.
- Consultar relatórios e histórico de revisões.
- Alternar entre os modos claro e escuro.

## Como rodar no Windows

### 1. Verifique as ferramentas

Instale o Node.js LTS e o npm no computador. No PowerShell, confirme:

```powershell
node --version
npm --version
```

### 2. Abra a pasta do projeto

```powershell
cd C:\codigo\meu-checklist
```

### 3. Instale as dependências

```powershell
npm install
```

### 4. Inicie o servidor

```powershell
npm run dev
```

Abra no navegador:

```text
http://localhost:3000
```

## Comandos úteis

```powershell
npm run dev    # servidor de desenvolvimento
npm run build  # validação e build de produção
npm start      # executa o build de produção
```

## Problema com execução de scripts no PowerShell

Se o PowerShell bloquear o npm, execute o comando abaixo antes de iniciar o projeto:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Esse comando vale apenas para a sessão atual do PowerShell.

## Estrutura principal

- `app/` — páginas e rotas da aplicação.
- `components/` — componentes reutilizáveis.
- `context/` — estado compartilhado e lógica do checklist.
- `data/` — dados fictícios dos veículos.
- `app/styles.css` — estilos da interface.
