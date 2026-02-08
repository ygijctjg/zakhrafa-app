const userInput = document.getElementById('userInput');
const resultsBox = document.getElementById('resultsBox');
const favBox = document.getElementById('favoritesBox');
const favSection = document.getElementById('favoritesSection');

// مكتبة الخطوط الموسعة (20 نوعاً)
const alpha = {
    bold: { a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳', A:'𝐀',B:'𝐁',C:'𝐂',D:'𝐃',E:'𝐄',F:'𝐅',G:'𝐆',H:'𝐇',I:'𝐈',J:'𝐉',K:'𝐊',L:'𝐋',M:'𝐌',N:'𝐍',O:'𝐎',P:'𝐏',Q:'𝐐',R:'𝐑',S:'𝐒',T:'𝐓',U:'𝐔',V:'𝐕',W:'𝐖',X:'𝐗',Y:'𝐘',Z:'𝐙' },
    italic: { a:'𝒂',b:'𝒃',c:'𝒄',d:'𝒅',e:'𝒆',f:'𝒇',g:'𝒈',h:'𝒉',i:'𝒊',j:'𝒋',k:'𝒌',l:'𝒍',m:'𝒎',n:'𝒏',o:'𝒐',p:'𝒑',q:'𝒒',r:'𝒓',s:'𝒔',t:'𝒕',u:'𝒖',v:'𝒗',w:'𝒘',x:'𝒙',y:'𝒚',z:'𝒛', A:'𝑨',B:'𝑩',C:'𝑪',D:'𝑫',E:'𝑬',F:'𝑭',G:'𝑮',H:'𝑯',I:'𝑰',J:'𝑱',K:'𝑲',L:'𝑳',M:'𝑴',N:'𝑵',O:'𝑶',P:'𝑷',Q:'𝑸',R:'𝑹',S:'𝑺',T:'𝑻',U:'𝑼',V:'𝑽',W:'𝑾',X:'𝑿',Y:'𝒀',Z:'𝒁' },
    mono: { a:'𝚊',b:'𝚋',c:'𝚌',d:'𝚍',e:'𝚎',f:'𝚏',g:'𝚐',h:'𝚑',i:'𝚒',j:'𝚓',k:'𝚔',l:'𝚕',m:'𝚖',n:'𝚗',o:'𝚘',p:'𝚙',q:'𝚚',r:'𝚛',s:'𝚜',t:'𝚝',u:'𝚞',v:'𝚟',w:'𝚠',x:'𝚡',y:'𝚢',z:'𝚣', A:'𝙰',B:'𝙱',C:'𝙲',D:'𝙳',E:'𝙴',F:'𝙵',G:'𝙶',H:'𝙷',I:'𝙸',J:'𝙹',K:'𝙺',L:'𝙻',M:'𝙼',N:'𝙽',O:'𝙾',P:'𝙿',Q:'𝚀',R:'𝚁',S:'𝚂',T:'𝚃',U:'𝚄',V:'𝚅',W:'𝚆',X:'𝚇',Y:'Y',Z:'𝚉' },
    bubble: { a:'ⓐ',b:'ⓑ',c:'ⓒ',d:'ⓓ',e:'ⓔ',f:'ⓕ',g:'ⓖ',h:'ⓗ',i:'ⓘ',j:'ⓙ',k:'ⓚ',l:'ⓛ',m:'ⓜ',n:'ⓝ',o:'ⓞ',p:'ⓟ',q:'ⓠ',r:'ⓡ',s:'ⓢ',t:'ⓣ',u:'ⓤ',v:'ⓥ',w:'ⓦ',x:'ⓧ',y:'ⓨ',z:'ⓩ', A:'Ⓐ',B:'Ⓑ',C:'Ⓒ',D:'Ⓓ',E:'Ⓔ',F:'Ⓕ',G:'Ⓖ',H:'ℋ',I:'Ⓘ',J:'Ⓙ',K:'Ⓚ',L:'Ⓛ',M:'Ⓜ',N:'Ⓝ',O:'Ⓞ',P:'Ⓟ',Q:'Ⓠ',R:'Ⓡ',S:'Ⓢ',T:'Ⓣ',U:'Ⓤ',V:'Ⓥ',W:'Ⓦ',X:'Ⓧ',Y:'Ⓨ',Z:'Ⓩ' },
    script: { a:'𝒶',b:'𝒷',c:'𝒸',d:'𝒹',e:'𝑒',f:'𝒻',g:'𝑔',h:'𝒽',i:'𝒾',j:'𝒿',k:'𝓀',l:'𝓁',m:'𝓂',n:'𝓃',o:'𝑜',p:'𝓅',q:'𝓆',r:'𝓇',s:'𝓈',t:'𝓉',u:'𝓊',v:'𝓋',w:'𝓌',x:'𝓍',y:'𝓎',z:'𝓏', A:'𝒜',B:'ℬ',C:'𝒞',D:'𝒟',E:'ℰ',F:'ℱ',G:'𝒢',H:'ℋ',I:'ℐ',J:'𝒥',K:'𝒦',L:'ℒ',M:'ℳ',N:'𝒩',O:'𝒪',P:'𝒫',Q:'𝒬',R:'ℛ',S:'𝒮',T:'𝒯',U:'𝒰',V:'𝒱',W:'𝒲',X:'𝒳',Y:'𝒴',Z:'𝒵' },
    gothic: { a:'𝔞',b:'𝔟',c:'𝔠',d:'𝔡',e:'𝔢',f:'𝔣',g:'𝔤',h:'',i:'𝔦',j:'𝔧',k:'𝔨',l:'𝔩',m:'𝔪',n:'𝔫',o:'𝔬',p:'𝔭',q:'𝔮',r:'𝔯',s:'𝔰',t:'𝔱',u:'𝔲',v:'𝔳',w:'𝔴',x:'𝔵',y:'𝔶',z:'𝔷', A:'𝔄',B:'𝔅',C:'ℭ',D:'𝔇',E:'𝔈',F:'𝔉',G:'𝔊',H:'ℌ',I:'ℑ',J:'𝔍',K:'𝔎',L:'𝔏',M:'𝔐',N:'𝔑',O:'𝔒',P:'𝔓',Q:'𝔔',R:'ℜ',S:'𝔖',T:'𝔗',U:'𝔘',V:'𝔙',W:'𝔚',X:'𝔛',Y:'𝔜',Z:'ℨ' },
    squares: { a:'🄰',b:'🄱',c:'🄲',d:'🄳',e:'🄴',f:'🄵',g:'🄶',h:'🄷',i:'🄸',j:'🄹',k:'🄺',l:'🄻',m:'🄼',n:'🄽',o:'🄾',p:'🄿',q:'🅀',r:'🅁',s:'🅂',t:'🅃',u:'🅄',v:'🅅',w:'🅆',x:'🅇',y:'🅈',z:'🅉', A:'🄰',B:'🄱',C:'🄲',D:'🄳',E:'🄴',F:'🄵',G:'🄶',H:'🄷',I:'🄸',J:'🄹',K:'🄺',L:'🄻',M:'🄼',N:'🄽',O:'🄾',P:'🄿',Q:'🅀',R:'🅁',S:'🅂',T:'🅃',U:'🅄',V:'🅅',W:'🅆',X:'🅇',Y:'🅈',Z:'🅉' },
    flipped: { a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'uu',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z', A:'∀',B:'𐐒',C:'Ɔ',D:'◖',E:'Ǝ',F:'Ⅎ',G:'⅁',H:'H',I:'I',J:'Ր',K:'ʞ',L:'˥',M:'W',N:'N',O:'O',P:'Ԁ',Q:'Ό',R:'ᴚ',S:'S',T:'⊥',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z' },
    aesthetic: { a:'ﾑ',b:'乃',c:'ᄃ',d:'り',e:'乇',f:'ｷ',g:'ム',h:'ん',i:'ﾉ',j:'ﾌ',k:'ズ',l:'ﾚ',m:'M',n:'刀',o:'の',p:'ｱ',q:'ゐ',r:'尺',s:'丂',t:'ｲ',u:'ひ',v:'√',w:'W',x:'ﾒ',y:'ﾘ',z:'乙' }
};

// قوالب الزخارف الرمزية
const templates = [
    "꧁ [نص] ꧂", "༺ [نص] ༻", "★ [نص] ★", "⚔️ [نص] ⚔️", "👑 [نص] 👑", "🔥 [نص] 🔥", "⚡ [نص] ⚡", "『 [نص] 』", "🉐 [نص] 🉐", "『🔱 [نص] 🔱』", "𓆩𓇢𓆸 [نص]", "⏤͟͟͞͞ [نص]", "⩹ [نص] ⩺", "🌊 [نص] 🌊", "⛩️ [نص] ⛩️", "☯️ [نص] ☯️", "🌸 [نص] 🌸", "⛓️ [نص] ⛓️", "📍 [نص] 📍", "🌙 [نص] 🌙"
];

let favorites = JSON.parse(localStorage.getItem('erenFavs')) || [];

function updateUI() {
    const text = userInput.value.trim();
    resultsBox.innerHTML = '';
    if (!text) return;

    // توليد الخطوط الأساسية (بدون رموز)
    Object.keys(alpha).forEach(style => {
        const transformed = text.split('').map(c => alpha[style][c] || c).join('');
        renderCard(resultsBox, transformed, style.toUpperCase());
    });

    // توليد الزخارف الرمزية (دمج الخط العريض مع القوالب)
    const bText = text.split('').map(c => alpha.bold[c] || c).join('');
    templates.forEach((temp, i) => {
        const final = temp.replace("[نص]", bText);
        renderCard(resultsBox, final, `VIP #${i + 1}`);
    });

    renderFavorites();
}

function renderFavorites() {
    favBox.innerHTML = '';
    if (favorites.length > 0) {
        favSection.style.display = 'block';
        favorites.forEach((text, i) => renderCard(favBox, text, "SAVED", true));
    } else {
        favSection.style.display = 'none';
    }
}

function renderCard(container, text, label, isFav = false) {
    const div = document.createElement('div');
    div.className = 'card';
    const isAlreadyFav = favorites.includes(text);

    div.innerHTML = `
        <div class="card-title">⭐ ${label}</div>
        <div class="card-text">${text}</div>
        <div class="action-btns">
            <button class="copy-btn" onclick="copy('${text}', this)">نسخ</button>
            <button class="fav-btn ${isAlreadyFav ? 'active' : ''}" onclick="toggleFav('${text}')">
                ${isAlreadyFav ? '❤️' : '🤍'}
            </button>
        </div>
    `;
    container.appendChild(div);
}

function toggleFav(text) {
    const index = favorites.indexOf(text);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(text);
    localStorage.setItem('erenFavs', JSON.stringify(favorites));
    updateUI();
}

function copy(text, btn) {
    navigator.clipboard.writeText(text);
    btn.innerText = "✅";
    setTimeout(() => btn.innerText = "نسخ", 1000);
}

function addNewTemplate() {
    const input = document.getElementById('customTemplate');
    if (!input.value.includes("[نص]")) return alert("ضع [نص] في القالب");
    templates.unshift(input.value); // إضافة في البداية
    input.value = "";
    updateUI();
}

// التحكم في شاشة الترحيب
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.remove(), 800);
        }
    }, 2500);
});

userInput.addEventListener('input', updateUI);
