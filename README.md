# Manual Profissional de Megahair - Landing Page

Uma landing page moderna e responsiva para venda do Manual Profissional de Megahair com Fita Adesiva da Nicole Mathias.

## 📋 Características

- **Design Responsivo**: Adaptável a todos os dispositivos (desktop, tablet, mobile)
- **Countdown Timer**: Contador regressivo de 24 horas com persistência em localStorage e cookies
- **Banner Flutuante**: Banner de desconto 80% OFF com animação bounce
- **Botão WhatsApp**: Botão flutuante para contato direto via WhatsApp
- **Seções Otimizadas**: Estrutura de vendas com problema, solução, benefícios e garantia
- **Performance**: Carregamento rápido e otimizado para conversão

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com flexbox e animações
- **JavaScript**: Funcionalidades interativas e contador dinâmico
- **Font Awesome**: Ícones vetoriais

## 📁 Estrutura do Projeto

```
landing-megahair/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── app.js             # Funcionalidades JavaScript
├── README.md          # Documentação
└── .gitignore         # Arquivos ignorados pelo Git
```

## 🎯 Funcionalidades Principais

### Countdown Timer
- Contador regressivo de 24 horas
- Persistência em localStorage e cookies (backup)
- Reinicialização automática quando expira
- Cookie com duração de 30 dias

### Banner Flutuante
- Posicionado no canto inferior direito
- Animação bounce contínua
- Design atrativo com desconto de 80%
- Z-index alto para visibilidade

### Botão WhatsApp
- Ícone Font Awesome integrado
- Link direto para WhatsApp com mensagem pré-definida
- Posicionamento fixo no canto inferior direito
- Estilo moderno com sombra e transições

## 🛠️ Como Usar

1. **Visualização Local**:
   - Abra o arquivo `index.html` diretamente no navegador
   - Ou use um servidor local como Live Server (VS Code)

2. **Servidor HTTP Simples**:
   ```bash
   # Python 3
   python -m http.server 3000
   
   # Node.js (se tiver http-server instalado)
   npx http-server -p 3000
   ```

3. **Acesse**: `http://localhost:3000`

## ⚙️ Configurações

### Modificar Número do WhatsApp
No arquivo `app.js`, linha ~45:
```javascript
whatsappButton.href = 'https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o Manual de Megahair.';
```

### Alterar Duração do Countdown
No arquivo `app.js`, função `setNewCountdown()`:
```javascript
// Para 24 horas (atual)
const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

// Para outros períodos, modifique o multiplicador
// 1 hora: (1 * 60 * 60 * 1000)
// 12 horas: (12 * 60 * 60 * 1000)
// 48 horas: (48 * 60 * 60 * 1000)
```

### Personalizar Cores
No arquivo `style.css`, modifique as variáveis CSS:
```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --accent-color: #45b7d1;
    /* ... outras variáveis */
}
```

## 📱 Responsividade

A landing page é totalmente responsiva com breakpoints:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🔧 Manutenção

### Limpeza de Dados
Para resetar o countdown para todos os usuários:
1. Altere o nome da chave no localStorage (`megahairCountdown`)
2. Altere o nome do cookie (`megahairCountdownCookie`)

### Monitoramento
O sistema salva automaticamente:
- Tempo restante no localStorage
- Backup em cookie com duração de 30 dias
- Reinicialização automática quando expira

## 📄 Licença

Este projeto é propriedade de Nicole Mathias. Todos os direitos reservados.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato via WhatsApp através do botão na página.

---

**Desenvolvido com ❤️ para Nicole Mathias**