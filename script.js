const userInput = document.getElementById('userInput');
const resultsBox = document.getElementById('resultsBox');

const alphaMaps = {
    bold: {
        a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳',
        A:'𝐀',B:'𝐁',C:'𝐂',D:'𝐃',E:'𝐄',F:'𝐅',G:'𝐆',H:'𝐇',I:'𝐈',J:'𝐉',K:'𝐊',L:'𝐋',M:'𝐌',N:'𝐍',O:'𝐎',P:'𝐏',Q:'𝐐',R:'𝐑',S:'𝐒',T:'𝐓',U:'𝐔',V:'𝐕',W:'𝐖',X:'𝐗',Y:'𝐘',Z:'𝐙'
    },
    italic: {
        a:'𝒂',b:'𝒃',c:'𝒄',d:'𝒅',e:'𝒆',f:'𝒇',g:'𝒈',h:'𝒉',i:'𝒊',j:'𝒋',k:'𝒌',l:'𝒍',m:'𝒎',n:'𝒏',o:'𝒐',p:'𝒑',q:'𝒒',r:'𝒓',s:'𝒔',t:'𝒕',u:'𝒖',v:'𝒗',w:'𝒘',x:'𝒙',y:'𝒚',z:'𝒛',
        A:'𝑨',B:'𝑩',C:'𝑪',D:'𝑫',E:'𝑬',F:'𝑭',G:'𝑮',H:'𝑯',I:'𝑰',J:'𝑱',K:'𝑲',L:'𝑳',M:'𝑴',N:'𝑵',O:'𝑶',P:'𝑷',Q:'𝑸',R:'𝑹',S:'𝑺',T:'𝑻',U:'𝑼',V:'𝑽',W:'𝑾',X:'𝑿',Y:'𝒀',Z:'𝒁'
    }
};

const decorTemplates = [
    "꧁ [نص] ꧂", "༺ [نص] ༻", "★ [نص] ★", "⚔️ [نص] ⚔️", "👑 [نص] 👑", "『 [نص] 』", "【 [نص] 】", "⚡ [نص] ⚡", "🔥 [نص] 🔥", "💎 [نص] 💎", "✨ [نص] ✨", "🌹 [نص] 🌹", "🌙 [نص] 🌙", "🛡️ [نص] 🛡️", "« [نص] »", "◈ [نص] ◈", "❄️ [نص] ❄️", "🏹 [نص] 🏹", "🛸 [نص] 🛸", "⩹ [نص] ⩺", "🌊 [نص] 🌊", "⛩️ [نص] ⛩️", "🉐 [نص] 🉐", "☯️ [نص] ☯️", "🌸 [نص] 🌸", "🎋 [نص] 🎋", "🏮 [نص] 🏮", "🌀 [نص] 🌀", "📍 [نص] 📍", "⛓️ [نص] ⛓️", "࣪ ˖ ໋֢ 𖥻[نص]⊹ִ້۪۪ 𖦹 ๋࣭", "⏤͟͟͞͞ [نص]", "𖤓‌ • 𝑬.𝑺_𝑬𝑰𝒅 |𓍯| 𖡭↠ [نص] 𓆩𓋹𓆪⁩⁩", "𓆩𓇢𓆸 [نص] ⁩", "『🔱 [نص] 🔱』"
];

function transform(text, map) {
    return text.split('').map(c => map[c] || c).join('');
}

function updateResults() {
    const text = userInput.value;
    resultsBox.innerHTML = '';
    if (!text.trim()) return;

    const bText = transform(text, alphaMaps.bold);
    const iText = transform(text, alphaMaps.italic);

    // دمج الأنواع لتوليد مئات الزخارف
    decorTemplates.forEach((temp, i) => {
        let chosen = (i % 2 === 0) ? bText : iText;
        createCard(temp.replace("[نص]", chosen), `زخرفة #${i + 1}`);
    });

    // جلب القوالب المضافة من الذاكرة
    const customDesigns = JSON.parse(localStorage.getItem('myDesigns')) || [];
    customDesigns.forEach((temp, i) => {
        createCard(temp.replace("[نص]", bText), `قالبك #${i + 1}`, true, i);
    });
}

function createCard(text, name, isCustom = false, index = null) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="info"><small>${name}</small><div>${text}</div></div>
        <button onclick="copyAction('${text}', this)">نسخ</button>
    `;
    resultsBox.appendChild(card);
}

function copyAction(text, btn) {
    navigator.clipboard.writeText(text);
    btn.innerText = "✅";
    setTimeout(() => btn.innerText = "نسخ", 1000);
}

function addNewTemplate() {
    const input = document.getElementById('customTemplate');
    if (!input.value.includes("[نص]")) return alert("يجب وضع [نص]");
    let s = JSON.parse(localStorage.getItem('myDesigns')) || [];
    s.push(input.value);
    localStorage.setItem('myDesigns', JSON.stringify(s));
    input.value = "";
    updateResults();
}

userInput.addEventListener('input', updateResults);
