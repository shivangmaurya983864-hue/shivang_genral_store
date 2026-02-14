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
}

/* =========================
   CATEGORY NAVIGATION TOP
========================= */
function renderCategoryNav() {

    const nav = document.getElementById("cat-nav");
    if (!nav || typeof inventory === "undefined") return;

    nav.innerHTML = "";

    Object.keys(inventory).forEach((category, index) => {

        const btn = document.createElement("button");
        btn.className = "cat-pill";
        btn.innerText = category.split("(")[0];

        btn.onclick = () => {
            document.getElementById(`section-${index}`)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        nav.appendChild(btn);
    });
}

/* =========================
   OFFER LOGIC (STABLE PER PRODUCT)
========================= */
function getOffer(productName, price) {

    if (price < 70) return null;

    // product base name extract (size remove)
    const baseName = productName.split("(")[0].trim();

    if (offerCache[baseName]) return offerCache[baseName];

    const offers = [13, 17, 20];
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
        section.className = "mb-16";
        section.id = `section-${catIndex}`;

        section.innerHTML = `
            <h2 class="text-xl font-extrabold mb-6 border-l-4 border-emerald-500 pl-3">
                ${category}
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6" id="cat-${catIndex}"></div>
        `;

        store.appendChild(section);
        const grid = document.getElementById(`cat-${catIndex}`);

        items.forEach((item, index) => {

            const sizeEntries = Object.entries(item.sizes);
            const firstSize = sizeEntries[0][0];
            const firstPrice = sizeEntries[0][1];

            const offer = getOffer(item.n, firstPrice);

            const key = `${item.n} (${firstSize})`;
            const qty = cart[key]?.qty || 0;

            const card = document.createElement("div");
            card.className = "product-card relative";

            let priceHTML = `
                <span class="text-emerald-600 font-bold text-sm">₹${firstPrice}</span>
            `;

            let badgeHTML = "";

            if (offer) {
                priceHTML = `
                    <span class="line-through text-xs text-gray-400">₹${offer.mrp}</span>
                    <span class="text-emerald-600 font-bold text-sm ml-1">₹${firstPrice}</span>
                    <p class="text-[10px] text-green-600 font-semibold">
                        Save ₹${offer.save}
                    </p>
                `;

                badgeHTML = `
                    <span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">
                        ${offer.percent}% OFF
                    </span>
                `;
            }

            card.innerHTML = `
                ${badgeHTML}

                <div class="img-container">
                    <img src="${item.img}"
                    onerror="this.src='https://placehold.co/200x200?text=No+Image'"
                    loading="lazy">
                </div>

                <h3>${item.n}</h3>

                <div class="mt-1">
                    ${priceHTML}
                </div>

                <select id="size-${catIndex}-${index}"
                class="w-full mt-3 bg-gray-100 rounded-lg p-2 text-xs">
                ${sizeEntries.map(([size, price]) =>
                    `<option value="${price}">${size} - ₹${price}</option>`
                ).join("")}
                </select>

                <div class="flex items-center justify-between mt-4">
                    <button class="bg-gray-200 w-8 h-8 rounded-full text-lg"
                    onclick="changeQty(${catIndex},${index},-1)">-</button>

                    <span id="qty-${catIndex}-${index}"
                    class="font-bold text-sm">${qty}</span>

                    <button class="bg-emerald-500 text-white w-8 h-8 rounded-full text-lg"
                    onclick="changeQty(${catIndex},${index},1)">+</button>
                </div>
            `;

            grid.appendChild(card);
        });
    });

    updateCartUI();
    renderCategoryNav();
}

/* =========================
   CHANGE QTY
========================= */
function changeQty(catIndex, index, change) {

    const category = Object.keys(inventory)[catIndex];
    const item = inventory[category][index];

    const select = document.getElementById(`size-${catIndex}-${index}`);
    if (!select) return;

    const sizeText = select.options[select.selectedIndex].text;
    const size = sizeText.split(" - ")[0];
    const price = parseInt(select.value);

    const key = `${item.n} (${size})`;

    if (!cart[key]) cart[key] = { price, qty: 0 };

    if (change > 0) cart[key].qty++;
    if (change < 0 && cart[key].qty > 0) cart[key].qty--;

    if (cart[key].qty === 0) delete cart[key];

    saveCart();

    const qtySpan = document.getElementById(`qty-${catIndex}-${index}`);
    if (qtySpan) qtySpan.innerText = cart[key]?.qty || 0;

    updateCartUI();
}

/* =========================
   CART UI
========================= */
function updateCartUI() {

    const badge = document.getElementById("cart-badge");
    const drawerItems = document.getElementById("mini-cart-items");
    const totalEl = document.getElementById("mini-total");

    let total = 0;
    let count = 0;

    if (drawerItems) drawerItems.innerHTML = "";

    Object.entries(cart).forEach(([name, data]) => {

        total += data.price * data.qty;
        count += data.qty;

        if (drawerItems) {
            drawerItems.innerHTML += `
                <div class="flex justify-between border p-2 rounded text-sm">
                    <div>
                        <p class="font-semibold">${name}</p>
                        <p>Qty: ${data.qty}</p>
                    </div>
                    <p>₹${data.price * data.qty}</p>
                </div>
            `;
        }
    });

    if (badge) {
        badge.innerText = count;
        badge.classList.toggle("hidden", count === 0);
    }

    if (totalEl) totalEl.innerText = total;
}

/* =========================
   DRAWER
========================= */
function toggleCart() {
    document.getElementById("mini-cart")
        ?.classList.toggle("translate-x-full");
}

function clearCart() {
    cart = {};
    saveCart();
    updateCartUI();
    renderStore();
}

/* =========================
   PREMIUM WHATSAPP CHECKOUT
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

        const offer = getOffer(name, data.price);
        let savingsLine = "";

        if (offer) {
            const saved = offer.save * data.qty;
            totalSavings += saved;
            savingsLine = `   🎁 Saved ₹${saved}\n`;
        }

        msg += `${i + 1}. ${name}\n`;
        msg += `   ₹${data.price} × ${data.qty} = ₹${lineTotal}\n`;
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

    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    );
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    renderStore();
});
