/* ==========================================================================
   PRODUCT DATABASE — dryrobe®
   Single source of truth. Every page (home, shop, category, product,
   search, cart recommendations) reads from PRODUCTS — nothing is
   hand-duplicated in markup.

   Currency: GHS (Ghanaian Cedi).
   `photo:true` items use real photography we already have (product-tee.jpg,
   product-hoodie.jpg, product-cap.jpg, product-shorts.jpg from the original
   conversion). `photo:false` items reference the FINAL filenames this site
   will use once a future image-generation pass supplies them — cart.js
   renders those as an on-brand colour-gradient placeholder + garment icon
   instead of a broken image or a fake stock photo.
   ========================================================================== */

const COLLECTIONS_META = [
  { slug: "reign", name: "Reign", tagline: "Our signature graphic line — bold, dark, unmistakable." },
  { slug: "after-dark", name: "After Dark", tagline: "Editorial pieces built for low light and sharp lines." },
  { slug: "urban-form", name: "Urban Form", tagline: "Utility-driven silhouettes for city movement." },
  { slug: "summer-motion", name: "Summer Motion", tagline: "Lightweight fabrics built to move in the heat." },
  { slug: "future-classics", name: "Future Classics", tagline: "Considered basics designed to outlast the season." }
];
function getCollectionMeta(slug) { return COLLECTIONS_META.find((c) => c.slug === slug) || null; }

const CATEGORY_MAP = {
  Men: ["T-Shirts", "Shirts", "Hoodies", "Jackets", "Trousers", "Shorts", "Accessories"],
  Women: ["Dresses", "Tops", "Blouses", "Skirts", "Jeans", "Trousers", "Jackets", "Knitwear"],
  Boys: ["T-Shirts", "Hoodies", "Sets", "Shorts", "Trousers", "Jackets"],
  Girls: ["T-Shirts", "Dresses", "Jackets", "Sets"],
  Unisex: ["Accessories", "Bags"]
};

const PRODUCTS = [
  /* ============================= MEN — 10 ============================= */
  {
    id: "men-heavyweight-core-tee", name: "Heavyweight Core Tee", gender: "Men", category: "T-Shirts",
    collection: "after-dark", price: 180,
    shortDescription: "Structured 240gsm cotton, relaxed fit",
    description: "A structured heavyweight cotton T-shirt with a relaxed silhouette, clean neckline and premium everyday construction. Designed to work alone or as a foundation for layered looks.",
    photo: false, image: "men-heavyweight-core-tee.jpg", gallery: ["men-heavyweight-core-tee.jpg"],
    sizes: ["S", "M", "L", "XL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Stone", hex: "#8a8478" }],
    material: "100% combed cotton, 240gsm", care: "Machine wash cold, hang dry",
    tags: ["essentials", "layering"], stock: 34, featured: true, newArrival: false, bestSeller: true
  },
  {
    id: "men-reign-oversized-tee", name: "Reign Oversized Graphic Tee", gender: "Men", category: "T-Shirts",
    collection: "reign", price: 200,
    shortDescription: "Oversized fit, gothic back print",
    description: "Boxy, dropped-shoulder tee carrying the Reign back graphic in a faded wash print. Cut oversized on purpose — order your regular size for the intended proportions.",
    photo: false, image: "men-reign-oversized-tee.jpg", gallery: ["men-reign-oversized-tee.jpg"],
    sizes: ["S", "M", "L", "XL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Blood Red", hex: "#b91c1c" }],
    material: "100% cotton jersey, 220gsm", care: "Machine wash cold, inside out",
    tags: ["graphic", "streetwear"], stock: 21, featured: true, newArrival: true, bestSeller: false, badge: "DROP"
  },
  {
    id: "men-utility-overshirt", name: "Utility Overshirt", gender: "Men", category: "Shirts",
    collection: "urban-form", price: 340,
    shortDescription: "Twill overshirt, four patch pockets",
    description: "A boxy cotton-twill overshirt built to be worn open over a tee or buttoned as an outer layer. Four patch pockets, corozo buttons, a slightly dropped shoulder.",
    photo: false, image: "men-utility-overshirt.jpg", gallery: ["men-utility-overshirt.jpg"],
    sizes: ["S", "M", "L", "XL"], colors: [{ name: "Olive", hex: "#4b5320" }, { name: "Charcoal", hex: "#3a3a3a" }],
    material: "Cotton twill, 260gsm", care: "Machine wash cold, tumble dry low",
    tags: ["layering", "utility"], stock: 18, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "men-shadow-zip-hoodie", name: "Shadow Zip Hoodie", gender: "Men", category: "Hoodies",
    collection: "after-dark", price: 360,
    shortDescription: "Full-zip fleece, tonal hardware",
    description: "Brushed-fleece zip hoodie with a tonal metal zip and a lined hood that holds its shape. Relaxed through the body, ribbed at the cuff and hem for a cleaner finish.",
    photo: false, image: "men-shadow-zip-hoodie.jpg", gallery: ["men-shadow-zip-hoodie.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Navy", hex: "#1f2937" }],
    material: "80% cotton / 20% polyester fleece, 420gsm", care: "Machine wash cold, do not bleach",
    tags: ["layering", "essentials"], stock: 27, featured: false, newArrival: false, bestSeller: true
  },
  {
    id: "men-wide-leg-cargo", name: "Wide-Leg Cargo Trouser", gender: "Men", category: "Trousers",
    collection: "urban-form", price: 350,
    shortDescription: "Ripstop cargo, drawcord hem",
    description: "Wide-leg cargo trouser in ripstop cotton with six pockets and a drawcord hem you can cinch for a cropped look. Sits on the waist, drapes loose from the thigh down.",
    photo: false, image: "men-wide-leg-cargo.jpg", gallery: ["men-wide-leg-cargo.jpg"],
    sizes: ["30", "32", "34", "36", "38"], colors: [{ name: "Charcoal", hex: "#3a3a3a" }, { name: "Stone", hex: "#8a8478" }],
    material: "Cotton ripstop", care: "Machine wash cold",
    tags: ["utility", "streetwear"], stock: 15, featured: true, newArrival: false, bestSeller: false
  },
  {
    id: "men-relaxed-linen-shirt", name: "Relaxed Linen Shirt", gender: "Men", category: "Shirts",
    collection: "summer-motion", price: 260,
    shortDescription: "Airy linen-blend, camp collar",
    description: "A breathable linen-cotton shirt with a camp collar and a single chest pocket. Cut relaxed through the body for warm-weather wear, worn open or buttoned through.",
    photo: false, image: "men-relaxed-linen-shirt.jpg", gallery: ["men-relaxed-linen-shirt.jpg"],
    sizes: ["S", "M", "L", "XL"], colors: [{ name: "Cream", hex: "#c9bfa6" }, { name: "Stone", hex: "#8a8478" }],
    material: "55% linen / 45% cotton", care: "Machine wash cold, hang dry",
    tags: ["summer", "resort"], stock: 22, featured: false, newArrival: true, bestSeller: false
  },
  {
    id: "men-studio-pleated-trouser", name: "Studio Pleated Trouser", gender: "Men", category: "Trousers",
    collection: "future-classics", price: 380,
    shortDescription: "Double-pleat, tapered leg",
    description: "Double-pleated tailoring trouser in a soft wool-blend twill, tapered from the knee to a clean break at the ankle. Dresses up an otherwise casual outfit.",
    photo: false, image: "men-studio-pleated-trouser.jpg", gallery: ["men-studio-pleated-trouser.jpg"],
    sizes: ["30", "32", "34", "36"], colors: [{ name: "Black", hex: "#111111" }, { name: "Navy", hex: "#1f2937" }],
    material: "Wool-blend twill", care: "Dry clean recommended",
    tags: ["tailored", "smart"], stock: 0, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "men-motion-track-short", name: "Motion Track Short", gender: "Men", category: "Shorts",
    collection: "summer-motion", price: 160,
    shortDescription: "Stretch tech short, side taping",
    description: "Lightweight stretch-woven short with a mesh liner and reflective side taping. Built for training, styled for everything after it.",
    photo: false, image: "men-motion-track-short.jpg", gallery: ["men-motion-track-short.jpg"],
    sizes: ["S", "M", "L", "XL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Navy", hex: "#1f2937" }],
    material: "Recycled stretch-woven polyester", care: "Machine wash cold",
    tags: ["training", "essentials"], stock: 30, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "men-reign-boardshort", name: "Reign Boardshort", gender: "Men", category: "Shorts",
    collection: "reign", price: 210,
    shortDescription: "Quick-dry, hidden zip pocket",
    description: "Quick-dry technical boardshort with a mesh liner and a hidden zip pocket. Built for heat, styled for the street.",
    photo: true, image: "product-shorts.jpg", gallery: ["product-shorts.jpg", "gallery-1.jpg", "gallery-4.jpg"],
    sizes: ["S", "M", "L", "XL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Navy", hex: "#1f2937" }],
    material: "Recycled polyester shell, mesh liner", care: "Machine wash cold",
    tags: ["summer", "streetwear"], stock: 25, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "men-reign-hoodie", name: "Reign Hoodie", gender: "Men", category: "Hoodies",
    collection: "reign", price: 320,
    shortDescription: "450gsm fleece, oversized fit",
    description: "450gsm brushed-fleece hoodie with a double-lined hood and ribbed cuffs. Oversized fit, designed to fade beautifully with wear.",
    photo: true, image: "product-hoodie.jpg", gallery: ["product-hoodie.jpg", "gallery-2.jpg", "gallery-1.jpg", "gallery-4.jpg"],
    sizes: ["S", "M", "L", "XL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Navy", hex: "#1f2937" }],
    material: "100% cotton fleece, 450gsm", care: "Machine wash cold, do not bleach",
    tags: ["streetwear", "essentials"], stock: 40, featured: true, newArrival: false, bestSeller: true
  },

  /* ============================= WOMEN — 10 ============================= */
  {
    id: "women-noir-sculpt-dress", name: "Noir Sculpt Dress", gender: "Women", category: "Dresses",
    collection: "after-dark", price: 420,
    shortDescription: "Bias-cut satin, cowl back",
    description: "Bias-cut satin slip dress that skims the body without clinging. Adjustable straps, a soft cowl back and a floor-grazing hem.",
    photo: false, image: "women-noir-sculpt-dress.jpg", gallery: ["women-noir-sculpt-dress.jpg"],
    sizes: ["XS", "S", "M", "L"], colors: [{ name: "Black", hex: "#111111" }, { name: "Burgundy", hex: "#6b1e2b" }],
    material: "Satin-back crepe", care: "Dry clean recommended",
    tags: ["evening", "occasion"], stock: 12, featured: true, newArrival: true, bestSeller: true, badge: "LIMITED"
  },
  {
    id: "women-satin-motion-midi", name: "Satin Motion Midi", gender: "Women", category: "Dresses",
    collection: "summer-motion", price: 390,
    shortDescription: "Fluid midi, thin adjustable straps",
    description: "Fluid satin midi dress cut on the bias to move with the body. Thin adjustable straps, a side slit and a fully lined skirt.",
    photo: false, image: "women-satin-motion-midi.jpg", gallery: ["women-satin-motion-midi.jpg"],
    sizes: ["XS", "S", "M", "L"], colors: [{ name: "Cream", hex: "#c9bfa6" }, { name: "Black", hex: "#111111" }],
    material: "Satin polyester, fully lined", care: "Hand wash cold",
    tags: ["occasion", "summer"], stock: 16, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "women-asymmetric-knit-top", name: "Asymmetric Knit Top", gender: "Women", category: "Knitwear",
    collection: "future-classics", price: 240,
    shortDescription: "Fine-gauge knit, one-shoulder line",
    description: "Fine-gauge knit top with an asymmetric one-shoulder neckline and a fitted body. Layers cleanly under a blazer or worn alone.",
    photo: false, image: "women-asymmetric-knit-top.jpg", gallery: ["women-asymmetric-knit-top.jpg"],
    sizes: ["XS", "S", "M", "L"], colors: [{ name: "Black", hex: "#111111" }, { name: "Cream", hex: "#c9bfa6" }],
    material: "Viscose-blend knit", care: "Hand wash cold, dry flat",
    tags: ["knitwear", "occasion"], stock: 19, featured: true, newArrival: false, bestSeller: false
  },
  {
    id: "women-wide-leg-tailored", name: "Wide-Leg Tailored Trouser", gender: "Women", category: "Trousers",
    collection: "urban-form", price: 360,
    shortDescription: "High-rise, wide tailored leg",
    description: "High-rise tailored trouser with a wide, fluid leg and a clean waistband. Falls straight from the hip for a sharp, elongating line.",
    photo: false, image: "women-wide-leg-tailored.jpg", gallery: ["women-wide-leg-tailored.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Stone", hex: "#8a8478" }],
    material: "Wool-blend suiting", care: "Dry clean recommended",
    tags: ["tailored", "workwear"], stock: 20, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "women-studio-denim", name: "Studio Denim Jean", gender: "Women", category: "Jeans",
    collection: "urban-form", price: 350,
    shortDescription: "Rigid selvedge, wide leg",
    description: "Rigid selvedge denim cut high-rise with a wide leg. Sits at the natural waist and falls straight from the hip without clinging.",
    photo: false, image: "women-studio-denim.jpg", gallery: ["women-studio-denim.jpg"],
    sizes: ["24", "26", "28", "30", "32"], colors: [{ name: "Indigo", hex: "#1f2937" }],
    material: "100% rigid selvedge cotton denim", care: "Machine wash cold, inside out",
    tags: ["denim", "essentials"], stock: 24, featured: false, newArrival: false, bestSeller: true
  },
  {
    id: "women-cropped-utility-jacket", name: "Cropped Utility Jacket", gender: "Women", category: "Jackets",
    collection: "after-dark", price: 480,
    shortDescription: "Boxy crop, four flap pockets",
    description: "Boxy cropped jacket in brushed cotton twill with four flap pockets and a snap front. Structured through the shoulder, cropped at the waist.",
    photo: false, image: "women-cropped-utility-jacket.jpg", gallery: ["women-cropped-utility-jacket.jpg"],
    sizes: ["XS", "S", "M", "L"], colors: [{ name: "Black", hex: "#111111" }, { name: "Olive", hex: "#4b5320" }],
    material: "Cotton twill", care: "Machine wash cold, tumble dry low",
    tags: ["outerwear", "utility"], stock: 14, featured: true, newArrival: true, bestSeller: false
  },
  {
    id: "women-draped-blouse", name: "Draped Blouse", gender: "Women", category: "Blouses",
    collection: "summer-motion", price: 260,
    shortDescription: "Fluid crepe, hidden placket",
    description: "Fluid crepe blouse with a hidden button placket and dropped cuffs. Softly tailored, quietly sharp, easy to dress up or down.",
    photo: false, image: "women-draped-blouse.jpg", gallery: ["women-draped-blouse.jpg"],
    sizes: ["XS", "S", "M", "L"], colors: [{ name: "Cream", hex: "#c9bfa6" }, { name: "Black", hex: "#111111" }],
    material: "Crepe de chine", care: "Hand wash cold",
    tags: ["workwear", "occasion"], stock: 17, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "women-layered-midi-skirt", name: "Layered Midi Skirt", gender: "Women", category: "Skirts",
    collection: "future-classics", price: 310,
    shortDescription: "Knife-pleated satin twill",
    description: "Knife-pleated midi skirt in fluid satin twill. High-waisted with a concealed side zip, it holds its pleat all day.",
    photo: false, image: "women-layered-midi-skirt.jpg", gallery: ["women-layered-midi-skirt.jpg"],
    sizes: ["XS", "S", "M", "L"], colors: [{ name: "Burgundy", hex: "#6b1e2b" }, { name: "Black", hex: "#111111" }],
    material: "Satin twill", care: "Dry clean recommended",
    tags: ["occasion", "workwear"], stock: 13, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "women-reign-statement-tee", name: "Reign Statement Tee", gender: "Women", category: "Tops",
    collection: "reign", price: 180,
    shortDescription: "Fitted crop, gothic back print",
    description: "Fitted cotton tee carrying the Reign back graphic, cropped at the waist with a ribbed neckline. The women's cut of our signature print.",
    photo: true, image: "product-tee.jpg", gallery: ["product-tee.jpg", "gallery-3.jpg"],
    sizes: ["XS", "S", "M", "L"], colors: [{ name: "Black", hex: "#111111" }, { name: "Blood Red", hex: "#b91c1c" }],
    material: "100% cotton jersey, 220gsm", care: "Machine wash cold, inside out",
    tags: ["graphic", "streetwear"], stock: 28, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "women-reign-cap", name: "Reign Cap", gender: "Women", category: "Tops",
    collection: "reign", price: 120,
    shortDescription: "Structured six-panel, adjustable",
    description: "Structured six-panel cap with an embroidered crest and adjustable strap-back. Stiff brim, low-profile crown.",
    photo: true, image: "product-cap.jpg", gallery: ["product-cap.jpg", "gallery-3.jpg"],
    sizes: ["One Size"], colors: [{ name: "Black", hex: "#111111" }, { name: "Blood Red", hex: "#b91c1c" }],
    material: "Cotton twill, embroidered crest", care: "Spot clean only",
    tags: ["accessory", "graphic"], stock: 22, featured: false, newArrival: false, bestSeller: false
  },

  /* ============================= KIDS — 10 (Boys / Girls) ============================= */
  {
    id: "kids-mini-motion-tee", name: "Mini Motion Tee", gender: "Boys", category: "T-Shirts",
    collection: "future-classics", price: 90,
    shortDescription: "Soft jersey, pre-shrunk",
    description: "Soft cotton jersey tee sized down for kids who don't sit still. Pre-shrunk so it fits the same after every wash.",
    photo: false, image: "kids-mini-motion-tee.jpg", gallery: ["kids-mini-motion-tee.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Navy", hex: "#1f2937" }, { name: "Stone", hex: "#8a8478" }],
    material: "100% cotton jersey", care: "Machine wash warm",
    tags: ["essentials"], stock: 26, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "kids-future-club-hoodie", name: "Future Club Hoodie", gender: "Boys", category: "Hoodies",
    collection: "after-dark", price: 150,
    shortDescription: "Fleece-lined, full front zip",
    description: "Fleece-lined hoodie with a full front zip and thumbhole cuffs. Warm enough for harmattan mornings, light enough for the classroom.",
    photo: false, image: "kids-future-club-hoodie.jpg", gallery: ["kids-future-club-hoodie.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Navy", hex: "#1f2937" }, { name: "Black", hex: "#111111" }],
    material: "Cotton-blend fleece", care: "Machine wash warm",
    tags: ["layering"], stock: 20, featured: true, newArrival: false, bestSeller: false
  },
  {
    id: "kids-mini-utility-short", name: "Mini Utility Short", gender: "Boys", category: "Shorts",
    collection: "urban-form", price: 100,
    shortDescription: "Reinforced-knee cargo short",
    description: "Durable cotton-canvas cargo short with reinforced knees and an adjustable elastic waist for growing room.",
    photo: false, image: "kids-mini-utility-short.jpg", gallery: ["kids-mini-utility-short.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Olive", hex: "#4b5320" }, { name: "Stone", hex: "#8a8478" }],
    material: "Cotton canvas", care: "Machine wash warm",
    tags: ["playwear"], stock: 24, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "kids-junior-reign-set", name: "Junior Reign Set", gender: "Boys", category: "Sets",
    collection: "reign", price: 190,
    shortDescription: "Matching tee + short, Reign print",
    description: "Two-piece tee-and-short set carrying the scaled-down Reign graphic. Matching from the start, easy to mix apart later.",
    photo: false, image: "kids-junior-reign-set.jpg", gallery: ["kids-junior-reign-set.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Black", hex: "#111111" }],
    material: "100% cotton jersey", care: "Machine wash warm",
    tags: ["graphic", "sets"], stock: 15, featured: false, newArrival: true, bestSeller: false
  },
  {
    id: "kids-mini-denim-overshirt", name: "Mini Denim Overshirt", gender: "Girls", category: "Jackets",
    collection: "urban-form", price: 170,
    shortDescription: "Lightweight denim shacket",
    description: "Lightweight denim overshirt with snap-button closures, easy to layer over a tee on cooler evenings.",
    photo: false, image: "kids-mini-denim-overshirt.jpg", gallery: ["kids-mini-denim-overshirt.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Indigo", hex: "#1f2937" }],
    material: "Cotton denim", care: "Machine wash cold",
    tags: ["layering", "denim"], stock: 11, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "kids-playday-graphic-tee", name: "Playday Graphic Tee", gender: "Girls", category: "T-Shirts",
    collection: "summer-motion", price: 90,
    shortDescription: "Playful print, soft cotton",
    description: "Easy cotton tee with a playful front graphic. Roomy cut built for climbing, running and everything in between.",
    photo: false, image: "kids-playday-graphic-tee.jpg", gallery: ["kids-playday-graphic-tee.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Cream", hex: "#c9bfa6" }, { name: "Blood Red", hex: "#b91c1c" }],
    material: "100% cotton jersey", care: "Machine wash warm",
    tags: ["graphic", "playwear"], stock: 29, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "kids-mini-studio-trouser", name: "Mini Studio Trouser", gender: "Boys", category: "Trousers",
    collection: "future-classics", price: 110,
    shortDescription: "Elasticated waist, straight leg",
    description: "Soft brushed-cotton trouser with an elasticated waist and a straight, easy-move leg. Smart enough for photos, comfortable enough for the rest of the day.",
    photo: false, image: "kids-mini-studio-trouser.jpg", gallery: ["kids-mini-studio-trouser.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Charcoal", hex: "#3a3a3a" }],
    material: "Brushed cotton", care: "Machine wash warm",
    tags: ["smart"], stock: 18, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "kids-junior-weekend-hoodie", name: "Junior Weekend Hoodie", gender: "Boys", category: "Hoodies",
    collection: "future-classics", price: 150,
    shortDescription: "Pullover fleece, kangaroo pocket",
    description: "Pullover fleece hoodie with a kangaroo pocket and drawcord hood. The easy, everyday one — built to be lived in on weekends.",
    photo: false, image: "kids-junior-weekend-hoodie.jpg", gallery: ["kids-junior-weekend-hoodie.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Stone", hex: "#8a8478" }, { name: "Navy", hex: "#1f2937" }],
    material: "Cotton-blend fleece", care: "Machine wash warm",
    tags: ["essentials"], stock: 23, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "kids-mini-adventure-jacket", name: "Mini Adventure Jacket", gender: "Girls", category: "Jackets",
    collection: "future-classics", price: 220,
    shortDescription: "Water-resistant shell, hood",
    description: "Water-resistant shell jacket with a packable hood and taped seams. Built for the walk to school in any weather.",
    photo: false, image: "kids-mini-adventure-jacket.jpg", gallery: ["kids-mini-adventure-jacket.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Navy", hex: "#1f2937" }, { name: "Blood Red", hex: "#b91c1c" }],
    material: "Water-resistant nylon shell", care: "Wipe clean, do not tumble dry",
    tags: ["outerwear"], stock: 0, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "kids-mini-summer-dress", name: "Mini Summer Dress", gender: "Girls", category: "Dresses",
    collection: "summer-motion", price: 160,
    shortDescription: "Cotton sundress, adjustable straps",
    description: "Lightweight cotton sundress with adjustable straps and a soft elasticated bodice. Cool, easy, and made to take a beating at the park.",
    photo: false, image: "kids-mini-summer-dress.jpg", gallery: ["kids-mini-summer-dress.jpg"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: [{ name: "Cream", hex: "#c9bfa6" }, { name: "Blood Red", hex: "#b91c1c" }],
    material: "100% cotton poplin", care: "Machine wash warm",
    tags: ["summer", "playwear"], stock: 19, featured: true, newArrival: true, bestSeller: false
  },

  /* ============================= ACCESSORIES — 5 (Unisex) ============================= */
  {
    id: "acc-reign-cap", name: "Reign Cap", gender: "Unisex", category: "Accessories",
    collection: "reign", price: 120,
    shortDescription: "Structured six-panel, adjustable",
    description: "Structured six-panel cap with an embroidered crest and adjustable strap-back. Stiff brim, low-profile crown — our signature headwear piece.",
    photo: true, image: "product-cap.jpg", gallery: ["product-cap.jpg", "gallery-1.jpg"],
    sizes: ["One Size"], colors: [{ name: "Black", hex: "#111111" }, { name: "Blood Red", hex: "#b91c1c" }],
    material: "Cotton twill, embroidered crest", care: "Spot clean only",
    tags: ["accessory", "graphic"], stock: 22, featured: false, newArrival: false, bestSeller: true
  },
  {
    id: "accessory-utility-crossbody", name: "Utility Crossbody", gender: "Unisex", category: "Accessories",
    collection: "urban-form", price: 260,
    shortDescription: "Water-resistant, adjustable strap",
    description: "Compact water-resistant crossbody with a padded interior sleeve and an adjustable webbing strap. Fits a phone, cards and keys without the bulk.",
    photo: false, image: "accessory-utility-crossbody.jpg", gallery: ["accessory-utility-crossbody.jpg"],
    sizes: ["One Size"], colors: [{ name: "Black", hex: "#111111" }, { name: "Olive", hex: "#4b5320" }],
    material: "Water-resistant ripstop, webbing strap", care: "Wipe clean",
    tags: ["accessory", "utility"], stock: 16, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "accessory-core-tote", name: "Core Everyday Tote", gender: "Unisex", category: "Accessories",
    collection: "future-classics", price: 280,
    shortDescription: "Structured leather, laptop sleeve",
    description: "Structured leather tote with a magnetic top closure and an internal zip pocket. Sized for a laptop, shaped to hold it.",
    photo: false, image: "accessory-core-tote.jpg", gallery: ["accessory-core-tote.jpg"],
    sizes: ["One Size"], colors: [{ name: "Black", hex: "#111111" }, { name: "Cream", hex: "#c9bfa6" }],
    material: "Full-grain leather", care: "Leather conditioner as needed",
    tags: ["accessory", "workwear"], stock: 10, featured: true, newArrival: false, bestSeller: false, badge: "RESTOCKED"
  },
  {
    id: "accessory-studio-socks", name: "Studio Runner Socks", gender: "Unisex", category: "Accessories",
    collection: "summer-motion", price: 60,
    shortDescription: "3-pack, cushioned sole",
    description: "Three-pack of cushioned crew socks in combed cotton with reinforced heel and toe. The pair you reach for without thinking.",
    photo: false, image: "accessory-studio-socks.jpg", gallery: ["accessory-studio-socks.jpg"],
    sizes: ["S/M", "L/XL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Stone", hex: "#8a8478" }],
    material: "Combed cotton blend", care: "Machine wash warm",
    tags: ["accessory", "essentials"], stock: 44, featured: false, newArrival: false, bestSeller: false
  },
  {
    id: "accessory-reign-belt", name: "Reign Signature Belt", gender: "Unisex", category: "Accessories",
    collection: "reign", price: 150,
    shortDescription: "Full-grain leather, brushed buckle",
    description: "Full-grain leather belt with a brushed metal buckle stamped with the Reign crest. Cut long enough to size down yourself.",
    photo: false, image: "accessory-reign-belt.jpg", gallery: ["accessory-reign-belt.jpg"],
    sizes: ["S", "M", "L", "XL"], colors: [{ name: "Black", hex: "#111111" }, { name: "Stone", hex: "#8a8478" }],
    material: "Full-grain leather", care: "Leather conditioner as needed",
    tags: ["accessory", "graphic"], stock: 20, featured: false, newArrival: false, bestSeller: false
  }
];

/* ---------------- helpers ---------------- */
function getProduct(id) { return PRODUCTS.find((p) => p.id === id) || null; }
function getByGender(g) { return PRODUCTS.filter((p) => p.gender === g); }
function getByCategory(cat) { return PRODUCTS.filter((p) => p.category === cat); }
function getByCollection(slug) { return PRODUCTS.filter((p) => p.collection === slug); }
function getNewArrivals() { return PRODUCTS.filter((p) => p.newArrival); }
function getBestsellers() { return PRODUCTS.filter((p) => p.bestSeller); }
function getFeatured() { return PRODUCTS.filter((p) => p.featured); }
function getRelated(product, count) {
  count = count || 4;
  const sameCollection = PRODUCTS.filter((p) => p.id !== product.id && p.collection === product.collection);
  const sameGender = PRODUCTS.filter((p) => p.id !== product.id && p.gender === product.gender && !sameCollection.includes(p));
  return [...sameCollection, ...sameGender].slice(0, count);
}
function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.gender.toLowerCase().includes(q) ||
    p.collection.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
const GARMENT_ICON_MAP = {
  "T-Shirts": "garmentTee", "Tops": "garmentTop", "Shirts": "garmentTop", "Blouses": "garmentTop",
  "Hoodies": "garmentHoodie", "Jackets": "garmentJacket", "Blazers": "garmentJacket",
  "Trousers": "garmentTrousers", "Jeans": "garmentJeans", "Shorts": "garmentTrousers",
  "Dresses": "garmentDress", "Skirts": "garmentSkirt", "Knitwear": "garmentKnit",
  "Sets": "garmentSet", "Bags": "garmentBag", "Accessories": "garmentBag"
};
function productGarmentIcon(p) { return GARMENT_ICON_MAP[p.category] || "garmentTee"; }
