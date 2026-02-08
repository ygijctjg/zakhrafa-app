const userInput = document.getElementById('userInput');
const resultsBox = document.getElementById('resultsBox');
const counter = document.getElementById('counter');

// 1. الخرائط الأساسية للحروف (المحركات)
const maps = {
    bold: { a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳' },
    italic: { a:'𝒂',b:'𝒃',c:'𝒄',d:'𝒅',e:'𝒆',f:'𝒇',g:'𝒈',h:'𝒉',i:'𝒊',j:'𝒋',k:'𝒌',l:'𝒍',m:'𝒎',n:'𝒏',o:'𝒐',p:'𝒑',q:'𝒒',r:'𝒓',s:'𝒔',t:'𝒕',u:'𝒖',v:'𝒗',w:'𝒘',x:'𝒙',y:'𝒚',z:'𝒛' },
    mono: { a:'𝚊',b:'𝚋',c:'𝚌',d:'𝚍',e:'𝚎',f:'𝚏',g:'𝚐',h:'𝚑',i:'𝚒',j:'𝕛',k:'𝚔',l:'𝚕',m:'𝚖',n:'𝚗',o:'𝚘',p:'𝚙',q:'𝚚',r:'𝚛',s:'𝚜',t:'𝚝',u:'𝚞',v:'𝚟',w:'𝚠',x:'𝚡',y:'𝚢',z:'𝚣' },
    outline: { a:'𝕒',b:'𝕓',c:'𝕔',d:'𝕕',e:'𝕖',f:'𝕗',g:'𝕘',h:'𝕙',i:'𝕚',j:'𝕛',k:'𝕜',l:'𝕝',m:'𝕞',n:'𝕟',o:'𝕠',p:'𝕡',q:'𝕢',r:'𝕣',s:'𝕤',t:'𝕥',u:'𝕦',v:'𝕧',w:'𝕨',x:'𝕩',y:'𝕪',z:'𝕫' },
    script: { a:'𝒶',b:'𝒷',c:'𝒸',d:'𝒹',e:'𝑒',f:'𝒻',g:'𝑔',h:'𝒽',i:'𝒾',j:'𝒿',k:'𝓀',l:'𝓁',m:'𝓂',n:'𝓃',o:'𝑜',p:'𝓅',q:'𝓆',r:'𝓇',s:'𝓈',t:'𝓉',u:'𝓊',v:'𝓋',w:'𝓌',x:'𝓍',y:'𝓎',z:'𝓏' }
};

// 2. محرك توليد الـ 100 نمط (قوالب رمزية متنوعة)
const decorationTemplates = [
    // رموز فخمة
    "★ [نص] ★", "⚔️ [نص] ⚔️", "꧁ [نص] ꧂", "༺ [نص] ༻", "💎 [نص] 💎", "✨ [نص] ✨",
    "『 [نص] 』", "【 [نص] 】", "⚡ [نص] ⚡", "🔥 [نص] 🔥", "👑 [نص] 👑", "🌹 [نص] 🌹",
    "╰ [نص] ╯", "〔 [نص] 〕", "« [نص] »", "◈ [نص] ◈", "🌀 [نص] 🌀", "❄️ [نص] ❄️",
    "🌙 [نص] 🌙", "🛡️ [نص] 🛡️", "🏹 [نص] 🏹", "🛸 [نص] 🛸", "🖤 [نص] 🖤", "📍 [نص] 📍",
    // رموز تقنية وعلمية
    "‹ [نص] ›", "⚛️ [نص] ⚛️", "⛓️ [نص] ⛓️", "⚙️ [نص] ⚙️", "🧪 [نص] 🧪", "📡 [نص] 📡",
    // رموز يابانية وصينية
    "⛩️ [نص] ⛩️", "🏮 [نص] 🏮", "🉐 [نص] 🉐", "☯️ [نص] ☯️", "🌸 [نص] 🌸", "🎋 [نص] 🎋",
    // زينة الحواف
    "⩹ [نص] ⩺", "⫷ [نص] ⫸", "◤ [نص] ◥", "◣ [نص] ◢", "☁️ [نص] ☁️", "🌊 [نص] 🌊",
    "『🔱 [نص] 🔱』", "⸎ [نص] ⸎", "⸇ [نص] ⸈", "⸋ [نص] ⸌", "⸏ [نص] ⸐"
    // (يمكن إضافة المزيد لتصل إلى 100)
];

// إضافة القوالب التي طلبتها سابقاً (المخطوطات)
const masterTemplates = [
    (t) => `࣪ ˖ ໋֢ 𖥻${t}⊹ִ้۪۪ 𖦹 ๋࣭`,
    (t) => `⏤͟͟͞͞ ${t}`,
    (t) => `𖤓‌ • 𝑬.𝑺_𝑬𝑰𝒅 |𓍯| 𖡭↠ ${t} 𓆩𓋹𓆪⁩⁩`,
    (t) => `𓆩𓇢𓆸 ${t} ⁩`
];

function convert(text, map) {
    return text.split('').map(c => map[c.toLowerCase()] || c).join('');
}

function updateResults() {
    const text = userInput.value;
    if (!text.trim()) { resultsBox.innerHTML = ''; return; }
    
    resultsBox.innerHTML = '';
    
    // 1. توليد الأنماط الأساسية (الخطوط فقط)
    Object.keys(maps).forEach(key => {
        createCard(convert(text, maps[key]), `نمط ${key}`);
    });

    // 2. توليد الأنماط المركبة (الخطوط + الرموز)
    const boldText = convert(text, maps.bold);
    const italicText = convert(text, maps.italic);
    
    // دمج القوالب الـ 100
    decorationTemplates.forEach((temp, i) => {
        const final = temp.replace("[نص]", (i % 2 === 0) ? boldText : italicText);
        createCard(final, `زخرفة #${i + 1}`);
    });

    // 3. المخطوطات الفخمة
    masterTemplates.forEach((fn, i) => {
        createCard(fn(boldText), `مخطوطة VIP #${i + 1}`);
    });

    // 4. تصاميم المستخدم
    const userStyles = JSON.parse(localStorage.getItem('myCustomDesigns')) || [];
    userStyles.forEach((temp, i) => {
        createCard(temp.replace("[نص]", boldText), `تصميمك #${i + 1}`, true, i);
    });
}

function createCard(text, name, isCustom = false, index = null) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="info"><small>${name}</small><div>${text}</div></div>
        <div class="actions">
            ${isCustom ? `<button class="del-btn" onclick="deleteStyle(${index})">🗑️</button>` : ''}
            <button class="copy-btn" onclick="copyAction('${text}', this)">نسخ</button>
        </div>
    `;
    resultsBox.appendChild(card);
}

function copyAction(text, btn) {
    navigator.clipboard.writeText(text);
    btn.innerText = "✅";
    setTimeout(() => btn.innerText = "نسخ", 1000);
}

function deleteStyle(i) {
    let s = JSON.parse(localStorage.getItem('myCustomDesigns'));
    s.splice(i, 1);
    localStorage.setItem('myCustomDesigns', JSON.stringify(s));
    updateResults();
}

userInput.addEventListener('input', updateResults);
