const userInput = document.getElementById('userInput');
const resultsBox = document.getElementById('resultsBox');
const counter = document.getElementById('counter');

// خريطة تحويل الحروف لنمط اليونيكود الثابت عند النسخ
const boldItalicMap = {
    a:'𝒂',b:'𝒃',c:'𝒄',d:'𝒅',e:'𝒆',f:'𝒇',g:'𝒈',h:'𝒉',i:'𝒊',j:'𝒋',k:'𝒌',l:'𝒍',m:'𝒎',n:'𝒏',o:'𝒐',p:'𝒑',q:'𝒒',r:'𝒓',s:'𝒔',t:'𝒕',u:'𝒖',v:'𝒗',w:'𝒘',x:'𝒙',y:'𝒚',z:'𝒛',
    A:'𝑨',B:'𝑩',C:'𝑪',D:'𝑫',E:'𝑬',F:'𝑭',G:'𝑮',H:'𝑯',I:'𝑰',J:'𝑱',K:'𝑲',L:'𝑳',M:'𝑴',N:'𝑵',O:'𝑶',P:'𝑷',Q:'𝑸',R:'𝑹',S:'𝑺',T:'𝑻',U:'𝑼',V:'𝑽',W:'𝑾',X:'𝑿',Y:'𝒀',Z:'𝒁'
};

// القوالب الافتراضية النظيفة
const defaultStyles = [
    { name: "مخطوطة 1", process: (t) => `࣪ ˖ ໋֢ 𖥻${t}⊹ִ้۪۪ 𖦹 ๋࣭` },
    { name: "مخطوطة 2", process: (t) => `⏤͟͟͞͞ ${t}` },
    { name: "مخطوطة 3", process: (t) => `𖤓‌ • 𝑬.𝑺_𝑬𝑰𝒅 |𓍯| 𖡭↠ ${t} 𓆩𓋹𓆪⁩⁩` },
    { name: "مخطوطة 4", process: (t) => `𓆩𓇢𓆸 ${t} ⁩` }
];

// استرجاع القوالب التي صممها المستخدم من الذاكرة
let userTemplates = JSON.parse(localStorage.getItem('myCustomDesigns')) || [];

function convertToUnicode(text) {
    return text.split('').map(char => boldItalicMap[char] || char).join('');
}

function addNewTemplate() {
    const input = document.getElementById('customTemplate');
    if (!input.value.includes("[نص]")) {
        alert("تنبيه: يجب إضافة الرمز [نص] داخل تصميمك.");
        return;
    }
    userTemplates.push(input.value);
    localStorage.setItem('myCustomDesigns', JSON.stringify(userTemplates));
    input.value = "";
    updateResults();
}

function updateResults() {
    const text = userInput.value;
    counter.innerText = `${text.length} حرف`;
    resultsBox.innerHTML = '';
    
    if (!text.trim()) return;

    const transformed = convertToUnicode(text);

    // عرض القوالب الافتراضية
    defaultStyles.forEach(style => {
        createCard(style.process(transformed), style.name);
    });

    // عرض قوالب المستخدم
    userTemplates.forEach((temp, i) => {
        const final = temp.replace("[نص]", transformed);
        createCard(final, `تصميمك #${i+1}`);
    });
}

function createCard(text, name) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="info"><small>${name}</small><div>${text}</div></div>
        <button class="copy-btn" onclick="copyAction('${text}', this)">نسخ</button>
    `;
    resultsBox.appendChild(card);
}

function copyAction(text, btn) {
    navigator.clipboard.writeText(text);
    btn.innerText = "✅";
    setTimeout(() => btn.innerText = "نسخ", 1500);
}

userInput.addEventListener('input', updateResults);
window.onload = updateResults;
