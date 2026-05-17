const GLOBALKITS_KNOWLEDGE = {
    brand: 'GlobalKits',
    tagline: 'Premium international sportswear with HD color simulation',
    customization: {
        overview: 'Every GlobalKits shirt can be fully customized with national palettes, personal details, and premium fabrics.',
        options: [
            {
                id: 'colors',
                name: 'Color palette',
                description: 'Primary, secondary, and accent colors. Use the Interactive Simulator to preview Brazil, Argentina, France, Germany, Spain, or Italy palettes instantly.',
                priceNote: 'Included in base kit price'
            },
            {
                id: 'name-number',
                name: 'Name & number printing',
                description: 'Heat-pressed or sublimated name (up to 12 characters) and squad number (1–99) on back.',
                priceNote: 'From $12 per shirt'
            },
            {
                id: 'badge',
                name: 'Custom crest / badge',
                description: 'Upload your club, school, or event logo. Vector PDF or PNG (300 DPI) recommended.',
                priceNote: 'From $8 per shirt'
            },
            {
                id: 'fabric',
                name: 'Fabric upgrade',
                description: 'Standard moisture-wick polyester or Pro-Dry mesh with reinforced stitching for match play.',
                priceNote: 'Pro-Dry +$6 per shirt'
            },
            {
                id: 'fit',
                name: 'Fit & sizing',
                description: 'Sizes XS–3XL. Athletic fit (slimmer) or classic fit (relaxed). Size chart available on request.',
                priceNote: 'No extra charge'
            },
            {
                id: 'bulk',
                name: 'Team & bulk orders',
                description: 'Orders of 10+ shirts receive tiered discounts, unified palette, and dedicated design proof.',
                priceNote: '10–24 shirts: 10% off · 25+: 18% off'
            }
        ],
        process: [
            'Pick a nation palette in the Simulator or describe a custom scheme in chat.',
            'Choose size, fit, name/number, and optional badge.',
            'Receive a digital proof within 48 hours.',
            'Production ships in 10–14 business days (rush 5–7 days available).'
        ],
        pricing: {
            baseKit: '$49',
            rushFee: '$15 per order',
            shipping: 'Free over $150 · otherwise $9.99 domestic'
        },
        faq: [
            {
                q: 'Can I mix colors from different countries?',
                a: 'Yes. Use the simulator for inspiration, then tell us your custom primary, secondary, and accent hex codes in chat.'
            },
            {
                q: 'What file format for logos?',
                a: 'PNG, SVG, or PDF at 300 DPI. Our team can help vectorize low-res artwork for a small fee.'
            },
            {
                q: 'Minimum order?',
                a: 'Single shirts are welcome. Bulk discounts start at 10 units.'
            }
        ]
    },
    teams: [
        { name: 'Brazil', primary: '#FDE100', secondary: '#009B3A', accent: '#002776' },
        { name: 'Argentina', primary: '#74ACDF', secondary: '#FFFFFF', accent: '#000000' },
        { name: 'France', primary: '#002654', secondary: '#001a3b', accent: '#ED2939' },
        { name: 'Germany', primary: '#FFFFFF', secondary: '#EEEEEE', accent: '#000000' },
        { name: 'Spain', primary: '#AA151B', secondary: '#8a1116', accent: '#F1BF00' },
        { name: 'Italy', primary: '#0064A8', secondary: '#004c80', accent: '#FFFFFF' }
    ]
};

if (typeof window !== 'undefined') {
    window.GLOBALKITS_KNOWLEDGE = GLOBALKITS_KNOWLEDGE;
}
