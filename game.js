const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ITEMS={
  brush:{name:'붓',src:'assets/items/brush.png',trap:'assets/traps/brush.png',message:'그리고 싶은 사람이 생겼어'},
  easel:{name:'이젤',src:'assets/items/easel.png',trap:'assets/traps/easel.png',message:'미술실에 숨기자'},
  shovel:{name:'삽',src:'assets/items/shovel.png',trap:'assets/traps/shovel.png',message:'이걸 쓸 일은 없을 거야'},
  cigarette:{name:'담뱃갑',src:'assets/items/cigarette.png',trap:'assets/traps/cigarette.png',message:'담배 왜 바꿨어?'},
  paper:{name:'구겨진 종이',src:'assets/items/paper.png',trap:'assets/traps/paper.png',message:'물에 안 젖었으면 했어'},
  knife:{name:'나이프',src:'assets/items/knife.png',trap:'assets/traps/knife.png',message:'너한테 쓰게 하지 마'}
};
const STAGE1_HAZARDS={
  sickle:{name:'낫',src:'assets/hazards/sickle.png',message:'금하제에게 속은 누군가의 물건'},
  machete:{name:'마체테',src:'assets/hazards/machete.png',message:'은반 위의 백조도 들 수 있다'},
  emptyBottle:{name:'빈 물병',src:'assets/hazards/empty-bottle.png',message:'물을 담는다고 달라질까?'},
  rifle:{name:'소총',src:'assets/hazards/rifle.png',message:'28 발의 총알이 장전되어 있다'},
  crossbow:{name:'석궁',src:'assets/hazards/crossbow.png',message:'백우진을 향해 겨누어질 일은 없다'},
  sledgehammer:{name:'슬레지해머',src:'assets/hazards/sledgehammer.png',message:'안 쓰면 아깝잖아 최대한 많이 죽이고 와'},
  kitchenKnife:{name:'식칼',src:'assets/hazards/kitchen-knife.png',message:'단발머리 소녀가 한때 지니고 있었다'},
  uselessBook:{name:'쓸모없는 책',src:'assets/hazards/useless-book.png',message:'그 섬에서 최후에 서 있던 소녀의 것이다'},
  map:{name:'지도',src:'assets/hazards/map.png',message:'성당을 싫어하는 소녀에게 주어졌던 것이다'},
  wrench:{name:'랜치',src:'assets/hazards/wrench.png',message:'빈 물병의 소지자를 가엾게 여긴 소녀의 것'}
};
const STAGE2_HAZARDS={
  driedSquid:{name:'말린 오징어',src:'assets/stage2/items/dried-squid.png',message:'딱딱해서 오래 씹어야 합니다',heal:10},
  vest:{name:'방탄 조끼',src:'assets/stage2/items/vest.png',message:'학교에서 사용할 일은 없어야 합니다'},
  key:{name:'열쇠',src:'assets/stage2/items/key.png',message:'어딘가를 열 수 있을까요?'},
  chocolate:{name:'초콜릿',src:'assets/stage2/items/chocolate.png',message:'달콤함은 고통을 잠시 잊게 해 줍니다',heal:5},
  cyanideChocolate:{name:'청산가리 초콜릿',src:'assets/stage2/items/cyanide-chocolate.png',message:'아몬드 향이 납니다 아주 오랜 휴식을 선사합니다'},
  vaseline:{name:'바세린',src:'assets/stage2/items/vaseline.png',message:'바르면 촉촉해집니다'},
  iodine:{name:'요오드',src:'assets/stage2/items/iodine.png',message:'마음에는 바를 수 없습니다'},
  radio:{name:'무전기',src:'assets/stage2/items/radio.png',message:'밤이 되면 같은 반 친구들과 대화할 수 있을 것 같다'},
  audioGuide:{name:'관광 안내 음성기',src:'assets/stage2/items/audio-guide.png',message:'가현도 관광 안내 음성이 재생된다'},
  phone:{name:'곧 방전되는 휴대폰',src:'assets/stage2/items/phone.png',message:'누군가에게 마지막 인사를 남길 수 있다'},
  pokemonBread:{name:'포켓몬빵',src:'assets/stage2/items/pokemon-bread.png',message:'띠부띠부씰은 누군가에게 주어야 할 것 같다',heal:15}
};
const CHARS={
  gitaeha:{name:'기태하',sprite:'assets/characters/gitaeha.png',items:['brush','easel','shovel']},
  kangmugyeol:{name:'강무결',sprite:'assets/characters/kangmugyeol.png',items:['cigarette','paper','knife']}
};
const NPCS={
  kangyunhye:{name:'강윤혜',src:'assets/npcs/kangyunhye.png'},
  juinha:{name:'주인하',src:'assets/npcs/juinha.png'},
  baeharin:{name:'배하린',src:'assets/npcs/baeharin.png'},
  gongjuya:{name:'공주야',src:'assets/npcs/gongjuya.png'},
  seoeungyeol:{name:'서은결',src:'assets/stage2/npcs/seoeungyeol.png'},
  handoyun:{name:'한도윤',src:'assets/stage2/npcs/handoyun.png'},
  geumhaje:{name:'금하제',src:'assets/stage2/npcs/geumhaje.png'},
  myeongyehui:{name:'명예희',src:'assets/stage2/npcs/myeongyehui.png'}
};
const INITIAL_HP=100;
const INITIAL_TIME=90;
const WORLD_WIDTH=5200;
const START_X=2600;
const NPC_POSITIONS=[450,1700,3500,4750];
const LEFT_SLOTS=[120,520,760,980,1210,1460,1840,2160,2440];
const RIGHT_SLOTS=[2740,2940,3140,3360,3700,3940,4180,4420,4660,4920,5120];
const STAGES={
  1:{name:'학교 교정',trapDamage:32,hazardDamage:30,warningAt:3,hazards:STAGE1_HAZARDS,npcIds:['kangyunhye','juinha','baeharin','gongjuya'],petals:38},
  2:{name:'학교 옥상',trapDamage:25,hazardDamage:30,warningAt:2,hazards:STAGE2_HAZARDS,npcIds:['seoeungyeol','handoyun','geumhaje','myeongyehui'],petals:20}
};
const state={stage:1,char:null,hp:INITIAL_HP,time:INITIAL_TIME,running:false,paused:false,collected:new Set(),playerX:START_X,targetX:START_X,cameraX:0,last:0,start:0,pauseStart:0,totalPaused:0,raf:0,petals:[],npcSeen:new Set(),npcEls:new Map(),objects:[],modalType:null,pendingFailureAfterMessage:false,hazardCount:0,warningShown:false,pendingWarningAfterMessage:false,stage3Clicks:0,stage3NpcTriggered:false,stage3PendingNpc:false,stage3AwaitingChoice:false};
const world=$('#world'),viewport=$('#viewport'),player=$('#player'),objects=$('#objects'),npcLayer=$('#npcs'),petalLayer=$('#petals');
function currentStage(){return STAGES[state.stage]}
function stopAudio(audio,reset=false){
  if(!audio)return;
  audio.pause();
  if(reset)audio.currentTime=0;
}
function playBgm(){
  const main=$('#bgmAudio'),stage3=$('#stage3BgmAudio');
  stopAudio(stage3,true);
  if(!main)return;
  main.volume=.42;
  const playPromise=main.play();
  if(playPromise&&typeof playPromise.catch==='function')playPromise.catch(()=>{});
}
function playStage3Bgm(){
  const main=$('#bgmAudio'),stage3=$('#stage3BgmAudio');
  stopAudio(main,true);
  if(!stage3)return;
  stage3.volume=.46;
  const playPromise=stage3.play();
  if(playPromise&&typeof playPromise.catch==='function')playPromise.catch(()=>{});
}
function playPickupSound(){
  const audio=$('#pickupAudio');
  if(!audio)return;
  audio.volume=.85;
  audio.currentTime=0;
  const playPromise=audio.play();
  if(playPromise&&typeof playPromise.catch==='function')playPromise.catch(()=>{});
}
function screen(id){$$('.screen').forEach(x=>x.classList.remove('active'));$('#'+id).classList.add('active')}
function closeAllOverlays(){['dialogue','result','itemMessage','stage3Message','stage3Ending','warningOverlay'].forEach(id=>$('#'+id)?.classList.remove('open'));stopWarningAudio()}
function resetRuntime(){cancelAnimationFrame(state.raf);state.running=false;state.paused=false;state.petals=[];state.npcSeen.clear();state.npcEls.clear();state.objects=[];state.modalType=null;state.pendingFailureAfterMessage=false;state.hazardCount=0;state.warningShown=false;state.pendingWarningAfterMessage=false;objects.innerHTML='';npcLayer.innerHTML='';petalLayer.innerHTML='';closeAllOverlays()}
function choose(key){state.char=key;state.stage=1;startGame(1)}
function startGame(stage=state.stage){
  playBgm();
  resetRuntime();state.stage=stage;screen('gameScreen');const c=CHARS[state.char],cfg=currentStage();
  state.hp=INITIAL_HP;state.time=INITIAL_TIME;state.collected=new Set;state.playerX=START_X;state.targetX=START_X;state.cameraX=0;state.totalPaused=0;state.pendingFailureAfterMessage=false;state.hazardCount=0;state.warningShown=false;state.pendingWarningAfterMessage=false;state.start=performance.now();state.last=state.start;state.running=true;
  $('#playerImg').src=c.sprite;$('#portrait').src=c.sprite;$('#charName').textContent=c.name;$('#stageLabel').textContent=`STAGE ${state.stage} · ${cfg.name}`;
  world.className=`world stage-${state.stage}`;$('#guide').textContent=`${cfg.name}의 왼쪽과 오른쪽을 클릭해 이동하세요.`;player.style.left=START_X+'px';renderObjectives();spawnNPCs();spawnObjects();createPetals(cfg.petals);updateHUD();updateCamera();toast(`${cfg.name}의 왼쪽과 오른쪽을 클릭해 이동하세요.`);
  state.raf=requestAnimationFrame(loop)
}
function renderObjectives(){const c=CHARS[state.char];$('#objectiveList').innerHTML=c.items.map(id=>`<span class="obj ${state.collected.has(id)?'done':''}">${ITEMS[id].name}</span>`).join('')}
function updateHUD(){$('#hpText').textContent=Math.max(0,Math.round(state.hp));$('#hpFill').style.width=Math.max(0,Math.min(100,state.hp))+'%';$('#timeText').textContent=Math.max(0,Math.ceil(state.time));$('#countText').textContent=state.collected.size}
function shuffled(a){a=[...a];for(let i=a.length-1;i;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function spawnObjects(){
  const c=CHARS[state.char],cfg=currentStage();
  const other=state.char==='gitaeha'?CHARS.kangmugyeol:CHARS.gitaeha;
  const targets=shuffled(c.items);
  const traps=shuffled([...c.items.map(id=>({kind:'trap',id})),...other.items.map(id=>({kind:'trap',id}))]);
  const hazards=shuffled(Object.keys(cfg.hazards)).map(id=>({kind:'hazard',id}));
  const leftHazardCount=Math.floor(hazards.length/2);
  const leftObjects=[{kind:'target',id:targets[0]},...traps.slice(0,3),...hazards.slice(0,leftHazardCount)];
  const rightObjects=[{kind:'target',id:targets[1]},{kind:'target',id:targets[2]},...traps.slice(3,6),...hazards.slice(leftHazardCount)];
  placeObjects(shuffled(leftObjects),shuffled(LEFT_SLOTS));
  placeObjects(shuffled(rightObjects),shuffled(RIGHT_SLOTS));
}
function placeObjects(descriptors,slots){
  descriptors.forEach((desc,i)=>addObject(desc,slots[i]));
}
function addObject(desc,x){
  const {kind,id}=desc;
  const isTrap=kind==='trap',cfg=currentStage();
  const data=kind==='hazard'?cfg.hazards[id]:ITEMS[id];
  const d=document.createElement('button');
  d.className=`collectible ${kind}`;
  d.style.left=x+'px';
  d.style.bottom=(76+Math.random()*120)+'px';
  const src=isTrap?ITEMS[id].trap:data.src;
  const label=isTrap?'남의 '+ITEMS[id].name:data.name;
  d.innerHTML=`<img src="${src}" alt="${label}"><span class="tag">${label}</span>`;
  d.onclick=e=>{
    e.stopPropagation();if(!state.running||state.paused)return;playPickupSound();d.classList.add('taken');setTimeout(()=>d.remove(),300);
    if(isTrap){damage(cfg.trapDamage,`남의 물건을 주웠습니다. 체력 -${cfg.trapDamage}`);return}
    if(kind==='hazard'){
      state.hazardCount++;
      damage(cfg.hazardDamage,'',true);
      if(state.stage===2&&data.heal){heal(data.heal);}
      const shouldWarn=state.hazardCount>=cfg.warningAt&&!state.warningShown;
      openItemMessage(data.name,data.message,state.hp<=0,shouldWarn);return;
    }
    if(state.collected.has(id))return;state.collected.add(id);renderObjectives();updateHUD();openItemMessage(data.name,data.message,false,false);
  };
  objects.appendChild(d);state.objects.push(d)
}
function spawnNPCs(){
  const ids=currentStage().npcIds||[];
  if(!ids.length)return;
  const order=shuffled(ids);
  order.forEach((id,i)=>{
    const n=NPCS[id],el=document.createElement('div');
    el.className=`npc stage-${state.stage}-npc`;el.dataset.name=n.name;el.dataset.id=id;el.style.left=NPC_POSITIONS[i]+'px';
    el.innerHTML=`<img src="${n.src}" alt="${n.name}">`;
    npcLayer.appendChild(el);state.npcEls.set(id,{el,x:NPC_POSITIONS[i]})
  })
}
function createPetals(n){
  for(let i=0;i<n;i++){
    const el=document.createElement('i');el.className='petal';petalLayer.appendChild(el);
    state.petals.push({el,x:Math.random()*WORLD_WIDTH,y:-Math.random()*700,size:7+Math.random()*10,speed:35+Math.random()*45,phase:Math.random()*6.28,rot:Math.random()*360})
  }
}
function loop(now){
  if(!state.running)return;
  const dt=Math.min(.04,(now-state.last)/1000);state.last=now;
  if(!state.paused){
    state.time=INITIAL_TIME-(now-state.start-state.totalPaused)/1000;
    const dx=state.targetX-state.playerX;
    const step=Math.sign(dx)*Math.min(Math.abs(dx),320*dt);
    state.playerX+=step;
    player.style.left=state.playerX+'px';
    player.classList.toggle('walking',Math.abs(dx)>4);
    updateCamera();updatePetals(dt,now);checkNPCs();updateHUD();
    if(state.time<=0)return end(false,'제한 시간 안에 모든 물건을 찾지 못했습니다.');
  }
  state.raf=requestAnimationFrame(loop)
}
function updateCamera(){const vw=viewport.clientWidth;state.cameraX=Math.max(0,Math.min(WORLD_WIDTH-vw,state.playerX-vw*.5));world.style.transform=`translateX(${-state.cameraX}px)`}
function updatePetals(dt,now){
  for(const p of state.petals){
    p.y+=p.speed*dt;p.x+=Math.sin(now*.001+p.phase)*18*dt;p.rot+=80*dt;
    if(p.y>viewport.clientHeight+20){p.y=-20;p.x=Math.random()*WORLD_WIDTH}
    p.el.style.left=p.x+'px';p.el.style.top=p.y+'px';p.el.style.width=p.size+'px';p.el.style.height=p.size*.58+'px';p.el.style.transform=`rotate(${p.rot}deg)`;
  }
}
function damage(amount,msg,deferFailure=false){
  state.hp=Math.max(0,state.hp-amount);player.classList.add('hit');setTimeout(()=>player.classList.remove('hit'),350);
  if(msg)toast(msg);updateHUD();if(state.hp<=0&&!deferFailure)end(false,'체력을 모두 잃었습니다.');
  return true;
}
function heal(amount){
  state.hp=Math.min(INITIAL_HP,state.hp+amount);
  player.classList.add('heal');setTimeout(()=>player.classList.remove('heal'),450);
  updateHUD();
}
function checkNPCs(){if(!state.npcEls.size)return;for(const [id,n] of state.npcEls){if(!state.npcSeen.has(id)&&Math.abs(state.playerX-n.x)<95){state.npcSeen.add(id);openDialogue(id);break}}}

function startStage3(){
  resetRuntime();
  state.stage=3;
  state.stage3Clicks=0;
  state.stage3NpcTriggered=false;
  state.stage3PendingNpc=false;
  state.stage3AwaitingChoice=false;
  $('#stage3ClickCount').textContent='0';
  $$('.stage3-hotspot').forEach(btn=>btn.classList.remove('visited'));
  const npc=$('#stage3Npc');
  npc.classList.remove('visible');npc.setAttribute('aria-hidden','true');
  screen('stage3Screen');
  playStage3Bgm();
  const scroller=$('#stage3Scroll');
  if(scroller){
    requestAnimationFrame(()=>{
      scroller.scrollLeft=Math.max(0,(scroller.scrollWidth-scroller.clientWidth)/2);
      updateStage3NavButtons();
    });
  }
  stage3Toast('미술실 곳곳을 탐색해 보세요.');
}
function moveStage3View(direction){
  const scroller=$('#stage3Scroll');
  if(!scroller)return;
  const distance=Math.max(260,Math.min(520,scroller.clientWidth*.48));
  scroller.scrollBy({left:direction*distance,behavior:'smooth'});
  setTimeout(updateStage3NavButtons,360);
}
function updateStage3NavButtons(){
  const scroller=$('#stage3Scroll'),left=$('#stage3LeftBtn'),right=$('#stage3RightBtn');
  if(!scroller||!left||!right)return;
  const maxScroll=Math.max(0,scroller.scrollWidth-scroller.clientWidth);
  left.disabled=scroller.scrollLeft<=2;
  right.disabled=scroller.scrollLeft>=maxScroll-2;
}
function stage3Toast(text,dramatic=false,duration=1800){
  const el=$('#stage3Toast');if(!el)return;
  el.textContent=text;
  el.classList.toggle('dramatic',dramatic);
  el.classList.add('show');
  clearTimeout(el._t);
  el._t=setTimeout(()=>{
    el.classList.remove('show');
    setTimeout(()=>el.classList.remove('dramatic'),220);
  },duration);
}
const STAGE3_SEARCH={
  window:{
    title:'창가',
    lines:['창가를 살펴보았다.','운동장에는 서은결이 명예희를 따라다니고 있다.']
  },
  blind:{
    title:'블라인드',
    lines:['방과 후 지도 시간에는 모든 블라인드가 내려져 있었다.','기태하가 요즈음에도 특별 지도를 받는지는 알 수 없다.']
  },
  desk:{
    title:'작업 책상',
    lines:['책상 위를 살펴보았다.','달력에는 4월의 마지막 주부터 오월의 첫째 주까지 빨간색으로 표시되어 있다.','현장 체험 학습 동의서를 잊지 말라는 메모가 적혀 있다.']
  },
  rightTable:{
    title:'오른쪽 작업대',
    lines:['초콜릿이 가득 쌓여 있다.','도복을 걸쳤던 소녀에게 줄 것들이다.','소녀의 날개는 꺾였으나 여전히 찬란하므로.']
  },
  cabinet:{
    title:'수납장',
    lines:['미술실에 상주하는 누군가의 작품들이 가득 꽂혀 있다.','유화 냄새가 짙다.']
  },
  cart:{
    title:'도구 카트',
    lines:['세척된 붓들이 종류별로 꽂혀 있다.','팔레트에 말려 둔 물감은 특정한 색들만이 사용감 가득하다.','검은색과 붉은색. 최근에 그렸던 장면들 탓이다.']
  }
};
function getStage3SearchFlow(spot){
  if(STAGE3_SEARCH[spot])return STAGE3_SEARCH[spot];
  if(spot==='stool'){
    const takeLines=state.char==='gitaeha'
      ?['이딴 것 없어도 주님이 나 사랑하신다고 믿었었는데','좀 기대고 싶어졌어']
      :['이제 착용 안 하고 다니나','버리는 거라면 내가 가져도 되잖아'];
    const leaveLines=state.char==='gitaeha'
      ?['묵주는 주인을 더는 기다리지 않는다.']
      :['묵주는 여전히 주인을 기다리고 있다.'];
    return {
      title:'의자와 이젤',
      image:'assets/stage3/rosary.png',
      lines:['의자와 이젤 사이를 살펴보았다.','미술실에 상주하는 누군가의 묵주가 떨어져 있다.','주워 볼까?'],
      choices:[
        {text:'줍는다',result:{title:'묵주',image:'assets/stage3/rosary.png',speaker:{name:CHARS[state.char].name,img:CHARS[state.char].sprite},lines:takeLines}},
        {text:'줍지 않는다',result:{title:'묵주',image:'assets/stage3/rosary.png',lines:leaveLines}}
      ]
    };
  }
  if(spot==='centerEasel'){
    if(state.char==='gitaeha'){
      return {
        title:'중앙 이젤',
        lines:['미술실 중앙에 놓인 이젤이다.','그 섬을 그리려다 포기한 흔적이 가득하다.','무엇을 그리든 끝내 까만 바다로 덮어 버렸다.','뒤쪽에 천으로 덮어 둔 이젤을 숨겨 두었다. 언젠가 이 천을 치워야 한다.']
      };
    }
    return {
      title:'중앙 이젤',
      lines:['미술실 중앙에 놓인 이젤이다.','그 섬을 그리려다 포기한 흔적이 가득하다.','무엇을 그리든 끝내 까만 바다로 덮어 버렸다.','뒤쪽에 천으로 덮어 둔 이젤을 발견했다. 천을 치워 볼까?'],
      choices:[
        {text:'치운다',result:{title:'순정',image:'assets/stage3/pure-love.png',lines:['제목: 순정','기태하의 순정이다. 그린 자신조차도 보지 못하게 미술실에 봉인해 두었다.']}},
        {text:'치우지 않는다',result:{title:'중앙 이젤',lines:['언젠가 저 천을 치워 볼 기회가 있을 것 같다.']}}
      ]
    };
  }
  if(spot==='sunflower'){
    const lookLines=state.char==='gitaeha'
      ?['담배 꽁초가 가득한 재떨이를 찾았다. 필터를 씹는 것이 습관인 듯하다.']
      :['담배 꽁초가 가득한 재떨이를 찾았다. 싸구려 멘솔 향 담배.','얄미운 입꼬리에 익숙한 담배가 물려 있을 것이었다.'];
    const leaveLines=state.char==='gitaeha'
      ?['담배 냄새가 나는 것 같다.']
      :['익숙한 담배 냄새가 난다.'];
    return {
      title:'해바라기 그림',
      lines:['해바라기 그림이 놓인 이젤을 살펴보았다.','이젤 뒤에 무언가 있는 것 같다. 자세히 볼까?'],
      choices:[
        {text:'자세히 본다',result:{title:'이젤 뒤',image:'assets/stage3/ashtray.png',lines:lookLines}},
        {text:'보지 않는다',result:{title:'해바라기 그림',lines:leaveLines}}
      ]
    };
  }
  return {title:'미술실',lines:['주변을 살펴보았다.']};
}
function setStage3MessageImage(src=''){
  const img=$('#stage3MessageImage');
  if(!img)return;
  if(src){img.src=src;img.classList.remove('hidden')}else{img.removeAttribute('src');img.classList.add('hidden')}
}
function setStage3MessageSpeaker(speaker=null){
  const box=$('#stage3MessageSpeaker'),img=$('#stage3SpeakerImg'),name=$('#stage3SpeakerName');
  if(!box||!img||!name)return;
  if(speaker&&speaker.name&&speaker.img){
    img.src=speaker.img;
    name.textContent=speaker.name;
    box.classList.remove('hidden');
  }else{
    img.removeAttribute('src');
    name.textContent='';
    box.classList.add('hidden');
  }
}
function renderStage3Message(flow){
  $('#stage3MessageTitle').textContent=flow.title||'미술실 조사';
  $('#stage3MessageText').textContent=(flow.lines||[]).join('\n');
  setStage3MessageSpeaker(flow.speaker||null);
  setStage3MessageImage(flow.image||'');
  const choiceBox=$('#stage3MessageChoices');
  const choices=flow.choices||[];
  choiceBox.innerHTML='';
  state.stage3AwaitingChoice=choices.length>0;
  $('#stage3TapNote').textContent=state.stage3AwaitingChoice?'선택하세요.':'문구를 클릭하면 계속됩니다.';
  if(choices.length){
    choices.forEach(choice=>{
      const button=document.createElement('button');
      button.type='button';button.className='btn';button.textContent=choice.text;
      button.onclick=e=>{e.stopPropagation();renderStage3ChoiceResult(choice.result)};
      choiceBox.appendChild(button);
    });
  }
}
function renderStage3ChoiceResult(result){
  state.stage3AwaitingChoice=false;
  $('#stage3MessageChoices').innerHTML='';
  $('#stage3TapNote').textContent='문구를 클릭하면 계속됩니다.';
  renderStage3Message({...result,choices:[]});
}
function openStage3Message(flow){
  renderStage3Message(flow);
  $('#stage3Message').classList.add('open');
  $('#stage3MessageBox').focus();
}
function closeStage3Message(){
  const overlay=$('#stage3Message');
  if(!overlay.classList.contains('open')||state.stage3AwaitingChoice)return;
  overlay.classList.remove('open');
  $('#stage3MessageChoices').innerHTML='';
  setStage3MessageSpeaker(null);
  setStage3MessageImage('');
  if(state.stage3PendingNpc){
    state.stage3PendingNpc=false;
    revealStage3Npc();
  }
}
function inspectStage3Spot(button){
  if(state.stage!==3||$('#stage3Message').classList.contains('open')||$('#dialogue').classList.contains('open'))return;
  button.classList.add('visited');
  state.stage3Clicks++;
  $('#stage3ClickCount').textContent=Math.min(state.stage3Clicks,3);
  if(state.stage3Clicks>=3&&!state.stage3NpcTriggered)state.stage3PendingNpc=true;
  openStage3Message(getStage3SearchFlow(button.dataset.spot));
}
function revealStage3Npc(){
  if(state.stage3NpcTriggered)return;
  state.stage3NpcTriggered=true;
  const npc=$('#stage3Npc');
  npc.classList.add('visible');npc.setAttribute('aria-hidden','false');
  stage3Toast('누군가 미술실에 들어왔다.',true,1450);
  setTimeout(openStage3KangyunhyeDialogue,1550);
}
function openStage3KangyunhyeDialogue(){
  const n=NPCS.kangyunhye;
  $('#speakerImg').src='assets/stage3/kangyunhye-transparent.png';
  $('#speakerName').textContent=n.name;
  $('#dialogue').classList.add('open');
  $('#choices').innerHTML='';
  $('#nextDialogue').classList.remove('hidden');
  if(state.char==='gitaeha'){
    beginStage3Lines([
      ['강윤혜','태하야'],
      ['기태하','아 씹 놀랐네 뭐야 너 왜 여기 있어?']
    ],()=>showStage3Choices('어떻게 할까?',[ 
      {text:'강윤혜와 대화한다',action:startStage3GitaehaTalkRoute},
      {text:'강윤혜를 피한다',action:startStage3GitaehaAvoidRoute}
    ]));
    return;
  }
  beginStage3Lines([
    ['강윤혜','무결아'],
    ['강무결','윤혜야 여기는 무슨 일이야?']
  ],()=>showStage3Choices('어떻게 할까?',[ 
    {text:'강윤혜와 대화한다',action:startStage3KangmugyeolTalkRoute},
    {text:'강윤혜를 피한다',action:startStage3KangmugyeolAvoidRoute}
  ]));
}
function beginStage3Lines(lines,onComplete=null){
  convo={lines,index:0,choicesAfter:null,npcId:'kangyunhye',stage3:true,onComplete};
  $('#choices').innerHTML='';
  $('#nextDialogue').classList.remove('hidden');
  showLine();
}
function showStage3Choices(prompt,choices){
  const playerName=CHARS[state.char].name;
  $('#speakerName').textContent=playerName;
  $('#speakerImg').src=CHARS[state.char].sprite;
  $('#dialogueText').textContent=`${playerName}: ${prompt}`;
  $('#choices').innerHTML=choices.map((choice,i)=>`<button class="btn" data-i="${i}">${i+1}. ${choice.text}</button>`).join('');
  $('#nextDialogue').classList.add('hidden');
  $$('#choices button').forEach(button=>{
    button.onclick=()=>{
      const choice=choices[+button.dataset.i];
      $('#choices').innerHTML='';
      choice.action();
    };
  });
}
function startStage3GitaehaTalkRoute(){
  beginStage3Lines([
    ['강윤혜','놀라게 했다면 미안해 하지만 꼭 물어봤어야 했어'],
    ['기태하','.......'],
    ['강윤혜','너도 기억하고 있는 거지? 우리 현장 체험 학습'],
    ['기태하','씨발 잊고 싶다 좀'],
    ['강윤혜','왜 모르는 척했던 거야?'],
    ['기태하','강윤혜 니도 알잖냐 삼 년 꼬박 같이 봤던 애새끼들 서로 죽이라고 했던 것 나 그때 우리 주님하고 사이 멀어졌어 좆같아'],
    ['강윤혜','나라고 그때 기억이 끔찍하지 않은 건 아니야 태하야'],
    ['기태하','.......'],
    ['강윤혜','그래도 우리가 지금 할 수 있는 일이 있잖아'],
    ['기태하','우리가 뭘 할 수 있는데'],
    ['강윤혜','이번 현장 체험 학습 아무도 못 가게 하자 애들한테 가지 말라고 설득하는 거야'],
    ['강윤혜','우리가 막을 수 있어']
  ],()=>showStage3Choices('어떻게 답할까?',[ 
    {text:'아무도 안 죽게 할 수 있을까?',action:()=>beginStage3Lines([['기태하','아무도 안 죽게 할 수 있을까?']],()=>finishStage3DialogueWithEnding('ending1'))},
    {text:'그게 되겠냐 담임이나 어른들이 가만 있겠냐고',action:()=>beginStage3Lines([
      ['기태하','그게 되겠냐 담임이나 어른들이 가만 있겠냐고'],
      ['강윤혜','너 비겁해'],
      ['기태하','나도 알아 씨발']
    ],()=>finishStage3DialogueWithEnding('ending2'))}
  ]));
}
function startStage3GitaehaAvoidRoute(){
  beginStage3Lines([
    ['강윤혜','왜 도망치는 거야? 도윤이한테 거짓말까지 시키면서'],
    ['기태하','한도윤 존나 도움이 안 돼요'],
    ['강윤혜','너를 이해할 수 없어']
  ],()=>showStage3Choices('어떻게 답할까?',[ 
    {text:'누가 이해해 달래?',action:()=>beginStage3Lines([
      ['기태하','누가 이해해 달래?'],
      ['기태하','뒈지기 직전 겨우 고백했는데 그게 이제 없던 일이래 걔 볼 때마다 미안해서 두 번 뒈지고 싶어'],
      ['강윤혜','너 진짜 바보구나'],
      ['기태하','야'],
      ['강윤혜','죽으면 아무것도 못 해 너는 또 무결이 혼자 둘 거야?'],
      ['기태하','.......']
    ],()=>finishStage3DialogueWithEnding('ending3'))},
    {text:'니가 나 같은 걸 왜 이해해',action:()=>beginStage3Lines([['기태하','니가 나 같은 걸 왜 이해해']],()=>finishStage3DialogueWithEnding('ending2'))}
  ]));
}
function startStage3KangmugyeolTalkRoute(){
  beginStage3Lines([
    ['강윤혜','놀라게 했다면 미안해 하지만 꼭 물어봤어야 했어'],
    ['강무결','무슨 이야기를 하고 싶은지 알 것 같아'],
    ['강윤혜','너도 그 섬 기억하고 있지 나만 이상한 게 아니었어'],
    ['강무결','응 기억하고 있어'],
    ['강윤혜','왜 모르는 척했던 거야?'],
    ['강무결','모르겠어 그냥 무서웠던 것 같아 그 많은 일들이 사실이었다는 게'],
    ['강윤혜','아직은 일어나지 않은 일이야 무결아'],
    ['강무결','앞으로 일어날 일이기도 해 윤혜야'],
    ['강윤혜','그래도 우리가 지금 할 수 있는 일이 있잖아'],
    ['강무결','우리가 뭘 할 수 있을까'],
    ['강윤혜','이번 현장 체험 학습 아무도 못 가게 하자 애들한테 가지 말라고 설득하는 거야'],
    ['강윤혜','막을 수 있어 무결아']
  ],()=>showStage3Choices('어떻게 답할까?',[ 
    {text:'아무도 다치지 않는 미래 보고 싶어',action:()=>beginStage3Lines([
      ['강무결','아무도 다치지 않는 미래 보고 싶어']
    ],()=>finishStage3DialogueWithEnding('mugyeolEnding1'))},
    {text:'나는 잘 모르겠어 윤혜야',action:()=>beginStage3Lines([
      ['강무결','나는 잘 모르겠어 윤혜야'],
      ['강윤혜','무결이 너를 믿었는데'],
      ['강무결','미안해 나 먼저 갈게']
    ],()=>finishStage3DialogueWithEnding('mugyeolEnding2'))}
  ]));
}
function startStage3KangmugyeolAvoidRoute(){
  beginStage3Lines([
    ['강윤혜','무결아 왜 도망치는 거야?'],
    ['강무결','윤혜야 그 일이 정말 일어났던 일인지 확신할 수 없잖아'],
    ['강윤혜','우리 둘이 우연히 같은 꿈을 꾸는 게 가능하다고 생각해? 나 도와줘 무결아']
  ],()=>showStage3Choices('어떻게 답할까?',[ 
    {text:'내가 도움이 될 수 있을까',action:()=>beginStage3Lines([
      ['강무결','내가 도움이 될 수 있을까'],
      ['강윤혜','바보야 아직 일어나지 않은 일이니까 바뀔 수도 있는 거야'],
      ['강무결','노력했는데도 아무것도 변하지 않으면?'],
      ['강윤혜','설령 그렇다 해도 죽으면 아무것도 못 해'],
      ['강무결','.......']
    ],()=>finishStage3DialogueWithEnding('mugyeolEnding3'))},
    {text:'나 같은 건 도움이 안 될 거야',action:()=>beginStage3Lines([
      ['강무결','나 같은 건 도움이 안 될 거야']
    ],()=>finishStage3DialogueWithEnding('mugyeolEnding2'))}
  ]));
}
const STAGE3_ENDINGS={
  ending1:{
    title:'〈엔딩 1〉 델포이의 신탁은 언제나 실현된다',
    text:`강윤혜와 기태하는 3 학년 4 반 아이들을 설득했다.
현장 체험 학습은 좆도 재미없을 거라고 이 꼴통 학교에 뭘 바라냐고 선동하기도 했다.
강윤혜의 진심 어린 설득과 기태하의 발광은 어느 정도 효과가 있었으나
모든 아이들을 설득하지는 못했다.

결국 강윤혜는 사지로 향하는 친구를 내버려 둘 수 없어서
기태하는 혼자 살아남은 뒤의 죄책감을 견딜 자신이 없어서

2026 년 4 월 25 일, 다시 한번 현장 체험 학습 장소로 향하는 버스에 몸을 실었다.

오이디푸스의 비극은 운명을 벗어나려 발버둥쳐도 신탁이 실현되고 만다는 데 있다.
주어진 운명은 어떠한 방식으로든 실현된다.`
  },
  ending2:{
    title:'〈엔딩 2〉 조금은 같이 살 수 있겠지만',
    text:`강윤혜는 가현도의 일을 회피하기만 하는 기태하에게 실망했다.
기태하 역시 막을 수 있다면 막고 싶었다.
그러나 이러한 노력이 개미의 발버둥과 유사하다는 생각을 지울 수 없었다.
늘 그렇듯 세상은 어른들의 손아귀 안에서 돌아가고 있었으므로.

반 아이들에게 현장 체험 학습을 가지 말자고 설득하는 강윤혜를 지켜보면서
기태하는 하루에 꼬박 담배 두 갑을 태웠다.
강윤혜를 돕지도 막지도 않았다.

강무결에게 무언가 말해야 한다고 생각했으나 그럴 수 없었다.
열아홉의 치기는 때로는 쉽게 꺾이는 법이다.

2026 년 4 월 25 일, 기태하는 현장 체험 학습 버스에 오르기 전 강무결의 손목을 한 번 잡아 본다.

구겨진 미간과 의아함이 비치는 눈.
입술이 무거워 아무것도 발음하지 못하고 기태하는 버스에 올라타고 만다.
이번에도 같은 선택을 할 것이다.
그애와 조금이라도 같이 살 수 있다면.`
  },
  ending3:{
    title:'〈엔딩 3〉 하나님 이애를 사랑하지 않게 하셨어야죠',
    text:`강윤혜의 눈빛은 흔들림이 없었다.
동요하지 않는 신념이 강윤혜에게는 있었고 그것은 기태하 내면의 벽을 깨부수기 충분했다.

기태하는 미술실을 나와 교내 곳곳을 뛰어다녔다.
누군가를 마주치기도 했고 담임이 부르는 소리를 듣기도 했다.
그 누구도 기태하의 안중에 없었다.

목구멍에서 비린내가 났다. 심장을 토할 수 있겠다 생각했을 즈음
강무결을 만난다.

꽃잎이 흩날리는 옥상에서.

야, 담배 두 가치 적선해.

기태하는 그렇게 말했을 것이었고,
담배를 물기도 전 그애를 끌어안았다.`
  },
  mugyeolEnding1:{
    title:'〈엔딩 1〉 델포이의 신탁은 언제나 실현된다',
    text:`강윤혜와 강무결은 3 학년 4 반 아이들을 설득했다.
강윤혜와 강무결의 진심은 아이들에게 꽤 파급력이 있었으나
모든 아이들을 설득하지는 못했다.

결국 강윤혜는 사지로 향하는 친구를 내버려 둘 수 없어서
강무결은 조금 다른 미래를 만들기 위해서

2026 년 4 월 25 일, 다시 한번 현장 체험 학습 장소로 향하는 버스에 몸을 실었다.

오이디푸스의 비극은 운명을 벗어나려 발버둥쳐도 신탁이 실현되고 만다는 데 있다.
주어진 운명은 어떠한 방식으로든 실현된다.`
  },
  mugyeolEnding2:{
    title:'〈엔딩 2〉 조금은 같이 살 수 있겠지만',
    text:`강윤혜는 가현도의 일을 회피하기만 하는 강무결에게 실망했다.
강무결 역시 무언가 변화시킬 수 있다면 변화시키고 싶었다.
그러나 이러한 노력이 과연 유의미한지 결론을 내릴 수 없었다.
기태하는 여전히 방과 후 특별 지도를 받고 있을 것이고, 받을 것이었다.

반 아이들에게 현장 체험 학습을 가지 말자고 설득하는 강윤혜를 지켜보면서
강무결은 담뱃갑을 만지작거렸다.
담배를 물었다가도 몇 모금 빨고 장초를 버리는 일이 잦았다.

기태하를 마주칠 때마다 피했다.
마주할 자신이 없었다.

2026 년 4 월 25 일, 현장 체험 학습 버스에 오르기 전 강무결은 기태하에게 손목을 붙잡힌다.

무언가 말하려 달싹이는 입술.
강무결은 그 의중을 파악하려 미간을 좁혔지만 기태하는 아무 말도 하지 않고 버스에 올라타고 만다.

강무결은 차창에 고개를 기대며 생각했다. 이번에는 조금 달라야만 했다.
눈을 뜬 뒤 또 그 섬이라면 이전처럼 먼저 기태하를 보내지는 않으리라.

그애와 조금이라도 같이 살 수 있다면.`
  },
  mugyeolEnding3:{
    title:'〈엔딩 3〉 하나님 이애를 사랑하지 않게 하셨어야죠',
    text:`강윤혜의 눈빛은 흔들림이 없었다.
동요하지 않는 신념이 강윤혜에게는 있었고 그것은 강무결 내면의 벽을 깨부수기 충분했다.

강무결은 미술실을 나와 천천히 교내를 배회했다.
누군가를 마주치기도 했고 가볍게 인사를 나누기도 했다.
주머니에는 언젠가 기태하가 비웃었던, 멘솔 향 나는 담배가 있었다.

문득 담배 생각이 간절할 즈음, 강무결은 기태하를 만난다.

꽃잎이 흩날리는 옥상에서.

야, 담배 두 가치 적선해.

기태하는 그렇게 말했고,
강무결은 무어라 대답하기도 전 기태하의 품 안에 있었다.`
  }
};
function finishStage3DialogueWithEnding(key){
  const overlay=$('#dialogue');
  overlay.classList.remove('open');
  $('#choices').innerHTML='';
  $('#nextDialogue').classList.remove('hidden');
  convo=null;
  openStage3Ending(key);
}
function resetStage3EndingSecret(){
  const heart=$('#stage3EndingHeart'),form=$('#stage3EndingPwForm'),letter=$('#stage3FinalLetter'),input=$('#stage3EndingPwInput'),error=$('#stage3EndingPwError');
  if(heart)heart.classList.remove('hidden');
  if(form)form.classList.add('hidden');
  if(letter)letter.classList.add('hidden');
  if(input)input.value='';
  if(error)error.textContent='';
}
function openStage3Ending(key){
  const ending=STAGE3_ENDINGS[key];
  if(!ending)return;
  $('#stage3EndingTitle').textContent=ending.title;
  $('#stage3EndingText').textContent=ending.text;
  resetStage3EndingSecret();
  const overlay=$('#stage3Ending');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  const panel=overlay.querySelector('.stage3-ending');
  if(panel)panel.scrollTop=0;
}
function finishGameFromStage3(){
  const overlay=$('#stage3Ending');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  stopAudio($('#stage3BgmAudio'),true);
  resetRuntime();
  state.stage=1;
  screen('startScreen');
}
const dialogueData={
kangyunhye:{
  gitaeha:{first:'뭐 잃어버렸다고? 마지막으로 본 게 언제야?',choices:[
    {text:'가현도에서 본 게 마지막일걸?',lines:[['기태하','가현도에서 본 게 마지막일걸?'],['강윤혜','너 지금 무슨 말을 하는 거야?'],['기태하','아 쏘리 꿈 이야기임 꿈'],['강윤혜','너도 그 섬을 기억해?'],['기태하','야 야 나 급하다 간다 빠이']]},
    {text:'그걸 알면 내가 찾았지 인마',lines:[['기태하','그걸 알면 내가 찾았지 인마'],['강윤혜','그래? 그럼 한번 잘 찾아 봐']]}
  ]},
  kangmugyeol:{first:'뭐 잃어버렸다고? 마지막으로 본 게 언제야?',choices:[
    {text:'아마 가현도에서 두고 왔나 봐',lines:[['강무결','아마 가현도에서 두고 왔나 봐'],['강윤혜','무결아 가현도라니 그게 무슨 말이야?'],['강무결','…….'],['강윤혜','너도 그 섬에서 있었던 일 기억해?'],['강무결','윤혜야 나 갑자기 급한 일이 생겨서 가 볼게']]},
    {text:'잘 모르겠네 기억이 안 나',lines:[['강무결','잘 모르겠네 기억이 안 나'],['강윤혜','같이 찾아 줄까? 쉬는 시간 끝나기 전까지만'],['강무결','고마워']]}
  ]}
},
juinha:{
  gitaeha:{lines:[['주인하','강무결 찾아?'],['기태하','아 씹 놀랐네 어어 비슷한 것 찾는 중'],['주인하','무결이 비슷한 건 또 뭔데'],['기태하','아 있어 쪼그마한 것']]},
  kangmugyeol:{lines:[['주인하','뭐 찾아? 같이 찾아 줄까?'],['강무결','응 잃어버렸는데 안 보이네 고마워'],['주인하','아까 기태하가 너 찾더라'],['강무결','그래? 계속 찾으라고 해']]}
},
baeharin:{
  gitaeha:{lines:[['배하린','머 해?'],['기태하','아 뭘 좀 잃어버려 가지고'],['배하린','같이 찾아 주까?'],['기태하','어어 도와주면 땡큐지'],['배하린','(이미 백우진을 발견하고 따라가 버린 듯하다)'],['기태하','니 그럴 줄 알았다']]},
  kangmugyeol:{lines:[['배하린','머 해?'],['강무결','잃어버린 물건이 있어서 찾고 있어'],['배하린','같이 찾아 주까?'],['강무결','그래 줄래?'],['배하린','(이미 백우진을 발견하고 따라가 버린 듯하다)'],['강무결','하린이는 돌아와서도 변함이 없구나']]}
},
gongjuya:{
  gitaeha:{lines:[['공주야','태하 뭐 찾아?'],['기태하','어 공주 오빠 XX 봤냐?'],['공주야','그것 아까 빼구가 들고 갔는데? 이따 태하 보면 말 좀 해 달라고 했어!'],['기태하','백우진이 숨겼네 땡큐 나 간다']]},
  kangmugyeol:{lines:[['공주야','무겨리 뭐 찾아? 같이 찾아 줘?'],['강무결','그래 줄래? 주머니에 넣은 줄 알았는데 안 보이네'],['공주야','태하가 가져간 건 아니래?'],['강무결','모르겠어 말도 없이 가져가진 않았을 텐데']]}
},
seoeungyeol:{
  gitaeha:{lines:[['서은결','뭘 봐?'],['기태하','이 새끼 아침부터 성격 더럽네 야 XX 봤냐?'],['서은결','XX 찾는다고? 위치를 내가 어떻게 알아?'],['기태하','그니까 본 적 있냐고 친구야'],['서은결','못 봤다고'],['기태하','도움이 안 돼']]},
  kangmugyeol:{lines:[['서은결','뭐 찾는다고? 네가 물건 잃어버리기도 하냐?'],['강무결','그러게 분명 주머니에 넣어 뒀던 것 같은데'],['서은결','흠...... 미술실에서 본 것 같기도?'],['강무결','정말?'],['서은결','아닐 수도?'],['서은결','(명예희를 찾으러 간 듯하다)']]}
},
handoyun:{
  gitaeha:{lines:[['한도윤','너 뭐 찾아?'],['기태하','어어 XX 봤냐?'],['한도윤','아~ 나 그것 아까 미술실에서 본 것 같은데? 나 근데 좀 바빠 가지고 먼저 간다'],['기태하','야 한도윤'],['한도윤','엉?'],['기태하','강윤혜 보면 나 보건실 갔다 해'],['한도윤','윤혜? 근데 왜?'],['기태하','그렇게만 말해 나 간다']]},
  kangmugyeol:{lines:[['한도윤','너 뭐 해?'],['강무결','잃어버린 게 있어서 찾고 있었어'],['한도윤','헐 같이 찾아 줄까? 가자 가자'],['강무결','그래 줄래? 고마워']]}
},
geumhaje:{
  gitaeha:{lines:[['금하제','뭐야? 비켜'],['기태하','형 바쁘다 니가 비켜'],['금하제','왜 지랄인데'],['기태하','XX 봤냐? 잃어버린 듯'],['금하제','내가 그걸 어떻게 알아'],['기태하','하여튼 새끼 싸가지...... 야'],['금하제','왜'],['기태하','너 진료소인지 병원인지 가지 마라'],['금하제','뭐?'],['기태하','꺼져 준다고']]},
  kangmugyeol:{lines:[['금하제','뭐야? 비켜'],['강무결','잠시만 기다려 나 뭐 찾는 중이잖아'],['금하제','뭔데 간수 좀 잘하지'],['강무결','XX 봤어?'],['금하제','몰라 기태하도 모른대?'],['강무결','걔는 아무것도 몰라']]}
},
myeongyehui:{
  gitaeha:{lines:[['명예희','이 새끼 뭐냐? 너 이 시간에 왜 돌아다녀?'],['명예희','도무지 이해를 할 수가 없네 수업 무단 이탈 벌점 4 점, 교내 흡연 벌점 3 점, 복장 불량 벌점 2 점'],['기태하','씹 또 시작이네 뭐 찾는 중이라고'],['명예희','핑계 성의 좆도 없네 괘씸죄로 벌점 두 배'],['기태하','예희야 이 미친아.......'],['명예희','잃어버린 니 정신머리나 찾아서 생지부실로 와라'],['기태하','어어 다음 생에 갈게 빠이']]},
  kangmugyeol:{
    lines:[['명예희','왜 돌아다녀?'],['강무결','잃어버린 게 있어서 찾고 있었어'],['명예희','쉬는 시간 끝나기 전에 교실 복귀해 네가 늦을 것 같지도 않지만'],['강무결','응 조금만 더 찾아볼게'],['명예희','기태하 그 새끼 보면 생지부실로 오라고 전해'],['강무결','내가 왜?'],['명예희','너네 한 세트잖아 아닌가?'],['강무결','.......'],['명예희','해안 절벽에서 같이 있었잖아']],
    choices:[
      {text:'예희야 꿈 꿨어?',lines:[['강무결','예희야 꿈 꿨어?'],['명예희','내가 꿈도 구분 못 하겠냐? 우리 목걸이 차고.......'],['강무결','예희야 나 갈게 보건실 꼭 가 봐']]},
      {text:'예희야 나 갈게 쉬는 시간 끝나겠다',lines:[['강무결','예희야 나 갈게 쉬는 시간 끝나겠다'],['명예희','이 기억은 뭐지? 이상해']]}
    ]
  }
}};
let convo=null;
function openDialogue(npcId){
  pause('dialogue');
  const n=NPCS[npcId],data=dialogueData[npcId][state.char];
  $('#speakerImg').src=n.src;$('#speakerName').textContent=n.name;$('#dialogue').classList.add('open');
  if(data.first&&data.choices){
    $('#dialogueText').textContent=`${n.name}: ${data.first}`;
    showDialogueChoices(data.choices,npcId,false);
  }else beginLines(data.lines,data.choices||null,npcId)
}
function showDialogueChoices(choices,npcId,asPlayerPrompt=true){
  if(asPlayerPrompt){
    const playerName=CHARS[state.char].name;
    $('#speakerName').textContent=playerName;$('#speakerImg').src=CHARS[state.char].sprite;
    $('#dialogueText').textContent=`${playerName}: 어떻게 답할까?`;
  }
  $('#choices').innerHTML=choices.map((c,i)=>`<button class="btn" data-i="${i}">${i+1}. ${c.text}</button>`).join('');
  $('#nextDialogue').classList.add('hidden');
  $$('#choices button').forEach(b=>b.onclick=()=>beginLines(choices[+b.dataset.i].lines,null,npcId));
}
function beginLines(lines,choicesAfter=null,npcId=null){
  convo={lines,index:0,choicesAfter,npcId};$('#choices').innerHTML='';$('#nextDialogue').classList.remove('hidden');showLine()
}
function speakerAssetKey(speaker){
  const map={'강윤혜':'kangyunhye','주인하':'juinha','배하린':'baeharin','공주야':'gongjuya','서은결':'seoeungyeol','한도윤':'handoyun','금하제':'geumhaje','명예희':'myeongyehui'};
  return map[speaker]||null;
}
function showLine(){
  const [speaker,text]=convo.lines[convo.index];
  $('#dialogueText').textContent=`${speaker}: ${text}`;$('#speakerName').textContent=speaker;
  const npcName=speakerAssetKey(speaker);
  $('#speakerImg').src=npcName?NPCS[npcName].src:CHARS[state.char].sprite
}
function closeDialogue(){
  const overlay=$('#dialogue');
  if(!overlay.classList.contains('open'))return;
  const wasStage3=state.stage===3||(convo&&convo.stage3);
  overlay.classList.remove('open');
  $('#choices').innerHTML='';
  $('#nextDialogue').classList.remove('hidden');
  convo=null;
  if(wasStage3){stage3Toast('미술실 탐색으로 돌아왔습니다.');return;}
  resume();
  toast('다시 물건을 찾아보세요.');
}
$('#nextDialogue').onclick=()=>{
  if(!convo)return;
  convo.index++;
  if(convo.index>=convo.lines.length){
    if(convo.onComplete){
      const complete=convo.onComplete;
      convo.onComplete=null;
      complete();
    }else if(convo.choicesAfter){
      $('#dialogueText').textContent='';
      showDialogueChoices(convo.choicesAfter,convo.npcId,true);
    }else{
      closeDialogue();
    }
  }else showLine()
};
$('#skipDialogue').onclick=()=>closeDialogue();
function openItemMessage(title,message,pendingFailure=false,pendingWarning=false){
  pause('itemMessage');
  state.pendingFailureAfterMessage=pendingFailure;
  state.pendingWarningAfterMessage=pendingWarning;
  $('#itemMessageTitle').textContent=title;
  $('#itemMessageText').textContent=message;
  $('#itemMessage').classList.add('open');
}
function closeItemMessage(){
  if(!$('#itemMessage').classList.contains('open')) return;
  $('#itemMessage').classList.remove('open');
  if(state.pendingFailureAfterMessage){
    state.pendingFailureAfterMessage=false;
    state.pendingWarningAfterMessage=false;
    return end(false,'체력을 모두 잃었습니다.');
  }
  if(state.pendingWarningAfterMessage){
    state.pendingWarningAfterMessage=false;
    return openWarning();
  }
  if(state.collected.size===3){ setTimeout(()=>end(true),150); }
  else { resume(); }
}
function playWarningAudio(){
  const audio=$('#warningAudio');
  if(!audio)return;
  audio.currentTime=0;
  const playPromise=audio.play();
  if(playPromise&&typeof playPromise.catch==='function')playPromise.catch(()=>{});
}
function stopWarningAudio(){
  const audio=$('#warningAudio');
  if(!audio)return;
  audio.pause();
  audio.currentTime=0;
}
function openWarning(){
  state.warningShown=true;
  state.modalType='warning';
  const overlay=$('#warningOverlay');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  document.body.classList.add('warning-active');
  playWarningAudio();
  $('#warningMessageBox').focus();
}
function closeWarning(){
  const overlay=$('#warningOverlay');
  if(!overlay.classList.contains('open'))return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  document.body.classList.remove('warning-active');
  stopWarningAudio();
  resume();
}
function pause(type=null){state.paused=true;state.modalType=type;state.pauseStart=performance.now();player.classList.remove('walking')}
function resume(){state.totalPaused+=performance.now()-state.pauseStart;state.last=performance.now();state.paused=false;state.modalType=null}
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),1800)}
function end(success,reason=''){
  if(!state.running)return;
  state.running=false;cancelAnimationFrame(state.raf);
  $('#itemMessage').classList.remove('open');$('#warningOverlay').classList.remove('open');document.body.classList.remove('warning-active');stopWarningAudio();
  $('#resultBadge').textContent=success?`STAGE ${state.stage} COMPLETE`:'MISSION FAILED';
  $('#resultTitle').textContent=success?'성공!':'실패…';
  $('#resultMsg').textContent=success?(state.char==='kangmugyeol'?'강무결과 함께 모든 물건을 찾았습니다.':`${CHARS[state.char].name}와 함께 모든 물건을 찾았습니다.`):reason;
  const stage1Success=success&&state.stage===1;
  const laterStageSuccess=success&&state.stage>=2;
  $('#heartBtn').classList.toggle('hidden',!stage1Success);
  $('#nextStageBtn').classList.toggle('hidden',!stage1Success);
  $('#nextStageCenterBtn').classList.toggle('hidden',!laterStageSuccess);
  $('#pwForm').classList.add('hidden');$('#letter').classList.add('hidden');$('#resultBtns').classList.remove('hidden');$('#result').classList.add('open')
}
viewport.addEventListener('pointerdown',e=>{if(!state.running||state.paused||e.target.closest('.collectible'))return;const rect=viewport.getBoundingClientRect();state.targetX=Math.max(90,Math.min(WORLD_WIDTH-90,state.cameraX+e.clientX-rect.left));toast(state.targetX>state.playerX?'오른쪽으로 이동합니다.':'왼쪽으로 이동합니다.')});
$('#itemMessageBox').onclick=()=>closeItemMessage();
$('#itemMessageBox').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();closeItemMessage()}};
$('#warningMessageBox').onclick=()=>closeWarning();
$('#warningMessageBox').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();closeWarning()}};
function goNextStage(){
  $('#result').classList.remove('open');
  if(state.stage===1)startGame(2);else if(state.stage===2)startStage3();
}
$('#nextStageBtn').onclick=goNextStage;
$('#nextStageCenterBtn').onclick=goNextStage;
$$('.stage3-hotspot').forEach(btn=>btn.onclick=e=>{e.stopPropagation();inspectStage3Spot(btn)});
$('#stage3MessageBox').onclick=e=>{if(e.target.closest('#stage3MessageChoices'))return;closeStage3Message()};
$('#stage3MessageBox').onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&!state.stage3AwaitingChoice){e.preventDefault();closeStage3Message()}};
$('#stage3LeftBtn').onclick=()=>moveStage3View(-1);
$('#stage3RightBtn').onclick=()=>moveStage3View(1);
$('#stage3Scroll').addEventListener('scroll',()=>requestAnimationFrame(updateStage3NavButtons),{passive:true});
window.addEventListener('resize',()=>{if(state.stage===3)updateStage3NavButtons()});
$('#stage3EndingClose').onclick=()=>finishGameFromStage3();
$('#stage3EndingHeart').onclick=()=>{
  $('#stage3EndingHeart').classList.add('hidden');
  $('#stage3EndingPwForm').classList.remove('hidden');
  $('#stage3EndingPwError').textContent='';
  $('#stage3EndingPwInput').focus();
};
$('#stage3EndingPwForm').onsubmit=e=>{
  e.preventDefault();
  const input=$('#stage3EndingPwInput'),error=$('#stage3EndingPwError');
  if(input.value==='0427'){
    $('#stage3EndingPwForm').classList.add('hidden');
    $('#stage3FinalLetter').classList.remove('hidden');
    error.textContent='';
    const panel=$('#stage3Ending').querySelector('.stage3-ending');
    if(panel)setTimeout(()=>panel.scrollTo({top:panel.scrollHeight,behavior:'smooth'}),30);
  }else{
    error.textContent='비밀번호가 맞지 않습니다.';
    input.select();
  }
};
$('#stage3ExitBtn').onclick=()=>{stopAudio($('#stage3BgmAudio'),true);state.stage=1;playBgm();screen('selectScreen')};
$('#startBtn').onclick=()=>{playBgm();screen('selectScreen')};$('#backBtn').onclick=()=>screen('startScreen');$$('.charcard').forEach(b=>b.onclick=()=>choose(b.dataset.char));$('#quitBtn').onclick=()=>{resetRuntime();state.stage=1;screen('selectScreen')};$('#retryBtn').onclick=()=>startGame(state.stage);$('#reselectBtn').onclick=()=>{resetRuntime();state.stage=1;screen('selectScreen')};$('#heartBtn').onclick=()=>{$('#heartBtn').classList.add('hidden');$('#pwForm').classList.remove('hidden');$('#pwInput').focus()};$('#pwForm').onsubmit=e=>{e.preventDefault();if($('#pwInput').value==='0427'){$('#pwForm').classList.add('hidden');$('#letter').classList.remove('hidden');$('#resultBtns').classList.add('hidden')}else{$('#pwError').textContent='비밀번호가 맞지 않습니다.';$('#pwInput').select()}};