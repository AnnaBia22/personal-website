/* --- Spooky Mood Library --- */
const MOOD_LIBRARY = {
     // Basic Emotions
    "happy": "<img src='happy.gif' class='mood-img'>",
    "sad":  "<img src='sad.gif' class='mood-img'>",
    "angry": "<img src='angry.gif' class='mood-img'>",
    "tired": "<img src='tired.gif' class='mood-img'>",
    "loving": "<img src='loving.gif' class='mood-img'>",
    "bored": "<img src='bored.gif' class='mood-img'>",

    "musical": "<img src='musical.gif' class='mood-img'>",
    "reading": "<img src='reader.gif' class='mood-img'>",
    "coding": "📟",     // Cursed Terminal
    "studying": "📖",   // Grimoire
    "dancing": "🩰",    // Haunted Ballet Slippers
    "training": "<img src='training.gif' class='mood-img'>",

    // Gothic Vibes
    "melancholic": "<img src='melancolic.gif' class='mood-img'>", 
    "mysterious": "🦇", // Bat
    "dreamy": "<img src='dreamy.gif' class='mood-img'>",
    "lonely": "<img src='lonely.gif' class='mood-img'>",
    "inspired": "🖋️",    // The Poet's Pen

    "default": "<img src='default.gif' class='mood-img'>"
};

async function updateSpookyMood() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRG-mAh_UoKOO5jKAHpRwhSsFONxXxJNu9Wqgk7iY7SUzUd5X-EDPuIHBvmVOcMQgE2ZVM5KYDq6W_t/pub?output=csv";

    const statusText = document.getElementById('status-text');
    const iconElement = document.getElementById('mood-icon');

    if (!statusText || !iconElement) return;

    try {
        const response = await fetch(`${url}&t=${Date.now()}`);
        const text = await response.text();
        
        const rows = text.trim().split('\n').filter(row => row.trim() !== "");
        if (rows.length < 1) return;

        // Get the last row (your latest form submission)
        const lastRow = rows[rows.length - 1];
        
        // CSV split: [0] is Timestamp, [1] is the Mood word
        const columns = lastRow.split(',');
        
        // Clean up the word in the second column
        let content = columns[1] ? columns[1].replace(/"/g, '').trim() : "";
        
        // Fallback: If for some reason Col B is empty, try Col A (in case you typed manually)
        if (!content) {
            content = columns[0].replace(/"/g, '').trim();
        }

        const moodText = content.toLowerCase();

        let foundIcon = MOOD_LIBRARY.default;
        for (const [key, icon] of Object.entries(MOOD_LIBRARY)) {
            if (moodText.includes(key)) {
                foundIcon = icon;
                break;
            }
        }

        iconElement.innerHTML = foundIcon;
        statusText.innerText = content;
        
    } catch (e) {
        console.error("Connection to the digital lair failed:", e);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateSpookyMood();
    setInterval(updateSpookyMood, 20000);
});