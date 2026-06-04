import { CDN_URL } from "./restaurants";

const IMG = {
  northIndian:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
  pizza:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Pizzas.png",
  burger:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_burger.png",
  biryani:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
  chinese:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/897bc750-6b57-4e7d-9365-87c1ab2c6d7e_Chinese2.png",
  dessert:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Desserts.png",
  iceCream:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_chocolate icecream.png",
  dosa: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Dosa.png",
  rolls:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/17/58760e8e-324f-479e-88fa-31800120ea38_Rolls1.png",
  momos:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Momos.png",
  shake:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Shake.png",
  cake: "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_cake.png",
  paratha:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Paratha.png",
  noodles:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Noodles.png",
  pasta:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/f1263395-5d4a-4775-95dc-80ab6f3bbd89_pasta.png",
  southIndian:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Salad-1.png",
  waffle:
    "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/cb5669c8-d6f1-46ab-b24d-3da99b9fa32c_waffle.png",
};

// Menu templates by cuisine type — all restaurants are assigned a template based on their primary cuisine
const MENUS = {
  northIndian: [
    {
      category: "Recommended",
      items: [
        { id: "ni-1", name: "Butter Chicken", price: 320, description: "Creamy tomato-based curry with tender chicken", imageId: IMG.northIndian, isVeg: false, isPopular: true },
        { id: "ni-2", name: "Dal Makhani", price: 260, description: "Slow-cooked black lentils with butter and cream", imageId: IMG.northIndian, isVeg: true, isPopular: true },
        { id: "ni-3", name: "Paneer Tikka Masala", price: 290, description: "Grilled paneer in spiced tomato gravy", imageId: IMG.northIndian, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Breads",
      items: [
        { id: "ni-4", name: "Butter Naan", price: 45, description: "Soft leavened bread baked in tandoor", imageId: IMG.paratha, isVeg: true, isPopular: true },
        { id: "ni-5", name: "Garlic Naan", price: 55, description: "Naan topped with garlic and butter", imageId: IMG.paratha, isVeg: true, isPopular: false },
        { id: "ni-6", name: "Lachha Paratha", price: 60, description: "Multi-layered whole wheat flatbread", imageId: IMG.paratha, isVeg: true, isPopular: false },
        { id: "ni-7", name: "Tandoori Roti", price: 35, description: "Whole wheat bread from tandoor", imageId: IMG.paratha, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Rice",
      items: [
        { id: "ni-8", name: "Veg Biryani", price: 280, description: "Fragrant basmati rice with vegetables", imageId: IMG.biryani, isVeg: true, isPopular: false },
        { id: "ni-9", name: "Jeera Rice", price: 180, description: "Steamed basmati rice with cumin", imageId: IMG.biryani, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Starters",
      items: [
        { id: "ni-10", name: "Chicken Tikka", price: 340, description: "Marinated chicken grilled in tandoor", imageId: IMG.northIndian, isVeg: false, isPopular: true },
        { id: "ni-11", name: "Paneer Tikka", price: 280, description: "Marinated paneer grilled in tandoor", imageId: IMG.northIndian, isVeg: true, isPopular: true },
        { id: "ni-12", name: "Seekh Kebab", price: 360, description: "Minced lamb kebabs on skewers", imageId: IMG.northIndian, isVeg: false, isPopular: false },
      ],
    },
    {
      category: "Beverages",
      items: [
        { id: "ni-13", name: "Sweet Lassi", price: 80, description: "Chilled yogurt-based sweet drink", imageId: IMG.shake, isVeg: true, isPopular: false },
        { id: "ni-14", name: "Mango Lassi", price: 100, description: "Yogurt blended with fresh mangoes", imageId: IMG.shake, isVeg: true, isPopular: true },
      ],
    },
  ],

  southIndian: [
    {
      category: "Dosas",
      items: [
        { id: "si-1", name: "Masala Dosa", price: 120, description: "Crispy dosa with spiced potato filling", imageId: IMG.dosa, isVeg: true, isPopular: true },
        { id: "si-2", name: "Plain Dosa", price: 80, description: "Classic thin crispy dosa", imageId: IMG.dosa, isVeg: true, isPopular: false },
        { id: "si-3", name: "Rava Dosa", price: 130, description: "Crispy semolina dosa", imageId: IMG.dosa, isVeg: true, isPopular: true },
        { id: "si-4", name: "Onion Dosa", price: 110, description: "Dosa topped with caramelised onions", imageId: IMG.dosa, isVeg: true, isPopular: false },
        { id: "si-5", name: "Set Dosa", price: 100, description: "Soft spongy dosas served in a set of 3", imageId: IMG.dosa, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Idli & Vada",
      items: [
        { id: "si-6", name: "Idli (2 pcs)", price: 60, description: "Steamed rice cakes served with sambar and chutney", imageId: IMG.southIndian, isVeg: true, isPopular: true },
        { id: "si-7", name: "Medu Vada", price: 70, description: "Crispy lentil fritters", imageId: IMG.southIndian, isVeg: true, isPopular: true },
        { id: "si-8", name: "Sambar Vada", price: 90, description: "Vada soaked in hot sambar", imageId: IMG.southIndian, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Rice & Curries",
      items: [
        { id: "si-9", name: "Curd Rice", price: 120, description: "Cooked rice mixed with curd and tempered spices", imageId: IMG.southIndian, isVeg: true, isPopular: false },
        { id: "si-10", name: "Sambar Rice", price: 130, description: "Rice cooked with vegetables and sambar", imageId: IMG.southIndian, isVeg: true, isPopular: false },
        { id: "si-11", name: "Rasam", price: 60, description: "Tangy tamarind-based soup", imageId: IMG.southIndian, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Beverages",
      items: [
        { id: "si-12", name: "Filter Coffee", price: 50, description: "Traditional South Indian drip coffee", imageId: IMG.shake, isVeg: true, isPopular: true },
        { id: "si-13", name: "Buttermilk", price: 40, description: "Chilled spiced buttermilk", imageId: IMG.shake, isVeg: true, isPopular: false },
      ],
    },
  ],

  pizza: [
    {
      category: "Bestsellers",
      items: [
        { id: "pz-1", name: "Margherita Pizza", price: 249, description: "Classic tomato sauce, mozzarella, basil", imageId: IMG.pizza, isVeg: true, isPopular: true },
        { id: "pz-2", name: "Pepperoni Pizza", price: 349, description: "Loaded with spicy pepperoni slices", imageId: IMG.pizza, isVeg: false, isPopular: true },
        { id: "pz-3", name: "BBQ Chicken Pizza", price: 399, description: "Smoky BBQ sauce, grilled chicken, onions", imageId: IMG.pizza, isVeg: false, isPopular: true },
      ],
    },
    {
      category: "Veg Pizzas",
      items: [
        { id: "pz-4", name: "Farmhouse Pizza", price: 299, description: "Fresh veggies on tomato sauce", imageId: IMG.pizza, isVeg: true, isPopular: false },
        { id: "pz-5", name: "Paneer Tikka Pizza", price: 349, description: "Spiced paneer with bell peppers", imageId: IMG.pizza, isVeg: true, isPopular: false },
        { id: "pz-6", name: "Garden Delight", price: 279, description: "Mushrooms, capsicum, olives, corn", imageId: IMG.pizza, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Non-Veg Pizzas",
      items: [
        { id: "pz-7", name: "Chicken Tikka Pizza", price: 379, description: "Marinated chicken tikka with onions", imageId: IMG.pizza, isVeg: false, isPopular: false },
        { id: "pz-8", name: "Keema Lover", price: 399, description: "Spicy minced meat with jalapeños", imageId: IMG.pizza, isVeg: false, isPopular: false },
      ],
    },
    {
      category: "Sides & Drinks",
      items: [
        { id: "pz-9", name: "Garlic Breadsticks", price: 99, description: "Crispy garlic bread with dipping sauce", imageId: IMG.pizza, isVeg: true, isPopular: true },
        { id: "pz-10", name: "Pasta Arabiata", price: 179, description: "Penne in spicy tomato sauce", imageId: IMG.pasta, isVeg: true, isPopular: false },
        { id: "pz-11", name: "Choco Lava Cake", price: 89, description: "Warm chocolate cake with molten center", imageId: IMG.dessert, isVeg: true, isPopular: true },
        { id: "pz-12", name: "Pepsi (500ml)", price: 65, description: "Chilled carbonated beverage", imageId: IMG.shake, isVeg: true, isPopular: false },
      ],
    },
  ],

  burger: [
    {
      category: "Burgers",
      items: [
        { id: "bg-1", name: "Classic Chicken Burger", price: 179, description: "Crispy chicken patty with lettuce and mayo", imageId: IMG.burger, isVeg: false, isPopular: true },
        { id: "bg-2", name: "McSpicy Chicken", price: 229, description: "Fiery spiced chicken with jalapeño sauce", imageId: IMG.burger, isVeg: false, isPopular: true },
        { id: "bg-3", name: "Veg Maharaja Mac", price: 199, description: "Double patty veg burger with special sauce", imageId: IMG.burger, isVeg: true, isPopular: true },
        { id: "bg-4", name: "Paneer Burger", price: 189, description: "Spiced paneer patty with mint mayo", imageId: IMG.burger, isVeg: true, isPopular: false },
        { id: "bg-5", name: "Double Whopper", price: 349, description: "Two flame-grilled beef patties with all toppings", imageId: IMG.burger, isVeg: false, isPopular: false },
      ],
    },
    {
      category: "Chicken",
      items: [
        { id: "bg-6", name: "Fried Chicken (2 pcs)", price: 199, description: "Original recipe crispy fried chicken", imageId: IMG.burger, isVeg: false, isPopular: true },
        { id: "bg-7", name: "Chicken Wings (6 pcs)", price: 249, description: "Crispy wings with dipping sauce", imageId: IMG.burger, isVeg: false, isPopular: true },
        { id: "bg-8", name: "Popcorn Chicken", price: 149, description: "Bite-sized crispy chicken pieces", imageId: IMG.burger, isVeg: false, isPopular: false },
      ],
    },
    {
      category: "Sides",
      items: [
        { id: "bg-9", name: "French Fries (Medium)", price: 109, description: "Classic golden salted fries", imageId: IMG.burger, isVeg: true, isPopular: true },
        { id: "bg-10", name: "Loaded Fries", price: 149, description: "Fries topped with cheese sauce and jalapeños", imageId: IMG.burger, isVeg: true, isPopular: false },
        { id: "bg-11", name: "Onion Rings", price: 99, description: "Crispy battered onion rings", imageId: IMG.burger, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Beverages",
      items: [
        { id: "bg-12", name: "Thick Shake - Chocolate", price: 155, description: "Creamy thick chocolate milkshake", imageId: IMG.shake, isVeg: true, isPopular: true },
        { id: "bg-13", name: "Thick Shake - Strawberry", price: 155, description: "Creamy thick strawberry milkshake", imageId: IMG.shake, isVeg: true, isPopular: false },
        { id: "bg-14", name: "Coke (Medium)", price: 75, description: "Chilled Coca-Cola", imageId: IMG.shake, isVeg: true, isPopular: false },
      ],
    },
  ],

  biryani: [
    {
      category: "Biryani",
      items: [
        { id: "br-1", name: "Chicken Dum Biryani", price: 320, description: "Slow-cooked dum biryani with tender chicken", imageId: IMG.biryani, isVeg: false, isPopular: true },
        { id: "br-2", name: "Mutton Biryani", price: 420, description: "Fragrant basmati rice with succulent mutton", imageId: IMG.biryani, isVeg: false, isPopular: true },
        { id: "br-3", name: "Veg Dum Biryani", price: 250, description: "Aromatic biryani with fresh vegetables", imageId: IMG.biryani, isVeg: true, isPopular: false },
        { id: "br-4", name: "Prawn Biryani", price: 480, description: "Juicy prawns in a spiced biryani", imageId: IMG.biryani, isVeg: false, isPopular: false },
        { id: "br-5", name: "Paneer Biryani", price: 290, description: "Soft paneer cubes in fragrant rice", imageId: IMG.biryani, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Kebabs & Starters",
      items: [
        { id: "br-6", name: "Shammi Kebab (4 pcs)", price: 280, description: "Tender minced meat kebabs", imageId: IMG.northIndian, isVeg: false, isPopular: false },
        { id: "br-7", name: "Seekh Kebab (4 pcs)", price: 300, description: "Juicy lamb seekh kebabs", imageId: IMG.northIndian, isVeg: false, isPopular: true },
        { id: "br-8", name: "Hara Bhara Kebab", price: 220, description: "Spinach and pea vegetable kebabs", imageId: IMG.northIndian, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Curries",
      items: [
        { id: "br-9", name: "Mutton Korma", price: 380, description: "Rich Mughlai mutton curry", imageId: IMG.northIndian, isVeg: false, isPopular: false },
        { id: "br-10", name: "Chicken Salan", price: 280, description: "Hyderabadi style spicy chicken curry", imageId: IMG.northIndian, isVeg: false, isPopular: false },
        { id: "br-11", name: "Mirchi Ka Salan", price: 160, description: "Green chilli curry — pairs with biryani", imageId: IMG.northIndian, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Desserts & Drinks",
      items: [
        { id: "br-12", name: "Shahi Tukda", price: 130, description: "Fried bread in rich saffron custard", imageId: IMG.dessert, isVeg: true, isPopular: true },
        { id: "br-13", name: "Double Ka Meetha", price: 120, description: "Hyderabadi bread pudding dessert", imageId: IMG.dessert, isVeg: true, isPopular: false },
        { id: "br-14", name: "Rooh Afza Sherbat", price: 60, description: "Chilled rose-flavoured drink", imageId: IMG.shake, isVeg: true, isPopular: false },
      ],
    },
  ],

  chinese: [
    {
      category: "Soups",
      items: [
        { id: "ch-1", name: "Hot & Sour Soup", price: 150, description: "Classic spicy tangy Chinese soup", imageId: IMG.chinese, isVeg: false, isPopular: true },
        { id: "ch-2", name: "Sweet Corn Veg Soup", price: 130, description: "Creamy sweet corn vegetable soup", imageId: IMG.chinese, isVeg: true, isPopular: false },
        { id: "ch-3", name: "Manchow Soup", price: 160, description: "Thick soup with fried noodles on top", imageId: IMG.chinese, isVeg: false, isPopular: false },
      ],
    },
    {
      category: "Starters",
      items: [
        { id: "ch-4", name: "Chicken Manchurian Dry", price: 280, description: "Crispy chicken in spicy Manchurian sauce", imageId: IMG.chinese, isVeg: false, isPopular: true },
        { id: "ch-5", name: "Veg Spring Rolls (4 pcs)", price: 180, description: "Crispy rolls filled with vegetables", imageId: IMG.chinese, isVeg: true, isPopular: true },
        { id: "ch-6", name: "Chilli Chicken", price: 300, description: "Tender chicken in Indo-Chinese chilli sauce", imageId: IMG.chinese, isVeg: false, isPopular: true },
        { id: "ch-7", name: "Paneer Chilli Dry", price: 250, description: "Tossed paneer in fiery chilli sauce", imageId: IMG.chinese, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Noodles & Rice",
      items: [
        { id: "ch-8", name: "Veg Hakka Noodles", price: 220, description: "Stir-fried noodles with vegetables", imageId: IMG.noodles, isVeg: true, isPopular: false },
        { id: "ch-9", name: "Chicken Fried Rice", price: 260, description: "Wok-tossed rice with chicken and eggs", imageId: IMG.chinese, isVeg: false, isPopular: true },
        { id: "ch-10", name: "Veg Fried Rice", price: 220, description: "Classic egg-free fried rice", imageId: IMG.chinese, isVeg: true, isPopular: false },
        { id: "ch-11", name: "Schezwan Noodles", price: 250, description: "Spicy Schezwan-flavoured stir-fried noodles", imageId: IMG.noodles, isVeg: false, isPopular: false },
      ],
    },
    {
      category: "Mains",
      items: [
        { id: "ch-12", name: "Chicken Manchurian Gravy", price: 320, description: "Juicy chicken balls in Manchurian gravy", imageId: IMG.chinese, isVeg: false, isPopular: false },
        { id: "ch-13", name: "Veg in Hot Garlic Sauce", price: 260, description: "Mixed vegetables in garlic chilli sauce", imageId: IMG.chinese, isVeg: true, isPopular: false },
      ],
    },
  ],

  dessert: [
    {
      category: "Bestsellers",
      items: [
        { id: "ds-1", name: "Chocolate Brownie", price: 120, description: "Warm fudgy brownie with vanilla ice cream", imageId: IMG.dessert, isVeg: true, isPopular: true },
        { id: "ds-2", name: "Belgian Waffle", price: 180, description: "Classic Belgian waffle with fresh toppings", imageId: IMG.waffle, isVeg: true, isPopular: true },
        { id: "ds-3", name: "Nutella Waffle", price: 220, description: "Waffle loaded with Nutella and banana", imageId: IMG.waffle, isVeg: true, isPopular: true },
      ],
    },
    {
      category: "Ice Creams",
      items: [
        { id: "ds-4", name: "Chocolate Sundae", price: 150, description: "3 scoops with hot chocolate sauce", imageId: IMG.iceCream, isVeg: true, isPopular: true },
        { id: "ds-5", name: "Strawberry Sundae", price: 150, description: "3 scoops with strawberry sauce", imageId: IMG.iceCream, isVeg: true, isPopular: false },
        { id: "ds-6", name: "Rainbow Ice Cream", price: 130, description: "5 mixed flavour scoops", imageId: IMG.iceCream, isVeg: true, isPopular: false },
        { id: "ds-7", name: "Mango Sorbet", price: 110, description: "Refreshing mango frozen sorbet", imageId: IMG.iceCream, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Cakes & Pastries",
      items: [
        { id: "ds-8", name: "Red Velvet Pastry", price: 160, description: "Moist red velvet with cream cheese frosting", imageId: IMG.cake, isVeg: true, isPopular: true },
        { id: "ds-9", name: "Chocolate Truffle Cake", price: 180, description: "Rich chocolate truffle slice", imageId: IMG.cake, isVeg: true, isPopular: false },
        { id: "ds-10", name: "Cheesecake Slice", price: 200, description: "New York style baked cheesecake", imageId: IMG.cake, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Beverages",
      items: [
        { id: "ds-11", name: "Thick Shake - Oreo", price: 180, description: "Creamy Oreo milkshake", imageId: IMG.shake, isVeg: true, isPopular: true },
        { id: "ds-12", name: "Cold Coffee", price: 150, description: "Chilled blended coffee with ice cream", imageId: IMG.shake, isVeg: true, isPopular: false },
        { id: "ds-13", name: "Hot Chocolate", price: 140, description: "Rich creamy hot chocolate", imageId: IMG.shake, isVeg: true, isPopular: false },
      ],
    },
  ],

  rolls: [
    {
      category: "Rolls",
      items: [
        { id: "rl-1", name: "Chicken Kathi Roll", price: 180, description: "Spiced chicken wrapped in paratha", imageId: IMG.rolls, isVeg: false, isPopular: true },
        { id: "rl-2", name: "Paneer Kathi Roll", price: 160, description: "Spiced paneer wrapped in paratha", imageId: IMG.rolls, isVeg: true, isPopular: true },
        { id: "rl-3", name: "Egg Roll", price: 120, description: "Egg-wrapped roll with tangy chutney", imageId: IMG.rolls, isVeg: false, isPopular: false },
        { id: "rl-4", name: "Double Chicken Roll", price: 220, description: "Extra chicken with double the flavour", imageId: IMG.rolls, isVeg: false, isPopular: false },
        { id: "rl-5", name: "Mutton Seekh Roll", price: 250, description: "Seekh kebab wrapped in flaky paratha", imageId: IMG.rolls, isVeg: false, isPopular: false },
      ],
    },
    {
      category: "Wraps",
      items: [
        { id: "rl-6", name: "Veggie Supreme Wrap", price: 140, description: "Grilled vegetables with hummus in tortilla", imageId: IMG.rolls, isVeg: true, isPopular: false },
        { id: "rl-7", name: "Chicken Caesar Wrap", price: 200, description: "Grilled chicken, romaine, Caesar dressing", imageId: IMG.rolls, isVeg: false, isPopular: false },
      ],
    },
    {
      category: "Beverages",
      items: [
        { id: "rl-8", name: "Lemon Mint Soda", price: 70, description: "Refreshing lemon and mint chilled soda", imageId: IMG.shake, isVeg: true, isPopular: false },
        { id: "rl-9", name: "Mango Lassi", price: 90, description: "Chilled mango yogurt drink", imageId: IMG.shake, isVeg: true, isPopular: true },
      ],
    },
  ],

  momos: [
    {
      category: "Steamed Momos",
      items: [
        { id: "mm-1", name: "Veg Steamed Momos (6 pcs)", price: 120, description: "Classic vegetable momos with chilli chutney", imageId: IMG.momos, isVeg: true, isPopular: true },
        { id: "mm-2", name: "Chicken Steamed Momos (6 pcs)", price: 150, description: "Minced chicken momos", imageId: IMG.momos, isVeg: false, isPopular: true },
        { id: "mm-3", name: "Cheese Corn Momos (6 pcs)", price: 140, description: "Cheese and sweet corn filled momos", imageId: IMG.momos, isVeg: true, isPopular: false },
      ],
    },
    {
      category: "Fried Momos",
      items: [
        { id: "mm-4", name: "Veg Fried Momos (6 pcs)", price: 140, description: "Crispy deep-fried vegetable momos", imageId: IMG.momos, isVeg: true, isPopular: false },
        { id: "mm-5", name: "Chicken Fried Momos (6 pcs)", price: 170, description: "Crispy fried chicken momos", imageId: IMG.momos, isVeg: false, isPopular: false },
        { id: "mm-6", name: "Tandoori Momos (6 pcs)", price: 180, description: "Momos grilled in tandoor with spice marinade", imageId: IMG.momos, isVeg: false, isPopular: true },
      ],
    },
    {
      category: "Thukpa & Sides",
      items: [
        { id: "mm-7", name: "Veg Thukpa", price: 180, description: "Tibetan noodle soup with vegetables", imageId: IMG.noodles, isVeg: true, isPopular: false },
        { id: "mm-8", name: "Chicken Thukpa", price: 220, description: "Hearty Tibetan noodle soup with chicken", imageId: IMG.noodles, isVeg: false, isPopular: false },
        { id: "mm-9", name: "Chilli Sauce (extra)", price: 20, description: "Extra fiery red chilli dipping sauce", imageId: IMG.momos, isVeg: true, isPopular: false },
      ],
    },
  ],

  coffee: [
    {
      category: "Hot Beverages",
      items: [
        { id: "cf-1", name: "Espresso", price: 120, description: "Rich double shot espresso", imageId: IMG.shake, isVeg: true, isPopular: false },
        { id: "cf-2", name: "Cappuccino", price: 180, description: "Espresso with steamed milk foam", imageId: IMG.shake, isVeg: true, isPopular: true },
        { id: "cf-3", name: "Flat White", price: 200, description: "Velvety microfoam espresso", imageId: IMG.shake, isVeg: true, isPopular: false },
        { id: "cf-4", name: "Masala Chai", price: 80, description: "Spiced Indian tea with ginger", imageId: IMG.shake, isVeg: true, isPopular: true },
      ],
    },
    {
      category: "Cold Beverages",
      items: [
        { id: "cf-5", name: "Cold Brew", price: 220, description: "12-hour steeped cold brew coffee", imageId: IMG.shake, isVeg: true, isPopular: true },
        { id: "cf-6", name: "Iced Latte", price: 240, description: "Espresso over ice with cold milk", imageId: IMG.shake, isVeg: true, isPopular: false },
        { id: "cf-7", name: "Frappuccino", price: 280, description: "Blended coffee with cream and caramel", imageId: IMG.shake, isVeg: true, isPopular: true },
      ],
    },
    {
      category: "Snacks",
      items: [
        { id: "cf-8", name: "Croissant", price: 120, description: "Buttery flaky French croissant", imageId: IMG.cake, isVeg: true, isPopular: false },
        { id: "cf-9", name: "Blueberry Muffin", price: 100, description: "Soft muffin loaded with blueberries", imageId: IMG.cake, isVeg: true, isPopular: false },
        { id: "cf-10", name: "Grilled Sandwich", price: 180, description: "Toasted cheese and veggie sandwich", imageId: IMG.rolls, isVeg: true, isPopular: true },
      ],
    },
  ],
};

// Maps each restaurant ID to a menu template
const RESTAURANT_MENU_MAP = {
  "1": MENUS.northIndian,   // Barbeque Nation
  "2": MENUS.northIndian,   // Haldiram's
  "3": MENUS.northIndian,   // Punjabi Tadka
  "4": MENUS.northIndian,   // Dilli 6
  "5": MENUS.northIndian,   // Rajdhani
  "6": MENUS.northIndian,   // Moti Mahal
  "7": MENUS.northIndian,   // Pind Balluchi
  "8": MENUS.northIndian,   // Bikanervala
  "9": MENUS.northIndian,   // Bombay Club
  "10": MENUS.northIndian,  // Govinda's
  "11": MENUS.southIndian,  // Saravana Bhavan
  "12": MENUS.southIndian,  // MTR
  "13": MENUS.southIndian,  // Udupi Palace
  "14": MENUS.southIndian,  // Chettinad Kitchen
  "15": MENUS.southIndian,  // Murugan Idli
  "16": MENUS.southIndian,  // Annapoorna
  "17": MENUS.pizza,        // Domino's
  "18": MENUS.pizza,        // Pizza Hut
  "19": MENUS.pizza,        // La Pino'z
  "20": MENUS.pizza,        // Smokin' Joe's
  "21": MENUS.pizza,        // Ovenstory
  "22": MENUS.pizza,        // Chicago Pizza
  "23": MENUS.burger,       // McDonald's
  "24": MENUS.burger,       // Burger King
  "25": MENUS.burger,       // KFC
  "26": MENUS.burger,       // Wendy's
  "27": MENUS.burger,       // Shake Shack
  "28": MENUS.burger,       // The Burger Club
  "29": MENUS.biryani,      // Behrouz
  "30": MENUS.biryani,      // Paradise
  "31": MENUS.biryani,      // Bawarchi
  "32": MENUS.biryani,      // Biryani By Kilo
  "33": MENUS.biryani,      // Biryani Blues
  "34": MENUS.biryani,      // Ammi's
  "35": MENUS.biryani,      // Dum Pukht
  "36": MENUS.biryani,      // Royal Biryani
  "37": MENUS.biryani,      // Nizam's
  "38": MENUS.chinese,      // Mainland China
  "39": MENUS.chinese,      // China Garden
  "40": MENUS.chinese,      // Wok Express
  "41": MENUS.chinese,      // Wow! China
  "42": MENUS.chinese,      // Dragon Palace
  "43": MENUS.chinese,      // Noodle Bar
  "44": MENUS.dessert,      // Baskin-Robbins
  "45": MENUS.dessert,      // Naturals
  "46": MENUS.dessert,      // Chocolate Room
  "47": MENUS.dessert,      // Belgian Waffle Co.
  "48": MENUS.dessert,      // Theobroma
  "49": MENUS.dessert,      // Monginis
  "50": MENUS.dessert,      // Leela Patisserie
  "51": MENUS.rolls,        // Faasos
  "52": MENUS.rolls,        // Kathi Junction
  "53": MENUS.rolls,        // Subway
  "54": MENUS.momos,        // Wow! Momo
  "55": MENUS.momos,        // Momo Point
  "56": MENUS.momos,        // Tibetan Kitchen
  "57": MENUS.northIndian,  // Gajlee
  "58": MENUS.northIndian,  // Sardar Refreshments
  "59": MENUS.northIndian,  // Jumbo Vada Pav
  "60": MENUS.northIndian,  // Moolchand Paratha
  "61": MENUS.northIndian,  // Paratha Wali Gali
  "62": MENUS.northIndian,  // Khichdi Experiment
  "63": MENUS.pizza,        // Pasta Bar (reuses pizza sides menu)
  "64": MENUS.pizza,        // Indigo Deli
  "65": MENUS.rolls,        // Taco Bell
  "66": MENUS.dessert,      // Keventers
  "67": MENUS.coffee,       // Chaayos
  "68": MENUS.coffee,       // Blue Tokai
  "69": MENUS.coffee,       // Third Wave Coffee
  "70": MENUS.coffee,       // Starbucks
  "71": MENUS.southIndian,  // Eat.fit
  "72": MENUS.northIndian,  // Box8
  "73": MENUS.chinese,      // Social
  "74": MENUS.northIndian,  // Absolute Barbecue
  "75": MENUS.northIndian,  // The Bombay Canteen
  // Real restaurants from Swiggy API
  "76": MENUS.momos,        // Hastag Momos
  "77": MENUS.northIndian,  // The Taste Of Punjabi
  "78": MENUS.dessert,      // Ratel Icecream
  "79": MENUS.northIndian,  // Mexicanos
  "80": MENUS.chinese,      // Talk Cafe
  "81": MENUS.northIndian,  // Bread Box
  "82": MENUS.northIndian,  // Hocco Eatery
  "83": MENUS.northIndian,  // Gabru Di Chaap
  "84": MENUS.northIndian,  // Truth Bowl
  "85": MENUS.coffee,       // Third Wave Coffee
  "86": MENUS.biryani,      // Makhani Darbar
  "87": MENUS.northIndian,  // Gajanand Pauva House
  "88": MENUS.biryani,      // Veg Darbar by Behrouz
  "89": MENUS.northIndian,  // Veg Meals By LunchBox
  "90": MENUS.dessert,      // Apsara Ice Creams
};

// Cycle all IMG values across items so each food card shows a different photo
const IMG_POOL = Object.values(IMG);
let _poolIdx = 0;
Object.values(MENUS).forEach((categories) => {
  categories.forEach((cat) => {
    cat.items.forEach((item) => {
      item.imageId = IMG_POOL[_poolIdx % IMG_POOL.length];
      _poolIdx++;
    });
  });
});

export function getMenuByRestaurantId(restaurantId) {
  return RESTAURANT_MENU_MAP[restaurantId] ?? MENUS.northIndian;
}

export { CDN_URL };
