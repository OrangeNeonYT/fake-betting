const categories = [
  {id:"all",label:"All Events",icon:"◈"},
  {id:"soccer",label:"Soccer",icon:"⚽"},
  {id:"basketball",label:"Basketball",icon:"🏀"},
  {id:"esports",label:"Esports",icon:"🎮"},
  {id:"pop",label:"Pop Culture",icon:"🎬"}
];

const events = [
  {id:"soc-001",category:"soccer",league:"International Friendly",home:"Bay City FC",away:"Metro United",start:"Sep 29 · 7:00 PM",live:false,outcomes:[["Bay City FC",1.72],["Metro United",2.18]]},
  {id:"soc-002",category:"soccer",league:"Premier League Sim",home:"North London",away:"Red Manchester",start:"Live",live:true,score:"1 — 1",outcomes:[["North London",2.40],["Red Manchester",2.05]]},
  {id:"bb-001",category:"basketball",league:"Pro Hoops",home:"Los Angeles Comets",away:"Seattle Stormers",start:"Sep 29 · 8:30 PM",live:false,outcomes:[["Los Angeles Comets",1.56],["Seattle Stormers",2.55]]},
  {id:"bb-002",category:"basketball",league:"Summer Series",home:"Phoenix Fire",away:"Austin Wranglers",start:"Sep 30 · 6:00 PM",live:false,outcomes:[["Phoenix Fire",1.88],["Austin Wranglers",1.96]]},
  {id:"es-001",category:"esports",league:"Valorant Champions Sim",home:"Pixel Knights",away:"Neon Owls",start:"Live",live:true,score:"10 — 8",outcomes:[["Pixel Knights",1.44],["Neon Owls",2.82]]},
  {id:"pop-001",category:"pop",league:"Awards Night — Mock Market",home:"Action Studio",away:"Drama Studio",start:"Oct 1 · 7:00 PM",live:false,outcomes:[["Action Studio",2.12],["Drama Studio",1.68]]}
];

let selectedCategory = "all";
let tokens = 1000;
let bets = [];
let selectedBet = null;

const categoryBar = document.getElementById("categoryBar");
const eventGrid = document.getElementById("eventGrid");
const tokenBalance = document.getElementById("tokenBalance");
const walletBalance = document.getElementById("walletBalance");
const openBets = document.getElementById("openBets");
const totalStaked = document.getElementById("totalStaked");
const levelValue = document.getElementById("levelValue");
const betHistory = document.getElementById("betHistory");
const backdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalMatch = document.getElementById("modalMatch");
const modalOdds = document.getElementById("modalOdds");
const modalBalance = document.getElementById("modalBalance");
const stakeInput = document.getElementById("stakeInput");
const potentialReturn = document.getElementById("potentialReturn");
const confirmBet = document.getElementById("confirmBet");
const modalError = document.getElementById("modalError");

function money(value){ return Math.round(value).toLocaleString(); }
function renderCategories(){
  categoryBar.innerHTML = categories.map(c =>
    '<button class="category-btn '+(c.id===selectedCategory?"active":"")+'" data-category="'+c.id+'">'+c.icon+' &nbsp;'+c.label+'</button>'
  ).join("");
  categoryBar.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.category;
      renderCategories();
      renderEvents();
    });
  });
}

function renderEvents(){
  const shown = selectedCategory==="all" ? events : events.filter(e=>e.category===selectedCategory);
  eventGrid.innerHTML = shown.map((event,index) => {
    const liveMarkup = event.live
      ? '<div class="live-pill"><span class="pulse"></span> LIVE</div>'
      : '<div class="start-time">'+event.start+'</div>';

    const odds = event.outcomes.map(([name,price]) =>
      '<button class="odds-button" data-event="'+event.id+'" data-name="'+escapeAttr(name)+'" data-odds="'+price+'">' +
        '<div class="odds-team">'+escapeHtml(name)+'</div>' +
        '<div class="odds-bottom"><span class="odds-price">'+Number(price).toFixed(2)+'</span><span class="odds-arrow">↗</span></div>' +
      '</button>'
    ).join("");

    return '<article class="event-card" style="animation-delay:'+(index*45)+'ms">' +
      '<div class="card-top"><div class="league">'+escapeHtml(event.league)+'</div>'+liveMarkup+'</div>' +
      '<div class="teams"><div class="team">'+escapeHtml(event.home)+'</div><div class="vs">VS</div><div class="team right">'+escapeHtml(event.away)+'</div></div>' +
      (event.live ? '<div class="score">'+escapeHtml(event.score||"")+'</div>' : '') +
      '<div class="odds-row">'+odds+'</div>' +
    '</article>';
  }).join("");

  eventGrid.querySelectorAll(".odds-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const event = events.find(e=>e.id===btn.dataset.event);
      if(!event) return;
      openBet(event, btn.dataset.name, Number(btn.dataset.odds));
    });
  });
}

function openBet(event,name,odds){
  selectedBet = {event,name,odds};
  modalTitle.textContent = name;
  modalMatch.textContent = event.home+" vs "+event.away;
  modalOdds.textContent = Number(odds).toFixed(2);
  modalBalance.textContent = money(tokens);
  stakeInput.max = String(tokens);
  stakeInput.value = String(Math.min(50, Math.max(1,tokens)));
  modalError.textContent = "";
  updateReturn();
  backdrop.classList.remove("hidden");
  setTimeout(()=>stakeInput.focus(),30);
}

function closeBet(){
  backdrop.classList.add("hidden");
  selectedBet = null;
}

function updateReturn(){
  const stake = Number(stakeInput.value||0);
  const odds = selectedBet ? selectedBet.odds : 0;
  const amount = Math.max(0,stake)*odds;
  potentialReturn.textContent = money(amount)+" Tokens";
  const valid = Number.isFinite(stake) && stake>0 && stake<=tokens;
  confirmBet.disabled = !valid;
  modalError.textContent = valid ? "" : "Enter a stake between 1 and your available balance.";
}

function placeBet(){
  if(!selectedBet) return;
  const stake = Number(stakeInput.value||0);
  if(!Number.isFinite(stake) || stake<=0 || stake>tokens){
    updateReturn();
    return;
  }

  tokens -= stake;
  bets.unshift({
    id:Date.now(),
    selection:selectedBet.name,
    odds:selectedBet.odds,
    stake:stake,
    return:stake*selectedBet.odds,
    status:"open"
  });

  closeBet();
  renderWallet();
  renderHistory();
}

function renderWallet(){
  tokenBalance.textContent = money(tokens);
  walletBalance.textContent = money(tokens);
  const level = Math.max(1,Math.floor((2000-tokens)/500));
  levelValue.textContent = "LVL "+level;
  openBets.textContent = String(bets.filter(b=>b.status==="open").length);
  totalStaked.textContent = money(bets.reduce((sum,b)=>sum+b.stake,0));
  modalBalance.textContent = money(tokens);
}

function renderHistory(){
  if(!bets.length){
    betHistory.innerHTML = '<div class="empty-state">No bets yet. Pick an event to start your virtual session.</div>';
    return;
  }

  betHistory.innerHTML = bets.slice(0,5).map(b =>
    '<div class="bet-item">'+
      '<div class="bet-line"><div class="bet-title">'+escapeHtml(b.selection)+'</div><div class="status-pill">'+b.status+'</div></div>'+
      '<div class="bet-meta">'+money(b.stake)+' Tokens × '+Number(b.odds).toFixed(2)+'</div>'+
      '<div class="bet-return"><span>Potential return</span><strong>'+money(b.return)+' Tokens</strong></div>'+
    '</div>'
  ).join("");
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function escapeAttr(value){ return String(value).replace(/"/g,'&quot;'); }

stakeInput.addEventListener("input",updateReturn);
closeModal.addEventListener("click",closeBet);
confirmBet.addEventListener("click",placeBet);
backdrop.addEventListener("click",e=>{ if(e.target===backdrop) closeBet(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeBet(); });

renderCategories();
renderEvents();
renderWallet();
renderHistory();
