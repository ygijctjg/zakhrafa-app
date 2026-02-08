const alphaMaps = {
    bold: { a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳', A:'𝐀',B:'𝐁',C:'𝐂',D:'𝐃',E:'𝐄',F:'𝐅',G:'𝐆',H:'𝐇',I:'𝐈',J:'𝐉',K:'𝐊',L:'𝐋',M:'𝐌',N:'𝐍',O:'𝐎',P:'𝐏',Q:'𝐐',R:'𝐑',S:'𝐒',T:'𝐓',U:'𝐔',V:'𝐕',W:'𝐖',X:'𝐗',Y:'𝐘',Z:'𝐙' },
    italic: { a:'𝒂',b:'𝒃',c:'𝒄',d:'𝒅',e:'𝒆',f:'𝒇',g:'𝒈',h:'𝒉',i:'𝒊',j:'𝒋',k:'𝒌',l:'𝒍',m:'𝒎',n:'𝒏',o:'𝒐',p:'𝒑',q:'𝒒',r:'𝒓',s:'𝒔',t:'𝒕',u:'𝒖',v:'𝒗',w:'𝒘',x:'𝒙',y:'𝒚',z:'𝒛', A:'𝑨',B:'𝑩',C:'𝑪',D:'𝑫',E:'𝑬',F:'𝑭',G:'𝑮',H:'𝑯',I:'𝑰',J:'𝑱',K:'𝑲',L:'𝑳',M:'𝑴',N:'𝑵',O:'𝑶',P:'𝑷',Q:'𝑸',R:'𝑹',S:'𝑺',T:'𝑻',U:'𝑼',V:'𝑽',W:'𝑾',X:'𝑿',Y:'𝒀',Z:'𝒁' },
    mono: { a:'𝚊',b:'𝚋',c:'𝚌',d:'𝚍',e:'𝚎',f:'𝚏',g:'𝚐',h:'𝚑',i:'𝚒',j:'𝚓',k:'𝚔',l:'𝚕',m:'𝚖',n:'𝚗',o:'𝚘',p:'𝚙',q:'𝚚',r:'𝚛',s:'𝚜',t:'𝚝',u:'𝚞',v:'𝚟',w:'𝚠',x:'𝚡',y:'𝚢',z:'𝚣', A:'𝙰',B:'𝙱',C:'𝙲',D:'𝙳',E:'𝙴',F:'𝙵',G:'𝙶',H:'𝙷',I:'𝙸',J:'𝙹',K:'𝙺',L:'𝙻',M:'𝙼',N:'𝙽',O:'𝙾',P:'𝙿',Q:'𝚀',R:'𝚁',S:'𝚂',T:'𝚃',U:'𝚄',V:'Ѵ',W:'𝚆',X:'𝚇',Y:'Y',Z:'𝚉' },
    bubble: { a:'ⓐ',b:'ⓑ',c:'ⓒ',d:'ⓓ',e:'ⓔ',f:'ⓕ',g:'ⓖ',h:'ⓗ',i:'ⓘ',j:'ⓙ',k:'ⓚ',l:'ⓛ',m:'ⓜ',n:'ⓝ',o:'ⓞ',p:'ⓟ',q:'ⓠ',r:'ⓡ',s:'ⓢ',t:'ⓣ',u:'ⓤ',v:'ⓥ',w:'ⓦ',x:'ⓧ',y:'ⓨ',z:'ⓩ', A:'Ⓐ',B:'Ⓑ',C:'Ⓒ',D:'Ⓓ',E:'Ⓔ',F:'Ⓕ',G:'Ⓖ',H:'ℋ',I:'Ⓘ',J:'Ⓙ',K:'Ⓚ',L:'Ⓛ',M:'Ⓜ',N:'Ⓝ',O:'Ⓞ',P:'Ⓟ',Q:'Ⓠ',R:'Ⓡ',S:'Ⓢ',T:'Ⓣ',U:'Ⓤ',V:'Ⓥ',W:'Ⓦ',X:'Ⓧ',Y:'Ⓨ',Z:'Ⓩ' }
};

const templates = ["꧁ [نص] ꧂", "༺ [نص] ༻", "★ [نص] ★", "⚔️ [نص] ⚔️", "👑 [نص] 👑", "🔥 [نص] 🔥", "『 [نص] 』", "⏤͟͟͞͞ [نص]", "𓆩𓇢𓆸 [نص]"];

let favorites = JSON.parse(localStorage.getItem('erenFavs')) || [];

function updateUI() {
    const text = document.getElementById('userInput').value.trim();
    const box = document.getElementById('resultsBox');
    box.innerHTML = '';

    if (!text) {
        document.getElementById('favoritesSection').style.display = 'none';
        return;
    }

    // توليد الخطوط
    Object.keys(alphaMaps).forEach(style => {
        const transformed = text.split('').map(c => alphaMaps[style][c] || c).join('');
        renderCard(box, transformed, style);
    });

    // توليد الزخارف
    const bText = text.split('').map(c => alphaMaps.bold[c] || c).join('');
    templates.forEach(t => renderCard(box, t.replace("[نص]", bText), "DECO"));

    renderFavorites();
}

function renderCard(container, text, label) {
    const isFav = favorites.includes(text);
    const card = document.createElement('div');
    card.className = 'card-pro';
    card.innerHTML = `
        <div class="card-label">${label}</div>
        <div class="card-content">${text}</div>
        <div class="btn-row">
            <button class="btn-copy" onclick="copy('${text}', this)">نسخ</button>
            <button class="btn-fav" onclick="toggleFav('${text}')">${isFav ? '❤️' : '🤍'}</button>
        </div>
    `;
    container.appendChild(card);
}

function renderFavorites() {
    const fBox = document.getElementById('favoritesBox');
    fBox.innerHTML = '';
    if (favorites.length > 0) {
        document.getElementById('favoritesSection').style.display = 'block';
        favorites.forEach(t => renderCard(fBox, t, "SAVED"));
    } else { document.getElementById('favoritesSection').style.display = 'none'; }
}

function toggleFav(t) {
    const i = favorites.indexOf(t);
    if (i > -1) favorites.splice(i, 1); else favorites.push(t);
    localStorage.setItem('erenFavs', JSON.stringify(favorites));
    updateUI();
}

function copy(t, b) {
    navigator.clipboard.writeText(t);
    const old = b.innerText; b.innerText = "DONE";
    setTimeout(() => b.innerText = old, 1000);
}

function resetInput() {
    document.getElementById('userInput').value = '';
    updateUI();
}

window.onload = () => {
    setTimeout(() => document.getElementById('splash-screen').style.transform = 'translateY(-100%)', 2500);
    renderFavorites();
};

document.getElementById('userInput').addEventListener('input', updateUI);
