// ============ DATA ============
let money = 0;
let income = 0;
let clickPower = 1;

let inventory = [];
let equipped = [];

let lastDaily = 0;

const rarities = [
  {name:"Common", multi:1, chance:60},
  {name:"Rare", multi:2, chance:25},
  {name:"Epic", multi:4, chance:10},
  {name:"Legend", multi:8, chance:5},
];

const shopItems = [
  {name:"Drone", cost:50, inc:1},
  {name:"Mega Drone", cost:200, inc:5},
];

// ============ SAVE ============
function save(){
  localStorage.setItem("save", JSON.stringify({
    money, income, clickPower, inventory, equipped, lastDaily
  }));
}

function load(){
  let s = JSON.parse(localStorage.getItem("save"));
  if(!s) return;
  money = s.money || 0;
  income = s.income || 0;
  clickPower = s.clickPower || 1;
  inventory = s.inventory || [];
  equipped = s.equipped || [];
  lastDaily = s.lastDaily || 0;
}

load();

// ============ UI ============
function updateUI(){
  document.getElementById("money").innerText = Math.floor(money)+" ₺";
  document.getElementById("inc").innerText = income;
}

setInterval(()=>{
  money += income;
  updateUI();
  save();
},1000);

// ============ CLICK ============
function clickCore(){
  let crit = Math.random() < 0.1 ? 2 : 1;
  money += clickPower * crit;
  updateUI();
}

// ============ PANELS ============
function openP(n){
  document.getElementById("p-"+n).style.display="block";
  if(n==="shop") drawShop();
  if(n==="inv") drawInv();
}
function closeP(){
  document.querySelectorAll(".pnl").forEach(p=>p.style.display="none");
}

// ============ SHOP ============
function drawShop(){
  let d=document.getElementById("shop");
  d.innerHTML="";
  shopItems.forEach((it,i)=>{
    let el=document.createElement("div");
    el.className="card";
    el.innerHTML=`
    <b>${it.name}</b><br>
    +${it.inc}/sn<br>
    ${it.cost} ₺<br>
    <button onclick="buy(${i})">Al</button>`;
    d.appendChild(el);
  });
}

function buy(i){
  let it=shopItems[i];
  if(money<it.cost) return;
  money-=it.cost;
  income+=it.inc;
  updateUI();
}

// ============ LOOT ============
function rollRarity(){
  let r=Math.random()*100;
  let sum=0;
  for(let ra of rarities){
    sum+=ra.chance;
    if(r<=sum) return ra;
  }
  return rarities[0];
}

function spawnLoot(){
  if(Math.random()<0.15){
    let b=document.getElementById("loot");
    b.style.display="block";
    b.onclick=()=>{
      b.style.display="none";
      openChest();
    }
  }
}
setInterval(spawnLoot,5000);

function openChest(){
  let ra=rollRarity();
  let power=ra.multi;
  let item={
    id:Date.now()+Math.random(), // dupe engel
    name:ra.name+" Core",
    power,
    rarity:ra.name
  };
  inventory.push(item);
  alert("Buldun: "+item.name+" +" +power);
  save();
}

// ============ INVENTORY ============
function drawInv(){
  let d=document.getElementById("inv");
  let e=document.getElementById("equip");
  d.innerHTML="";
  e.innerHTML="<h3>Equip</h3>";

  equipped.forEach(it=>{
    let el=document.createElement("div");
    el.className="card";
    el.innerText=it.name+" +"+it.power;
    e.appendChild(el);
  });

  inventory.forEach((it,i)=>{
    let el=document.createElement("div");
    el.className="card";
    el.innerHTML=`
    ${it.name} +${it.power}<br>
    <button onclick="equipItem(${i})">Equip</button>`;
    d.appendChild(el);
  });
}

function equipItem(i){
  let it=inventory[i];
  if(equipped.find(x=>x.id===it.id)) return;
  equipped.push(it);
  clickPower+=it.power;
  save();
  drawInv();
}

// ============ DAILY ============
function daily(){
  let now=Date.now();
  if(now-lastDaily<86400000){
    alert("Zaten aldın");
    return;
  }
  lastDaily=now;
  money+=100;
  alert("100 ₺ aldın");
  updateUI();
  save();
}

// ============ RESET ============
function rst(){
  if(!confirm("Emin misin?")) return;
  localStorage.clear();
  location.reload();
}

// ============ MUSIC ============
window.addEventListener("click",()=>{
  let m=document.getElementById("bgm");
  if(m) m.play();
},{once:true});

updateUI();