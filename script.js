const teams = [
    {
        id: 'brazil',
        name: 'Brazil',
        desc: 'The iconic Canarinho. Vibrant yellow with rich green accents.',
        primary: '#FDE100',
        secondary: '#009B3A',
        accent: '#002776'
    },
    {
        id: 'argentina',
        name: 'Argentina',
        desc: 'La Albiceleste. Classic light blue and white vertical dominance.',
        primary: '#74ACDF',
        secondary: '#FFFFFF',
        accent: '#000000'
    },
    {
        id: 'france',
        name: 'France',
        desc: 'Les Bleus. Deep navy elegance with red and white subtle hints.',
        primary: '#002654',
        secondary: '#001a3b',
        accent: '#ED2939'
    },
    {
        id: 'germany',
        name: 'Germany',
        desc: 'Die Mannschaft. Crisp white tradition powered by strong black trim.',
        primary: '#FFFFFF',
        secondary: '#EEEEEE',
        accent: '#000000'
    },
    {
        id: 'spain',
        name: 'Spain',
        desc: 'La Furia Roja. Intense red complemented by deep yellow details.',
        primary: '#AA151B',
        secondary: '#8a1116',
        accent: '#F1BF00'
    },
    {
        id: 'italy',
        name: 'Italy',
        desc: 'Gli Azzurri. The classic royal blue that defined generations.',
        primary: '#0064A8',
        secondary: '#004c80',
        accent: '#FFFFFF'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const countryList = document.getElementById('countryList');
    const customizationGrid = document.getElementById('customizationGrid');
    const primaryColorStop = document.getElementById('primaryColor');
    const secondaryColorStop = document.getElementById('secondaryColor');
    const accentPath = document.getElementById('accentColor');
    const teamName = document.getElementById('teamName');
    const teamDesc = document.getElementById('teamDesc');
    const jerseyWrapper = document.querySelector('.jersey-wrapper');
    const collectionGrid = document.getElementById('collectionGrid');

    // Populate Buttons
    teams.forEach((team, index) => {
        // Create Simulator Buttons
        const btn = document.createElement('button');
        btn.className = `country-btn ${index === 0 ? 'active' : ''}`;
        btn.innerHTML = `<span style="display:inline-block; width:15px; height:15px; border-radius:50%; background:${team.primary}; border:1px solid rgba(255,255,255,0.2);"></span> ${team.name}`;
        btn.onclick = () => selectTeam(team.id, btn);
        countryList.appendChild(btn);

        // Create Collection Cards
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-icon" style="background: linear-gradient(135deg, ${team.primary}, ${team.secondary}); border: 2px solid ${team.accent}">
                <span style="color: ${team.primary === '#FFFFFF' || team.primary === '#FDE100' ? '#000' : '#fff'}; text-shadow: 0px 2px 4px rgba(0,0,0,0.3);">${team.name.substring(0,3).toUpperCase()}</span>
            </div>
            <h3>${team.name}</h3>
            <p style="color: var(--text-muted); margin-top:0.5rem; font-size:0.9rem;">View HD Palette</p>
        `;
        card.onclick = () => {
            document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' });
            const targetBtn = Array.from(countryList.children).find(b => b.textContent.includes(team.name));
            if(targetBtn) selectTeam(team.id, targetBtn);
        };
        collectionGrid.appendChild(card);
    });

    if (customizationGrid && window.GLOBALKITS_KNOWLEDGE) {
        window.GLOBALKITS_KNOWLEDGE.customization.options.forEach((opt) => {
            const card = document.createElement('div');
            card.className = 'custom-card glass-panel';
            card.innerHTML = `
                <h3>${opt.name}</h3>
                <p>${opt.description}</p>
                <span class="custom-price">${opt.priceNote}</span>
            `;
            customizationGrid.appendChild(card);
        });
    }

    // Initial Selection
    applyTeamColors(teams[0]);

    function selectTeam(id, btnElement) {
        // Update active class
        document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');

        const team = teams.find(t => t.id === id);
        
        // Animation
        jerseyWrapper.classList.add('animating');
        document.getElementById('teamInfo').style.opacity = 0;
        document.getElementById('teamInfo').style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            applyTeamColors(team);
            jerseyWrapper.classList.remove('animating');
            document.getElementById('teamInfo').style.opacity = 1;
            document.getElementById('teamInfo').style.transform = 'translateY(0)';
        }, 300); // Wait for half the flip animation
    }

    function applyTeamColors(team) {
        primaryColorStop.setAttribute('stop-color', team.primary);
        secondaryColorStop.setAttribute('stop-color', team.secondary);
        accentPath.setAttribute('fill', team.accent);
        
        teamName.textContent = team.name;
        teamDesc.textContent = team.desc;
        
        // Update global accent color for a more immersive feel
        const rootAccent = (team.primary === '#FFFFFF' || team.primary === '#FDE100') ? team.accent : team.primary;
        document.documentElement.style.setProperty('--accent', rootAccent);
    }
});
