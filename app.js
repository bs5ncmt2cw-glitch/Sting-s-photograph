const STORAGE_KEY = "travel-photo-spots-data-v1";
const NON_USER_PLACE_IDS = new Set([
  "tokyo-tower",
  "louvre-museum",
  "hallstatt-lakeside",
]);
const NON_USER_SPOT_IDS = new Set([
  "shiba-park-framing-spot",
  "roppongi-crossing-view",
  "louvre-pyramid-centerline",
  "courtyard-reflection-corner",
  "main-lakeside-postcard-view",
  "elevated-village-viewpoint",
]);

const seedData = {
  places: [
    {
      id: "hanakawado-tokyo",
      name: "Hanakawado Riverside",
      slug: "hanakawado-riverside",
      country: "Japan",
      city: "Tokyo",
      description:
        "Riverside bridge views in Asakusa with layered light, rail structure, and night reflections.",
      coverImageUrl: "./assets/images/tokyo/hanakawado-sumida-river-bridge.jpg",
      tags: ["Night", "Bridge", "River"],
      bestFor: ["Night View", "Bridge", "Reflection"],
      bestTime: "Blue Hour to Night",
      crowdLevel: "Medium",
      transportNotes:
        "Best reached from the Hanakawado and Asakusa side of the Sumida River.",
      walkingNotes: "Easy riverside walking access.",
      featured: true,
      published: true,
    },
    {
      id: "sensoji-asakusa",
      name: "Senso-ji Asakusa",
      slug: "sensoji-asakusa",
      country: "Japan",
      city: "Tokyo",
      description:
        "Low-light street and temple-side moments around Asakusa with intimate telephoto framing.",
      coverImageUrl: "./assets/images/tokyo/sensoji-dragon-fountain-night.jpg",
      tags: ["Temple", "Street", "Night"],
      bestFor: ["Portrait", "Street", "Detail"],
      bestTime: "Night",
      crowdLevel: "Medium",
      transportNotes: "Reachable on foot from Asakusa Station and the Senso-ji precinct.",
      walkingNotes: "Easy walking around the temple approach and side areas.",
      featured: false,
      published: true,
    },
    {
      id: "keisei-bridge-sumida",
      name: "Keisei Bridge Sumida",
      slug: "keisei-bridge-sumida",
      country: "Japan",
      city: "Tokyo",
      description:
        "Telephoto urban layers near Sumida with warm winter light and bridge-side street framing.",
      coverImageUrl: "./assets/images/tokyo/keisei-bridge-winter-streetlight.jpg",
      tags: ["Bridge", "Street", "Winter Light"],
      bestFor: ["Street", "Urban Layer", "Light"],
      bestTime: "Morning",
      crowdLevel: "Low",
      transportNotes: "Look for the bridge and surrounding street approaches in Sumida.",
      walkingNotes: "Short street walk with light elevation changes.",
      featured: false,
      published: true,
    },
    {
      id: "shibuya-sky",
      name: "Shibuya Sky",
      slug: "shibuya-sky",
      country: "Japan",
      city: "Tokyo",
      description:
        "Observation deck views for dramatic sunsets, layered city light, and skyline reflections.",
      coverImageUrl: "./assets/images/tokyo/shibuya-sky-sunset-crowd-silhouette.jpg",
      tags: ["Observation Deck", "Sunset", "Cityscape"],
      bestFor: ["Sunset", "Cityscape", "Reflection"],
      bestTime: "Sunset to Blue Hour",
      crowdLevel: "High",
      transportNotes: "Direct access from Shibuya Scramble Square / Shibuya Station.",
      walkingNotes: "Easy access once inside the observation deck.",
      featured: true,
      published: true,
    },
    {
      id: "daikanyamacho",
      name: "Daikanyamacho",
      slug: "daikanyamacho",
      country: "Japan",
      city: "Tokyo",
      description:
        "Quiet slope-side streets and candid urban scenes with strong winter light in Daikanyama.",
      coverImageUrl: "./assets/images/tokyo/daikanyama-slope-candid-crossing.jpg",
      tags: ["Street", "Candid", "Daylight"],
      bestFor: ["Street", "Candid", "Telephoto"],
      bestTime: "Morning to Afternoon",
      crowdLevel: "Low",
      transportNotes: "Walk outward from Daikanyama Station into the residential slopes.",
      walkingNotes: "Some uphill and downhill streets.",
      featured: false,
      published: true,
    },
    {
      id: "odaiba-kaihinkoen",
      name: "Odaiba Kaihinkoen",
      slug: "odaiba-kaihinkoen",
      country: "Japan",
      city: "Tokyo",
      description:
        "Sunset and twilight waterfront compositions with layered reflections toward the skyline.",
      coverImageUrl: "./assets/images/tokyo/odaiba-statue-sunset-reflection.jpg",
      tags: ["Waterfront", "Sunset", "Reflection"],
      bestFor: ["Sunset", "Reflection", "Silhouette"],
      bestTime: "Sunset / Blue Hour",
      crowdLevel: "Medium",
      transportNotes: "Reach via Odaiba seaside access and walk along the waterfront.",
      walkingNotes: "Flat and easy promenade access.",
      featured: false,
      published: true,
    },
    {
      id: "ebisu-garden-place",
      name: "Ebisu Garden Place",
      slug: "ebisu-garden-place",
      country: "Japan",
      city: "Tokyo",
      description:
        "High-rise city views with clean Tokyo Tower alignment and compact night skyline framing.",
      coverImageUrl: "./assets/images/tokyo/ebisu-garden-place-tokyo-tower-night-view.jpg",
      tags: ["Night", "Observation", "Tokyo Tower"],
      bestFor: ["Night View", "Cityscape", "Telephoto"],
      bestTime: "Night",
      crowdLevel: "Medium",
      transportNotes: "Use Ebisu Garden Place upper-floor viewpoints.",
      walkingNotes: "Indoor access with minimal walking.",
      featured: false,
      published: true,
    },
    {
      id: "ginza-koban",
      name: "The Koban in Ginza",
      slug: "the-koban-in-ginza",
      country: "Japan",
      city: "Tokyo",
      description:
        "Busy crosswalk street scenes with layered geometry and pedestrian flow in central Ginza.",
      coverImageUrl: "./assets/images/tokyo/ginza-koban-crosswalk-flow.jpg",
      tags: ["Street", "Crosswalk", "City"],
      bestFor: ["Street", "People", "Daylight"],
      bestTime: "Daytime",
      crowdLevel: "High",
      transportNotes: "Near Ginza station-side street crossings and the local koban landmark.",
      walkingNotes: "Easy flat city walking.",
      featured: false,
      published: true,
    },
    {
      id: "tokyo-university-bunkyo",
      name: "Tokyo University Bunkyo",
      slug: "tokyo-university-bunkyo",
      country: "Japan",
      city: "Tokyo",
      description:
        "Seasonal campus portraits and motion-filled leaf scenes around the University of Tokyo area.",
      coverImageUrl: "./assets/images/tokyo/tokyo-university-golden-leaf-portrait.jpg",
      tags: ["Campus", "Autumn", "Portrait"],
      bestFor: ["Portrait", "Autumn", "Action"],
      bestTime: "Daytime",
      crowdLevel: "Low",
      transportNotes: "Use the Bunkyo-side entrance areas around the University of Tokyo.",
      walkingNotes: "Easy campus-area walking.",
      featured: false,
      published: true,
    },
  ],
  spots: [
    {
      id: "tobu-isesaki-line-sumida-river-bridge-view",
      placeId: "hanakawado-tokyo",
      name: "Tobu Isesaki Line Sumida River Bridge View",
      photographer: "Sting",
      shortDescription:
        "Compressed 135mm river view with illuminated bridge curves and sunset color behind the city skyline.",
      fullDescription:
        "Photographed from the Hanakawado side of Tokyo, this viewpoint layers the Sumida River bridge structure, city lights, and reflected dusk color into a tight telephoto composition.",
      latitude: null,
      longitude: null,
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Hanakawado%20Tokyo%20%E6%9D%B1%E6%AD%A6%E4%BC%8A%E5%8B%A2%E5%B4%8E%E7%B7%9A%20%E9%9A%85%E7%94%B0%E5%B7%9D%E6%A9%8B%E6%A2%81",
      bestTime: "Blue Hour / Night",
      bestFor: ["Night View", "Bridge", "Reflection"],
      lensSuggestion: "135mm",
      howToStand:
        "Use a telephoto position from the riverside and align the bridge arc across the lower frame with the skyline stacked behind it.",
      tips:
        "Captured on Dec 31st, 2025 at 1/125, f/2.0, ISO 2000. A steady stance or support helps when preserving fine city detail at night.",
      difficulty: "Easy",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/hanakawado-sumida-river-bridge.jpg",
          caption:
            "Photographed by Sting on Dec 31st, 2025. 135mm, f/2.0, 1/125, ISO 2000. Tobu Isesaki Line Sumida River Bridge, Hanakawado, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "sensoji-dragon-fountain-night",
      placeId: "sensoji-asakusa",
      name: "Senso-ji Dragon Fountain Night",
      photographer: "Sting",
      shortDescription:
        "A close telephoto night frame catching the dragon fountain and a soft human moment behind it.",
      fullDescription:
        "This composition uses shallow depth of field to isolate the dragon fountain at Senso-ji while keeping the background figure atmospheric rather than descriptive.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Senso-ji%20Asakusa%20Taito%20Tokyo",
      bestTime: "Night",
      bestFor: ["Portrait", "Detail", "Temple"],
      lensSuggestion: "135mm",
      howToStand:
        "Stand slightly off-axis from the fountain so the dragon head sits sharp in the foreground and background visitors stay soft.",
      tips:
        "Photographed on Dec 31st, 2025 at 1/320, f/2.8, ISO 160. Use the point light reflections in the water basin to add sparkle.",
      difficulty: "Easy",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/sensoji-dragon-fountain-night.jpg",
          caption:
            "Photographed by Sting on Dec 31st, 2025. 135mm, f/2.8, 1/320, ISO 160. Senso-ji, Asakusa, Taito, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "keisei-bridge-winter-streetlight",
      placeId: "keisei-bridge-sumida",
      name: "Keisei Bridge Winter Streetlight",
      photographer: "Sting",
      shortDescription:
        "Warm low winter sun over a bridge-side street with compressed layers of signage, railings, and passing cyclists.",
      fullDescription:
        "This is a telephoto street scene that works because the morning light compresses the urban layers and turns ordinary roadside structures into graphic elements.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=%E4%BA%AC%E6%88%90%E6%A9%8B%20Sumida%20Tokyo",
      bestTime: "Morning",
      bestFor: ["Street", "Urban Layer", "Light"],
      lensSuggestion: "135mm",
      howToStand:
        "Shoot from slightly uphill or across the road so the bridge railings and cyclist land in separate depth layers.",
      tips:
        "Photographed on Dec 31st, 2025 at 1/1250, f/3.6, ISO 160. Wait for a single subject to enter the bright edge light.",
      difficulty: "Easy",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/keisei-bridge-winter-streetlight.jpg",
          caption:
            "Photographed by Sting on Dec 31st, 2025. 135mm, f/3.6, 1/1250, ISO 160. Keisei Bridge, Sumida, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "shibuya-sky-sunset-crowd-silhouette",
      placeId: "shibuya-sky",
      name: "Shibuya Sky Sunset Crowd Silhouette",
      photographer: "Sting",
      shortDescription:
        "A dramatic rooftop sunset with silhouetted visitors, strong flare, and distant Mount Fuji on the horizon.",
      fullDescription:
        "This spot works when the observation deck fills with people because their silhouettes become part of the scale and atmosphere rather than an obstruction.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Shibuya%20Sky%20Tokyo",
      bestTime: "Sunset",
      bestFor: ["Sunset", "Silhouette", "Observation Deck"],
      lensSuggestion: "71mm",
      howToStand:
        "Face the sunset edge and let the foreground crowd form a dark base below the sun.",
      tips:
        "Photographed on Dec 29th, 2025 at 1/160, f/14.0, ISO 100. A smaller aperture helps hold shape in the light plume around the sun.",
      difficulty: "Easy",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/shibuya-sky-sunset-crowd-silhouette.jpg",
          caption:
            "Photographed by Sting on Dec 29th, 2025. 71mm, f/14.0, 1/160, ISO 100. Shibuya Sky, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "shibuya-sky-city-reflection-layer",
      placeId: "shibuya-sky",
      name: "Shibuya Sky City Reflection Layer",
      photographer: "Sting",
      shortDescription:
        "A layered cityscape using rooftop reflections and ghosted visitors above the skyline.",
      fullDescription:
        "This frame turns the observation deck glass and human reflections into a second visual plane, giving the skyline a dreamlike double exposure effect.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Shibuya%20Sky%20Tokyo",
      bestTime: "Late Afternoon",
      bestFor: ["Reflection", "Cityscape", "Creative"],
      lensSuggestion: "40mm",
      howToStand:
        "Work close to the glass and align reflected visitors above the horizon line so the city remains readable below.",
      tips:
        "Photographed on Dec 29th, 2025 at 1/500, f/4.0, ISO 100. Reflection intensity changes quickly as you shift angle by a few centimeters.",
      difficulty: "Medium",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/shibuya-sky-city-reflection-layer.jpg",
          caption:
            "Photographed by Sting on Dec 29th, 2025. 40mm, f/4.0, 1/500, ISO 100. Shibuya Sky, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "daikanyama-slope-candid-crossing",
      placeId: "daikanyamacho",
      name: "Daikanyama Slope Candid Crossing",
      photographer: "Sting",
      shortDescription:
        "A bright winter candid on a sloped side street with layered passersby and clean telephoto separation.",
      fullDescription:
        "The scene works because the elevation change and wide pavement create a calm geometric stage for people moving through the frame.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Daikanyamacho%20Tokyo",
      bestTime: "Daytime",
      bestFor: ["Street", "Candid", "Telephoto"],
      lensSuggestion: "135mm",
      howToStand:
        "Shoot across the street rather than along it so the pedestrians separate cleanly against the bright background.",
      tips:
        "Photographed on Dec 28th, 2025 at 1/2000, f/2.2, ISO 320. Fast shutter keeps walking gestures crisp in hard daylight.",
      difficulty: "Easy",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/daikanyama-slope-candid-crossing.jpg",
          caption:
            "Photographed by Sting on Dec 28th, 2025. 135mm, f/2.2, 1/2000, ISO 320. Daikanyamacho, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "odaiba-statue-sunset-reflection",
      placeId: "odaiba-kaihinkoen",
      name: "Odaiba Statue Sunset Reflection",
      photographer: "Sting",
      shortDescription:
        "A reflective waterfront telephoto frame layering the Statue of Liberty silhouette against sunset city tones.",
      fullDescription:
        "This view uses foreground reflections and structural blur to partially veil the skyline, making the statue silhouette stand out against the glowing dusk sky.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Odaiba%20Kaihinkoen%20Tokyo",
      bestTime: "Sunset / Blue Hour",
      bestFor: ["Sunset", "Reflection", "Silhouette"],
      lensSuggestion: "135mm",
      howToStand:
        "Find a reflective or semi-obstructed surface between you and the skyline so the statue and buildings stack into multiple translucent layers.",
      tips:
        "Photographed on Dec 27th, 2025 at 1/500, f/2.5, ISO 640. Small shifts in angle strongly change the reflection pattern.",
      difficulty: "Medium",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/odaiba-statue-sunset-reflection.jpg",
          caption:
            "Photographed by Sting on Dec 27th, 2025. 135mm, f/2.5, 1/500, ISO 640. Odaiba Kaihinkoen, Minato City, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "ebisu-garden-place-tokyo-tower-night-view",
      placeId: "ebisu-garden-place",
      name: "Ebisu Garden Place Tokyo Tower Night View",
      photographer: "Sting",
      shortDescription:
        "A compressed city-night frame with Tokyo Tower isolated in the middle of dense urban lights.",
      fullDescription:
        "This observation viewpoint is effective when you want Tokyo Tower to dominate the frame without losing the surrounding city texture.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ebisu%20Garden%20Place%20Tokyo",
      bestTime: "Night",
      bestFor: ["Night View", "Cityscape", "Tokyo Tower"],
      lensSuggestion: "135mm",
      howToStand:
        "Use a stable edge or support and keep the tower centered slightly above the middle of frame so the skyline still breathes around it.",
      tips:
        "Photographed on Dec 26th, 2025 at 1/15, f/4.5, ISO 3200. Stabilization or firm support is important at this shutter speed.",
      difficulty: "Easy",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/ebisu-garden-place-tokyo-tower-night-view.jpg",
          caption:
            "Photographed by Sting on Dec 26th, 2025. 135mm, f/4.5, 1/15, ISO 3200. F38, 39, Ebisu Garden Place, Shibuya, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "ginza-koban-crosswalk-flow",
      placeId: "ginza-koban",
      name: "Ginza Koban Crosswalk Flow",
      photographer: "Sting",
      shortDescription:
        "A classic Ginza crosswalk scene using the koban landmark and heavy pedestrian flow as the main graphic structure.",
      fullDescription:
        "The appeal of this spot is the contrast between the strict crosswalk geometry and the looser movement of shoppers passing through the frame.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The%20Koban%20in%20Ginza%20Tokyo",
      bestTime: "Daytime",
      bestFor: ["Street", "People", "Crosswalk"],
      lensSuggestion: "40mm",
      howToStand:
        "Stand back far enough to keep the zebra lines visible and wait until the crossing fills evenly across the width of the frame.",
      tips:
        "Photographed on Dec 30th, 2025 at 1/640, f/5.0, ISO 100. Midday traffic creates a dense but readable flow of people.",
      difficulty: "Easy",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/ginza-koban-crosswalk-flow.jpg",
          caption:
            "Photographed by Sting on Dec 30th, 2025. 40mm, f/5.0, 1/640, ISO 100. The Koban in the Ginza, Tokyo.",
          isCover: true,
        },
      ],
    },
    {
      id: "tokyo-university-golden-leaf-portrait",
      placeId: "tokyo-university-bunkyo",
      name: "Tokyo University Golden Leaf Portrait",
      photographer: "Sting",
      shortDescription:
        "A playful portrait moment with flying ginkgo leaves and warm backlight in Bunkyo.",
      fullDescription:
        "This spot is strongest when there is enough fallen foliage to create motion around the subject, turning a simple portrait into an energetic seasonal frame.",
      latitude: null,
      longitude: null,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tokyo%20University%20Bunkyo%20Tokyo",
      bestTime: "Daytime",
      bestFor: ["Portrait", "Autumn", "Action"],
      lensSuggestion: "135mm",
      howToStand:
        "Place the subject in a clear patch of light and shoot straight on while the leaves are tossed upward.",
      tips:
        "Photographed on Dec 31st, 2025 at 1/2500, f/2.2, ISO 160. Fast shutter speed is essential to freeze the leaves cleanly.",
      difficulty: "Easy",
      published: true,
      photos: [
        {
          imageUrl: "./assets/images/tokyo/tokyo-university-golden-leaf-portrait.jpg",
          caption:
            "Photographed by Sting on Dec 31st, 2025. 135mm, f/2.2, 1/2500, ISO 160. Tokyo University Engineering Department entrance, Bunkyo, Tokyo.",
          isCover: true,
        },
      ],
    },
  ],
};

const state = {
  route: "home",
  placeId: null,
  search: "",
  placesSearch: "",
  countryFilter: "all",
  tagFilter: "all",
};

const app = document.getElementById("app");

function cloneSeedData() {
  return JSON.parse(JSON.stringify(seedData));
}

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const fresh = cloneSeedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  try {
    const parsed = JSON.parse(raw);
    const merged = mergeWithSeedData(parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    const fresh = cloneSeedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }
}

function mergeWithSeedData(existing) {
  const safeExisting = {
    places: Array.isArray(existing?.places)
      ? existing.places.filter((place) => !NON_USER_PLACE_IDS.has(place.id))
      : [],
    spots: Array.isArray(existing?.spots)
      ? existing.spots.filter((spot) => !NON_USER_SPOT_IDS.has(spot.id) && !NON_USER_PLACE_IDS.has(spot.placeId))
      : [],
  };

  const seedPlacesById = new Map(seedData.places.map((place) => [place.id, place]));
  const seedSpotsById = new Map(seedData.spots.map((spot) => [spot.id, spot]));

  const mergedPlaces = safeExisting.places.map((place) => sanitizePlaceRecord(place, seedPlacesById.get(place.id)));
  const mergedSpots = safeExisting.spots.map((spot) => sanitizeSpotRecord(spot, seedSpotsById.get(spot.id)));

  const placeIds = new Set(mergedPlaces.map((place) => place.id));
  const spotIds = new Set(mergedSpots.map((spot) => spot.id));

  return {
    places: [
      ...mergedPlaces,
      ...seedData.places.filter((place) => !placeIds.has(place.id)),
    ],
    spots: [
      ...mergedSpots,
      ...seedData.spots.filter((spot) => !spotIds.has(spot.id)),
    ],
  };
}

function sanitizePlaceRecord(place, seedPlace) {
  const merged = {
    ...seedPlace,
    ...place,
  };

  if (isLocalFileUrl(merged.coverImageUrl) && seedPlace?.coverImageUrl) {
    merged.coverImageUrl = seedPlace.coverImageUrl;
  }

  return merged;
}

function sanitizeSpotRecord(spot, seedSpot) {
  const merged = {
    ...seedSpot,
    ...spot,
  };

  if (seedSpot?.photos?.length) {
    const seedPhotos = seedSpot.photos;
    merged.photos = (Array.isArray(merged.photos) ? merged.photos : []).map((photo, index) => {
      const seedPhoto = seedPhotos[index] || seedPhotos.find((item) => item.caption === photo.caption) || seedPhotos[0];
      if (isLocalFileUrl(photo.imageUrl) && seedPhoto?.imageUrl) {
        return {
          ...photo,
          imageUrl: seedPhoto.imageUrl,
        };
      }
      return photo;
    });
  }

  return merged;
}

function isLocalFileUrl(value) {
  return typeof value === "string" && value.startsWith("file:///");
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPublishedPlaces() {
  return getData().places.filter((place) => place.published);
}

function getPublishedSpots() {
  return getData().spots.filter((spot) => spot.published);
}

function getPlaceById(id) {
  return getData().places.find((place) => place.id === id || place.slug === id);
}

function getSpotsForPlace(placeId) {
  return getPublishedSpots().filter((spot) => spot.placeId === placeId);
}

function getCoverImage(spot) {
  return spot.photos.find((photo) => photo.isCover)?.imageUrl || spot.photos[0]?.imageUrl || "";
}

function getPlaceCard(place) {
  const spotCount = getSpotsForPlace(place.id).length;
  return `
    <article class="place-card">
      <div class="place-card-media" style="background-image:url('${place.coverImageUrl}')"></div>
      <div class="place-card-body">
        <div class="meta-row">
          <span class="meta-chip">${place.city}, ${place.country}</span>
          <span class="meta-chip">${spotCount} spot${spotCount === 1 ? "" : "s"}</span>
        </div>
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <div class="stack-actions">
          <button class="primary-button" type="button" data-action="open-place" data-place="${place.id}">View spots</button>
        </div>
      </div>
    </article>
  `;
}

function getSpotPreviewCard(spot) {
  const place = getPlaceById(spot.placeId);
  return `
    <article class="spot-preview-card">
      <div class="spot-preview-media" style="background-image:url('${getCoverImage(spot)}')"></div>
      <div class="spot-preview-body">
        <div class="meta-row">
          <span class="meta-chip">${place?.name || "Unknown place"}</span>
          <span class="meta-chip">${spot.bestTime || "Flexible time"}</span>
        </div>
        <h3>${spot.name}</h3>
        <p>${spot.shortDescription}</p>
        <div class="inline-actions">
          <button class="text-button" type="button" data-action="open-place" data-place="${spot.placeId}">See place</button>
          <a href="${spot.googleMapsUrl}" target="_blank" rel="noreferrer">Open in Google Maps</a>
        </div>
      </div>
    </article>
  `;
}

function renderHome() {
  state.route = "home";
  app.innerHTML = document.getElementById("home-template").innerHTML;

  const places = getPublishedPlaces();
  const featuredPlaces = places.filter((place) => place.featured).slice(0, 3);
  const latestSpots = getPublishedSpots().slice(0, 6);

  document.getElementById("featured-places").innerHTML = featuredPlaces.map(getPlaceCard).join("");
  document.getElementById("latest-spots").innerHTML = latestSpots.map(getSpotPreviewCard).join("");
  document.getElementById("hero-visual").innerHTML = getHeroVisual(places.slice(0, 3));

  const searchInput = document.getElementById("search-input");
  searchInput.value = state.search;
  document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.search = searchInput.value.trim();
    renderPlaces();
  });
}

function getHeroVisual(places) {
  if (!places.length) return "";
  const [main, second, third] = places;
  return `
    <div class="hero-collage-main">
      <div class="hero-tile" style="background-image:url('${main.coverImageUrl}')">
        <span>${main.name}</span>
      </div>
    </div>
    <div class="hero-collage-stack">
      <div class="hero-tile" style="background-image:url('${second?.coverImageUrl || main.coverImageUrl}')">
        <span>${second?.name || main.name}</span>
      </div>
      <div class="hero-tile" style="background-image:url('${third?.coverImageUrl || main.coverImageUrl}')">
        <span>${third?.name || main.name}</span>
      </div>
    </div>
  `;
}

function renderPlaces() {
  state.route = "places";
  app.innerHTML = document.getElementById("places-template").innerHTML;

  const places = getPublishedPlaces();
  const countries = [...new Set(places.map((place) => place.country))].sort();
  const tags = [...new Set(places.flatMap((place) => place.tags))].sort();

  const countrySelect = document.getElementById("country-filter");
  const tagSelect = document.getElementById("tag-filter");
  const searchInput = document.getElementById("places-search");

  countrySelect.innerHTML = [`<option value="all">All countries</option>`, ...countries.map((country) => `<option value="${country}">${country}</option>`)].join("");
  tagSelect.innerHTML = [`<option value="all">All tags</option>`, ...tags.map((tag) => `<option value="${tag}">${tag}</option>`)].join("");

  searchInput.value = state.search || state.placesSearch;
  countrySelect.value = state.countryFilter;
  tagSelect.value = state.tagFilter;

  function updateGrid() {
    state.placesSearch = searchInput.value.trim();
    state.countryFilter = countrySelect.value;
    state.tagFilter = tagSelect.value;

    const needle = state.placesSearch.toLowerCase();
    const filtered = places.filter((place) => {
      const matchesSearch =
        !needle ||
        [place.name, place.city, place.country, place.description].join(" ").toLowerCase().includes(needle);
      const matchesCountry = state.countryFilter === "all" || place.country === state.countryFilter;
      const matchesTag = state.tagFilter === "all" || place.tags.includes(state.tagFilter);
      return matchesSearch && matchesCountry && matchesTag;
    });

    document.getElementById("places-grid").innerHTML =
      filtered.length > 0
        ? filtered.map(getPlaceCard).join("")
        : `<article class="info-card"><h3>No places matched</h3><p>Try a different keyword or clear the filters.</p></article>`;
  }

  [searchInput, countrySelect, tagSelect].forEach((element) => {
    element.addEventListener("input", updateGrid);
    element.addEventListener("change", updateGrid);
  });

  updateGrid();
}

function renderPlaceDetail(placeId) {
  const place = getPlaceById(placeId);
  if (!place) {
    renderPlaces();
    return;
  }

  state.route = "place";
  state.placeId = place.id;
  app.innerHTML = document.getElementById("place-detail-template").innerHTML;

  const spots = getSpotsForPlace(place.id);
  document.getElementById("place-hero").innerHTML = `
    <div class="place-cover" style="background-image:url('${place.coverImageUrl}')"></div>
    <div class="place-hero-content">
      <p class="eyebrow">${place.city}, ${place.country}</p>
      <h1 class="place-title">${place.name}</h1>
      <p>${place.description}</p>
      <div class="meta-row">
        ${place.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join("")}
      </div>
    </div>
  `;

  const overviewItems = [
    ["Best for", place.bestFor.join(", ") || "Travel photography"],
    ["Best time", place.bestTime || "Flexible"],
    ["Crowd level", place.crowdLevel || "Unknown"],
    ["Transport", place.transportNotes || "No notes yet"],
    ["Walking", place.walkingNotes || "No notes yet"],
  ];

  document.getElementById("overview-grid").innerHTML = overviewItems
    .map(
      ([title, value]) => `
      <article class="overview-card">
        <strong>${title}</strong>
        <p>${value}</p>
      </article>
    `
    )
    .join("");

  document.getElementById("spot-section-title").textContent = `${spots.length} photo spot${spots.length === 1 ? "" : "s"} for ${place.name}`;

  document.getElementById("spot-stack").innerHTML =
    spots.length > 0
      ? spots.map((spot) => getSpotCard(spot)).join("")
      : `<article class="info-card"><h3>No spots yet</h3><p>Add your first spot from the Manage Data page.</p></article>`;
}

function getSpotCard(spot) {
  const photos = spot.photos.slice(0, 3);
  return `
    <article class="spot-card" id="${spot.id}">
      <div class="spot-gallery">
        <div class="spot-main-image" style="background-image:url('${getCoverImage(spot)}')"></div>
        <div class="thumb-row">
          ${photos
            .map(
              (photo) => `
              <div class="thumb-image" style="background-image:url('${photo.imageUrl}')" title="${photo.caption || ""}"></div>
            `
            )
            .join("")}
        </div>
      </div>

      <div class="spot-text">
        <div>
          <div class="meta-row">
            ${spot.bestTime ? `<span class="meta-chip">${spot.bestTime}</span>` : ""}
            ${spot.difficulty ? `<span class="meta-chip">${spot.difficulty}</span>` : ""}
          </div>
          <h3>${spot.name}</h3>
          <p>${spot.shortDescription}</p>
        </div>

        <div class="meta-row">
          ${(spot.bestFor || []).map((item) => `<span class="tag-pill">${item}</span>`).join("")}
        </div>

        <div class="spot-copy-block">
          <strong>Why this spot works</strong>
          <p>${spot.fullDescription || "No detailed note yet."}</p>
        </div>
        <div class="spot-copy-block">
          <strong>How to stand</strong>
          <p>${spot.howToStand || "No standing note yet."}</p>
        </div>
        <div class="spot-copy-block">
          <strong>Lens suggestion</strong>
          <p>${spot.lensSuggestion || "Not specified yet."}</p>
        </div>
        <div class="spot-copy-block">
          <strong>Tips</strong>
          <p>${spot.tips || "No tips yet."}</p>
        </div>
        ${
          spot.photographer
            ? `
          <div class="spot-copy-block">
            <strong>Photographer</strong>
            <p>${spot.photographer}</p>
          </div>
        `
            : ""
        }

        <div class="stack-actions">
          <a class="primary-button" href="${spot.googleMapsUrl}" target="_blank" rel="noreferrer">Open in Google Maps</a>
          ${
            spot.latitude && spot.longitude
              ? `<span class="meta-chip">Lat ${spot.latitude}, Lng ${spot.longitude}</span>`
              : ""
          }
        </div>
      </div>
    </article>
  `;
}

function renderAdmin() {
  state.route = "admin";
  app.innerHTML = document.getElementById("admin-template").innerHTML;
  bindAdminForms();
  renderAdminList();
}

function bindAdminForms() {
  const placeForm = document.getElementById("place-form");
  const spotForm = document.getElementById("spot-form");
  const spotSelect = document.getElementById("spot-place-select");
  const places = getData().places;

  spotSelect.innerHTML = places
    .map((place) => `<option value="${place.id}">${place.name}</option>`)
    .join("");

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-tab]").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      const showSpot = button.dataset.tab === "spot";
      placeForm.classList.toggle("hidden", showSpot);
      spotForm.classList.toggle("hidden", !showSpot);
    });
  });

  placeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(placeForm);
    const name = formData.get("name").toString().trim();
    const data = getData();
    const id = slugify(name);
    data.places.unshift({
      id,
      slug: id,
      name,
      country: formData.get("country").toString().trim(),
      city: formData.get("city").toString().trim(),
      description: formData.get("description").toString().trim(),
      coverImageUrl: formData.get("coverImageUrl").toString().trim(),
      tags: splitList(formData.get("tags")),
      bestFor: splitList(formData.get("bestFor")),
      bestTime: formData.get("bestTime").toString().trim(),
      crowdLevel: formData.get("crowdLevel").toString().trim(),
      transportNotes: formData.get("transportNotes").toString().trim(),
      walkingNotes: formData.get("walkingNotes").toString().trim(),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    });
    saveData(data);
    renderAdmin();
  });

  spotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(spotForm);
    const name = formData.get("name").toString().trim();
    const data = getData();
    data.spots.unshift({
      id: slugify(name),
      placeId: formData.get("placeId").toString(),
      name,
      shortDescription: formData.get("shortDescription").toString().trim(),
      fullDescription: formData.get("fullDescription").toString().trim(),
      latitude: parseMaybeNumber(formData.get("latitude")),
      longitude: parseMaybeNumber(formData.get("longitude")),
      googleMapsUrl: formData.get("googleMapsUrl").toString().trim(),
      bestTime: formData.get("bestTime").toString().trim(),
      bestFor: splitList(formData.get("bestFor")),
      lensSuggestion: formData.get("lensSuggestion").toString().trim(),
      howToStand: formData.get("howToStand").toString().trim(),
      tips: formData.get("tips").toString().trim(),
      difficulty: formData.get("difficulty").toString().trim(),
      published: true,
      photos: [
        {
          imageUrl: formData.get("coverImageUrl").toString().trim(),
          caption: `${name} cover photo`,
          isCover: true,
        },
      ],
    });
    saveData(data);
    renderAdmin();
  });

  document.getElementById("export-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(getData(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "travel-photo-spots-data.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("import-json").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!parsed.places || !parsed.spots) {
      alert("Invalid JSON. Expected places and spots arrays.");
      return;
    }
    saveData(parsed);
    renderAdmin();
  });

  const jsonEditor = document.getElementById("json-editor");
  jsonEditor.value = JSON.stringify(getData(), null, 2);
  document.getElementById("json-editor-form").addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const parsed = JSON.parse(jsonEditor.value);
      if (!parsed.places || !parsed.spots) {
        throw new Error("Expected places and spots arrays.");
      }
      saveData(parsed);
      renderAdmin();
    } catch (error) {
      alert(`JSON save failed: ${error.message}`);
    }
  });
}

function renderAdminList() {
  const container = document.getElementById("admin-list");
  const data = getData();
  container.className = "admin-list";
  container.innerHTML = data.places
    .map((place) => {
      const spots = data.spots.filter((spot) => spot.placeId === place.id);
      return `
        <article class="admin-item">
          <div class="admin-item-body">
            <div class="meta-row">
              <span class="meta-chip">${place.city}, ${place.country}</span>
              <span class="meta-chip">${spots.length} spot${spots.length === 1 ? "" : "s"}</span>
            </div>
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <div class="admin-spot-list">
              ${spots
                .map(
                  (spot) => `
                  <div class="admin-spot-entry">
                    <strong>${spot.name}</strong>
                    <p>${spot.shortDescription}</p>
                    <div class="inline-actions">
                      <a href="${spot.googleMapsUrl}" target="_blank" rel="noreferrer">Open map</a>
                    </div>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function splitList(value) {
  return value
    .toString()
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMaybeNumber(value) {
  const raw = value.toString().trim();
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function resetData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cloneSeedData()));
  routeTo("home");
}

function routeTo(route, placeId = null) {
  if (route === "home") renderHome();
  if (route === "places") renderPlaces();
  if (route === "admin") renderAdmin();
  if (route === "place" && placeId) renderPlaceDetail(placeId);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const { action, place } = target.dataset;

  if (action === "go-home") routeTo("home");
  if (action === "show-places") routeTo("places");
  if (action === "show-admin") routeTo("admin");
  if (action === "open-place") routeTo("place", place);
  if (action === "reset-data") resetData();
});

renderHome();
