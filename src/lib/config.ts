// App configuration
export const AppConfig = {
  siteName: "Infinipics",
  siteDescription: "Where Every Pixel Tells a Story",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  
  // Image settings
  imageQuality: 80,
  maxImageSize: 10 * 1024 * 1024, // 10MB
  
  // Pagination
  imagesPerPage: 20,
  
  // Animation settings
  animationDuration: 0.3,
  
  // Categories
  categories: [
    "All",
    "Nature",
    "Urban",
    "Abstract",
    "Sci-Fi",
    "Minimal",
    "Fantasy",
    "Cyberpunk"
  ],
  
  // Moods
  moods: [
    "All",
    "Calm",
    "Energetic",
    "Vibrant",
    "Minimal",
    "Futuristic",
    "Relaxing",
    "Mysterious",
    "Nostalgic",
    "Whimsical"
  ],
  
  // Styles
  styles: [
    "Realistic",
    "Abstract",
    "Minimal",
    "Cyberpunk",
    "Fantasy",
    "Surreal",
    "Impressionist",
    "Pop Art"
  ]
};