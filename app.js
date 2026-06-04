const STORAGE_KEY = "travel-photo-spots-data-v1";
const SHARED_CONTENT_SYNC_INTERVAL_MS = 30000;
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
  adminMessage: "",
  adminFeedback: "",
  adminAuthenticated: false,
  authApiAvailable: true,
  contentApiAvailable: false,
  sharedContentInitialized: false,
  data: null,
  adminTab: "place",
  editingPlaceId: null,
  editingSpotId: null,
  sharedSyncTimerId: null,
};

const app = document.getElementById("app");

function cloneSeedData() {
  return JSON.parse(JSON.stringify(seedData));
}

function isLocalOnlyMode() {
  const hostname = window.location.hostname;
  return (
    window.location.protocol === "file:" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

function cacheSharedDataLocally(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getLocalData() {
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

function getData() {
  return state.data || getLocalData();
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
  state.data = mergeWithSeedData(data);
  cacheSharedDataLocally(data);
}

function setAdminFeedback(message) {
  state.adminFeedback = message;
  const feedback = document.getElementById("admin-feedback");
  if (feedback) {
    feedback.textContent = message;
  }
}

function isAdminAuthenticated() {
  return state.adminAuthenticated;
}

async function refreshAdminSession() {
  try {
    const response = await fetch("/api/admin/session", {
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error("Admin session check failed.");
    }

    const payload = await response.json();
    state.adminAuthenticated = Boolean(payload.authenticated);
    state.authApiAvailable = true;
    syncAdminControls();
    return state.adminAuthenticated;
  } catch {
    state.adminAuthenticated = false;
    state.authApiAvailable = false;
    syncAdminControls();
    return false;
  }
}

async function refreshContentData() {
  try {
    const response = await fetch("/api/content", {
      credentials: "same-origin",
    });

    if (response.status === 404) {
      state.contentApiAvailable = true;
      state.sharedContentInitialized = false;
      state.data = mergeWithSeedData(getLocalData());
      return state.data;
    }

    if (!response.ok) {
      throw new Error("Content API check failed.");
    }

    const payload = await response.json();
    state.contentApiAvailable = true;
    state.sharedContentInitialized = Boolean(payload.initialized);
    state.data = mergeWithSeedData(payload.data);
    cacheSharedDataLocally(state.data);
    return state.data;
  } catch (error) {
    state.contentApiAvailable = false;
    state.sharedContentInitialized = false;

    if (isLocalOnlyMode()) {
      state.data = mergeWithSeedData(getLocalData());
      return state.data;
    }

    if (state.data) {
      return state.data;
    }

    state.adminMessage = error?.message || "Shared content is temporarily unavailable.";
    state.data = mergeWithSeedData(getLocalData());
    return state.data;
  }
}

async function persistData(data) {
  const merged = mergeWithSeedData(data);
  state.data = merged;

  if (state.contentApiAvailable) {
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(merged),
    });

    if (!response.ok) {
      let message = "Unable to save shared content.";
      try {
        const payload = await response.json();
        if (payload?.message) {
          message = payload.message;
        }
      } catch {
        // Keep fallback message.
      }
      throw new Error(message);
    }

    state.sharedContentInitialized = true;
    cacheSharedDataLocally(merged);
  } else {
    if (!isLocalOnlyMode()) {
      throw new Error("Shared content is unavailable. Reload the site and try again.");
    }
    saveData(merged);
  }

  return merged;
}

async function uploadImageFile(file, category) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  const response = await fetch("/api/admin/upload-image", {
    method: "POST",
    credentials: "same-origin",
    body: formData,
  });

  if (!response.ok) {
    let message = "Unable to upload image.";
    try {
      const payload = await response.json();
      if (payload?.message) {
        message = payload.message;
      }
    } catch {
      // Keep fallback message.
    }
    throw new Error(message);
  }

  return response.json();
}

function collectR2ImageUrlsFromSpots(spots) {
  return [
    ...new Set(
      spots
        .flatMap((spot) => Array.isArray(spot.photos) ? spot.photos : [])
        .map((photo) => photo?.imageUrl)
        .filter((imageUrl) => typeof imageUrl === "string" && imageUrl.startsWith("/api/images/"))
    ),
  ];
}

function collectR2ImageUrlsFromPlace(place) {
  return typeof place?.coverImageUrl === "string" && place.coverImageUrl.startsWith("/api/images/")
    ? [place.coverImageUrl]
    : [];
}

async function deleteUploadedImages(imageUrls) {
  const urls = [...new Set((imageUrls || []).filter(Boolean))];
  if (!urls.length || !state.contentApiAvailable) return;

  const response = await fetch("/api/admin/delete-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ imageUrls: urls }),
  });

  if (!response.ok) {
    let message = "Unable to delete uploaded images.";
    try {
      const payload = await response.json();
      if (payload?.message) {
        message = payload.message;
      }
    } catch {
      // Keep fallback message.
    }
    throw new Error(message);
  }
}

async function cleanupUploadedImages(imageUrls) {
  try {
    await deleteUploadedImages(imageUrls);
    return "";
  } catch (error) {
    return error.message || "Uploaded image cleanup failed.";
  }
}

async function loginAdmin(passcode) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ passcode }),
  });

  if (response.ok) {
    state.adminAuthenticated = true;
    state.authApiAvailable = true;
    syncAdminControls();
    return { ok: true };
  }

  let message = "Passcode not correct.";
  try {
    const payload = await response.json();
    if (payload?.message) {
      message = payload.message;
    }
  } catch {
    // Keep the fallback message if the response body is not JSON.
  }

  state.adminAuthenticated = false;
  state.authApiAvailable = true;
  syncAdminControls();
  return { ok: false, message };
}

async function logoutAdmin() {
  try {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
  } finally {
    state.adminAuthenticated = false;
    state.authApiAvailable = true;
    syncAdminControls();
  }
}

function syncAdminControls() {
  const adminButton = document.getElementById("admin-nav-button");
  const resetButton = document.getElementById("reset-nav-button");
  const authButton = document.getElementById("admin-auth-button");
  const authed = isAdminAuthenticated();

  adminButton?.classList.toggle("hidden", !authed);
  resetButton?.classList.toggle("hidden", !authed);

  if (authButton) {
    authButton.textContent = authed
      ? "Admin Logout"
      : state.authApiAvailable
        ? "Admin Access"
        : "Admin Requires Server";
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureUniqueId(items, baseId) {
  const safeBase = baseId || `item-${Date.now()}`;
  let candidate = safeBase;
  let counter = 2;
  const existingIds = new Set(items.map((item) => item.id));

  while (existingIds.has(candidate)) {
    candidate = `${safeBase}-${counter}`;
    counter += 1;
  }

  return candidate;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsDataURL(file);
  });
}

async function resolveUploadedImage(fileInput, fallbackUrl) {
  const file = fileInput?.files?.[0];
  if (file) {
    if (state.contentApiAvailable) {
      const uploaded = await uploadImageFile(file, "place");
      return uploaded.imageUrl;
    }
    if (!isLocalOnlyMode()) {
      throw new Error("Image upload is temporarily unavailable. Reload the site and try again.");
    }
    return fileToDataUrl(file);
  }

  return fallbackUrl.trim();
}

async function buildSpotPhotos(fileInput, fallbackUrl, name, captionPrefix) {
  const files = Array.from(fileInput?.files || []);

  if (files.length > 0) {
    if (state.contentApiAvailable) {
      const uploadedImages = await Promise.all(
        files.map((file) => uploadImageFile(file, "spot"))
      );

      return uploadedImages.map((uploaded, index) => ({
        imageUrl: uploaded.imageUrl,
        caption: captionPrefix
          ? files.length === 1
            ? captionPrefix
            : `${captionPrefix} (${index + 1})`
          : `${name} photo ${index + 1}`,
        isCover: index === 0,
      }));
    }

    if (!isLocalOnlyMode()) {
      throw new Error("Image upload is temporarily unavailable. Reload the site and try again.");
    }

    const images = await Promise.all(
      files.map(async (file, index) => ({
        imageUrl: await fileToDataUrl(file),
        caption: captionPrefix
          ? files.length === 1
            ? captionPrefix
            : `${captionPrefix} (${index + 1})`
          : `${name} photo ${index + 1}`,
        isCover: index === 0,
      }))
    );

    return images;
  }

  if (fallbackUrl.trim()) {
    return [
      {
        imageUrl: fallbackUrl.trim(),
        caption: captionPrefix || `${name} cover photo`,
        isCover: true,
      },
    ];
  }

  return [];
}

async function syncSharedContentIfNeeded() {
  if (isLocalOnlyMode() || state.route === "admin" || state.route === "admin-login") {
    return;
  }

  const previousData = JSON.stringify(state.data);
  await refreshContentData();
  const nextData = JSON.stringify(state.data);

  if (previousData === nextData) {
    return;
  }

  if (state.route === "place" && state.placeId) {
    renderPlaceDetail(state.placeId);
    return;
  }

  if (state.route === "places") {
    renderPlaces();
    return;
  }

  renderHome();
}

function startSharedContentSync() {
  if (state.sharedSyncTimerId || isLocalOnlyMode()) {
    return;
  }

  window.addEventListener("focus", () => {
    syncSharedContentIfNeeded().catch(() => {});
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      syncSharedContentIfNeeded().catch(() => {});
    }
  });

  state.sharedSyncTimerId = window.setInterval(() => {
    syncSharedContentIfNeeded().catch(() => {});
  }, SHARED_CONTENT_SYNC_INTERVAL_MS);
}

function renderUploadPreview(containerId, entries) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = entries
    .map(
      (entry) => `
        <article class="upload-preview-card">
          <div class="upload-preview-thumb" style="background-image:url('${entry.imageUrl}')"></div>
          <p>${entry.label}</p>
        </article>
      `
    )
    .join("");
}

function joinList(value) {
  return Array.isArray(value) ? value.join(", ") : "";
}

function setActiveAdminTab(tab, placeForm, spotForm) {
  state.adminTab = tab;
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  placeForm.classList.toggle("hidden", tab !== "place");
  spotForm.classList.toggle("hidden", tab !== "spot");
}

function resetAdminEditState(tab = "place") {
  state.editingPlaceId = null;
  state.editingSpotId = null;
  state.adminTab = tab;
}

function populatePlaceForm(placeForm, place) {
  placeForm.elements.name.value = place?.name || "";
  placeForm.elements.country.value = place?.country || "";
  placeForm.elements.city.value = place?.city || "";
  placeForm.elements.coverImageUrl.value = "";
  placeForm.elements.description.value = place?.description || "";
  placeForm.elements.tags.value = joinList(place?.tags);
  placeForm.elements.bestFor.value = joinList(place?.bestFor);
  placeForm.elements.bestTime.value = place?.bestTime || "";
  placeForm.elements.crowdLevel.value = place?.crowdLevel || "";
  placeForm.elements.transportNotes.value = place?.transportNotes || "";
  placeForm.elements.walkingNotes.value = place?.walkingNotes || "";
  placeForm.elements.featured.checked = Boolean(place?.featured);
  placeForm.elements.published.checked = place ? Boolean(place.published) : true;

  renderUploadPreview(
    "place-cover-preview",
    place?.coverImageUrl
      ? [{ imageUrl: place.coverImageUrl, label: "Current cover image" }]
      : []
  );
}

function populateSpotForm(spotForm, spot) {
  spotForm.elements.placeId.value = spot?.placeId || "";
  spotForm.elements.name.value = spot?.name || "";
  spotForm.elements.googleMapsUrl.value = spot?.googleMapsUrl || "";
  spotForm.elements.photographer.value = spot?.photographer || "";
  spotForm.elements.coverImageUrl.value = "";
  spotForm.elements.photoCaption.value = "";
  spotForm.elements.shortDescription.value = spot?.shortDescription || "";
  spotForm.elements.fullDescription.value = spot?.fullDescription || "";
  spotForm.elements.bestTime.value = spot?.bestTime || "";
  spotForm.elements.bestFor.value = joinList(spot?.bestFor);
  spotForm.elements.lensSuggestion.value = spot?.lensSuggestion || "";
  spotForm.elements.difficulty.value = spot?.difficulty || "";
  spotForm.elements.howToStand.value = spot?.howToStand || "";
  spotForm.elements.tips.value = spot?.tips || "";
  spotForm.elements.latitude.value = spot?.latitude ?? "";
  spotForm.elements.longitude.value = spot?.longitude ?? "";
  spotForm.elements.published.checked = spot ? Boolean(spot.published) : true;

  renderUploadPreview(
    "spot-photo-preview",
    (Array.isArray(spot?.photos) ? spot.photos : []).map((photo, index) => ({
      imageUrl: photo.imageUrl,
      label: photo.caption || `Current photo ${index + 1}`,
    }))
  );
}

function applyAdminFormState(placeForm, spotForm) {
  const place = state.editingPlaceId
    ? getData().places.find((item) => item.id === state.editingPlaceId)
    : null;
  const spot = state.editingSpotId
    ? getData().spots.find((item) => item.id === state.editingSpotId)
    : null;

  populatePlaceForm(placeForm, place);
  populateSpotForm(spotForm, spot);

  document.getElementById("place-form-eyebrow").textContent = place ? "Edit" : "Create";
  document.getElementById("place-form-title").textContent = place ? `Edit ${place.name}` : "Add place";
  document.getElementById("place-submit-button").textContent = place ? "Update place" : "Save place";
  document.getElementById("cancel-place-edit").classList.toggle("hidden", !place);

  document.getElementById("spot-form-eyebrow").textContent = spot ? "Edit" : "Create";
  document.getElementById("spot-form-title").textContent = spot ? `Edit ${spot.name}` : "Add spot";
  document.getElementById("spot-submit-button").textContent = spot ? "Update spot" : "Save spot";
  document.getElementById("cancel-spot-edit").classList.toggle("hidden", !spot);

  setActiveAdminTab(state.adminTab, placeForm, spotForm);
}

function bindImagePreview(inputId, containerId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener("change", async () => {
    const files = Array.from(input.files || []);
    if (!files.length) {
      renderUploadPreview(containerId, []);
      return;
    }

    const entries = await Promise.all(
      files.map(async (file) => ({
        imageUrl: await fileToDataUrl(file),
        label: file.name,
      }))
    );

    renderUploadPreview(containerId, entries);
  });
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
  syncAdminControls();

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
  syncAdminControls();

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
  syncAdminControls();

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
  const photos = Array.isArray(spot.photos) ? spot.photos : [];
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
  if (!isAdminAuthenticated()) {
    renderAdminLogin();
    return;
  }

  state.route = "admin";
  app.innerHTML = document.getElementById("admin-template").innerHTML;
  syncAdminControls();
  bindAdminForms();
  renderAdminList();
  setAdminFeedback(state.adminFeedback);
}

function renderAdminLogin() {
  state.route = "admin-login";
  app.innerHTML = document.getElementById("admin-login-template").innerHTML;
  syncAdminControls();

  const note = document.getElementById("admin-login-note");
  note.textContent = state.authApiAvailable
    ? state.adminMessage || "Ask the administrator for the passcode."
    : "Start the local server to use admin login. The file:// version cannot verify server-side auth.";

  document.getElementById("admin-login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!state.authApiAvailable) {
      state.adminMessage = "Admin login requires the local server.";
      renderAdminLogin();
      return;
    }

    const passcode = document.getElementById("admin-passcode-input").value;
    const result = await loginAdmin(passcode);
    if (result.ok) {
      state.adminMessage = "";
      renderAdmin();
      return;
    }
    state.adminMessage = result.message;
    renderAdminLogin();
  });
}

function bindAdminForms() {
  const placeForm = document.getElementById("place-form");
  const spotForm = document.getElementById("spot-form");
  const spotSelect = document.getElementById("spot-place-select");
  const placeCoverFileInput = document.getElementById("place-cover-file");
  const spotPhotoFileInput = document.getElementById("spot-photo-files");
  const places = getData().places;

  spotSelect.innerHTML = places
    .map((place) => `<option value="${place.id}">${place.name}</option>`)
    .join("");

  bindImagePreview("place-cover-file", "place-cover-preview");
  bindImagePreview("spot-photo-files", "spot-photo-preview");

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveAdminTab(button.dataset.tab, placeForm, spotForm);
    });
  });

  document.getElementById("cancel-place-edit").addEventListener("click", () => {
    resetAdminEditState("place");
    placeForm.reset();
    applyAdminFormState(placeForm, spotForm);
  });

  document.getElementById("cancel-spot-edit").addEventListener("click", () => {
    resetAdminEditState("spot");
    spotForm.reset();
    applyAdminFormState(placeForm, spotForm);
  });

  applyAdminFormState(placeForm, spotForm);

  placeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(placeForm);
    const name = formData.get("name").toString().trim();
    const data = getData();
    const existingPlace = state.editingPlaceId
      ? data.places.find((item) => item.id === state.editingPlaceId)
      : null;
    const id = existingPlace ? existingPlace.id : ensureUniqueId(data.places, slugify(name));
    let coverImageUrl = "";
    try {
      coverImageUrl = await resolveUploadedImage(
        placeCoverFileInput,
        formData.get("coverImageUrl").toString()
      );
    } catch (error) {
      alert(error.message);
      return;
    }

    const finalCoverImageUrl = coverImageUrl || existingPlace?.coverImageUrl || "";

    if (!finalCoverImageUrl) {
      alert("Upload a cover image or provide a cover image URL.");
      return;
    }

    const nextPlace = {
      id,
      slug: slugify(name) || existingPlace?.slug || id,
      name,
      country: formData.get("country").toString().trim(),
      city: formData.get("city").toString().trim(),
      description: formData.get("description").toString().trim(),
      coverImageUrl: finalCoverImageUrl,
      tags: splitList(formData.get("tags")),
      bestFor: splitList(formData.get("bestFor")),
      bestTime: formData.get("bestTime").toString().trim(),
      crowdLevel: formData.get("crowdLevel").toString().trim(),
      transportNotes: formData.get("transportNotes").toString().trim(),
      walkingNotes: formData.get("walkingNotes").toString().trim(),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    };

    if (existingPlace) {
      const removedImageUrls =
        existingPlace.coverImageUrl !== nextPlace.coverImageUrl
          ? collectR2ImageUrlsFromPlace(existingPlace)
          : [];
      data.places = data.places.map((item) => (item.id === existingPlace.id ? nextPlace : item));
      try {
        await persistData(data);
      } catch (error) {
        alert(error.message);
        return;
      }
      const cleanupMessage = await cleanupUploadedImages(removedImageUrls);
      state.adminFeedback = `Updated place: ${name}${cleanupMessage ? ` (${cleanupMessage})` : ""}`;
    } else {
      data.places.unshift(nextPlace);
      try {
        await persistData(data);
      } catch (error) {
        alert(error.message);
        return;
      }
      state.adminFeedback = `Saved place: ${name}`;
    }
    resetAdminEditState("place");
    renderAdmin();
  });

  spotForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(spotForm);
    const name = formData.get("name").toString().trim();
    const data = getData();
    const existingSpot = state.editingSpotId
      ? data.spots.find((item) => item.id === state.editingSpotId)
      : null;
    let photos = [];
    try {
      photos = await buildSpotPhotos(
        spotPhotoFileInput,
        formData.get("coverImageUrl").toString(),
        name,
        formData.get("photoCaption").toString().trim()
      );
    } catch (error) {
      alert(error.message);
      return;
    }

    const finalPhotos = photos.length ? photos : existingSpot?.photos || [];

    if (!finalPhotos.length) {
      alert("Upload at least one spot photo or provide a fallback photo URL.");
      return;
    }

    const nextSpot = {
      id: existingSpot ? existingSpot.id : ensureUniqueId(data.spots, slugify(name)),
      placeId: formData.get("placeId").toString(),
      name,
      photographer: formData.get("photographer").toString().trim(),
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
      published: formData.get("published") === "on",
      photos: finalPhotos,
    };

    if (existingSpot) {
      const previousUrls = collectR2ImageUrlsFromSpots([existingSpot]);
      const nextUrls = collectR2ImageUrlsFromSpots([{ photos: finalPhotos }]);
      const removedImageUrls = previousUrls.filter((imageUrl) => !nextUrls.includes(imageUrl));
      data.spots = data.spots.map((item) => (item.id === existingSpot.id ? nextSpot : item));
      try {
        await persistData(data);
      } catch (error) {
        alert(error.message);
        return;
      }
      const cleanupMessage = await cleanupUploadedImages(removedImageUrls);
      state.adminFeedback = `Updated spot: ${name}${cleanupMessage ? ` (${cleanupMessage})` : ""}`;
    } else {
      data.spots.unshift(nextSpot);
      try {
        await persistData(data);
      } catch (error) {
        alert(error.message);
        return;
      }
      state.adminFeedback = `Saved spot: ${name}`;
    }
    resetAdminEditState("spot");
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
    try {
      await persistData(parsed);
    } catch (error) {
      alert(error.message);
      return;
    }
    state.adminFeedback = `Imported ${parsed.places.length} places and ${parsed.spots.length} spots.`;
    renderAdmin();
  });

  const jsonEditor = document.getElementById("json-editor");
  jsonEditor.value = JSON.stringify(getData(), null, 2);
  document.getElementById("json-editor-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const parsed = JSON.parse(jsonEditor.value);
      if (!parsed.places || !parsed.spots) {
        throw new Error("Expected places and spots arrays.");
      }
      await persistData(parsed);
      state.adminFeedback = "Saved JSON data.";
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
            <div class="inline-actions admin-danger-actions">
              <button
                class="text-button"
                type="button"
                data-action="edit-place"
                data-place-id="${place.id}"
              >
                Edit place
              </button>
              <button
                class="text-button danger-button"
                type="button"
                data-action="delete-place"
                data-place-id="${place.id}"
              >
                Delete place
              </button>
            </div>
            <div class="admin-spot-list">
              ${spots
                .map(
                  (spot) => `
                  <div class="admin-spot-entry">
                    <strong>${spot.name}</strong>
                    <p>${spot.shortDescription}</p>
                    <div class="inline-actions">
                      <a href="${spot.googleMapsUrl}" target="_blank" rel="noreferrer">Open map</a>
                      <button
                        class="text-button"
                        type="button"
                        data-action="edit-spot"
                        data-spot-id="${spot.id}"
                      >
                        Edit spot
                      </button>
                      <button
                        class="text-button danger-button"
                        type="button"
                        data-action="delete-spot"
                        data-spot-id="${spot.id}"
                      >
                        Delete spot
                      </button>
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

async function deletePlace(placeId) {
  const data = getData();
  const place = data.places.find((item) => item.id === placeId);
  if (!place) return;

  const relatedSpots = data.spots.filter((spot) => spot.placeId === placeId);
  const confirmed = window.confirm(
    `Delete "${place.name}" and ${relatedSpots.length} related spot${relatedSpots.length === 1 ? "" : "s"}?`
  );

  if (!confirmed) return;

  const imageUrls = [
    ...collectR2ImageUrlsFromPlace(place),
    ...collectR2ImageUrlsFromSpots(relatedSpots),
  ];

  const nextData = {
    places: data.places.filter((item) => item.id !== placeId),
    spots: data.spots.filter((spot) => spot.placeId !== placeId),
  };

  await persistData(nextData);
  const cleanupMessage = await cleanupUploadedImages(imageUrls);
  state.adminFeedback = `Deleted place: ${place.name}${cleanupMessage ? ` (${cleanupMessage})` : ""}`;
  renderAdmin();
}

async function deleteSpot(spotId) {
  const data = getData();
  const spot = data.spots.find((item) => item.id === spotId);
  if (!spot) return;

  const confirmed = window.confirm(`Delete spot "${spot.name}"?`);
  if (!confirmed) return;

  const imageUrls = collectR2ImageUrlsFromSpots([spot]);

  const nextData = {
    places: data.places,
    spots: data.spots.filter((item) => item.id !== spotId),
  };

  await persistData(nextData);
  const cleanupMessage = await cleanupUploadedImages(imageUrls);
  state.adminFeedback = `Deleted spot: ${spot.name}${cleanupMessage ? ` (${cleanupMessage})` : ""}`;
  renderAdmin();
}

function startEditPlace(placeId) {
  state.editingPlaceId = placeId;
  state.editingSpotId = null;
  state.adminTab = "place";
  renderAdmin();
}

function startEditSpot(spotId) {
  state.editingSpotId = spotId;
  state.editingPlaceId = null;
  state.adminTab = "spot";
  renderAdmin();
}

function resetData() {
  const fresh = cloneSeedData();
  state.data = fresh;
  if (state.contentApiAvailable) {
    persistData(fresh)
      .then(() => routeTo("home"))
      .catch((error) => alert(error.message));
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  routeTo("home");
}

function routeTo(route, placeId = null) {
  if (route === "home") renderHome();
  if (route === "places") renderPlaces();
  if (route === "admin") renderAdmin();
  if (route === "place" && placeId) renderPlaceDetail(placeId);
}

document.addEventListener("click", async (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const { action, place, placeId, spotId } = target.dataset;

  if (action === "go-home") routeTo("home");
  if (action === "show-places") routeTo("places");
  if (action === "show-admin") routeTo("admin");
  if (action === "open-place") routeTo("place", place);
  if (action === "reset-data" && isAdminAuthenticated()) resetData();
  if (action === "edit-place" && isAdminAuthenticated() && placeId) startEditPlace(placeId);
  if (action === "edit-spot" && isAdminAuthenticated() && spotId) startEditSpot(spotId);
  if (action === "delete-place" && isAdminAuthenticated() && placeId) {
    try {
      await deletePlace(placeId);
    } catch (error) {
      alert(error.message);
    }
  }
  if (action === "delete-spot" && isAdminAuthenticated() && spotId) {
    try {
      await deleteSpot(spotId);
    } catch (error) {
      alert(error.message);
    }
  }
  if (action === "admin-auth") {
    if (isAdminAuthenticated()) {
      await logoutAdmin();
      state.adminMessage = "";
      routeTo("home");
    } else {
      renderAdminLogin();
    }
  }
});

async function initApp() {
  await refreshAdminSession();
  await refreshContentData();
  startSharedContentSync();
  renderHome();
}

initApp();
