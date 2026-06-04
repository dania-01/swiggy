import { CDN_URL } from "@/lib/data/restaurants";

export const APP_NAME = "Swiggy";
export const APP_TAGLINE = "Order food & grocery";

// Cuisine category tiles — from Swiggy's "What's on your mind?" section
export const CUISINE_CATEGORIES = [
  {
    id: "northindian",
    label: "North Indian",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
  },
  {
    id: "southindian",
    label: "South Indian",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Salad-1.png",
  },
  {
    id: "pizza",
    label: "Pizzas",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Pizzas.png",
  },
  {
    id: "burger",
    label: "Burgers",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_burger.png",
  },
  {
    id: "dessert",
    label: "Desserts",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Desserts.png",
  },
  {
    id: "chinese",
    label: "Chinese",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/897bc750-6b57-4e7d-9365-87c1ab2c6d7e_Chinese2.png",
  },
  {
    id: "icecream",
    label: "Ice Cream",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_chocolate icecream.png",
  },
  {
    id: "biryani",
    label: "Biryani",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
  },
  {
    id: "pavbhaji",
    label: "Pav Bhaji",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Pav Bhaji.png",
  },
  {
    id: "rolls",
    label: "Rolls",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/17/58760e8e-324f-479e-88fa-31800120ea38_Rolls1.png",
  },
  {
    id: "cake",
    label: "Cakes",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_cake.png",
  },
  {
    id: "noodles",
    label: "Noodles",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Noodles.png",
  },
  {
    id: "paratha",
    label: "Paratha",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Paratha.png",
  },
  {
    id: "shake",
    label: "Shake",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Shake.png",
  },
  {
    id: "dosa",
    label: "Dosa",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Dosa.png",
  },
  {
    id: "pasta",
    label: "Pasta",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/f1263395-5d4a-4775-95dc-80ab6f3bbd89_pasta.png",
  },
  {
    id: "momos",
    label: "Momos",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Momos.png",
  },
  {
    id: "vadapav",
    label: "Vada Pav",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Vada Pav.png",
  },
  {
    id: "waffle",
    label: "Waffle",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/cb5669c8-d6f1-46ab-b24d-3da99b9fa32c_waffle.png",
  },
  {
    id: "khichdi",
    label: "Khichdi",
    imageId: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Khichdi.png",
  },
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "Rating" },
  { value: "deliveryTime", label: "Delivery Time" },
  { value: "priceAsc", label: "Price: Low to High" },
  { value: "priceDesc", label: "Price: High to Low" },
];

export const FILTER_CHIPS = [
  { id: "veg", label: "Pure Veg" },
  { id: "rating4plus", label: "Ratings 4.0+" },
  { id: "under30", label: "Delivery Under 30 Min" },
  { id: "offers", label: "Offers" },
];

export { CDN_URL };
