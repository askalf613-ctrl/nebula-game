// ===============================
// ENVANTER SİSTEMİ
// ===============================

let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// item ekleme
function addItem(item) {
    inventory.push(item);
    saveInventory();
    renderInventory();
}

// kaydet
function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// nadirlik rengi
function rarityColor(r) {
    if (r === "common") return "#aaa";
    if (r === "rare") return "#4da6ff";
    if (r === "epic") return "#c77dff";
    if (r === "legend") return "#ffb703";
    return "white";
}

// envanter göster
function renderInventory() {
    const el = document.getElementById("inv-list");
    if (!el) return;

    el.innerHTML = "";

    if (inventory.length === 0) {
        el.innerHTML = "<p>Hiç item yok</p>";
        return;
    }

    inventory.forEach((it, i) => {
        const d = document.createElement("div");
        d.className = "card";
        d.innerHTML = `
            <div>
                <b style="color:${rarityColor(it.rarity)}">${it.name}</b><br>
                <small>Güç: +${it.power}</small><br>
                <small>${it.rarity}</small>
            </div>
            <button class="buy" onclick="equipItem(${i})">TAK</button>
        `;
        el.appendChild(d);
    });
}

// ilk açılışta yükle
setTimeout(renderInventory, 500);