function updateAlmanac() {
    const now = new Date();
    
    // 1. Update Date
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    document.getElementById('current-date').innerText = now.toLocaleDateString('en-GB', options).toUpperCase();

    // 2. Simple Moon Phase Logic (Approximation)
    // 0 = New Moon, 0.5 = Full Moon
    const lp = 2551443; 
    const new_moon = new Date(1970, 0, 7, 20, 35, 0);
    const phase = ((now.getTime() - new_moon.getTime()) / 1000) % lp;
    const percent = Math.floor((phase / lp) * 100);
    
    let description = "";
    if (percent < 5) description = "The moon is hidden in shadow.";
    else if (percent < 45) description = `The moon is ${percent}% full and rising.`;
    else if (percent < 55) description = "The moon is at its peak fullness.";
    else if (percent < 95) description = `The moon is ${percent}% full and fading.`;
    else description = "The moon returns to the void.";

    document.getElementById('moon-phrase').innerText = `"${description}"`;
}
async function updateLocation() {
    try {
        // Step 1: Get Location
        const locResponse = await fetch('http://ip-api.com/json/');
        const locData = await locResponse.json();
        
        if(locData.status === 'success') {
            document.getElementById('location-display').innerText = `${locData.city}, ${locData.country}`;
            
            // Step 2: Get Temperature based on Latitude/Longitude
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${locData.lat}&longitude=${locData.lon}&current_weather=true`);
            const weatherData = await weatherResponse.json();
            
            if(weatherData.current_weather) {
                const temp = Math.round(weatherData.current_weather.temperature);
                document.getElementById('current-temp').innerText = `${temp}°C`;
            }
        }
    } catch (error) {
        // Fallback if the connection is severed
        document.getElementById('location-display').innerText = "Gotham, New Jersey";
        document.getElementById('current-temp').innerText = "5°C";
    }
}

// Call this along with your other Almanac functions
updateLocation();

// Run on load
updateAlmanac();
// Update every hour
setInterval(updateAlmanac, 3600000);