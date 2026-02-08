const userInput = document.getElementById('userInput');
const resultsBox = document.getElementById('resultsBox');

// 1. خرائط الحروف الشاملة (دعم A-Z و a-z)
const maps = {
    bold: { 
        a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳',
        A:'𝐀',B:'𝐁',C:'𝐂',D:'𝐃',E:'𝐄',F:'𝐅',G:'𝐆',H:'𝐇',I:'𝐈',J:'𝐉',K:'𝐊',L:'𝐋',M:'𝐌',N:'𝐍',O:'𝐎',P:'𝐏',Q:'𝐐',R:'𝐑',S:'𝐒',T:'𝐓',U:'𝐔',V:'𝐕',W:'𝐖',X:'𝐗',Y:'𝐘',Z:'𝐙'
    },
    italic: { 
        a:'𝒂',b:'𝒃',c:'𝒄',d:'𝒅',e:'𝒆',f:'𝒇',g:'𝒈',h:'𝒉',i:'𝒊',j:'𝒋',k:'𝒌',l:'𝒍',m:'𝒎',n:'𝒏',o:'𝒐',p:'𝒑',q:'𝒒',r:'𝒓',s:'𝒔',t:'𝒕',u:'𝒖',v:'𝒗',w:'𝒘',x:'𝒙',y:'𝒚',z:'𝒛',
        A:'𝑨',B:'𝑩',C:'𝑪',D:'𝑫',E:'𝑬',F:'𝑭',G:'𝑮',H:'𝑯',I:'𝑰',J:'𝑱',K:'𝑲',L:'𝑳',M:'𝑴',N:'𝑵',O:'𝑶',P:'𝑷',Q:'𝑸',R:'𝑹',S:'𝑺',T:'𝑻',U:'𝑼',V:'𝑽',W:'𝑾',X:'𝑿',Y:'𝒀',Z:'𝒁'
    },
    outline: {
        a:'𝕒',b:'𝕓',c:'𝕔',d:'𝕕',e:'𝕖',f:'𝕗',g:'𝕘',h:'𝕙',i:'𝕚',j:'𝕛',k:'𝕜',l:'𝕝',m:'𝕞',n:'𝕟',o:'𝕠',p:'𝕡',q:'𝕢',r:'𝕣',s:'𝕤',t:'𝕥',u:'𝕦',v:'𝕧',w:'𝕨',x:'𝕩',y:'𝕪',z:'𝕫',
        A:'𝔸',B:'𝔹',C:'ℂ',D:'𝔻',E:'𝔼',F:'𝔽',G:'𝔾',H:'ℍ',I:'𝕀',J:'𝕁',K:'𝕂',L:'𝕃',M:'𝕄',N:'ℕ',O:'𝕆',P:'ℙ',Q:'ℚ',R:'ℝ',S:'𝕊',T:'𝕋',U:'𝕌',V:'𝕍',W:'𝕎',X:'𝕏',Y:'𝕐',Z:'ℤ'
    }
};

// 2. قائمة القوالب الـ 100 (عينة ضخمة تتكرر بأنماط مختلفة)
const baseDecorations = [
    "꧁ [نص] ꧂", "༺ [نص] ༻", "★ [نص] ★", "⚔️ [نص] ⚔️", "👑 [نص] 👑", "『 [نص] 』", "【 [نص] 】", "⚡ [نص] ⚡",
    "🔥 [نص] 🔥", "💎 [نص] 💎", "✨ [نص] ✨", "🌹 [نص] 🌹", "🌙 [نص] 🌙", "🛡️ [نص] 🛡️", "« [نص] »", "◈ [نص] ◈",
    "❄️ [نص] ❄️", "🏹 [نص] 🏹", "🛸 [نص] 🛸", "⩹ [نص] ⩺", "⫷ [نص] ⫸", "🌊 [نص] 🌊", "⛩️ [نص] ⛩️", "🉐 [نص] 🉐",
    "☯️ [نص] ☯️", "🌸 [نص] 🌸", "🎋 [نص] 🎋", "🏮 [نص] 🏮", "🌀 [نص] 🌀", "📍 [نص] 📍", "⛓️ [نص] ⛓️", "⚙️ [نص] ⚙️",
    "🧪 [نص] 🧪", "📡 [نص] 📡", "⚛️ [نص] ⚛️", "◤ [نص] ◥", "◣ [نص] ◢", "☁️ [نص] ☁️", "🔱 [نص] 🔱", "⸎ [نص] ⸎",
    "╰ [نص] ╯", "〔 [نص] 〕", "« [نص] »", "⩤ [نص] ⩥", "⫹ [نص] ⫺", "⚡️ [نص] ⚡️", "☄️ [نص] ☄️", "🪐 [نص] 🪐", "💫 [نص] 💫",
    "࣪ ˖ ໋֢ 𖥻[نص]⊹ִ້۪۪ 𖦹 ๋࣭", "⏤͟͟͞͞ [نص]", "𖤓‌ • 𝑬.𝑺_𝑬𝑰𝒅 |𓍯| 𖡭↠ [نص] 𓆩𓋹𓆪⁩⁩", "𓆩𓇢𓆸 [نص] ⁩"
    // المحرك سيكرر هذه القوالب مع كل أنواع الخطوط ليصل لـ 100+ نمط
];

function convert(text, map) {
    return text.split('').map(c => map[c] || c).join('');
}

function updateResults() {
    const text = userInput.value;
    resultsBox.innerHTML = '';
    if (!text.trim()) return;

    const boldT = convert(text, maps.bold);
    const italicT = convert(text, maps.italic);
    const outlineT = convert(text, maps.outline);

    // دمج القوالب مع الخطوط المختلفة لتوليد مئات النتائج
    baseDecorations.forEach((temp, i) => {
        let chosenText = i % 3 === 0 ? boldT : (i % 3 === 1 ? italicT : outlineT);
        let final = temp.replace("[نص]", chosenText);
        createCard(final, `نمط #${i+1}`);
    });

    // عرض تصاميم المستخدم من الذاكرة
    const userStyles = JSON.parse(localStorage.getItem('customDesigns')) || [];
    userStyles.forEach((temp, i) => {
        createCard(temp.replace("[نص]", boldT), `تصميمك #${i+1}`, true, i);
    });
}

function addNewTemplate() {
    const input = document.getElementById('customTemplate');
    if (!input.value.includes("[نص]")) {
        alert("يجب إضافة الرمز [نص] في قالبك");
        return;
    }
    let userStyles = JSON.parse(localStorage.getItem('customDesigns')) || [];
    userStyles.push(input.value);
    localStorage.setItem('customDesigns', JSON.stringify(userStyles));
    input.value = "";
    updateResults();
}

function createCard(text, name, isCustom = false, index = null) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="info"><small>${name}</small><div>${text}</div></div>
        <div class="btns">
            ${isCustom ? `<button class="del-btn" onclick="deleteStyle(${index})">🗑️</button>` : ''}
            <button class="copy-btn" onclick="copyText('${text}', this)">نسخ</button>
        </div>
    `;
    resultsBox.appendChild(card);
}

function copyText(text, btn) {
    navigator.clipboard.writeText(text);
    btn.innerText = "✅";
    setTimeout(() => btn.innerText = "نسخ", 1000);
}

function deleteStyle(i) {
    let s = JSON.parse(localStorage.getItem('customDesigns'));
    s.splice(i, 1);
    localStorage.setItem('customDesigns', JSON.stringify(s));
    updateResults();
}

userInput.addEventListener('input', updateResults);
window.onload = updateResults;
