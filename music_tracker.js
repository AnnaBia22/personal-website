const apiKey = '6648ec5f244097e95b65424afeab1acd';
const username = 'AnnaBia22';

async function updateTracker() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const track = data.recenttracks.track[0];
        
        const artUrl = track.image[2]['#text']; // [2] is usually the medium/large size
        document.getElementById('song-title').innerText = track.name.toUpperCase();
        document.getElementById('artist-name').innerText = track.artist['#text'];
        document.getElementById('album-art').src = artUrl || 'default-cd.png';
    } catch (error) {
        console.error("The signal was lost in the void:", error);
    }
}

// Refresh every 30 seconds
setInterval(updateTracker, 30000);
updateTracker(); // Run once on load