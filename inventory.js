let inventory = [];
let equippedItem = null;

function addItem(item) {
    inventory.push(item);
    renderInventory();
}

function renderInventory() {
    const list = document.getElementById("inventoryList");
    if (!list) return;

    list.innerHTML = "";

    inventory.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "invItem";

        const title = document.createElement("div");
        title.innerHTML = `<b>${item.name}</b><br>Güç: +${item.power}<br>${item.rarity}`;

        const btn = document.createElement("button");
        btn.innerText = "TAK";

        // EN ÖNEMLİ KISIM
        btn.onclick = () => equipItem(index);

        div.appendChild(title);
        div.appendChild(btn);

        list.appendChild(div);
    });
}

function equipItem(index) {
    equippedItem = inventory[index];

    const eq = document.getElementById("equipped");
    if (eq) {
        eq.innerText = `Takılı: ${equippedItem.name} +${equippedItem.power}`;
    }

    console.log("Takıldı:", equippedItem);
}