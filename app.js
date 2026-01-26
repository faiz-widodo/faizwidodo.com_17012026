// ============================================
// PORTFOLIO RENDERING LOGIC
// Dynamically renders HTML content from config.js
// Reads portfolioConfig and builds the DOM accordingly
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    renderPortfolio();
});

function renderPortfolio() {
    if (typeof portfolioConfig === 'undefined') {
        console.error('portfolioConfig not found. Make sure config.js is loaded.');
        return;
    }

    // Render Navigation
    document.getElementById('nav-brand').textContent = portfolioConfig.nav.brand;
    const connectBtn = document.getElementById('nav-connect');
    connectBtn.href = portfolioConfig.nav.connectButton.link;
    // Update button text - replace text content while keeping icon
    const icon = connectBtn.querySelector('.material-symbols-outlined');
    connectBtn.innerHTML = portfolioConfig.nav.connectButton.text + ' ';
    if (icon) {
        connectBtn.appendChild(icon);
    }

    // Render Hero
    document.getElementById('hero-status').textContent = portfolioConfig.hero.status;
    document.getElementById('hero-title-1').textContent = portfolioConfig.hero.title.line1;
    document.getElementById('hero-title-2').textContent = portfolioConfig.hero.title.line2;
    
    // Render hero description with highlights
    const heroDesc = document.getElementById('hero-description');
    let descText = portfolioConfig.hero.description;
    portfolioConfig.hero.highlightWords.forEach(word => {
        descText = descText.replace(new RegExp(word, 'g'), `<span class="text-white">${word}</span>`);
    });
    heroDesc.innerHTML = descText;

    // Render Companies with reference styling
    const companiesList = document.getElementById('companies-list');
    companiesList.innerHTML = '';
    portfolioConfig.companies.forEach((company) => {
        const companyName = typeof company === 'string' ? company : company.name;
        const companyUrl = typeof company === 'object' && company.url ? company.url : '#';
        const glowColor = typeof company === 'object' && company.glowColor ? company.glowColor : '#1f8aad';
        
        const card = document.createElement(companyUrl !== '#' ? 'a' : 'div');
        if (companyUrl !== '#') {
            card.href = companyUrl;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
        }
        
        card.className = 'group relative aspect-video bg-white/[0.02] border border-white/5 rounded flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] overflow-hidden';
        card.style.setProperty('--glow-color', glowColor);
        
        card.innerHTML = `
            <div class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style="background-color: ${glowColor}; box-shadow: 0 0 8px ${glowColor};"></div>
            <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent" style="background: linear-gradient(to right, transparent, ${glowColor}66, transparent);"></div>
            <span class="mono-text font-bold text-xs tracking-widest text-white/90">${companyName}</span>
        `;
        
        companiesList.appendChild(card);
    });

    // Render Domains with animated scrolling (same style as Competencies)
    const domainsList = document.getElementById('domains-list');
    domainsList.innerHTML = '';
    
    // Set scroll speed from config
    const domainScrollSpeed = portfolioConfig.domainScrollSpeed || 60;
    domainsList.style.setProperty('--scroll-speed', `${domainScrollSpeed}s`);
    
    // Duplicate domains for seamless infinite loop (2 sets total)
    const domainsToRender = [...portfolioConfig.domains, ...portfolioConfig.domains];
    domainsToRender.forEach(domain => {
        const domainName = typeof domain === 'string' ? domain : domain.name;
        const domainIcon = typeof domain === 'object' && domain.icon ? domain.icon : 'terminal';
        
        const div = document.createElement('div');
        div.className = 'p-4 bg-white/5 border border-border-subtle rounded flex items-center justify-between group hover:border-primary/50 transition-colors whitespace-nowrap flex-shrink-0';
        div.innerHTML = `
            <span class="text-[11px] mono-text text-primary font-bold tracking-wider">${domainName}</span>
            <span class="material-symbols-outlined text-slate-700 text-[16px] ml-4">${domainIcon}</span>
        `;
        domainsList.appendChild(div);
    });

    // Render Portfolio - Horizontal scroll for all devices
    const portfolioScroll = document.getElementById('portfolio-scroll');
    portfolioScroll.innerHTML = '';
    
    portfolioConfig.portfolio.forEach(project => {
        if (project.active !== false) {
            const card = createPortfolioCard(project, 'scroll');
            portfolioScroll.appendChild(card);
        }
    });

    // Render Competencies with animated scrolling (left to right)
    const competenciesList = document.getElementById('competencies-list');
    competenciesList.innerHTML = '';
    
    // Set scroll speed from config (slightly faster than domains)
    const compScrollSpeed = portfolioConfig.competenceScrollSpeed || 100;
    competenciesList.style.setProperty('--scroll-speed', `${compScrollSpeed}s`);
    
    // Change class to reverse scroll animation (left to right)
    competenciesList.classList.remove('animate-scroll');
    competenciesList.classList.add('animate-scroll-reverse');
    
    // Duplicate competencies for seamless infinite loop (2 sets total)
    const compsToRender = [...portfolioConfig.competencies, ...portfolioConfig.competencies];
    compsToRender.forEach(comp => {
        const div = document.createElement('div');
        div.className = 'p-4 bg-white/5 border border-border-subtle rounded flex items-center justify-between group hover:border-primary/50 transition-colors whitespace-nowrap flex-shrink-0';
        div.innerHTML = `
            <span class="text-[11px] mono-text text-primary font-bold tracking-wider">${comp.name}</span>
            <span class="material-symbols-outlined text-slate-700 text-[16px] ml-4">${comp.icon}</span>
        `;
        competenciesList.appendChild(div);
    });

    // Render Mentorship Stats
    const mentorshipStats = document.getElementById('mentorship-stats');
    if (mentorshipStats) {
        mentorshipStats.innerHTML = `
            <div class="p-4 border border-border-subtle bg-white/[0.02] flex flex-col gap-1">
                <span class="text-xl font-black text-white">${portfolioConfig.mentorship.stats.totalSessions}</span>
                <span class="mono-text text-[8px] text-slate-500 uppercase tracking-tighter">TOTAL SESSIONS</span>
            </div>
            <div class="p-4 border border-border-subtle bg-white/[0.02] flex flex-col gap-1">
                <span class="text-xl font-black text-white">${portfolioConfig.mentorship.stats.minutesInvested}</span>
                <span class="mono-text text-[8px] text-slate-500 uppercase tracking-tighter">MINUTES INVESTED</span>
            </div>
            <div class="p-4 border border-border-subtle bg-white/[0.02] flex flex-col gap-1">
                <span class="text-xl font-black text-white text-primary">${portfolioConfig.mentorship.stats.attendance}</span>
                <span class="mono-text text-[8px] text-slate-500 uppercase tracking-tighter">ATTENDANCE</span>
            </div>
            <div class="p-4 border border-border-subtle bg-white/[0.02] flex flex-col gap-1">
                <span class="text-xl font-black text-white">${portfolioConfig.mentorship.stats.countriesMentored}</span>
                <span class="mono-text text-[8px] text-slate-500 uppercase tracking-tighter">COUNTRIES MENTORED</span>
            </div>
        `;
    }

    // Render Mentorship Platforms
    const platformsList = document.getElementById('mentorship-platforms');
    if (platformsList) {
        platformsList.innerHTML = '';
        portfolioConfig.mentorship.platforms.forEach(platform => {
            const platformUrl = platform.url || '#';
            const platformName = platform.name;
            
            const div = document.createElement(platformUrl !== '#' ? 'a' : 'div');
            if (platformUrl !== '#') {
                div.href = platformUrl;
                div.target = '_blank';
                div.rel = 'noopener noreferrer';
            }
            div.className = 'h-16 flex items-center justify-center border border-border-subtle rounded bg-white/[0.02] grayscale opacity-60 hover:opacity-80 transition-opacity';
            div.innerHTML = `<span class="mono-text font-bold text-sm tracking-tighter text-slate-300">${platformName}</span>`;
            platformsList.appendChild(div);
        });
    }

    // Render ADPList Embed
    const adplistEmbed = document.getElementById('adplist-embed');
    if (adplistEmbed && portfolioConfig.mentorship.adplistEmbed) {
        adplistEmbed.innerHTML = portfolioConfig.mentorship.adplistEmbed;
    }

    // Render Education
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = '';
    portfolioConfig.education.forEach((edu, index) => {
        const div = document.createElement('div');
        div.className = 'relative';
        const dotColor = (edu.badges && edu.badges.length > 0 && edu.badges[0].color === 'primary') ? 'bg-primary' : 'bg-slate-700';
        
        // Build institution badge
        let institutionBadge = '';
        if (edu.institution) {
            const inst = edu.institution;
            const instUrl = inst.url || '#';
            const instText = inst.text || '';
            const instIcon = inst.icon || 'location_on';
            
            if (instUrl !== '#') {
                institutionBadge = `
                    <a href="${instUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-slate-500/10 text-slate-400 border border-slate-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider hover:opacity-80 transition-opacity">
                        <span class="material-symbols-outlined text-[14px] mr-1">${instIcon}</span>
                        ${instText}
                    </a>
                `;
            } else {
                institutionBadge = `
                    <span class="inline-flex items-center bg-slate-500/10 text-slate-400 border border-slate-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        <span class="material-symbols-outlined text-[14px] mr-1">${instIcon}</span>
                        ${instText}
                    </span>
                `;
            }
        }
        
        // Build distinction badge (color between institution and scholarship)
        let distinctionBadge = '';
        if (edu.distinction) {
            const dist = edu.distinction;
            const distIcon = dist.icon || 'grade';
            
            // Determine middle color: if scholarship is primary (blue), use blue-grey; otherwise use slate-cyan
            const hasPrimaryScholarship = edu.badges && edu.badges.length > 0 && edu.badges[0].color === 'primary';
            
            if (hasPrimaryScholarship) {
                // MSc: Distinction uses primary blue (swapped from cyan)
                distinctionBadge = `
                    <span class="inline-flex items-center bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        <span class="material-symbols-outlined text-[14px] mr-1">${distIcon}</span>
                        ${dist.text}
                    </span>
                `;
            } else {
                // BSc: Cum Laude uses primary blue (same as Distinction in MSc)
                distinctionBadge = `
                    <span class="inline-flex items-center bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        <span class="material-symbols-outlined text-[14px] mr-1">${distIcon}</span>
                        ${dist.text}
                    </span>
                `;
            }
        }
        
        // Build other badges (like Chevening Scholarship)
        let badgesHTML = '';
        if (edu.badges && edu.badges.length > 0) {
            edu.badges.forEach(badge => {
                const isPrimary = badge.color === 'primary';
                const isCyan = badge.color === 'cyan';
                const isSlateDark = badge.color === 'slate-dark';
                let bgClass, textClass, borderClass;
                
                if (isPrimary) {
                    // MSc: Chevening Scholarship uses cyan (swapped from primary)
                    bgClass = 'bg-cyan-500/10';
                    textClass = 'text-cyan-400';
                    borderClass = 'border-cyan-500/20';
                } else if (isCyan) {
                    // BSc: ABB Scholarship uses cyan (same as Chevening)
                    bgClass = 'bg-cyan-500/10';
                    textClass = 'text-cyan-400';
                    borderClass = 'border-cyan-500/20';
                } else if (isSlateDark) {
                    bgClass = 'bg-slate-600/10';
                    textClass = 'text-slate-300';
                    borderClass = 'border-slate-600/20';
                } else {
                    bgClass = 'bg-slate-500/10';
                    textClass = 'text-slate-400';
                    borderClass = 'border-slate-500/20';
                }
                
                const badgeUrl = badge.url || '#';
                
                if (badgeUrl !== '#') {
                    badgesHTML += `
                        <a href="${badgeUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center ${bgClass} ${textClass} border ${borderClass} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider hover:opacity-80 transition-opacity">
                            <span class="material-symbols-outlined text-[14px] mr-1">${badge.icon}</span>
                            ${badge.text}
                        </a>
                    `;
                } else {
                    badgesHTML += `
                        <span class="inline-flex items-center ${bgClass} ${textClass} border ${borderClass} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            <span class="material-symbols-outlined text-[14px] mr-1">${badge.icon}</span>
                            ${badge.text}
                        </span>
                    `;
                }
            });
        }
        
        // Build degree text
        let degreeHTML = edu.degree;
        
        div.innerHTML = `
            <div class="absolute -left-[27px] sm:-left-[31px] top-0 w-3 h-3 rounded-full ${dotColor} border-4 border-background-dark"></div>
            <div class="flex flex-col gap-2">
                <h4 class="font-bold text-base sm:text-lg">${degreeHTML}</h4>
                <div class="flex flex-wrap gap-2 mt-2">
                    ${institutionBadge}
                    ${distinctionBadge}
                    ${badgesHTML}
                </div>
            </div>
        `;
        educationList.appendChild(div);
    });

    // Render Featured Articles (Medium Posts)
    const mediumEmbed = document.getElementById('medium-embed');
    if (mediumEmbed) {
        console.log('medium-embed element found');
        console.log('portfolioConfig.featuredArticles:', portfolioConfig.featuredArticles);
        if (portfolioConfig.featuredArticles && portfolioConfig.featuredArticles.length > 0) {
            console.log('Rendering', portfolioConfig.featuredArticles.length, 'articles');
            mediumEmbed.innerHTML = '';
            portfolioConfig.featuredArticles.forEach((article, index) => {
                console.log('Rendering article', index, article.title);
                const articleCard = document.createElement('div');
                articleCard.className = 'border border-border-subtle bg-white/[0.02] rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4';
                articleCard.innerHTML = `
                    <h4 class="text-slate-200 text-lg font-bold">${article.title}</h4>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-primary/10 border border-primary/20 text-primary mono-text text-[10px] font-bold rounded hover:bg-primary/20 transition-colors flex items-center gap-2 whitespace-nowrap">
                        READ ON MEDIUM
                        <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                `;
                mediumEmbed.appendChild(articleCard);
            });
        } else {
            console.log('No featured articles found, hiding section');
            // Hide section if no articles
            const section = mediumEmbed.closest('section');
            if (section) {
                section.style.display = 'none';
            }
        }
    } else {
        console.error('medium-embed element not found in DOM');
    }

    // Render Socials
    const socialsList = document.getElementById('socials-list');
    socialsList.innerHTML = '';
    portfolioConfig.socials.forEach(social => {
        const a = document.createElement('a');
        a.className = 'flex flex-col items-center justify-center p-8 border border-border-subtle rounded-lg bg-white/5 hover:border-primary transition-colors';
        a.href = social.link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = `
            <span class="material-symbols-outlined text-primary mb-3 text-3xl">${social.icon}</span>
            <span class="mono-text text-[10px] font-bold uppercase tracking-widest text-slate-400">${social.name}</span>
        `;
        socialsList.appendChild(a);
    });

    // Render Footer
    document.getElementById('footer-text').textContent = portfolioConfig.footer.text;

    // Show/hide DELIVERED_RESULTS section based on production config
    const deliveredResultsSection = document.getElementById('delivered-results-section');
    if (deliveredResultsSection && portfolioConfig.production) {
        if (portfolioConfig.production.showDeliveredResults) {
            deliveredResultsSection.style.display = 'block';
        } else {
            deliveredResultsSection.style.display = 'none';
        }
    }
}

function createPortfolioCard(project, layout = 'scroll') {
    const card = document.createElement('div');
    const isActive = project.active !== false;
    
    // Card width for horizontal scrolling
    card.className = `min-w-[400px] md:min-w-[500px] snap-center flex-shrink-0 ${!isActive ? 'opacity-50' : ''}`;
    
    if (project.locked) {
        card.innerHTML = `
            <div class="relative rounded-lg overflow-hidden border border-border-subtle bg-[#121617] h-full">
                <div class="w-full aspect-video bg-cover bg-center grayscale" style="background-image: url('${project.image}');"></div>
                <div class="p-5">
                    <h4 class="text-xl font-bold mb-4">${project.title}</h4>
                    <p class="mono-text text-[10px] text-slate-500">ENCRYPTED_CONTENT.LOCKED</p>
                </div>
            </div>
        `;
    } else {
        card.innerHTML = `
            <div class="relative rounded-lg overflow-hidden border border-border-subtle bg-[#121617] shadow-2xl h-full flex flex-col">
                <div class="flex items-center gap-1.5 px-3 py-2 border-b border-border-subtle bg-slate-800/50">
                    <div class="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div class="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div class="w-2 h-2 rounded-full bg-green-500/50"></div>
                    <div class="ml-4 flex-1 h-4 bg-black/40 rounded text-[9px] flex items-center px-2 text-slate-500 mono-text">SRC/${project.company.toUpperCase().replace(/\s+/g, '_')}_CORE.BIN</div>
                </div>
                <div class="w-full aspect-video bg-cover bg-center" style="background-image: url('${project.image}');"></div>
                <div class="p-5 flex-1 flex flex-col">
                    <div class="flex flex-col gap-1 mb-4">
                        <span class="text-[10px] mono-text font-bold text-slate-500 uppercase">${project.company}</span>
                        <h4 class="text-xl font-bold">${project.title}</h4>
                    </div>
                    ${project.metrics && project.metrics.length > 0 ? `
                    <div class="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border-subtle">
                        ${project.metrics.map(metric => `
                            <div>
                                <p class="text-[9px] mono-text text-slate-500 mb-1 uppercase">${metric.label}</p>
                                <p class="text-xs font-bold text-primary">${metric.value}</p>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    <a href="${project.link}" class="flex items-center gap-2 text-primary mono-text text-[11px] font-bold hover:text-primary/80 transition-colors mt-auto">
                        <span>TERMINAL_ACCESS</span>
                        <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
            </div>
        `;
    }
    
    return card;
}
