const userInput = document.getElementById('userInput');
const resultsBox = document.getElementById('resultsBox');

const alphaMaps = {
    bold: { a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳', A:'𝐀',B:'𝐁',C:'𝐂',D:'𝐃',E:'𝐄',F:'𝐅',G:'𝐆',H:'𝐇',I:'𝐈',J:'𝐉',K:'𝐊',L:'𝐋',M:'𝐌',N:'𝐍',O:'𝐎',P:'𝐏',Q:'𝐐',R:'𝐑',S:'𝐒',T:'𝐓',U:'𝐔',V:'𝐕',W:'𝐖',X:'𝐗',Y:'𝐘',Z:'𝐙' },
    italic: { a:'𝒂',b:'𝒃',c:'𝒄',d:'𝒅',e:'𝒆',f:'𝒇',g:'𝒈',h:'𝒉',i:'𝒊',j:'𝒋',k:'𝒌',l:'𝒍',m:'𝒎',n:'𝒏',o:'𝒐',p:'𝒑',q:'𝒒',r:'𝒓',s:'𝒔',t:'𝒕',u:'𝒖',v:'𝒗',w:'𝒘',x:'𝒙',y:'𝒚',z:'𝒛', A:'𝑨',B:'𝑩',C:'𝑪',D:'𝑫',E:'𝑬',F:'𝑭',G:'𝑮',H:'𝑯',I:'𝑰',J:'𝑱',K:'𝑲',L:'𝑳',M:'𝑴',N:'𝑵',O:'𝑶',P:'𝑷',Q:'𝑸',R:'𝑹',S:'𝑺',T:'𝑻',U:'𝑼',V:'𝑽',W:'𝑾',X:'𝑿',Y:'𝒀',Z:'𝒁' }
};

const templates = [
    "꧁ [نص] ꧂", "★ [نص] ★", "⚔️ [نص] ⚔️", "👑 [نص] 👑", "⚡ [نص] ⚡", "🔥 [نص] 🔥", "✨ [نص] ✨", "🛡️ [نص] 🛡️", "⩹ [نص] ⩺", "🌊 [نص] 🌊", "『 [نص] 』", "【 [نص] 】", "🉐 [نص] 🉐", "『🔱 [نص] 🔱』"
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

    // إضافة الخطوط العادية
    createCard(bText, "BOLD STYLE");
    createCard(iText, "ITALIC STYLE");

    // إضافة الزخارف
    templates.forEach((temp, i) => {
        const final = temp.replace("[نص]", bText);
        createCard(final, `VIP STYLE #${i + 1}`);
    });

    // إضافة المخصص
    const custom = JSON.parse(localStorage.getItem('erenCustom')) || [];
    custom.forEach((temp, i) => {
        createCard(temp.replace("[نص]", bText), "MY DESIGN", true, i);
    });
}

function createCard(text, title, isCustom = false, index = null) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <div class="card-title">
            <span>⭐ ${title}</span>
            ${isCustom ? `<button class="del-btn" onclick="deleteStyle(${index})">🗑️</button>` : ''}
        </div>
        <div class="card-content">${text}</div>
        <button class="copy-btn" onclick="copyText('${text}', this)">نسخ النص</button>
    `;
    resultsBox.appendChild(div);
}

function copyText(text, btn) {
    navigator.clipboard.writeText(text);
    btn.innerText = "✅ تم النسخ";
    btn.style.background = "#9d50bb";
    setTimeout(() => { btn.innerText = "نسخ النص"; btn.style.background = "#238636"; }, 1500);
}

function addNewTemplate() {
    const input = document.getElementById('customTemplate');
    if (!input.value.includes("[نص]")) return alert("ضع [نص] في مكان الاسم");
    let s = JSON.parse(localStorage.getItem('erenCustom')) || [];
    s.push(input.value);
    localStorage.setItem('erenCustom', JSON.stringify(s));
    input.value = "";
    updateResults();
}

function deleteStyle(i) {
    let s = JSON.parse(localStorage.getItem('erenCustom'));
    s.splice(i, 1);
    localStorage.setItem('erenCustom', JSON.stringify(s));
    updateResults();
}

userInput.addEventListener('input', updateResults);
