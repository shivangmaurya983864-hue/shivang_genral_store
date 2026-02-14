const WHATSAPP_NUMBER = "919984824292";
let cart = {};

const inventory = {
    "🌾 Ration (राशन सामान)": [
        { n: "Atta (Gehu ka aata)", img: "images/ata.jpg", sizes: {"5kg": 180, "10kg": 350} },
        { n: "Maida", img: "images/maida.jpg", sizes: {"1kg": 45} },
        { n: "Suji (Sooji)", img: "images/suji.jpg", sizes: {"500g": 30} },
        { n: "Besan (Chane ka besan)", img: "images/besan.jpg", sizes: {"1kg": 110} },
        { n: "Chawal (Rice)", img: "images/rice.jpg", sizes: {"1kg": 50} },
        { n: "Masoor Dal", img: "images/81Z2D7d60sL._AC_UF894,1000_QL80_.jpg", sizes: {"1kg": 95} },
        { n: "Moong Dal", img: "images/moong_dal_1.webp", sizes: {"1kg": 115} },
        { n: "Rajma", img: "images/benefits-of-rajma.webp", sizes: {"500g": 75} },
        { n: "Kabuli Chana", img: "images/kabuli.jpg", sizes: {"500g": 80} },
        { n: "Soyabean", img: "images/IMG_20260213_090646.jpg", sizes: {"250g": 35} },
        { n: "Daliya", img: "images/Broken_wheat_1.jpg", sizes: {"500g": 35} },
        { n: "Sabudana", img: "images/sabudana.jpg", sizes: {"500g": 60} }
    ],

    "🧂 रसोई सामान ": [
        { n: "Sugar (Cheeni)", img: "images/sugar-g963832288_1280.avif", sizes: {"1kg": 44} },
        { n: "Salt (Namak)", img: "images/tata.jpg", sizes: {"1kg": 28} },
        { n: "Refined Oil", img: "images/40161771_6-fortune-sunflower-oil.webp", sizes: {"1L": 145} },
        { n: "mustard  Oil", img: "images/mustard.jpg", sizes: {"1L": 145} },
        { n: "Tea (Chai patti)", img: "images/tata_tea_agni.jpg", sizes: {"250g": 110} },
        { n: "Coffee", img: "images/Coffee.jpg", sizes: {"50g": 160} },
        { n: "Milk Powder", img: "images/shopping.webp", sizes: {"Pack": 10} },
        { n: "Tomato Ketchup", img: "images/1978250.webp", sizes: {"Bottle": 120} },
        { n: "Soya Sauce", img: "images/40259756_1-prime-prime-soya-sauce-improves-digestion-adds-flavour.webp", sizes: {"Bottle": 55} },
        { n: "Vinegar (Sirca)", img: "images/Vinegar .jpg", sizes: {"Bottle": 45} },
        { n: "Noodles", img: "images/Mama_instant_noodle_block.jpg", sizes: {"Pack": 12} },
        { n: "Pasta", img: "images/Pasta.jpg", sizes: {"500g": 65} },
        
    ],

    "🌶 मसाले(Masale)": [
        { n: "Haldi Powder", img: "images/goldiee_haldi.jpg", sizes: {"100g": 32} },
        { n: "Mirchi Powder", img: "images/Mircha_Powder_500g_Front_1200x1200.webp", sizes: {"100g": 48} },
        { n: "Dhaniya Powder", img: "images/dhaniye_sabut.jpg", sizes: {"100g": 38} },
        { n: "Garam Masala", img: "images/s-l1200 (2).jpg", sizes: {"50g": 55} },
        { n: "Chaat Masala", img: "images/chat_masala_e00e2537-8cba-4175-8e7f-e087f90c65fc_1200x1200.webp", sizes: {"50g": 45} },
        { n: "Meat Masala", img: "images/Meat_Millenium_200g_Pouch_1024x1024.webp", sizes: {"50g": 50} },
        { n: "Jeera", img: "images/jira.jpg", sizes: {"100g": 65} },
        { n: "Tej Patta", img: "images/tej.jpg", sizes: {"Pack": 15} },
        { n: "Laung", img: "images/laung.jpg", sizes: {"10g": 25} },
        { n: "Dalchini", img: "images/pngtree-cinnamon-sticks-in-a-glass-bowl-png-image_13600491.png", sizes: {"20g": 25} },
        { n: "Kali Mirch", img: "images/kali.jpg", sizes: {"25g": 45} },
        { n: "Kasuri Methi", img: "images/10d342fb-54e8-4f86-883e-a7c39ab3dd17_1U6XSKAR2I_MN_18122025.avif", sizes: {"Pack": 20} },
        { n: "Chole Masala", img: "images/chohole.jpg", sizes: {"Pack": 10} },
        { n: "Pav Bhaji Masala", img: "images/Fresh_Lock_Pavbhaji_Masala_100g_1200x1200.webp", sizes: {"Pack": 10} },
        { n: "Sambhar Masala", img: "images/images/sambhar.jpg", sizes: {"Pack": 10} },
        { n: "Maggi Masala", img: "images/81YoCg2GP0L.jpg", sizes: {"Pack": 5} },
        { n: "Biryani Masala", img: "images/71Hmg0ocPAL._AC_UF894,1000_QL80_.jpg", sizes: {"Pack": 15} },
        { n: "Jaljeera", img: "images/714LRqI8IWL._AC_UF894,1000_QL80_.jpg", sizes: {"Pack": 5} },
        { n: "Pani Puri Masala", img: "images/everest-pani-puri-masala-50-g-quick-pantry-1.jpg", sizes: {"Pack": 20} },
        { n: "Pasta Masala", img: "images/40188358_6-smith-jones-pasta-masala.webp", sizes: {"Pack": 5} },
        { n: "Black Salt (Kala Namak)", img: "images/Black_Salt_(crystals).jpg", sizes: {"Pack": 10} }
    ],

    "🍪 बिस्किट & ब्रेड(Biscuit & Bread)": [
        { n: "Parle-G", img: "images/ParleG.jpg", sizes: {"₹5": 5, "₹10": 10} },
        { n: "Marie Gold", img: "images/220244_9-britannia-marie-gold-biscuits.webp", sizes: {"₹10": 10} },
        { n: "Good Day", img: "images/270729_21-britannia-good-day-cashew-cookies.webp", sizes: {"₹10": 10, "₹30": 30} },
        { n: "50-50 Biscuit", img: "images/40023487_11-britannia-50-50-sweet-salty-biscuits.webp", sizes: {"₹10": 10} },
        { n: "Monaco", img: "images/Monaco.jpg", sizes: {"₹10": 10} },
        { n: "Bourbon", img: "images/81ooCSbQd7L._AC_UF894,1000_QL80_.jpg", sizes: {"₹20": 20} },
        { n: "Oreo", img: "images/61Xj1A6WCTL.jpg", sizes: {"₹10": 10, "₹30": 30} },
        { n: "Cream Biscuit", img: "images/40135741_3-cremica-cream-biscuit-vanilla-cream.webp", sizes: {"₹10": 10} },
        { n: "Coconut Biscuit", img: "images/100301531_9-parle-coconut-crunchy-cookies-with-real-coconut.webp", sizes: {"₹10": 10} },
        { n: "Jeera Biscuit", img: "images/40197810_8-britannia-50-50-jeera-masti-biscuits.webp", sizes: {"₹10": 10} },
        { n: "Rusk (Toast)", img: "images/61fvC7Oei1L.jpg", sizes: {"Pack": 40} },
        { n: "Bread (Double roti)", img: "images/bread.jpg", sizes: {"Large": 30} },
        { n: "Khari Biscuit", img: "images/41DKtL313jL._AC_UF894,1000_QL80_.jpg", sizes: {"Pack": 40} }
    ],

    "🍫 Chocolates & Candy": [
        { n: "Dairy Milk", img: "images/-original-imahew8qtc64vhnu.webp", sizes: {"₹10": 10, "₹40": 40} },
        { n: "Five Star", img: "images/618fySthK8L.jpg", sizes: {"₹5": 5, "₹10": 10} },
        { n: "KitKat", img: "images/KitKat_Finger_Wafer_Chocolate_Bar_38.5_g_Quick_Pantry.webp", sizes: {"₹10": 10, "₹25": 25} },
        { n: "Perk", img: "images/61CVFnbljUL._AC_UF1000,1000_QL80_.jpg", sizes: {"₹5": 5, "₹10": 10} },
        { n: "Munch", img: "images/munch-chocolate-classic-tangyshop-tangy-shop-974438.webp", sizes: {"₹5": 5, "₹10": 10} },
        { n: "Melody", img: "images/Melody.webp", sizes: {"₹1": 1} },
        { n: "Eclairs", img: "images/s-l400.png", sizes: {"₹1": 1} },
        { n: "Hajmola Candy", img: "images/healthybazar_16233832790.jpg", sizes: {"₹1": 1} },
        { n: "Pulse Candy", img: "images/41cUrywVQWL._AC_UF894,1000_QL80_.jpg", sizes: {"₹1": 1} }
    ],

    "🥨 नमकीन & स्नैक्स": [
        { n: "Aloo Bhujia", img: "images/aloo bhujia.jpg", sizes: {"₹5": 5, "₹20": 20} },
        { n: "Haldiram Mix", img: "images/61U5C4WM+tL.jpg", sizes: {"₹10": 10, "₹40": 40} },
        { n: "Moong Dal Namkeen", img: "images/moong_dal_peanuts.jpg", sizes: {"₹5": 5, "₹10": 10} },
        { n: "Potato Chips", img: "images/61e+UwnsWwL.jpg", sizes: {"₹10": 10} },
        { n: "Kurkure", img: "images/817tDCgQIrL._AC_UF350,350_QL80_.jpg", sizes: {"₹5": 5, "₹10": 10, "₹20": 20} },
        { n: "Lays Chips", img: "images/lays.jpg", sizes: {"₹10": 10, "₹20": 20} },
        { n: "Bingo Chips", img: "images/810hknZw3eL._AC_UF894,1000_QL80_.jpg", sizes: {"₹10": 10} },
    ],

    "🥤 Cold Drinks": [
        { n: "Coca Cola", img: "images/251023_11-coca-cola-soft-drink-original-taste.webp", sizes: {"250ml": 20, "2L": 95} },
        { n: "Pepsi", img: "images/05cfeb59946195e21395d1077887027e.png", sizes: {"250ml": 20, "2L": 95} },
        { n: "Thums Up", img: "images/b598cb59654b98c6175a356d9f829be8.png", sizes: {"250ml": 20, "2L": 95} },
        { n: "Sprite", img: "images/251006_13-sprite-soft-drink-lime-flavoured.webp", sizes: {"250ml": 20, "2L": 95} },
        { n: "Fanta", img: "images/412247_1-fanta-orange.webp", sizes: {"250ml": 20, "2L": 95} },
        { n: "Limca", img: "images/Limca.jpg", sizes: {"250ml": 20, "2L": 95} },
        { n: "Mountain Dew", img: "images/265874_5-mountain-dew-soft-drink.webp", sizes: {"250ml": 20} },
        { n: "Maaza", img: "images/maazamango1liter_7cd4436a-4a91-482d-84d5-cc22915d22a9.webp", sizes: {"Small": 10, "Large": 40} },
        { n: "Frooti", img: "images/5116DH-FpfL.jpg", sizes: {"Small": 10, "Large": 40} },
        { n: "Slice", img: "images/265879_17-slice-thickest-mango-drink.webp", sizes: {"Small": 10, "Large": 40} },
        { n: "Appy Juice", img: "images/Appy-Fizz-Mini-Bottle.webp", sizes: {"Small": 10, "Large": 40} },
        { n: "Energy Drink", img: "images/40113908_5-sting-energy-drink.webp", sizes: {"Can": 110} },
        { n: "Glucon-D", img: "images/717np1MGFQL.jpg", sizes: {"Pack": 35} },
        { n: "Mineral Water 1L", img: "images/Bisleri-1000x1000-1Ltr-01.png", sizes: {"1L": 20} }
    ],

    "🍽 घर उपयोग सामान ": [
        { n: "Plastic Glass", img: "images/350ml-disposable-plastic-glass.jpg", sizes: {"Set": 30} },
        { n: "Paper Plate", img: "images/71020e5hgZL._AC_UF894,1000_QL80_.jpg", sizes: {"Set": 40} },
        { n: "Plastic Spoon", img: "images/Plastic Spoon.jpg", sizes: {"Set": 20} },
        { n: "Tissue Paper", img: "images/Tissue Paper.jpg", sizes: {"Pack": 40} },
        { n: "Matchbox (Machis)", img: "images/indian-matchbox-b23548-1024.jpg", sizes: {"₹1": 1, "Bundle": 10} },
        { n: "Candle (Mombatti)", img: "images/Candle.jpg", sizes: {"Small": 5, "Big": 20} },
        { n: "Mosquito Coil", img: "images/Mosquito.jpg", sizes: {"Pack": 35} },
        { n: "Mosquito Liquid", img: "images/Mosquito (2).jpg", sizes: {"Machine": 85} },
        { n: "Agarbatti", img: "images/81V7NZ+HfXL.jpg", sizes: {"Small": 10, "Big": 50} },
        { n: "Phenyl (Floor)", img: "images/1.avif", sizes: {"1L": 60} },
        { n: "Harpic", img: "images/Harpic.jpg", sizes: {"500ml": 95} },
        { n: "Toilet Brush", img: "images/toilet brush.jpg", sizes: {"Piece": 50} },
        { n: "Steel Scrubber", img: "images/scrub.jpg", sizes: {"₹10": 10} },
        { n: "Dishwashing Bar", img: "images/61szrCRWOEL._AC_UF1000,1000_QL80_.jpg", sizes: {"₹10": 10} },
        { n: "Dishwashing Liquid", img: "images/51rhw--KcDL._AC_UF1000,1000_QL80_.jpg", sizes: {"Bottle": 55} },
        { n: "Handwash Liquid", img: "images/61Q2gwt85PL._AC_UF1000,1000_QL80_.jpg", sizes: {"Refill": 45} }
    ],

    "🧴 साबुन & शैम्पू": [
        { n: "Lifebuoy Soap", img: "images/82311091.avif", sizes: {"₹10": 10, "Family": 40} },
        { n: "Lux Soap", img: "images/s-l1200 (1).jpg", sizes: {"₹30": 30} },
        { n: "Santoor Soap", img: "images/SKU-0310_0-1726403613340.webp", sizes: {"₹10": 10, "₹35": 35} },
        { n: "Dettol Soap", img: "images/61-0PgPQ4sL.jpg", sizes: {"₹10": 10, "₹50": 50} },
        { n: "Pears Soap", img: "images/61sbp+Zo8YL._AC_UF1000,1000_QL80_.jpg", sizes: {"Medium": 55} },
        { n: "Cinthol Soap", img: "images/61PcViBNVGL.jpg", sizes: {"₹40": 40} },
        { n: "Dove Soap", img: "images/WTCPH-10042993-back-zoom.avif", sizes: {"Medium": 60} },
        { n: "Medimix Soap", img: "images/81IQRxsP5ML.jpg", sizes: {"₹35": 35} },
        { n: "Clinic Plus Shampoo", img: "images/Clinic .jpg", sizes: {"Sachet": 1, "Bottle": 75} },
        { n: "Sunsilk Shampoo", img: "images/Sunsilk.jpg", sizes: {"Sachet": 2, "Bottle": 140} },
        { n: "Head & Shoulders", img: "images/41iNTB5aaEL.jpg", sizes: {"Bottle": 180} },
        { n: "Coconut Oil", img: "images/Coconut Oil.jpg", sizes: {"100ml": 45, "500ml": 180} },
        { n: "Amla Oil", img: "images/710bR5Z1-YL.jpg", sizes: {"100ml": 55} },
        { n: "Hair Gel", img: "images/51zidfEuJOL._AC_UF1000,1000_QL80_.jpg", sizes: {"Small": 50} },
        { n: "Hair Color", img: "images/81hai2LzxoL._AC_UF1000,1000_QL80_.jpg", sizes: {"Pack": 35} },
        { n: "Shaving Razor", img: "images/71zMLM5wemL._AC_UF1000,1000_QL80_.jpg", sizes: {"Single": 20} },
        { n: "Toothpaste", img: "images/71Au62YLGmL._AC_UF1000,1000_QL80_.jpg", sizes: {"₹10": 10, "Large": 120} },
        { n: "baby powder.jpg", img: "images/baby oil.jpg", sizes: {"Small": 50, "Big": 180} },
        { n: "Body Lotion", img: "images/body.gpg", sizes: {"100ml": 120} },
        { n: "Face Wash", img: "images/71K50SlPm5L._AC_UF1000,1000_QL80_.jpg", sizes: {"Small": 75} },
        { n: "Cold Cream", img: "images/51PSwcp4QPL.jpg", sizes: {"Small": 15, "Medium": 70} },
        { n: "Fairness Cream", img: "images/Fairness.jpg", sizes: {"Pack": 60} },
        { n: "Lip Balm", img: "images/51Ljfli9oeL.jpg", sizes: {"Piece": 40} },
        { n: "Comb (Kanghi)", img: "images/71Otjnr-FqL._AC_UF1000,1000_QL80_.jpg", sizes: {"Standard": 15} },
        { n: "Safety Pins", img: "images/71ZGgCzSTnL._AC_UF894,1000_QL80_.jpg", sizes: {"Pack": 10} },
        { n: "Bandage (Patti)", img: "images/Bandage.jpg", sizes: {"Piece": 5} },
        { n: "Antiseptic Liquid", img: "images/253535_8-dettol-antiseptic-disinfectant-liquid.webp", sizes: {"Small": 40} },
        { n: "Sanitary Pads", img: "images/264105_22-stayfree-secure-cottony-soft-sanitary-pads-with-wings.webp", sizes: {"Pack": 35, "Large": 90} },
        { n: "summer powder", img: "images/summer.jpg", sizes: {"Small": 80} },
        { n: "Baby Soap", img: "images/ph-11134207-7r98x-llonvms044un07.jpg", sizes: {"Standard": 55} },
        { n: "Baby Shampoo", img: "images/Baby Shampoo.jpg", sizes: {"Small": 95} },
        { n: "Baby Oil", img: "images/baby oil2.jpg", sizes: {"100ml": 110} },
        { n: "Diapers Medium", img: "images/39594-500x500.jpg", sizes: {"M": 12} },
        { n: "Diapers small", img: "images/small.jpg", sizes: {"S": 12} },
        { n: "Diapers large", img: "images/large.jpg", sizes: {"L": 12} },
    ],

    "🧺 cleaning": [
        { n: "Surf Excel Powder", img: "images/61s5orKgmwL._AC_UF1000,1000_QL80_.jpg", sizes: {"₹10": 10, "1kg": 140} },
        { n: "Tide Powder", img: "images/Tide.jpg", sizes: {"₹10": 10, "1kg": 140} },
        { n: "Ariel Powder", img: "images/Ariel.jpg", sizes: {"₹10": 10, "1kg": 140} },
        { n: "Liquid Detergent", img: "images/518YYVPFCnL.jpg", sizes: {"Bottle": 160} },
        { n: "Floor Cleaner", img: "images/61nJ8gZBSXL._AC_UF1000,1000_QL80_.jpg", sizes: {"1L": 80} },
        { n: "Bathroom Cleaner", img: "images/71D8dX4oiNL._AC_UF1000,1000_QL80_.jpg", sizes: {"Bottle": 85} },
        { n: "Jhaadu (Broom)", img: "images/-original-imahay3ykf8an2bs.webp", sizes: {"Phool": 80, "Seekh": 50} },
        { n: "Pocha (Mop)", img: "images/71GeEDlmPqL.jpg", sizes: {"Standard": 60} },
        { n: "Mop Stick", img: "images/Mop.webp", sizes: {"Piece": 120} },
        { n: "Mug", img: "images/Mug.jpg", sizes: {"Piece": 30} },
        { n: "Cloth Clips", img: "images/71H-yj74z-L._AC_UF894,1000_QL80_.jpg", sizes: {"Set": 40} },
        { n: "Lunch Box", img: "images/teepen.webp", sizes: {"Standard": 150} },
        { n: "Water Bottle", img: "images/water.jpg", sizes: {"Standard": 40} },
        { n: "Gas Lighter", img: "images/gas.jpg", sizes: {"Piece": 60} },
        { n: "Plastic Basket", img: "images/614eOJdPE2L._AC_UF1000,1000_QL80_.jpg", sizes: {"Standard": 70} },
        { n: "Rat Killer", img: "images/51mosUAucqL._AC_UF1000,1000_QL80_.jpg", sizes: {"Pack": 20} }
    ]
};

function renderStore() {
    const store = document.getElementById('store-container');
    const nav = document.getElementById('cat-nav');
    store.innerHTML = '';
    nav.innerHTML = '';
    
    Object.entries(inventory).forEach(([cat, items], idx) => {
        const catId = `section-${idx}`;
        nav.innerHTML += `<button onclick="scrollToId('${catId}', this)" class="cat-pill">${cat}</button>`;

        let html = `<div id="${catId}" class="pt-4 mb-8">
            <h2 class="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
                <span class="h-5 w-1 bg-emerald-500 rounded-full"></span>${cat}
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">`;

        items.forEach((p, pIdx) => {
            const pid = `p-${idx}-${pIdx}`;
            html += `
                <div class="product-card flex flex-col">
                    <div class="img-container">
                        <img src="${p.img}" alt="${p.n}" onerror="this.src='https://placehold.co/200x200?text=Groceries'" loading="lazy">
                    </div>
                    <h3 class="font-bold text-slate-700 text-[13px] mt-3 h-10 overflow-hidden line-clamp-2 leading-tight">${p.n}</h3>
                    <div class="mt-auto">
                        <select id="size-${pid}" onchange="updateButtonState('${pid}', '${p.n}')" class="w-full mt-2 bg-slate-50 border-none text-[11px] font-bold rounded-xl p-2 outline-none">
                            ${Object.entries(p.sizes).map(([s, pr]) => `<option value="${pr}">${s} - ₹${pr}</option>`).join('')}
                        </select>
                        <div id="btn-container-${pid}" class="mt-3">
                            <button onclick="updateQty('${p.n}', 'size-${pid}', 1)" class="add-btn w-full py-3 text-[11px] uppercase tracking-wider">
                                Add +
                            </button>
                        </div>
                    </div>
                </div>`;
        });
        html += `</div></div>`;
        store.innerHTML += html;
    });
    if(nav.firstChild) nav.firstChild.classList.add('active');
}

// Ye function buttons ko badalta hai (Add vs +/-)
function updateButtonState(pid, name) {
    const sel = document.getElementById(`size-${pid}`);
    const size = sel.options[sel.selectedIndex].text.split(' - ')[0];
    const key = `${name} (${size})`;
    const container = document.getElementById(`btn-container-${pid}`);

    if (cart[key] && cart[key].qty > 0) {
        container.innerHTML = `
            <div class="flex items-center justify-between bg-slate-100 rounded-xl overflow-hidden border border-emerald-100">
                <button onclick="updateQty('${name}', 'size-${pid}', -1)" class="px-4 py-3 text-emerald-600 font-black hover:bg-emerald-50">-</button>
                <span class="font-bold text-slate-700 text-sm">${cart[key].qty}</span>
                <button onclick="updateQty('${name}', 'size-${pid}', 1)" class="px-4 py-3 text-emerald-600 font-black hover:bg-emerald-50">+</button>
            </div>`;
    } else {
        container.innerHTML = `
            <button onclick="updateQty('${name}', 'size-${pid}', 1)" class="add-btn w-full py-3 text-[11px] uppercase tracking-wider">
                Add +
            </button>`;
    }
}

function updateQty(name, selectId, change) {
    const sel = document.getElementById(selectId);
    const price = parseInt(sel.value);
    const size = sel.options[sel.selectedIndex].text.split(' - ')[0];
    const key = `${name} (${size})`;
    const pid = selectId.replace('size-', '');

    if (!cart[key]) {
        if (change > 0) cart[key] = { price, qty: 0 };
        else return;
    }

    cart[key].qty += change;

    // Agar quantity 0 ho jaye toh item delete kar do (Deselect logic)
    if (cart[key].qty <= 0) {
        delete cart[key];
    }

    updateButtonState(pid, name);
    updateCartUI();
}

function updateCartUI() {
    let total = 0, count = 0;
    for (let k in cart) {
        total += cart[k].price * cart[k].qty;
        count += cart[k].qty;
    }
    const panel = document.getElementById('cart-panel');
    document.getElementById('cart-total').innerText = total;
    document.getElementById('cart-count').innerText = `${count} Items`;
    panel.style.transform = count > 0 ? "translateY(0)" : "translateY(100%)";
}

function searchItems() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('product-card');
    for (let card of cards) {
        let text = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = text.includes(input) ? "flex" : "none";
    }
}

function checkout() {
    let msg = "*ORDER: SHIVANG STORE* 🛒\n--------------------------\n";
    for (let k in cart) {
        msg += `✅ *${k}*\n    Qty: ${cart[k].qty} | ₹${cart[k].price * cart[k].qty}\n\n`;
    }
    msg += `--------------------------\n*TOTAL: ₹${document.getElementById('cart-total').innerText}*\n--------------------------`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
}

function scrollToId(id, btn) {
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const el = document.getElementById(id);
    window.scrollTo({ top: el.offsetTop - 160, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', renderStore);











