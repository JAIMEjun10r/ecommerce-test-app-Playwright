# 🎭 GitHub Actions Workflows - Playwright

Este diretório contém os workflows do GitHub Actions para execução automatizada dos testes Playwright.

## 📁 Estrutura dos Workflows

```
.github/workflows/
├── playwright.yml      # ✨ Workflow principal com matriz de contextos
├── pw-all.yml         # 🎭 Todos os testes (manual/agendado)
├── pw-login.yml       # 🔐 Testes de autenticação
├── pw-products.yml    # 🛍️ Testes de produtos
├── pw-cart.yml        # 🛒 Testes de carrinho
└── pw-tagged.yml      # 🏷️ Testes com filtros customizados
```

---

## 🚀 Workflows Disponíveis

### 1. **🎭 Playwright E2E Tests** (`playwright.yml`)
**Workflow principal** que executa todos os testes organizados por contexto (matriz).

- ✅ Executa automaticamente em push/PR
- ✅ Matriz de testes: Login, Products, Cart
- ✅ Exibição por contexto na interface do GitHub
- ✅ Execução manual com opções

**Execução Manual:**
1. Vá em `Actions` → `🎭 Playwright E2E Tests`
2. Clique em `Run workflow`
3. Escolha:
   - **Test Suite**: `all`, `login`, `products` ou `cart`
   - **Browser**: `chromium`, `firefox`, `webkit` ou `all`
   - **Tags**: (opcional) filtrar por tags

---

### 2. **🎭 All E2E Tests** (`pw-all.yml`)
Executa **todos os testes** de uma vez.

**Triggers:**
- ✅ Manual (`workflow_dispatch`)
- ✅ Agendado (diariamente às 2h AM)
- ✅ Push/Pull Request

**Opções de Execução Manual:**
- **Browser**: `chromium`, `firefox`, `webkit` ou `all-browsers`
- **Headed Mode**: Executar com interface visível (para debug)

**Uso:**
```
Actions → 🎭 All E2E Tests → Run workflow
```

---

### 3. **🔐 Login Tests** (`pw-login.yml`)
Executa **apenas testes de autenticação**.

**Triggers:**
- ✅ Manual
- ✅ Mudanças em `tests/e2e/login.spec.ts` ou `pages/loginPage.ts`

**Opções:**
- Escolher navegador: `chromium`, `firefox`, `webkit`

---

### 4. **🛍️ Products Tests** (`pw-products.yml`)
Executa **apenas testes de produtos e filtros**.

**Triggers:**
- ✅ Manual
- ✅ Mudanças em `tests/e2e/products.spec.ts` ou `pages/productPage.ts`

---

### 5. **🛒 Cart Tests** (`pw-cart.yml`)
Executa **apenas testes de carrinho de compras**.

**Triggers:**
- ✅ Manual
- ✅ Mudanças em `tests/e2e/cartFunctionality.spec.ts` ou `pages/cartFunctionality.ts`

---

### 6. **🏷️ Tagged Tests** (`pw-tagged.yml`)
Executa testes com **filtros customizados avançados**.

**Opções de Execução:**
- **Grep**: Filtrar testes que contenham texto (ex: `"should login"`)
- **Grep Invert**: Excluir testes que contenham texto (ex: `"skip"`)
- **Browser**: Escolher navegador
- **Workers**: Número de workers paralelos (1-4)
- **Retries**: Tentativas em caso de falha (0-3)

**Exemplo de Uso:**
```
Grep: "should add"
Grep Invert: "remove"
Browser: chromium
Workers: 2
Retries: 1
```

Isso executará apenas testes que contenham "should add" no nome, excluindo os que têm "remove".

---

## 🎯 Como Executar Manualmente

### Passo a Passo:

1. **Acesse o GitHub Actions:**
   ```
   Repositório → Actions (aba superior)
   ```

2. **Escolha o Workflow:**
   - Selecione na lista à esquerda (ex: `🎭 All E2E Tests`)

3. **Execute:**
   - Clique em `Run workflow` (botão azul)
   - Escolha a branch (geralmente `main`)
   - Configure as opções disponíveis
   - Clique em `Run workflow` (verde)

4. **Acompanhe a Execução:**
   - O workflow aparecerá na lista
   - Clique nele para ver os detalhes
   - Cada job/step é expandível

---

## 📊 Artefatos Gerados

Todos os workflows geram artefatos que ficam disponíveis por **30 dias**:

### 📄 Relatórios HTML
- `playwright-report-*`: Relatório HTML completo
- Inclui screenshots, traces, vídeos (quando falhas ocorrem)

### 📸 Screenshots e Vídeos
- `test-results-*`: Apenas em caso de falhas
- Disponível por **7 dias**

**Como acessar:**
1. Vá na execução do workflow
2. Role até o final da página
3. Seção `Artifacts`
4. Baixe o ZIP

---

## 🔄 Diferenças vs Cypress

| Recurso | Cypress | Playwright |
|---------|---------|------------|
| **Múltiplos YAMLs** | ✅ Sim | ✅ Sim |
| **Contextos separados** | ✅ Sim | ✅ Sim (matriz) |
| **Execução manual** | ✅ Sim | ✅ Sim |
| **Escolha de tags** | ✅ Sim | ✅ Sim (grep) |
| **Escolha de browser** | ❌ Limitado | ✅ Sim (3 browsers) |
| **Workers paralelos** | ❌ Não | ✅ Sim (configurável) |
| **Retries configuráveis** | ❌ Não | ✅ Sim |

---

## 🎨 Visualização no GitHub Actions

Os workflows aparecerão assim:

```
🎭 Playwright E2E Tests
  ├── 🧪 Test - Login
  ├── 🧪 Test - Products
  └── 🧪 Test - Cart

🔐 Login Tests
  └── 🔐 Authentication Tests

🛍️ Products Tests
  └── 🛍️ Products & Filters Tests

🛒 Cart Tests
  └── 🛒 Shopping Cart Tests
```

Cada contexto aparece como um **job separado** com emoji identificador! 🎉

---

## 🛠️ Customização

### Adicionar Novo Teste ao Workflow Principal

Edite `playwright.yml`, adicione na matriz:

```yaml
matrix:
  test-suite: 
    - { name: 'Login', file: 'tests/e2e/login.spec.ts', emoji: '🔐' }
    - { name: 'Products', file: 'tests/e2e/products.spec.ts', emoji: '🛍️' }
    - { name: 'Cart', file: 'tests/e2e/cartFunctionality.spec.ts', emoji: '🛒' }
    - { name: 'Checkout', file: 'tests/e2e/checkout.spec.ts', emoji: '💳' } # NOVO
```

### Adicionar Nova Opção de Execução

```yaml
workflow_dispatch:
  inputs:
    nova_opcao:
      description: 'Descrição'
      required: false
      type: choice
      options:
        - 'opcao1'
        - 'opcao2'
      default: 'opcao1'
```

---

## 📚 Documentação Oficial

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Playwright CI/CD](https://playwright.dev/docs/ci)
- [Workflow Syntax](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions)

---

## ✨ Benefícios desta Estrutura

✅ **Organização Clara**: Cada tipo de teste tem seu workflow  
✅ **Flexibilidade**: Execução manual com múltiplas opções  
✅ **Visualização**: Contextos separados na interface  
✅ **Otimização**: Executa apenas o necessário em cada push  
✅ **Debugging**: Opções avançadas de filtros e retries  
✅ **Artefatos**: Relatórios e screenshots salvos automaticamente  

---

**Criado para o projeto:** `ecommerce-test-app-Playwright`  
**Autor:** JAIMEjun10r
