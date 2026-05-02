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

const flowerCollection = [
    // --- THE GOTHIC & SCHOLARLY SET ---
    { name: "Monkshood", latin: "Aconitum napellus", meaning: "“Caution; a deadly foe is near.”" }, //done
    { name: "Asphodel", latin: "Asphodelus ramosus", meaning: "“My regrets follow you to the grave.”" },//done
    { name: "Hyacinth", latin: "Hyacinthus comosus", meaning: "“I am sorry; please forgive me; sorrow.”" },//done
    { name: "Pansy", latin: "Viola tricolor", meaning: "“You occupy my thoughts and studies.”" },//done
    { name: "Wormwood", latin: "Artemisia absinthium", meaning: "“Absence and bitter sorrow.”" },//done
    { name: "Hellebore", latin: "Helleborus niger", meaning: "“Scandal and anxiety.”" },//done
    { name: "Nightshade", latin: "Atropa belladonna", meaning: "“Silence and deception.”" },//done
    { name: "Cypress", latin: "Cupressus sempervirens", meaning: "“Mourning and despair.”" },//done
    { name: "Lichen", latin: "Parmelia sulcata", meaning: "“Solitude and dejection.”" },//done
    { name: "Deadly Hemlock", latin: "Conium maculatum", meaning: "“You will be my death.”" },//done

    // --- THE COMPETITIVE & STRENGTH SET ---
    { name: "Gladiolus", latin: "Gladiolus palustris", meaning: "“Strength of character and integrity.”" },//done
    { name: "Amaryllis", latin: "Hippeastrum", meaning: "“Splendid pride and achievement.”" },//done
    { name: "Nasturtium", latin: "Tropaeolum majus", meaning: "“Victory in battle.”" },//done
    { name: "Oak Leaf", latin: "Quercus robur", meaning: "“Bravery and long-standing power.”" },//done
    { name: "Thistle", latin: "Onopordum acanthium", meaning: "“Defiance and retaliation.”" },//done
    { name: "Borage", latin: "Borago officinalis", meaning: "“Bluntness and courage.”" },//done
    { name: "Protea", latin: "Protea cynaroides", meaning: "“Transformation and diversity.”" },//done
    { name: "Fennel", latin: "Foeniculum vulgare", meaning: "“Force and strength.”" },//done
    { name: "Bay Laurel", latin: "Laurus nobilis", meaning: "“Victory, merit, and honor; the reward of the scholar.”" },//done
    { name: "Edelweiss", latin: "Leontopodium nivale", meaning: "“Nobility and daring.”" },//done

    // --- THE BOTANICAL CABINET (A-Z) ---
    { name: "Aloe", latin: "Aloe vera", meaning: "“Grief and religious superstition.”" },//done
    { name: "Anemone", latin: "Anemone nemorosa", meaning: "“Forsaken and fading hope.”" },//done
    { name: "Basil", latin: "Ocimum basilicum", meaning: "“Hatred and suspicion.”" },//done
    { name: "Burdock", latin: "Arctium lappa", meaning: "“Importunity; do not touch me.”" },//done
    { name: "Buttercup", latin: "Ranunculus acris", meaning: "“Ingratitude and childishness.”" },//done
    { name: "Camellia", latin: "Camellia japonica", meaning: "“Unpretending excellence.”" },//done
    { name: "Cinquefoil", latin: "Potentilla", meaning: "“Beloved daughter; solitude.”" },//done
    { name: "Clematis", latin: "Clematis viticella", meaning: "“Mental beauty and artifice.”" },//done
    { name: "Clover", latin: "Trifolium repens", meaning: "“Be mine; a promise of luck.”" },//done
    { name: "Coltsfoot", latin: "Tussilago farfara", meaning: "“Justice shall be done.”" },//done
    { name: "Dahlia", latin: "Dahlia pinnata", meaning: "“Dignity and elegance.”" },//done
    { name: "Dandelion", latin: "Taraxacum officinale", meaning: "“The oracle of time and desire.”" },//done
    { name: "Eglantine", latin: "Rosa rubiginosa", meaning: "“Poetry; I wound to heal.”" },//done
    { name: "Elderberry", latin: "Sambucus nigra", meaning: "“Compassion and zeal.”" },//done
    { name: "Fern", latin: "Polypodiopsida", meaning: "“Sincerity and fascination.”" },//done
    { name: "Forget-Me-Not", latin: "Myosotis sylvatica", meaning: "“True love and memories.”" },//done
    { name: "Foxglove", latin: "Digitalis purpurea", meaning: "“Insincerity and riddles.”" },//done
    { name: "Fritillary", latin: "Fritillaria meleagris", meaning: "“Majesty and pensive pride.”" },//done
    { name: "Geranium", latin: "Pelargonium", meaning: "“Gentility and steadfastness.”" },//done
    { name: "Gloxinia", latin: "Gloxinia speciosa", meaning: "“Love at first sight.”" },//done
    { name: "Hawthorn", latin: "Crataegus monogyna", meaning: "“Hope and protection.”" },//done
    { name: "Heather", latin: "Calluna vulgaris", meaning: "“Loneliness and protection.”" },//done
    { name: "Hibiscus", latin: "Hibiscus rosa-sinensis", meaning: "“Delicate and fleeting beauty.”" },//done
    { name: "Hydrangea", latin: "Hydrangea macrophylla", meaning: "“A heartless boast.”" },//done
    { name: "Iris", latin: "Iris germanica", meaning: "“Message and wisdom.”" },//done
    { name: "Ivy", latin: "Hedera helix", meaning: "“Fidelity and eternal friendship.”" },//done
    { name: "Jasmine", latin: "Jasminum officinale", meaning: "“Grace and elegance.”" },//done
    { name: "Kalmia", latin: "Kalmia latifolia", meaning: "“Ambition and perseverance.”" },//done
    { name: "Laburnum", latin: "Laburnum anagyroides", meaning: "“Pensive beauty and forsaken.”" },//done
    { name: "Lavender", latin: "Lavandula angustifolia", meaning: "“Distrust and suspicion.”" },//done
    { name: "Lily of the Valley", latin: "Convallaria majalis", meaning: "“The return of happiness.”" },//done
    { name: "Lotus", latin: "Nelumbo nucifera", meaning: "“Eloquence and purity.”" },//done
    { name: "Magnolia", latin: "Magnolia grandiflora", meaning: "“Love of nature; dignity.”" },//done
    { name: "Mistletoe", latin: "Viscum album", meaning: "“I surmount all obstacles.”" },//done
    { name: "Sunflower", latin: "Helianthus annuus", meaning: "“Adoration, loyalty, and haughtiness; ambition reaching for the light.”" },//done
    { name: "Narcissus", latin: "Narcissus", meaning: "“Egotism and self-esteem.”" },//done
    { name: "Oleander", latin: "Nerium oleander", meaning: "“Beware; complex beauty.”" },//done
    { name: "Orange Blossom", latin: "Citrus sinensis", meaning: "“Eternal purity.”" },//done
    { name: "Orchid", latin: "Orchidaceae", meaning: "“Refinement and luxury.”" },//done
    { name: "Peony", latin: "Paeonia officinalis", meaning: "“Bashfulness and shame.”" },//done
    { name: "Periwinkle", latin: "Vinca minor", meaning: "“Tender recollections.”" },//done
    { name: "Petunia", latin: "Petunia hybrida", meaning: "“Your presence soothes me.”" },//done
    { name: "Poppy", latin: "Papaver somniferum", meaning: "“Eternal sleep and oblivion.”" },//done
    { name: "Quince", latin: "Cydonia oblonga", meaning: "“Temptation and choice.”" },//done
    { name: "Rue", latin: "Ruta graveolens", meaning: "“Disdain and regret.”" },//done
    { name: "Sage", latin: "Salvia officinalis", meaning: "“Domestic virtue and esteem.”" },//done
    { name: "Snapdragon", latin: "Antirrhinum majus", meaning: "“Deception and graciousness.”" },//done
    { name: "Stock", latin: "Matthiola incana", meaning: "“Lasting beauty.”" },//done
    { name: "Sun-Dew", latin: "Drosera", meaning: "“Surprise; I will catch you.”" },//done
    { name: "Tansy", latin: "Tanacetum vulgare", meaning: "“I declare war against you.”" },//done
    { name: "Valerian", latin: "Valeriana officinalis", meaning: "“An accommodating disposition.”" },//done
    { name: "Yarrow", latin: "Achillea millefolium", meaning: "“Healing and war.”" },//done
    { name: "Zinnia", latin: "Zinnia elegans", meaning: "“Thoughts of absent friends.”" }//done 
];

// Ensure this runs AFTER the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateSpecimen();
});

function updateSpecimen() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    
    // Selecting the specimen based on the day of the year
    const flower = flowerCollection[dayOfYear % flowerCollection.length];

    // MATCHING THE HTML IDs:
    
    // 1. Update Name and Latin Subtitle
    const nameElement = document.getElementById('flower-name');
    if (nameElement) {
        nameElement.innerHTML = `${flower.name}<br><span class="latin-subtitle">${flower.latin}</span>`;
    }

    // 2. Update the Victorian Meaning
    const meaningElement = document.getElementById('flower-meaning');
    if (meaningElement) {
        meaningElement.innerText = flower.meaning;
    }
    
    // 3. Update the Image Source
    const imgElement = document.getElementById('flower-img');
    if (imgElement) {
        const imagePath = flower.latin.toLowerCase().replace(/\s+/g, '_') + ".png";
        imgElement.src = `assets/specimens/${imagePath}`;
        imgElement.alt = `Botanical etching of ${flower.name}`;
    }
    
    // 4. Update Catalog ID
    const catalogElement = document.getElementById('catalog-id');
    if (catalogElement) {
        catalogElement.innerText = `2026-F${dayOfYear.toString().padStart(3, '0')}`;
    }
}