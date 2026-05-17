(function () {
    const BOT_ID = '1c565d07-e68e-447f-94f7-a6dec9f266b3';
    const CLIENT_ID = '31a6fc38-0d02-4121-bf83-6ac346bb2fed';
    const knowledge = window.GLOBALKITS_KNOWLEDGE;

    function initBotpress() {
        if (!window.botpress?.init) return;

        window.botpress.init({
            botId: BOT_ID,
            clientId: CLIENT_ID,
            configuration: {
                botName: 'GlobalKits AI',
                botDescription:
                    'Your AI guide for custom international shirts — colors, names, numbers, sizing & bulk orders.',
                composerPlaceholder: 'Ask about shirt customization…',
                themeMode: 'dark',
                variant: 'soft',
                fontFamily: 'outfit',
                primaryColor: '#3b82f6',
                website: {},
                email: {},
                phone: {},
                termsOfService: {},
                privacyPolicy: {}
            }
        });
    }

    function injectKnowledge() {
        if (!knowledge || !window.botpress) return;

        const payload = {
            brand: knowledge.brand,
            customization: knowledge.customization,
            teams: knowledge.teams,
            instructions:
                'You are GlobalKits AI. Answer helpfully about shirt customization, pricing, palettes, sizing, and orders. Use the provided knowledge.'
        };

        window.botpress.config?.({
            configuration: {
                botName: 'GlobalKits AI',
                botDescription: 'Custom shirt assistant — palettes, printing, sizing & bulk pricing.'
            },
            user: {
                data: { globalKitsKnowledge: payload }
            }
        });

        window.botpress.updateUser?.({
            data: { globalKitsKnowledge: payload }
        }).catch(() => {});

        window.botpress.sendEvent?.({
            type: 'site_knowledge',
            knowledge: payload
        }).catch(() => {});
    }

    function waitForBotpress(cb, attempts = 50) {
        if (window.botpress?.init) return cb();
        if (attempts <= 0) return;
        setTimeout(() => waitForBotpress(cb, attempts - 1), 100);
    }

    waitForBotpress(() => {
        initBotpress();
        window.botpress.on?.('webchat:ready', injectKnowledge);
    });
})();
