const express = require('express');
const Stripe = require('stripe');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.static(__dirname));
const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;
const products = {
  "1": {
    "name": "Whey Protein",
    "variant": "Vanilla Bean",
    "price": 3999
  },
  "2": {
    "name": "Plant Protein Blend",
    "variant": "Chocolate",
    "price": 3499
  },
  "3": {
    "name": "Egg White Protein",
    "variant": "Original",
    "price": 3299
  },
  "4": {
    "name": "Creatine Monohydrate",
    "variant": "Unflavored",
    "price": 2499
  },
  "5": {
    "name": "Daily Multivitamin",
    "variant": "Everyday Essentials",
    "price": 1999
  },
  "6": {
    "name": "Women’s Daily Multi",
    "variant": "Women’s Formula",
    "price": 2299
  },
  "7": {
    "name": "Men’s Daily Multi",
    "variant": "Men’s Formula",
    "price": 2299
  },
  "8": {
    "name": "Omega-3 Fish Oil",
    "variant": "Daily Softgels",
    "price": 1899
  },
  "9": {
    "name": "Electrolyte Mix",
    "variant": "Citrus",
    "price": 2199
  },
  "10": {
    "name": "Magnesium Complex",
    "variant": "Daily Minerals",
    "price": 1799
  },
  "11": {
    "name": "Collagen Peptides",
    "variant": "Unflavored",
    "price": 2799
  },
  "12": {
    "name": "Pre-Workout",
    "variant": "Berry Charge",
    "price": 2999
  },
  "13": {
    "name": "Whey Protein",
    "variant": "Chocolate Fudge",
    "price": 3999
  },
  "14": {
    "name": "Whey Protein Isolate",
    "variant": "Vanilla",
    "price": 4999
  },
  "15": {
    "name": "Casein Protein",
    "variant": "Chocolate",
    "price": 4299
  },
  "16": {
    "name": "Plant Protein Blend",
    "variant": "Vanilla",
    "price": 3499
  },
  "17": {
    "name": "Pea Protein",
    "variant": "Unflavored",
    "price": 2999
  },
  "18": {
    "name": "Mass Gainer",
    "variant": "Chocolate",
    "price": 4499
  },
  "19": {
    "name": "Clear Protein",
    "variant": "Tropical",
    "price": 3699
  },
  "20": {
    "name": "Egg White Protein",
    "variant": "Chocolate",
    "price": 3499
  },
  "21": {
    "name": "Women’s Daily Multi",
    "variant": "Iron-Free Formula",
    "price": 2399
  },
  "22": {
    "name": "Women’s Active Multi",
    "variant": "Daily Formula",
    "price": 2699
  },
  "23": {
    "name": "Men’s Daily Multi",
    "variant": "Everyday Formula",
    "price": 2399
  },
  "24": {
    "name": "Men’s Active Multi",
    "variant": "Daily Formula",
    "price": 2699
  },
  "25": {
    "name": "Vitamin D3",
    "variant": "Daily Softgels",
    "price": 1299
  },
  "26": {
    "name": "Vitamin B12",
    "variant": "Daily Tablets",
    "price": 1399
  },
  "27": {
    "name": "Vitamin C",
    "variant": "Daily Capsules",
    "price": 1499
  },
  "28": {
    "name": "Zinc Complex",
    "variant": "Mineral Support",
    "price": 1199
  },
  "29": {
    "name": "Calcium + D3",
    "variant": "Daily Tablets",
    "price": 1699
  },
  "30": {
    "name": "B-Complex",
    "variant": "Daily Capsules",
    "price": 1599
  },
  "31": {
    "name": "Iron Supplement",
    "variant": "Gentle Formula",
    "price": 1399
  },
  "32": {
    "name": "Vitamin K2",
    "variant": "Daily Softgels",
    "price": 1899
  },
  "33": {
    "name": "Ashwagandha",
    "variant": "Root Extract",
    "price": 1999
  },
  "34": {
    "name": "Probiotic Blend",
    "variant": "Daily Capsules",
    "price": 2499
  },
  "35": {
    "name": "Greens Powder",
    "variant": "Original",
    "price": 3299
  },
  "36": {
    "name": "Fiber Powder",
    "variant": "Unflavored",
    "price": 1899
  },
  "37": {
    "name": "Electrolyte Mix",
    "variant": "Berry",
    "price": 2199
  },
  "38": {
    "name": "Electrolyte Mix",
    "variant": "Unflavored",
    "price": 1999
  },
  "39": {
    "name": "Collagen Peptides",
    "variant": "Berry",
    "price": 2999
  },
  "40": {
    "name": "CoQ10",
    "variant": "Daily Softgels",
    "price": 2299
  },
  "41": {
    "name": "Turmeric Complex",
    "variant": "Curcumin Blend",
    "price": 2099
  },
  "42": {
    "name": "Sleep Support",
    "variant": "Herbal Blend",
    "price": 1799
  },
  "43": {
    "name": "Creatine Monohydrate",
    "variant": "Micronized",
    "price": 2499
  },
  "44": {
    "name": "Creatine Gummies",
    "variant": "Fruit",
    "price": 2799
  },
  "45": {
    "name": "Pre-Workout",
    "variant": "Citrus Rush",
    "price": 2999
  },
  "46": {
    "name": "Pre-Workout",
    "variant": "Stim-Free",
    "price": 3199
  },
  "47": {
    "name": "BCAA Drink Mix",
    "variant": "Watermelon",
    "price": 2499
  },
  "48": {
    "name": "EAA Drink Mix",
    "variant": "Lemon Lime",
    "price": 2799
  },
  "49": {
    "name": "L-Citrulline",
    "variant": "Unflavored Powder",
    "price": 2299
  },
  "50": {
    "name": "Glutamine Powder",
    "variant": "Unflavored",
    "price": 2199
  },
  "51": {
    "name": "Carb Fuel Powder",
    "variant": "Maltodextrin Blend",
    "price": 1999
  },
  "52": {
    "name": "Protein Bars",
    "variant": "Chocolate Crunch",
    "price": 2499
  }
};
app.post('/create-checkout-session', async (req,res) => {
  if (!stripe) return res.status(503).json({error:'Stripe is not configured yet. Add STRIPE_SECRET_KEY to your private .env file.'});
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!items.length || items.length > 50) return res.status(400).json({error:'Your cart is empty or too large.'});
    const line_items = items.map(item => {
      const p = products[String(Number(item.id))];
      const quantity = Math.max(1, Math.min(20, Math.floor(Number(item.quantity) || 1)));
      if (!p) throw new Error('Invalid product');
      return {quantity, price_data:{currency:'usd',unit_amount:p.price,product_data:{name:p.name+' — '+p.variant}}};
    });
    const origin = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;
    const session = await stripe.checkout.sessions.create({mode:'payment',line_items,success_url:origin+'/?checkout=success',cancel_url:origin+'/?checkout=cancel'});
    res.json({url:session.url});
  } catch (err) { console.error('Checkout error:',err.message); res.status(400).json({error:'Unable to start checkout. Please try again.'}); }
});
const port = process.env.PORT || 4242;
app.listen(port,()=>console.log(`Muscle Minded Fitness running on port ${port}`));
