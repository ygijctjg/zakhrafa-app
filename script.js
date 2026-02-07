const userInput = document.getElementById('userInput');
const resultsBox = document.getElementById('resultsBox');
const counter = document.getElementById('counter');

// 1. مكتبة خطوط الوورد (للمعاينة)
const wordFonts = [
    { name: "خط الوورد: Amiri", family: "'Amiri', serif" },
    { name: "خط الوورد: Cairo Bold", family: "'Cairo', sans-serif" },
    { name: "خط الوورد: Tajawal", family: "'Tajawal', sans-serif" },
    { name: "خط الوورد: Lalezar", family: "'Lalezar', display" },
    { name: "الخط الكوفي: Reem Kufi", family: "'Reem Kufi', sans-serif" }
];

// 2. مكتبة الزخارف (للنسخ واللصق في كل مكان)
const unicodeStyles = [
    { name: "النمط العريض", map: { a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳'} },
    { name: "النمط المفرغ", map: { a:'𝕒',b:'𝕓',c:'𝕔',d:'𝕕',e:'𝕖',f:'𝕗',g:'𝕘',h:'𝕙',i:'𝕚',j:'𝕛',k:'𝕜',l:'𝕝',m:'𝕞',n:'𝕟',o:'𝕠',p:'𝕡',q:'𝕢',r:'𝕣',s:'𝕤',t:'𝕥',u:'𝕦',v:'𝕧',w:'𝕨',x:'𝕩',y:'𝕪',z:'𝕫'} },
    { name: "نمط الدوائر", map: { a:'ⓐ',b:'ⓑ',c:'ⓒ',d:'ⓓ',e:'ⓔ',f:'ⓕ',g:'ⓖ',h:'ⓗ',i:'ⓘ',j:'ⓙ',k:'ⓚ',l:'ⓛ',m:'ⓜ',n:'ⓝ',o:'ⓞ',p:'ⓟ',q:'ⓠ',r:'ⓡ',s:'ⓢ',t:'ⓣ',u:'ⓤ',v:'ⓥ',w:'ⓦ',x:'ⓧ',y:'ⓨ',z:'ⓩ'} },
    { name: "زخرفة الورود", process: (t) => `✿ ${t} ✿` },
    { name: "النمط الملكي", process: (t) => `꧁ ${t} ꧂` },
    { name: "زخرفة التشكيل العربي", process: (t) => t.split('').join('ـ') },
    { name: "نمط القلوب", process: (t) => `❤️ ${t} ❤️` }
];

userInput.addEventListener('input', () => {
    const text = userInput.value;
    counter.innerText = `${text.length} حرف`;
    
    if (!text.trim()) {
        resultsBox.innerHTML = '';
        return;
    }

    resultsBox.innerHTML = ''; // تنظيف النتائج

    // دمج وعرض خطوط الوورد
    wordFonts.forEach(font => {
        createCard(text, font.name, font.family);
    });

    // دمج وعرض زخارف اليونيكود
    unicodeStyles.forEach(style => {
        let finalOutput = "";
        if (style.map) {
            finalOutput = text.toLowerCase().split('').map(char => style.map[char] || char).join('');
        } else {
            finalOutput = style.process(text);
        }
        createCard(finalOutput, style.name, "");
    });
});

function createCard(text, name, fontFamily) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="font-info">
            <span class="font-name">${name}</span>
            <span class="font-preview" style="font-family: ${fontFamily}">${text}</span>
        </div>
        <button class="copy-btn" onclick="copyAction('${text}', this)">نسخ</button>
    `;
    resultsBox.appendChild(card);
}

function copyAction(text, btn) {
    navigator.clipboard.writeText(text);
    const originalText = btn.innerText;
    btn.innerText = "تم النسخ!";
    btn.style.background = "#fff";
    btn.style.color = "#000";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
        btn.style.color = "";
    }, 1500);
}