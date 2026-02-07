// ENVANTER
let inventory = [];

// TAKILI ITEM
let equippedItem = null;

// ITEM EKLEME (loot burayı kullanacak)
function addItem(item) {
    inventory.push(item);
    renderInventory();
}

// ENVANTERİ ÇİZ
function renderInventory() {
    const list = document.getElementById("inventoryList");
    if (!list) return;

    list.innerHTML = "";

    inventory.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "invItem";

        div.innerHTML = `
            <b>${item.name}</b><br>
            Güç: +${item.power}<br>
            ${item.rarity}<br>
            <button onclick="equipItem(${i})">TAK</button>
        `;

        list.appendChild(div);
    });
}

// ITEM TAK
function equipItem(index) {
    equippedItem = inventory[index];

    const eq = document.getElementById("equipped");
    if (eq) {
        eq.innerText = `Takılı: ${equippedItem.name} +${equippedItem.power}`;
    }

    // ileride buraya güç hesaplama girecek
    console.log("Takıldı:", equippedItem);
}