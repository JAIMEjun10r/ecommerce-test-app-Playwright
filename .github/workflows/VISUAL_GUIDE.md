# 🎯 Guia Visual de Execução dos Workflows

## 📍 Como os Workflows Aparecem no GitHub

### 1️⃣ **Lista de Workflows Disponíveis**

Quando você acessa `Actions`, verá algo assim:

```
┌─────────────────────────────────────────────────────────┐
│  🎭 Playwright E2E Tests                                │
│  🎭 All E2E Tests                                       │
│  🔐 Login Tests                                          │
│  🛍️ Products Tests                                       │
│  🛒 Cart Tests                                           │
│  🏷️ Tagged Tests                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 2️⃣ **Executando Manualmente um Workflow**

#### Exemplo: 🎭 All E2E Tests

```
┌─────────────────────────────────────────────────────────┐
│  Run workflow                                           │
│                                                         │
│  Use workflow from: main ▼                             │
│                                                         │
│  Browser: chromium ▼                                   │
│    ○ chromium                                          │
│    ○ firefox                                           │
│    ○ webkit                                            │
│    ○ all-browsers                                      │
│                                                         │
│  Headed Mode: □                                        │
│                                                         │
│  [Run workflow]                                        │
└─────────────────────────────────────────────────────────┘
```

---

### 3️⃣ **Visualização Durante Execução**

#### Workflow com Matriz (playwright.yml):

```
🎭 Playwright E2E Tests
└─ main #42

   ⏳ 🧪 Test - Login
      ├─ 📥 Checkout repository
      ├─ 🟢 Setup Node.js
      ├─ 📦 Install dependencies
      ├─ 🎭 Install Playwright Browsers
      ├─ 🚀 Start Application
      └─ 🔐 Run Login Tests
   
   ⏳ 🧪 Test - Products
      ├─ 📥 Checkout repository
      ├─ 🟢 Setup Node.js
      └─ ... (executando em paralelo)
   
   ⏳ 🧪 Test - Cart
      ├─ 📥 Checkout repository
      └─ ... (executando em paralelo)
```

**✨ Cada contexto roda em paralelo como um JOB separado!**

---

### 4️⃣ **Workflow Tagged Tests**

Interface de execução manual:

```
┌─────────────────────────────────────────────────────────┐
│  🏷️ Tagged Tests - Run workflow                        │
│                                                         │
│  Filtro de testes:                                     │
│  ┌───────────────────────────────────────┐            │
│  │ should login                           │            │
│  └───────────────────────────────────────┘            │
│                                                         │
│  Excluir testes que contenham:                         │
│  ┌───────────────────────────────────────┐            │
│  │ skip                                   │            │
│  └───────────────────────────────────────┘            │
│                                                         │
│  Navegador: chromium ▼                                 │
│                                                         │
│  Workers: 2 ▼                                          │
│    ○ 1   ○ 2   ○ 3   ○ 4                             │
│                                                         │
│  Retries: 1 ▼                                          │
│    ○ 0   ○ 1   ○ 2   ○ 3                             │
│                                                         │
│  [Run workflow]                                        │
└─────────────────────────────────────────────────────────┘
```

---

### 5️⃣ **Após Execução - Artefatos**

```
┌─────────────────────────────────────────────────────────┐
│  ✅ 🎭 Playwright E2E Tests #42                         │
│                                                         │
│  Duration: 5m 32s                                      │
│                                                         │
│  Jobs:                                                  │
│  ✅ 🧪 Test - Login         (1m 45s)                   │
│  ✅ 🧪 Test - Products      (2m 12s)                   │
│  ✅ 🧪 Test - Cart          (1m 58s)                   │
│                                                         │
│  Artifacts:                                             │
│  📦 playwright-report-Login      (2.4 MB)              │
│  📦 playwright-report-Products   (3.1 MB)              │
│  📦 playwright-report-Cart       (2.8 MB)              │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Casos de Uso

### Cenário 1: "Quero rodar só os testes de login"

**Opção A:** Workflow específico
```
Actions → 🔐 Login Tests → Run workflow → chromium
```

**Opção B:** Workflow principal com filtro
```
Actions → 🎭 Playwright E2E Tests → Run workflow
  - Test Suite: login
  - Browser: chromium
```

---

### Cenário 2: "Quero rodar tudo em todos os navegadores"

```
Actions → 🎭 All E2E Tests → Run workflow
  - Browser: all-browsers ✅
```

Resultado: 3 jobs paralelos (chromium, firefox, webkit)

---

### Cenário 3: "Quero rodar só testes que tenham 'add' no nome"

```
Actions → 🏷️ Tagged Tests → Run workflow
  - Grep: "add"
  - Browser: chromium
  - Workers: 2
  - Retries: 0
```

---

### Cenário 4: "Quero excluir testes marcados como skip"

```
Actions → 🏷️ Tagged Tests → Run workflow
  - Grep: (vazio)
  - Grep Invert: "skip" ✅
  - Browser: firefox
```

---

## 📊 Comparação Visual: Antes vs Depois

### ❌ ANTES (workflow simples)

```
Playwright Tests
└─ Run tests
   ├─ Checkout
   ├─ Setup Node
   └─ Run all tests
```

**Problemas:**
- Tudo em um único job
- Sem separação por contexto
- Difícil ver qual teste falhou
- Sem opções de execução

---

### ✅ DEPOIS (workflows organizados)

```
🎭 Playwright E2E Tests
├─ 🧪 Test - Login
├─ 🧪 Test - Products
└─ 🧪 Test - Cart

🔐 Login Tests
🛍️ Products Tests
🛒 Cart Tests
🏷️ Tagged Tests
🎭 All E2E Tests
```

**Vantagens:**
- ✅ Contextos separados e paralelos
- ✅ Fácil identificar falhas
- ✅ Múltiplas opções de execução
- ✅ Filtros avançados
- ✅ Escolha de browser
- ✅ Workflows específicos

---

## 🎨 Emojis Usados

| Emoji | Significado |
|-------|-------------|
| 🎭 | Playwright / Teatro |
| 🔐 | Login / Autenticação |
| 🛍️ | Products / Shopping |
| 🛒 | Cart / Carrinho |
| 🏷️ | Tags / Filtros |
| 📥 | Checkout / Download |
| 🟢 | Node.js / Setup |
| 📦 | Pacotes / Instalação |
| 🚀 | Start / Lançamento |
| 🧪 | Tests / Testes |
| 📊 | Reports / Relatórios |
| 📸 | Screenshots |
| ✅ | Success / Sucesso |
| ❌ | Failure / Falha |
| ⏳ | Running / Executando |

---

## 💡 Dicas Pro

### 1. Ver logs detalhados
Clique em qualquer step para expandir e ver os logs completos

### 2. Re-executar jobs falhados
Botão `Re-run failed jobs` aparece automaticamente

### 3. Baixar múltiplos artefatos
Use a CLI do GitHub:
```bash
gh run download <run-id>
```

### 4. Filtrar execuções
Use a barra de busca:
- `is:success` - apenas sucessos
- `is:failure` - apenas falhas
- `branch:main` - apenas da main
- `actor:usuario` - executadas por usuário específico

---

**🎉 Agora seus workflows estão organizados como no Cypress!**
