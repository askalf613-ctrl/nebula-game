// ===============================
// ANA OYUN SİSTEMİ
// ===============================

// para
let m = parseFloat(localStorage.getItem("m")) || 0;

// base tık gücü
let baseClick = 1;

// equipten gelecek bonus (şimdilik 0)
let equipBonus = 0;

// toplam click gücü
function clickPower() {
    return baseClick + equipBonus;
}

// ===============================
// TIKLAMA
// ===============================
function tıkla() {
    m += clickPower();

    // loot denemesi varsa çalışır
    if (typeof tryLoot === "function") {
        tryLoot();
    }

    update();
    save();
}

// ===============================
// PARA YAZDIRMA
// ===============================
function update() {
    const el = document.getElementById("money");
    if (el) el.innerText = Math.floor(m).toLocaleString() + " ₺";
}

// ===============================
// SAVE
// ===============================
function save() {
    localStorage.setItem("m", m);
}

// ===============================
// DIŞARIDAN BONUS EKLEME
// equip sistemi burayı kullanacak
// ===============================
function setEquipBonus(v) {
    equipBonus = v;
}

// ===============================
// OYUN BAŞLANGIÇ
// ===============================
update();
setInterval(save, 2000);