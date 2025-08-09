export type NichePreset = { id: string; label: string };
export type BrandTonePreset = { id: string; label: string };
export type AudiencePreset = { id: string; label: string };
export type LanguagePreset = { code: string; name: string; country: string };

export const AiPresets = {
  niches: [
    { id: "fashion", label: "Fashion & Apparel" },
    { id: "beauty", label: "Beauty & Cosmetics" },
    { id: "electronics", label: "Electronics & Gadgets" },
    { id: "home", label: "Home & Living" },
    { id: "food", label: "Food & Beverage" },
    { id: "sports", label: "Sports & Fitness" },
    { id: "art", label: "Art & Collectibles" },
    { id: "jewelry", label: "Jewelry & Accessories" },
    { id: "health", label: "Health & Wellness" },
    { id: "kids", label: "Baby & Kids" },
  ] as NichePreset[],

  brandTones: [
    { id: "minimal", label: "Minimal" },
    { id: "bold", label: "Bold" },
    { id: "playful", label: "Playful" },
    { id: "luxury", label: "Luxury" },
    { id: "eco", label: "Eco-friendly" },
    { id: "tech", label: "Tech-forward" },
    { id: "warm", label: "Warm" },
    { id: "modern", label: "Modern" },
    { id: "classic", label: "Classic" },
    { id: "street", label: "Streetwear" },
  ] as BrandTonePreset[],

  audiences: [
    { id: "genz", label: "Gen Z" },
    { id: "millennial", label: "Millennial" },
    { id: "eco", label: "Eco-conscious" },
    { id: "premium", label: "Premium seekers" },
    { id: "budget", label: "Budget-focused" },
    { id: "trend", label: "Trend-aware" },
    { id: "family", label: "Family-focused" },
    { id: "pro", label: "Professionals" },
    { id: "students", label: "Students" },
  ] as AudiencePreset[],

  languages: [
    { code: "en", name: "English", country: "GB" },
    { code: "en-US", name: "English (US)", country: "US" },
    { code: "es", name: "Spanish", country: "ES" },
    { code: "fr", name: "French", country: "FR" },
    { code: "de", name: "German", country: "DE" },
    { code: "it", name: "Italian", country: "IT" },
    { code: "pt", name: "Portuguese", country: "PT" },
    { code: "pt-BR", name: "Portuguese (BR)", country: "BR" },
    { code: "ar", name: "Arabic", country: "SA" },
    { code: "am", name: "Amharic", country: "ET" },
    { code: "zh", name: "Chinese", country: "CN" },
    { code: "ja", name: "Japanese", country: "JP" },
  ] as LanguagePreset[],
};

export default AiPresets;


