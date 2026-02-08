const userInput = document.getElementById('userInput');
const resultsBox = document.getElementById('resultsBox');

// مكتبة خرائط الحروف الموسعة (Unicode Alphabet Maps) - تدعم الكابيتل والسمول
const alphaMaps = {
    // 1. خط عريض (Bold Sans)
    bold: {
        a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳',
        A:'𝐀',B:'𝐁',C:'𝐂',D:'𝐃',E:'𝐄',F:'𝐅',G:'𝐆',H:'𝐇',I:'𝐈',J:'𝐉',K:'𝐊',L:'𝐋',M:'𝐌',N:'𝐍',O:'𝐎',P:'𝐏',Q:'𝐐',R:'𝐑',S:'𝐒',T:'𝐓',U:'𝐔',V:'𝐕',W:'𝐖',X:'𝐗',Y:'𝐘',Z:'𝐙'
    },
    // 2. خط مائل (Italic Sans)
    italic: {
        a:'𝒂',b:'𝒃',c:'𝒄',d:'𝒅',e:'𝒆',f:'𝒇',g:'𝒈',h:'𝒉',i:'𝒊',j:'𝒋',k:'𝒌',l:'𝒍',m:'𝒎',n:'𝒏',o:'𝒐',p:'𝒑',q:'𝒒',r:'𝒓',s:'𝒔',t:'𝒕',u:'𝒖',v:'𝒗',w:'𝒘',x:'𝒙',y:'𝒚',z:'𝒛',
        A:'𝑨',B:'𝑩',C:'𝑪',D:'𝑫',E:'𝑬',F:'𝑭',G:'𝑮',H:'𝑯',I:'𝑰',J:'𝑱',K:'𝑲',L:'𝑳',M:'𝑴',N:'𝑵',O:'𝑶',P:'𝑷',Q:'𝑸',R:'𝑹',S:'𝑺',T:'𝑻',U:'𝑼',V:'𝑽',W:'𝑾',X:'𝑿',Y:'𝒀',Z:'𝒁'
    },
    // 3. خط مزدوج (Double-Struck)
    doubleStruck: {
        a:'𝕒',b:'𝕓',c:'𝕔',d:'𝕕',e:'𝕖',f:'𝕗',g:'𝕘',h:'𝕙',i:'𝕚',j:'𝕛',k:'𝕜',l:'𝕝',m:'𝕞',n:'𝕟',o:'𝕠',p:'𝕡',q:'𝕢',r:'𝕣',s:'𝕤',t:'𝕥',u:'𝕦',v:'𝕧',w:'𝕨',x:'𝕩',y:'𝕪',z:'𝕫',
        A:'𝔸',B:'𝔹',C:'ℂ',D:'𝔻',E:'𝔼',F:'𝔽',G:'𝔾',H:'ℍ',I:'𝕀',J:'𝕁',K:'𝕂',L:'𝕃',M:'𝕄',N:'ℕ',O:'𝕆',P:'ℙ',Q:'ℚ',R:'ℝ',S:'𝕊',T:'𝕋',U:'𝕌',V:'𝕍',W:'𝕎',X:'𝕏',Y:'𝕐',Z:'ℤ'
    },
    // 4. خط المربعات (Squared)
    squared: {
        a:'🄰',b:'🄱',c:'🄲',d:'🄳',e:'🄴',f:'🄵',g:'🄶',h:'🄷',i:'🄸',j:'🄹',k:'🄺',l:'🄻',m:'🄼',n:'🄽',o:'🄾',p:'🄿',q:'🅀',r:'🅁',s:'🅂',t:'🅃',u:'🅄',v:'🅅',w:'🅆',x:'🅇',y:'🅈',z:'🅉',
        A:'🄰',B:'🄱',C:'🄲',D:'🄳',E:'🄴',F:'🄵',G:'🄶',H:'🄷',I:'🄸',J:'🄹',K:'🄺',L:'🄻',M:'🄼',N:'🄽',O:'🄾',P:'🄿',Q:'🅀',R:'🅁',S:'🅂',T:'🅃',U:'🅄',V:'🅅',W:'🅆',X:'🅇',Y:'🅈',Z:'🅉'
    },
    // 5. خط الدوائر (Circled)
    circled: {
        a:'ⓐ',b:'ⓑ',c:'ⓒ',d:'ⓓ',e:'ⓔ',f:'ⓕ',g:'ⓖ',h:'ⓗ',i:'ⓘ',j:'ⓙ',k:'ⓚ',l:'ⓛ',m:'ⓜ',n:'ⓝ',o:'ⓞ',p:'ⓟ',q:'ⓠ',r:'ⓡ',s:'ⓢ',t:'ⓣ',u:'ⓤ',v:'ⓥ',w:'ⓦ',x:'ⓧ',y:'ⓨ',z:'ⓩ',
        A:'Ⓐ',B:'Ⓑ',C:'Ⓒ',D:'Ⓓ',E:'Ⓔ',F:'Ⓕ',G:'Ⓖ',H:'Ⓗ',I:'Ⓘ',J:'Ⓙ',K:'Ⓚ',L:'Ⓛ',M:'Ⓜ',N:'Ⓝ',O:'Ⓞ',P:'Ⓟ',Q:'Ⓠ',R:'Ⓡ',S:'Ⓢ',T:'Ⓣ',U:'Ⓤ',V:'Ⓥ',W:'Ⓦ',X:'Ⓧ',Y:'Ⓨ',Z:'Ⓩ'
    },
    // 6. خط القوطي (Gothic)
    gothic: {
        a:'𝔞',b:'𝔟',c:'𝔠',d:'𝔡',e:'𝔢',f:'𝔣',g:'𝔤',h:'𝔥',i:'𝔦',j:'𝔧',k:'𝔨',l:'𝔩',m:'𝔪',n:'𝔫',o:'𝔬',p:'𝔭',q:'𝔮',r:'𝔯',s:'𝔰',t:'𝔱',u:'𝔲',v:'𝔳',w:'𝔴',x:'𝔵',y:'𝔶',z:'𝔷',
        A:'𝔄',B:'𝔅',C:'ℭ',D:'𝔇',E:'𝔈',F:'𝔉',G:'𝔊',H:'ℌ',I:'ℑ',J:'𝔍',K:'𝔎',L:'𝔏',M:'𝔐',N:'𝔑',O:'𝔒',P:'𝔓',Q:'𝔔',R:'ℜ',S:'𝔖',T:'𝔗',U:'𝔘',V:'𝔙',W:'𝔚',X:'𝔛',Y:'𝔜',Z:'ℨ'
    },
    // 7. خط الكتابة اليدوية (Script)
    script: {
        a:'𝒶',b:'𝒷',c:'𝒸',d:'𝒹',e:'𝑒',f:'𝒻',g:'𝑔',h:'𝒽',i:'𝒾',j:'𝒿',k:'𝓀',l:'𝓁',m:'𝓂',n:'𝓃',o:'𝑜',p:'𝓅',q:'𝓆',r:'𝓇',s:'𝓈',t:'𝓉',u:'𝓊',v:'𝓋',w:'𝓌',x:'𝓍',y:'𝓎',z:'𝓏',
        A:'𝒜',B:'ℬ',C:'𝒞',D:'𝒟',E:'ℰ',F:'ℱ',G:'𝒢',H:'ℋ',I:'ℐ',J:'𝒥',K:'𝒦',L:'ℒ',M:'ℳ',N:'𝒩',O:'𝒪',P:'𝒫',Q:'𝒬',R:'ℛ',S:'𝒮',T:'𝒯',U:'𝒰',V:'𝒱',W:'𝒲',X:'𝒳',Y:'𝒴',Z:'𝒵'
    }
};

// قوالب الزخارف الرمزية (سنقوم بدمجها مع الخطوط أعلاه لتوليد 100+ نمط)
const decorTemplates = [
    "꧁ [نص] ꧂", "༺ [نص] ༻", "★ [نص] ★", "⚔️ [نص] ⚔️", "👑 [نص] 👑", "『 [نص] 』", "⚡ [نص] ⚡", "🔥 [نص] 🔥", "💎 [نص] 💎", "✨ [نص] ✨", "🌹 [نص] 🌹", "🌙 [نص] 🌙", "🛡️ [نص] 🛡️", "« [نص] »", "◈ [نص] ◈", "❄️ [نص] ❄️", "🏹 [نص] 🏹", "🛸 [نص] 🛸", "⩹ [نص] ⩺", "🌊 [نص] 🌊", "⛩️ [نص] ⛩️", "🉐 [نص] 🉐", "☯️ [نص] ☯️", "🌸 [نص] 🌸", "🎋 [نص] 🎋", "🏮 [نص] 🏮", "🌀 [نص] 🌀", "📍 [نص] 📍", "⛓️ [نص] ⛓️", "࣪ ˖ ໋֢ 𖥻[نص]⊹ִ້۪۪ 𖦹 ๋࣭", "⏤͟͟͞͞ [نص]", "𖤓‌ • 𝑬.𝑺_𝑬𝑰𝒅 |𓍯| 𖡭↠ [نص] 𓆩𓋹𓆪⁩⁩", "𓆩𓇢𓆸 [نص] ⁩", "『🔱 [نص] 🔱』"
];

function transformText(text, map) {
    return text.split('').map(char => map[char] || char).join('');
}

function updateResults() {
    const text = userInput.value;
    resultsBox.innerHTML = '';
    if (!text.trim()) return;

    // 1. عرض الخطوط الأساسية أولاً (كل خط كنص مستقل)
    Object.keys(alphaMaps).forEach(key => {
        const transformed = transformText(text, alphaMaps[key]);
        createCard(transformed, `خط: ${key.toUpperCase()}`);
    });

    // 2. دمج الخطوط مع القوالب الزخرفية لتوليد 100+ نمط
    // نستخدم الخط العريض كقاعدة للزخارف الرمزية
    const baseTransformedText = transformText(text, alphaMaps.bold); 
    decorTemplates.forEach((template, i) => {
        const final = template.replace("[نص]", baseTransformedText);
        createCard(final, `زخرفة VIP #${i + 1}`);
    });

    // 3. عرض قوالب المستخدم المضافة
    const customDesigns = JSON.parse(localStorage.getItem('erenCustomDesigns')) || [];
    customDesigns.forEach((template, i) => {
        // نستخدم الخط العريض لتطبيق قالب المستخدم
        createCard(template.replace("[نص]", baseTransformedText), `قالبك الخاص #${i + 1}`, true, i);
    });
}

function createCard(text, name, isCustom = false, index = null) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="info">
            <small>${name}</small>
            <div>${text}</div>
        </div>
        <div class="actions">
            ${isCustom ? `<button class="del-btn" onclick="deleteStyle(${index})">🗑️</button>` : ''}
            <button class="copy-btn" onclick="copyAction('${text}', this)">نسخ</button>
        </div>
    `;
    resultsBox.appendChild(card);
}

function copyAction(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const oldText = btn.innerText;
        btn.innerText = "✅ تم النسخ";
        setTimeout(() => btn.innerText = oldText, 1500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers or specific environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            const oldText = btn.innerText;
            btn.innerText = "✅ تم النسخ (Fallback)";
            setTimeout(() => btn.innerText = oldText, 1500);
        } catch (err) {
            alert('لم يتمكن المتصفح من النسخ تلقائياً. يرجى النسخ يدوياً: ' + text);
        }
        document.body.removeChild(textArea);
    });
}

function addNewTemplate() {
    const input = document.getElementById('customTemplate');
    if (!input.value.includes("[نص]")) {
        alert("يرجى تضمين الرمز [نص] في قالبك (مثال: 『🔥 [نص] 🔥』) لتحديد مكان الاسم.");
        return;
    }
    let designs = JSON.parse(localStorage.getItem('erenCustomDesigns')) || [];
    designs.push(input.value);
    localStorage.setItem('erenCustomDesigns', JSON.stringify(designs));
    input.value = "";
    updateResults(); // تحديث النتائج لعرض القالب الجديد
}

function deleteStyle(index) {
    let designs = JSON.parse(localStorage.getItem('erenCustomDesigns'));
    designs.splice(index, 1); // حذف العنصر المحدد
    localStorage.setItem('erenCustomDesigns', JSON.stringify(designs));
    updateResults(); // تحديث النتائج بعد الحذف
}

// الأحداث
userInput.addEventListener('input', updateResults);
window.onload = updateResults; // عرض النتائج عند تحميل الصفحة لأول مرة
