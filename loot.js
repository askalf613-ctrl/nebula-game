// ===============================
// LOOT SİSTEMİ
// ===============================

// drop ihtimali (%)
let dropChance = 20;

// rarity roll
function rollRarity() {
    let r = Math.random() * 100;

    if (r < 60) return "common";
    if (r < 85) return "rare";
    if (r < 97) return "epic";
    return "legend";
}

// rarity güç
function rarityPower(r) {
    if (r === "common") return rand(1, 3);
    if (r === "rare") return rand(4, 7);
    if (r === "epic") return rand(8, 15);
    if (r === "legend") return rand(16, 30);
}

// random helper
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// isim üret
function randomName() {
    const n = ["Çekirdek", "Kristal", "Çip", "Modül", "Reaktör"];
    return n[Math.floor(Math.random() * n.length)];
}

// drop denemesi
function tryLoot() {
    if (Math.random() * 100 > dropChance) return;

    const rarity = rollRarity();

    const item = {
        name: randomName(),
        rarity: rarity,
        power: rarityPower(rarity)
    };

    // inventory.js varsa ekle
    if (typeof addItem === "function") {
        addItem(item);
    }

    showDrop(item);
}

// drop yazısı
function showDrop(item) {
    const d = document.createElement("div");
    d.style.position = "fixed";
    d.style.left = "50%";
    d.style.top = "35%";
    d.style.transform = "translate(-50%,-50%)";
    d.style.padding = "12px 20px";
    d.style.background = "#000";
    d.style.borderRadius = "15px";
    d.style.border = "2px solid white";
    d.style.zIndex = 9999;
    d.innerText = `${item.rarity.toUpperCase()} ${item.name} (+${item.power})`;

    document.body.appendChild(d);
    setTimeout(() => d.remove(), 1200);
}