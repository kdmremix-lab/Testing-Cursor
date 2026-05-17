(function () {
    const knowledge = window.GLOBALKITS_KNOWLEDGE;
    if (!knowledge) return;

    const panel = document.getElementById('aiChatPanel');
    const messagesEl = document.getElementById('aiChatMessages');
    const inputEl = document.getElementById('aiChatInput');
    const sendBtn = document.getElementById('aiChatSend');
    const closeBtn = document.getElementById('aiChatClose');
    const quickRepliesEl = document.getElementById('aiQuickReplies');

    if (!panel || !messagesEl || !inputEl) return;

    const WELCOME =
        "Hi! I'm the GlobalKits AI assistant. I can help with shirt customization — colors, names, numbers, sizing, bulk orders, pricing, and turnaround. What would you like to design today?";

    const QUICK_REPLIES = [
        'What can I customize?',
        'Pricing & bulk discounts',
        'How long does production take?',
        'Show national color palettes'
    ];

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function normalize(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function includesAny(text, words) {
        return words.some((w) => text.includes(w));
    }

    function formatOptions() {
        return knowledge.customization.options
            .map((o) => `• **${o.name}** — ${o.description} (${o.priceNote})`)
            .join('\n');
    }

    function formatTeams() {
        return knowledge.teams
            .map((t) => `• **${t.name}** — primary ${t.primary}, secondary ${t.secondary}, accent ${t.accent}`)
            .join('\n');
    }

    function formatProcess() {
        return knowledge.customization.process.map((s, i) => `${i + 1}. ${s}`).join('\n');
    }

    function generateAIResponse(userText) {
        const t = normalize(userText);
        if (!t) return "Type a question about shirt customization and I'll help you out.";

        if (includesAny(t, ['hi', 'hello', 'hey', 'good morning', 'good evening'])) {
            return pick([
                "Hello! Ready to build your custom kit? Ask about colors, names, numbers, or bulk pricing.",
                "Hey there! I'm here to guide you through GlobalKits shirt customization. What are you looking for?"
            ]);
        }

        if (includesAny(t, ['thank', 'thanks', 'thx'])) {
            return pick([
                "You're welcome! If you need a proof or quote, just tell me your team size and palette.",
                "Happy to help! Come back anytime for sizing or color advice."
            ]);
        }

        if (includesAny(t, ['price', 'pricing', 'cost', 'how much', 'fee', 'discount', 'bulk'])) {
            const p = knowledge.customization.pricing;
            const bulk = knowledge.customization.options.find((o) => o.id === 'bulk');
            return `**Pricing overview**\n\n• Base kit: ${p.baseKit}\n• Rush production: ${p.rushFee}\n• Shipping: ${p.shipping}\n• ${bulk.priceNote}\n\nName & number printing starts at $12/shirt. Pro-Dry fabric is +$6/shirt. Want a quote for a specific quantity?`;
        }

        if (includesAny(t, ['custom', 'customize', 'customization', 'option', 'what can', 'personalize'])) {
            return `**Shirt customization options**\n\n${formatOptions()}\n\n**How it works**\n${formatProcess()}`;
        }

        if (includesAny(t, ['color', 'palette', 'simulator', 'nation', 'country', 'team', 'brazil', 'argentina', 'france', 'germany', 'spain', 'italy'])) {
            return `**National palettes** (preview in our Simulator)\n\n${formatTeams()}\n\nYou can mix palettes or send custom hex codes. Open the **Simulator** section to see live jersey previews.`;
        }

        if (includesAny(t, ['name', 'number', 'print', 'squad', 'jersey number'])) {
            const opt = knowledge.customization.options.find((o) => o.id === 'name-number');
            return `**${opt.name}**\n${opt.description}\n\n${opt.priceNote}. Names up to 12 characters; numbers 1–99.`;
        }

        if (includesAny(t, ['size', 'sizing', 'fit', 'xl', 'xxl', 'measure'])) {
            const opt = knowledge.customization.options.find((o) => o.id === 'fit');
            return `**${opt.name}**\n${opt.description}\n\n${opt.priceNote}. We offer athletic (slimmer) and classic (relaxed) cuts.`;
        }

        if (includesAny(t, ['logo', 'badge', 'crest', 'upload', 'artwork'])) {
            const opt = knowledge.customization.options.find((o) => o.id === 'badge');
            return `**${opt.name}**\n${opt.description}\n\n${opt.priceNote}. Best formats: PNG, SVG, or PDF at 300 DPI.`;
        }

        if (includesAny(t, ['fabric', 'material', 'polyester', 'mesh', 'pro dry'])) {
            const opt = knowledge.customization.options.find((o) => o.id === 'fabric');
            return `**${opt.name}**\n${opt.description}\n\n${opt.priceNote}.`;
        }

        if (includesAny(t, ['ship', 'delivery', 'turnaround', 'how long', 'when', 'production', 'lead time', 'rush'])) {
            const p = knowledge.customization.pricing;
            return `**Production timeline**\n\n${formatProcess()}\n\nStandard: 10–14 business days after proof approval.\nRush: 5–7 days (${p.rushFee}).\nDigital proof within 48 hours.`;
        }

        if (includesAny(t, ['order', 'buy', 'purchase', 'quote'])) {
            return `To place an order:\n1. Choose your palette (Simulator or custom colors)\n2. Share sizes, quantities, and name/number list\n3. We send a proof within 48 hours\n4. Approve and we produce (${knowledge.customization.pricing.baseKit} base per shirt)\n\nTell me your team size and I'll outline bulk savings.`;
        }

        const faqHit = knowledge.customization.faq.find(
            (f) => includesAny(t, normalize(f.q).split(' ').filter((w) => w.length > 3))
        );
        if (faqHit) return faqHit.a;

        return pick([
            `I specialize in GlobalKits shirt customization. You can ask about:\n• Color palettes & the simulator\n• Name/number printing\n• Sizing & fabric\n• Bulk discounts & pricing\n• Production time\n\n${formatOptions().split('\n')[0]}… and more!`,
            `I'm not sure I caught that — try asking about **colors**, **pricing**, **sizes**, **logos**, or **delivery**. Or tap a quick reply below.`
        ]);
    }

    function renderMarkdownLite(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    function appendMessage(role, text) {
        const div = document.createElement('div');
        div.className = `ai-msg ai-msg-${role}`;
        div.innerHTML = renderMarkdownLite(text);
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'ai-msg ai-msg-bot ai-typing';
        el.id = 'aiTyping';
        el.textContent = 'Thinking…';
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return el;
    }

    function removeTyping() {
        document.getElementById('aiTyping')?.remove();
    }

    async function respond(userText) {
        appendMessage('user', userText);
        inputEl.value = '';
        sendBtn.disabled = true;

        const typing = showTyping();
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 500));
        removeTyping();

        const reply = generateAIResponse(userText);
        appendMessage('bot', reply);
        sendBtn.disabled = false;
        inputEl.focus();

        if (window.botpress?.sendMessage) {
            try {
                await window.botpress.sendMessage(userText);
            } catch (_) {
                /* Botpress may not be ready */
            }
        }
    }

    function renderQuickReplies() {
        if (!quickRepliesEl) return;
        quickRepliesEl.innerHTML = '';
        QUICK_REPLIES.forEach((label) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ai-quick-btn';
            btn.textContent = label;
            btn.addEventListener('click', () => respond(label));
            quickRepliesEl.appendChild(btn);
        });
    }

    function openPanel() {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        if (!panel.dataset.greeted) {
            appendMessage('bot', WELCOME);
            panel.dataset.greeted = '1';
        }
        inputEl.focus();
    }

    function closePanel() {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
    }

    sendBtn.addEventListener('click', () => {
        const text = inputEl.value.trim();
        if (text) respond(text);
    });

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = inputEl.value.trim();
            if (text) respond(text);
        }
    });

    closeBtn?.addEventListener('click', closePanel);
    panel.addEventListener('click', (e) => {
        if (e.target === panel) closePanel();
    });

    document.getElementById('openChat')?.addEventListener('click', (e) => {
        e.preventDefault();
        openPanel();
    });

    document.getElementById('customChatCta')?.addEventListener('click', openPanel);

    document.getElementById('aiChatFab')?.addEventListener('click', openPanel);

    renderQuickReplies();
    window.GlobalKitsAI = { open: openPanel, close: closePanel, respond };
})();
