const WHATSAPP_NUMBER = "919984824292";

/* =========================
   GLOBAL STATE
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || {};
let offerCache = {};

/* =========================
   SAVE CART
========================= */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

/* =========================
   OFFER LOGIC (PREMIUM STABLE)
========================= */
function getOffer(productName, price) {
    if (price < 70) return null;
    const baseName = productName.split("(")[0].trim();
    if (offerCache[baseName]) return offerCache[baseName];

    const offers = [12, 15, 18, 20];
    const percent = offers[Math.floor(Math.random() * offers.length)];
    const mrp = Math.round(price / (1 - percent / 100));
    const save = mrp - price;

    offerCache[baseName] = { percent, mrp, save };
    return offerCache[baseName];
}

/* =========================
   RENDER STORE
========================= */
function renderStore() {
    const store = document.getElementById("store-container");
    if (!store || typeof inventory === "undefined") return;
    store.innerHTML = "";

    Object.entries(inventory).forEach(([category, items], catIndex) => {
        const section = document.createElement("div");
        section.className = "mb-12 category-section";
        section.id = `section-${catIndex}`;

        section.innerHTML = `
            <div class="flex items-center gap-3 mb-6">
                <div class="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
                <h2 class="text-2xl font-black text-slate-800 tracking-tight">${category}</h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id="cat-${catIndex}"></div>
        `;

        store.appendChild(section);
        const grid = document.getElementById(`cat-${catIndex}`);

        items.forEach((item, index) => {
            const sizeEntries = Object.entries(item.sizes);
            const [firstSize, firstPrice] = sizeEntries[0];
            const offer = getOffer(item.n, firstPrice);
            
            const key = `${item.n} (${firstSize})`;
            const qty = cart[key]?.qty || 0;

            const card = document.createElement("div");
            card.className = "product-card group relative bg-white p-4 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-xl";
            card.innerHTML = `
                ${offer ? `<span class="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg">-${offer.percent}%</span>` : ''}
                <div class="img-container relative overflow-hidden bg-slate-50 rounded-2xl p-4 mb-4 h-40 flex items-center justify-center">
                    <img src="${item.img}" onerror="this.src='https://placehold.co/400x400?text=Shivang+Store'" 
                         class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110">
                </div>
                <h3 class="text-slate-800 font-bold text-sm md:text-base leading-tight h-10 line-clamp-2">${item.n}</h3>
                <div class="mt-2 flex items-center gap-2">
                    <span class="text-emerald-600 font-black text-lg">₹${firstPrice}</span>
                    ${offer ? `<span class="text-slate-400 line-through text-xs font-medium">₹${offer.mrp}</span>` : ''}
                </div>
                <select id="size-${catIndex}-${index}" 
                        onchange="updateCardQtyDisplay(${catIndex}, ${index}, '${item.n}')"
                        class="w-full mt-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                    ${sizeEntries.map(([s, p]) => `<option value="${p}">${s} - ₹${p}</option>`).join("")}
                </select>
                <div class="flex items-center justify-between mt-4 bg-slate-100 p-1 rounded-2xl">
                    <button onclick="changeQty(${catIndex}, ${index}, -1)" class="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-red-50 active:scale-90 transition-all">-</button>
                    <span id="qty-${catIndex}-${index}" class="font-black text-slate-800">${qty}</span>
                    <button onclick="changeQty(${catIndex}, ${index}, 1)" class="w-10 h-10 flex items-center justify-center bg-emerald-500 text-white rounded-xl shadow-md hover:bg-emerald-600 active:scale-90 transition-all">+</button>
                </div>
            `;
            grid.appendChild(card);
        });
    });
    renderCategoryNav();
    updateCartUI();
}

function updateCardQtyDisplay(catIndex, index, itemName) {
    const select = document.getElementById(`size-${catIndex}-${index}`);
    const size = select.options[select.selectedIndex].text.split(" - ")[0];
    const key = `${itemName} (${size})`;
    const qtySpan = document.getElementById(`qty-${catIndex}-${index}`);
    if (qtySpan) qtySpan.innerText = cart[key]?.qty || 0;
}

function changeQty(catIndex, index, change) {
    const category = Object.keys(inventory)[catIndex];
    const item = inventory[category][index];
    const select = document.getElementById(`size-${catIndex}-${index}`);
    const size = select.options[select.selectedIndex].text.split(" - ")[0];
    const price = parseInt(select.value);
    const key = `${item.n} (${size})`;

    if (!cart[key]) cart[key] = { price, qty: 0, img: item.img, baseName: item.n };

    cart[key].qty += change;
    if (cart[key].qty <= 0) delete cart[key];

    saveCart();
    updateCardQtyDisplay(catIndex, index, item.n);
}

function updateCartUI() {
    const badge = document.getElementById("cart-badge");
    const drawerItems = document.getElementById("mini-cart-items");
    const totalEl = document.getElementById("mini-total");
    let total = 0;
    let count = 0;

    if (drawerItems) drawerItems.innerHTML = "";

    Object.entries(cart).forEach(([name, data]) => {
        const itemTotal = data.price * data.qty;
        total += itemTotal;
        count += data.qty;

        if (drawerItems) {
            drawerItems.innerHTML += `
                <div class="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <img src="${data.img}" class="w-10 h-10 object-contain">
                    <div class="flex-1">
                        <p class="font-bold text-xs text-slate-800">${name}</p>
                        <p class="text-[10px] font-bold text-slate-500">₹${data.price} × ${data.qty}</p>
                    </div>
                    <p class="font-black text-emerald-600 text-sm">₹${itemTotal}</p>
                </div>`;
        }
    });

    if (badge) {
        badge.innerText = count;
        badge.classList.toggle("hidden", count === 0);
    }
    if (totalEl) totalEl.innerText = total;
    renderFloatingBar(count, total);
}

function renderFloatingBar(count, total) {
    let bar = document.getElementById('float-bar');
    if (count > 0) {
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'float-bar';
            bar.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] bg-slate-900 text-white p-4 rounded-3xl shadow-2xl flex justify-between items-center z-[100] cursor-pointer active:scale-95 transition-all';
            bar.onclick = toggleCart;
            document.body.appendChild(bar);
        }
        bar.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="bg-emerald-500 p-2 rounded-xl"><i class="fa-solid fa-cart-shopping"></i></div>
                <div><p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">${count} Items</p><p class="text-lg font-black">₹${total}</p></div>
            </div>
            <div class="bg-white/10 px-4 py-2 rounded-xl font-bold text-sm">View Cart <i class="fa-solid fa-chevron-right text-[10px] ml-1"></i></div>`;
    } else if (bar) bar.remove();
}

/* =========================
   RE-FIXED CHECKOUT LOGIC
========================= */
function checkout() {
    if (Object.keys(cart).length === 0) return;

    const now = new Date();
    const date = now.toLocaleDateString("en-IN");
    const time = now.toLocaleTimeString("en-IN");
    const orderID = "SGS" + Math.floor(100000 + Math.random() * 900000);

    let subtotal = 0;
    let totalSavings = 0;

    let msg = "🧾 *SHIVANG GENERAL STORE*\n";
    msg += "━━━━━━━━━━━━━━━━━━━━━━\n";
    msg += `🆔 Order ID: ${orderID}\n`;
    msg += `📅 ${date} | ⏰ ${time}\n`;
    msg += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

    Object.entries(cart).forEach(([name, data], i) => {
        const lineTotal = data.price * data.qty;
        subtotal += lineTotal;

        const offer = getOffer(data.baseName, data.price);
        let savingsLine = "";

        if (offer) {
            const saved = offer.save * data.qty;
            totalSavings += saved;
            savingsLine = `   🎁 Saved ₹${saved}\n`;
        }

        msg += `${i + 1}. *${name}*\n`;
        msg += `   ₹${data.price} × ${data.qty} = *₹${lineTotal}*\n`;
        if (savingsLine) msg += savingsLine;
        msg += "\n";
    });

    msg += "━━━━━━━━━━━━━━━━━━━━━━\n";
    msg += `💰 Subtotal: ₹${subtotal}\n`;

    if (totalSavings > 0)
        msg += `🎉 Total Savings: ₹${totalSavings}\n`;

    msg += "🚚 Delivery: Free\n";
    msg += "━━━━━━━━━━━━━━━━━━━━━━\n";
    msg += `🟢 *TOTAL PAYABLE: ₹${subtotal}*\n`;
    msg += "━━━━━━━━━━━━━━━━━━━━━━\n\n";
    msg += "🙏 Thank you for shopping with us!";

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
}

function toggleCart() {
    const miniCart = document.getElementById("mini-cart");
    const floatBar = document.getElementById("float-bar");

    miniCart?.classList.toggle("translate-x-full");

    // Agar cart open hai → floating bar HIDE
    if (!miniCart.classList.contains("translate-x-full")) {
        if (floatBar) {
            floatBar.style.display = "none";
        }
    } 
    // Agar cart close hai → floating bar SHOW (agar items hain)
    else {
        const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
        const total = Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);
        renderFloatingBar(count, total);
    }
}


function clearCart() { cart = {}; saveCart(); renderStore(); }

function renderCategoryNav() {
    const nav = document.getElementById("cat-nav");
    if (!nav) return;
    nav.innerHTML = "";
    Object.keys(inventory).forEach((cat, i) => {
        const btn = document.createElement("button");
        btn.className = "cat-pill px-4 py-2 bg-white rounded-xl text-xs font-bold shadow-sm whitespace-nowrap border border-slate-100 transition-all hover:bg-emerald-50";
        btn.innerText = cat.split("(")[0];
        btn.onclick = () => {
            const target = document.getElementById(`section-${i}`);
            if(target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        nav.appendChild(btn);
    });
}

document.addEventListener("DOMContentLoaded", renderStore);

// Search Feature
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        const match = card.querySelector('h3').innerText.toLowerCase().includes(term);
        card.style.display = match ? 'block' : 'none';
    });
});