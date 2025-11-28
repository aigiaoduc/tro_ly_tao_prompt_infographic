
import { StyleOption, MoodOption, GoalOption, AudienceOption, FormatOption } from './types';

export const STYLES = Object.values(StyleOption);
export const MOODS = Object.values(MoodOption);
export const GOALS = Object.values(GoalOption);
export const AUDIENCES = Object.values(AudienceOption);
export const FORMATS = Object.values(FormatOption);

export const PLACEHOLDER_IMAGE = "https://picsum.photos/800/400";

// --- CHI TIẾT HÓA PROMPT (VISUAL DICTIONARY) ---

export const FORMAT_DETAILS: Record<string, string> = {
  [FormatOption.INFOGRAPHIC]: "LANDSCAPE / HORIZONTAL Layout (16:9 aspect ratio). Wide canvas suitable for timelines, processes, and side-by-side comparisons.",
  [FormatOption.POSTER]: "PORTRAIT / VERTICAL Layout (2:3 or 9:16 aspect ratio). Tall canvas suitable for hierarchies, lists, and top-down flows."
};

export const STYLE_DETAILS: Record<string, string> = {
  // Basic
  [StyleOption.MINIMALIST]: "Swiss Design style, heavy usage of negative space, clean Sans-serif typography, limited color palette (max 2-3 colors), flat vector icons, geometric grids, modern and elegant.",
  [StyleOption.FLAT_DESIGN]: "Corporate Memphis style, flat vector illustrations, no gradients, bold solid colors, simplified shapes, modern UI/UX aesthetic, clean and readable.",

  // Artistic
  [StyleOption.FUTURE_TECH]: "Cyberpunk aesthetic, Neon lights (Cyan & Purple), HUD interface elements, digital circuit patterns, holographic overlays, dark background with glowing details, 3D render style.",
  [StyleOption.VN_CLASSIC]: "Vietnamese Dong Ho folk painting style, Vintage paper texture, warm earth tones (Red, Brown, Beige), lotus patterns, calligraphy typography, retro propaganda poster vibe.",
  [StyleOption.VN_COUNTRYSIDE]: "Vietnamese rural aesthetics, wide paddy fields, bamboo hedges, conical hats (Non La), water buffalo, warm golden sunlight, peaceful atmosphere, folk painting texture, rustic and nostalgic.",
  [StyleOption.ANIME_MANGA]: "Anime art style, Cel-shading, vibrant colors, expressive character illustrations, dynamic speed lines, clean outlines, Ghibli-inspired backgrounds.",
  [StyleOption.COMIC_FUN]: "Pop-art style, bold black outlines, halftone patterns (dots), comic speech bubbles, bright primary colors (Red, Yellow, Blue), energetic and playful.",
  [StyleOption.RETRO_VINTAGE]: "80s Synthwave or 70s Retro style, noise grain texture, sun-faded colors, serif fonts, decorative borders, nostalgic atmosphere.",
  [StyleOption.PAPER_CUT]: "Paper cutout art style, layered paper effect, realistic depth of field, drop shadows between layers, craft aesthetic, texture of paper fiber.",
  [StyleOption.HAND_DRAWN]: "Hand-drawn sketch style, doodle lines, pencil or marker texture, notebook paper background, organic and imperfect lines, friendly and personal.",
  [StyleOption.WATERCOLOR]: "Watercolor painting style, ink bleed effects, artistic splashes, soft gradients, paper texture, organic shapes, fluid and dreamy.",

  // 3D & Technical
  [StyleOption.ISOMETRIC_3D]: "Isometric projection (30-degree angle), 3D Blender render, cute miniature assets, soft clay lighting, diorama style, highly detailed floating island concept.",
  [StyleOption.CLAYMORPHISM]: "Claymorphism (Clay UI), 3D soft plastic texture, inflated shapes, rounded corners, inner shadows, bright pastel colors, tactile and friendly.",
  [StyleOption.STEM]: "Engineering blueprint style, Isometric view, technical diagrams, grid background, thin clean lines, blue and white color scheme, scientific icons (microscope, gears, atoms).",
  [StyleOption.DATA_VIZ]: "High-end Data Visualization, financial report style, sleek gradients, complex charts (bar, pie, scatter), glassmorphism elements, professional and analytical.",
  [StyleOption.PIXEL_ART]: "Pixel art 8-bit or 16-bit style, blocky graphics, retro video game aesthetic, limited color palette, nostalgic and digital."
};

export const MOOD_DETAILS: Record<string, string> = {
  // Positive
  [MoodOption.CUTE]: "Playful, charming, doodles, rounded corners, warm lighting, approachable and safe feeling, 'kawaii' aesthetic.",
  [MoodOption.VIVID]: "High saturation, electric colors, energetic, high contrast, visually striking, grabbing attention immediately, dynamic.",
  [MoodOption.INSPIRING]: "Grand, majestic, sun rays (god rays), uplifting atmosphere, heroic angles, golden hour lighting, motivational.",
  [MoodOption.CALM_ZEN]: "Minimalist, nature-inspired colors (Green, Beige, Stone), balanced composition, soft diffused lighting, peaceful and meditative.",

  // Educational
  [MoodOption.ACADEMIC]: "Clean white background, textbook illustration style, high clarity, focus on readability, orderly, disciplined and trustworthy.",
  [MoodOption.STUDENT_FRIENDLY]: "Gamified elements, approachable, not overwhelming, fun mascots guiding the viewer, easy on the eyes, engaging.",
  [MoodOption.KNOWLEDGE_FOCUSED]: "Information density, well-structured flowcharts, data visualization priority, clear hierarchy of information, objective.",

  // Specific Vibes
  [MoodOption.SERIOUS]: "Professional, corporate, symmetrical layout, sharp edges, muted/neutral colors (Navy, Grey), formal typography.",
  [MoodOption.MYSTERIOUS]: "Low key lighting, shadows, deep colors (Dark Blue, Purple), fog or mist effects, glowing secrets, intriguing and exploratory.",
  [MoodOption.URGENT]: "High contrast (Black & Yellow or Red), bold warning signs, diagonal stripes, impact font, demanding immediate attention.",
  [MoodOption.FUTURISTIC]: "Sleek, shiny surfaces, lens flares, motion blur, white and silver palette, innovative and breakthrough feeling."
};

export const GOAL_DETAILS: Record<string, string> = {
  [GoalOption.INTRO]: "Focus on a large central hero image, minimal text, catchy headline, creating curiosity, 'Movie Poster' vibe.",
  [GoalOption.SYSTEMIZE]: "Mind-map structure, central node with branching connections, network layout, grouping related information clearly.",
  [GoalOption.SUMMARY]: "Dashboard layout, key takeaways highlighted in boxes, bold statistics, bullet points, concise visual summary, cheat-sheet style.",
  
  // New Logic
  [GoalOption.TIMELINE]: "Linear chronological layout (Left-to-Right or Top-to-Bottom), connecting dots/milestones, road-map style, evolution progress.",
  [GoalOption.COMPARISON]: "Split screen layout or side-by-side comparison, 'Versus' (VS) mode, distinct color coding for two sides (e.g., Red vs Blue), clear contrast.",
  [GoalOption.PROCESS]: "Step-by-step flow, numbered stages (1, 2, 3...), arrow connectors, instructional manual style, clear path from start to finish.",
  [GoalOption.CHECKLIST]: "Vertical list layout, checkboxes, tick marks, clipboard aesthetic, structured and organized itemization.",
  [GoalOption.STORYTELLING]: "Comic strip panel layout or winding path journey, narrative flow, character-driven progression, scene-by-scene transition.",

  [GoalOption.EXTENDED]: "Magazine layout style, sidebars for extra info, rich detailed illustrations per section, deep dive structure.",
  [GoalOption.EXERCISE]: "Worksheet style, spaces for interaction, question mark motifs, numbered lists, fill-in-the-blank visual cues."
};

export const AUDIENCES_DETAILS: Record<string, string> = {
  [AudienceOption.PRE_SCHOOL]: "Very large elements, rounded shapes, primary colors, barely any text, heavy use of cute animals/objects, soft edges.",
  [AudienceOption.PRIMARY]: "Large font size, simple language, adventure themes, vibrant colors, clear distinctions, avoid complex charts.",
  [AudienceOption.MIDDLE]: "Balanced text and images, engaging but structured, relate to real-world examples, cool/trendy icons, gamified look.",
  [AudienceOption.HIGH]: "Modern and sophisticated design, infographic uses abstract concepts, detailed charts, professional look, trendy.",
  [AudienceOption.COLLEGE]: "Academic rigor, complex data visualization, citation style footnotes, minimalist and efficient, focus on substance.",
  [AudienceOption.GENERAL]: "Universal design principles, high accessibility (high contrast), clear iconography, standard legible fonts, mass appeal.",
  [AudienceOption.EXPERTS]: "Technical blueprint style, high information density, complex terminology allowed, precise diagrams, schematic look."
};
