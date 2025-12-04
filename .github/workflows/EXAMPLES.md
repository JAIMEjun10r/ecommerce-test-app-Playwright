# 🎯 Exemplos Práticos de Uso dos Workflows

## 📌 Cenários Reais de Uso

---

## 1️⃣ **Desenvolvimento: Testando uma nova feature de login**

### Situação:
Você acabou de desenvolver uma nova validação no login e quer testar rapidamente.

### Solução:
```
Actions → 🔐 Login Tests → Run workflow
  └─ Browser: chromium
```

**Tempo:** ~2 minutos  
**Resultado:** Apenas testes de login executados

---

## 2️⃣ **PR Review: Verificar tudo antes de fazer merge**

### Situação:
Você abriu um Pull Request e quer garantir que nada quebrou.

### Solução:
O workflow **🎭 Playwright E2E Tests** roda automaticamente no PR.

**Resultado:**
```
✅ 🧪 Test - Login      (passou)
✅ 🧪 Test - Products   (passou)
✅ 🧪 Test - Cart       (passou)
```

Se algum contexto falhar, você vê exatamente qual área do sistema quebrou!

---

## 3️⃣ **QA: Testar em múltiplos browsers antes do release**

### Situação:
Antes de subir para produção, QA quer rodar tudo em todos os browsers.

### Solução:
```
Actions → 🎭 All E2E Tests → Run workflow
  └─ Browser: all-browsers ✅
```

**Resultado:** 3 jobs paralelos
```
✅ chromium - All Tests (3m 45s)
✅ firefox - All Tests  (4m 12s)
✅ webkit - All Tests   (4m 05s)
```

---

## 4️⃣ **Bug Report: Testar apenas testes relacionados ao carrinho**

### Situação:
Cliente reportou bug no carrinho. Você corrigiu e quer testar só essa parte.

### Solução:
```
Actions → 🛒 Cart Tests → Run workflow
  └─ Browser: chromium
```

**Alternativa:** Usar o workflow principal
```
Actions → 🎭 Playwright E2E Tests → Run workflow
  ├─ Test Suite: cart ✅
  └─ Browser: chromium
```

---

## 5️⃣ **Debug: Testar com retries para verificar flakiness**

### Situação:
Alguns testes estão falhando intermitentemente. Você quer ver se passam com retries.

### Solução:
```
Actions → 🏷️ Tagged Tests → Run workflow
  ├─ Grep: (vazio)
  ├─ Grep Invert: (vazio)
  ├─ Browser: chromium
  ├─ Workers: 1
  └─ Retries: 3 ✅
```

**Resultado:** Cada teste tenta até 3 vezes antes de falhar definitivamente.

---

## 6️⃣ **Smoke Tests: Rodar apenas testes críticos**

### Situação:
Deploy feito. Você quer rodar apenas os testes mais importantes rapidamente.

### Solução:

**Opção 1:** Nomear testes com prefixo
```typescript
test('SMOKE: should login successfully', async ({ page }) => {
  // ...
});
```

**Opção 2:** Executar com filtro
```
Actions → 🏷️ Tagged Tests → Run workflow
  ├─ Grep: "SMOKE" ✅
  ├─ Browser: chromium
  ├─ Workers: 4
  └─ Retries: 0
```

---

## 7️⃣ **Regression: Rodar tudo exceto testes WIP**

### Situação:
Você tem testes marcados como "WIP" ou "TODO" que ainda não estão prontos.

### Solução:
```typescript
test('TODO: should process payment', async ({ page }) => {
  // trabalho em progresso
});
```

**Executar:**
```
Actions → 🏷️ Tagged Tests → Run workflow
  ├─ Grep: (vazio)
  ├─ Grep Invert: "TODO" ✅
  ├─ Browser: chromium
  └─ Workers: 3
```

**Resultado:** Todos os testes executam, exceto os com "TODO" no nome.

---

## 8️⃣ **Nightly Tests: Execução automática diária**

### Situação:
Você quer que todos os testes rodem automaticamente toda noite.

### Solução:
Já está configurado! 🎉

```yaml
# Em pw-all.yml
schedule:
  - cron: '0 2 * * *'  # 2h AM diariamente
```

**Resultado:** Às 2h da manhã, o workflow **🎭 All E2E Tests** executa automaticamente.

---

## 9️⃣ **Hot Fix: Testar rapidamente uma correção**

### Situação:
Bug crítico em produção. Você fez um hot fix e quer testar só o necessário.

### Solução:
```
Actions → 🏷️ Tagged Tests → Run workflow
  ├─ Grep: "should add item to cart" ✅
  ├─ Browser: chromium
  ├─ Workers: 1
  └─ Retries: 0
```

**Tempo:** ~30 segundos  
**Resultado:** Apenas o teste específico é executado.

---

## 🔟 **Performance Test: Medir tempo com diferentes workers**

### Situação:
Você quer saber quantos workers usar para otimizar o tempo de execução.

### Teste 1:
```
Actions → 🏷️ Tagged Tests
  ├─ Workers: 1
  └─ (executar)
```
Resultado: 8 minutos

### Teste 2:
```
Actions → 🏷️ Tagged Tests
  ├─ Workers: 4
  └─ (executar)
```
Resultado: 2 minutos 30 segundos

**Conclusão:** Workers: 4 é 3x mais rápido! ⚡

---

## 📊 Tabela de Decisão Rápida

| Eu quero... | Workflow | Configuração |
|------------|----------|--------------|
| Testar tudo | 🎭 All E2E Tests | Browser: all-browsers |
| Testar uma área | 🔐/🛍️/🛒 específico | Browser: chromium |
| Testar por nome | 🏷️ Tagged Tests | Grep: "nome" |
| Excluir testes | 🏷️ Tagged Tests | Grep Invert: "skip" |
| Debug visual | 🎭 All E2E Tests | Headed: true |
| Testar com retry | 🏷️ Tagged Tests | Retries: 2 |
| Testar rápido | 🏷️ Tagged Tests | Workers: 4 |
| Testar no PR | Automático | Push/PR trigger |

---

## 💡 Dicas Profissionais

### 1. **Nomeação de testes para filtros**
```typescript
// ✅ BOM - fácil de filtrar
test('LOGIN: should authenticate admin', ...)
test('CART: should add product', ...)
test('SMOKE: critical user flow', ...)

// ❌ RUIM - difícil de filtrar
test('test1', ...)
test('it works', ...)
```

### 2. **Usar tags no describe**
```typescript
describe('CRITICAL: Shopping Cart', () => {
  test('should add item', ...)
  test('should remove item', ...)
})
```

Filtrar:
```
Grep: "CRITICAL"
```

### 3. **Combinar filtros**
```
Grep: "should add"
Grep Invert: "disabled"
```
= Todos os testes com "should add", exceto os desabilitados

---

## 🎯 Workflow Recomendado por Fase

### **Desenvolvimento Ativo**
```
🏷️ Tagged Tests (manual, rápido, com filtros)
```

### **Code Review / PR**
```
🎭 Playwright E2E Tests (automático, organizado)
```

### **QA / Homologação**
```
🎭 All E2E Tests (completo, multi-browser)
```

### **Pré-Produção**
```
🎭 All E2E Tests + all-browsers
```

### **Produção (monitoramento)**
```
Agendado (nightly) - pw-all.yml
```

---

## 📈 Métricas de Sucesso

Após implementar esses workflows, você terá:

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Tempo para rodar 1 suite** | 8 min | 2-3 min | 60-70% ⚡ |
| **Visibilidade de falhas** | Baixa | Alta | 100% 👁️ |
| **Flexibilidade de execução** | 1 opção | 6+ opções | 500% 🎯 |
| **Execuções paralelas** | Não | Sim | ∞ 🚀 |
| **Filtros disponíveis** | 0 | 5+ | ∞ 🔍 |

---

## 🎉 Resultado Final

Você agora tem:

✅ **6 workflows organizados**  
✅ **Execução manual com opções**  
✅ **Filtros avançados**  
✅ **Paralelização eficiente**  
✅ **Visibilidade por contexto**  
✅ **Flexibilidade total**  

**Igual ao Cypress, mas melhor! 🎭✨**

---

## 📞 Suporte

Dúvidas? Consulte:
- `README.md` - Documentação completa
- `VISUAL_GUIDE.md` - Guia visual
- `SUMMARY.md` - Resumo executivo

---

**Happy Testing! 🧪✨**
