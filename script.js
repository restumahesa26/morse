// Kamus Kode Morse
const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ',': '--..--', '.': '.-.-.-', '?': '..--..', '/': '-..-.', '-': '-....-',
    '(': '-.--.', ')': '-.--.-'
};
// Kamus terbalik untuk dekripsi dari morse ke teks
const textMap = Object.fromEntries(Object.entries(morseCodeMap).map(a => [a[1], a[0]]));
textMap['/'] = ' '; // Menambahkan spasi untuk kata

// Mengambil elemen dari DOM
const textInput = document.getElementById('text-input');
const morseOutput = document.getElementById('morse-output');
const copyMorseBtn = document.getElementById('copy-morse-btn');

const morseInput = document.getElementById('morse-input');
const textOutput = document.getElementById('text-output');
const copyTextBtn = document.getElementById('copy-text-btn');

const navEncrypt = document.getElementById('nav-encrypt');
const navDecrypt = document.getElementById('nav-decrypt');
const encryptSection = document.getElementById('encrypt-section');
const decryptSection = document.getElementById('decrypt-section');

// Fungsi untuk mengkonversi teks ke morse
function convertToMorse() {
    const inputText = textInput.value.toUpperCase();
    const morseResult = inputText.split('').map(char => {
        if (char === ' ') return '/';
        return morseCodeMap[char] || '';
    }).join(' ');
    morseOutput.textContent = morseResult.trim() || "...";
}

// Fungsi untuk mengkonversi morse ke teks
function convertToText() {
    const morseText = morseInput.value.trim();
    const textResult = morseText.split(' ').map(code => textMap[code] || '').join('');
    textOutput.textContent = textResult || "...";
}

// Fungsi untuk menampilkan/menyembunyikan bagian
function showSection(sectionToShow) {
    encryptSection.style.display = 'none';
    decryptSection.style.display = 'none';
    navEncrypt.classList.remove('active');
    navDecrypt.classList.remove('active');

    if (sectionToShow === 'encrypt') {
        encryptSection.style.display = 'block';
        navEncrypt.classList.add('active');
    } else {
        decryptSection.style.display = 'block';
        navDecrypt.classList.add('active');
    }
}

// Fungsi untuk menyalin teks
function copyToClipboard(text, buttonElement) {
    if (text && text !== "...") {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.opacity = 0;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'Disalin!';
            buttonElement.disabled = true;
            setTimeout(() => {
                buttonElement.textContent = 'Salin';
                buttonElement.disabled = false;
            }, 2000);

        } catch (e) {
            console.error('Gagal menyalin kode', e);
        }
    }
}

// Event Listeners
textInput.addEventListener('input', convertToMorse);
morseInput.addEventListener('input', convertToText);

navEncrypt.addEventListener('click', (e) => { e.preventDefault(); showSection('encrypt'); });
navDecrypt.addEventListener('click', (e) => { e.preventDefault(); showSection('decrypt'); });

copyMorseBtn.addEventListener('click', () => copyToClipboard(morseOutput.textContent, copyMorseBtn));
copyTextBtn.addEventListener('click', () => copyToClipboard(textOutput.textContent, copyTextBtn));

// Inisialisasi
showSection('encrypt');
convertToMorse();
convertToText();