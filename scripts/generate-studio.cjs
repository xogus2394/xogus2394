const fs = require('node:fs');
const path = require('node:path');
// Original profile artwork; cat sprites by yukurash/commit-pet (MIT).
const rendererRoot = process.env.PET_RENDERER_ROOT || path.join(process.cwd(), '.profile-tools', 'commit-pet');
const { renderPet } = require(path.join(rendererRoot, 'src', 'pets.js'));
const out = path.join(process.cwd(), 'assets');
fs.mkdirSync(out, { recursive: true });
const card = fs.readFileSync(path.join(out, 'commit-pet.svg'), 'utf8');
const state = card.match(/aria-label="[^"]* - Lv(\d+) (Happy|Okay|Hungry|Sick)"/);
if (!state) throw new Error('Missing real Commit Pet state');
const mood = {Happy:'happy', Okay:'content', Hungry:'hungry', Sick:'sick'}[state[2]];
const petLicense = fs.readFileSync(path.join(rendererRoot, 'LICENSE'), 'utf8');
const credits = 'Cat sprite: yukurash/commit-pet (https://github.com/yukurash/commit-pet). ' + petLicense;
const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const palette = {bg:'#101b29',panel:'#152438',edge:'#293d51',mint:'#83dfc0',ink:'#eef5f3',muted:'#b4c5cc',dim:'#798f9d',gold:'#edc894'};
const font = `font-family="'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif"`;
const t=(x,y,size,text,color=palette.ink,weight=400,extra='')=>`<text x="${x}" y="${y}" ${font} font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${text}</text>`;
const rect=(x,y,w,h,c,r=0)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`;
const shell=(w,h,body,label)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><title>${label}</title><metadata>${escapeXml(credits)}</metadata>${body}</svg>`;
let room='';
// A tiny, original night-time studio. Decorative skyline, not contribution data.
room+=rect(738,32,420,386,'#192b3a',12)+rect(754,48,388,274,'#101e31',6);
room+=rect(770,64,356,190,'#253b52',3)+rect(779,73,338,172,'#142b44');
room+=`<circle cx="1061" cy="109" r="20" fill="#f0d8ad"/><circle cx="1070" cy="102" r="18" fill="#142b44"/>`;
for(const [x,y,s] of [[811,100,3],[858,126,3],[929,88,2],[1010,151,2],[1090,178,3],[908,159,2]])room+=rect(x,y,s,s,'#9ebecb');
room+=`<path d="M779 214 L824 178 L866 216 L914 167 L966 211 L1008 180 L1060 217 L1117 196 V245 H779 Z" fill="#203e4b"/>`;
for(const [x,y,w,h] of [[793,214,20,31],[841,219,25,26],[881,198,21,47],[934,217,24,28],[982,200,21,45],[1028,215,22,30],[1082,202,23,43]]){room+=rect(x,y,w,h,'#2a4c55');if(h>30)room+=rect(x+6,y+10,4,4,'#b4bc85');}
room+=rect(943,64,8,190,'#314d5d')+rect(770,246,356,8,'#3c5a68');
// Shelf, books, planter.
room+=rect(770,270,116,7,'#3d5866')+rect(781,237,14,33,'#64786f')+rect(800,246,12,24,'#d5bb8d')+rect(817,233,14,37,'#4b8c8c');
room+=rect(1090,246,23,26,'#c3a67b')+rect(1098,223,7,28,'#79b294')+rect(1088,229,11,7,'#70ab8a')+rect(1106,217,12,7,'#70ab8a');
// Desk, laptop, lamp and warm light.
room+=rect(764,345,369,13,'#c19c74')+rect(777,358,14,44,'#826c57')+rect(1100,358,14,44,'#826c57');
room+=rect(782,286,102,56,'#3b5262',4)+rect(788,292,90,44,'#102b35',2);
room+=rect(800,304,39,3,'#74ba9d')+rect(800,314,61,3,'#537e7e')+rect(800,324,48,3,'#74ba9d')+rect(774,341,119,5,'#78949f',2);
room+=rect(1054,278,7,62,'#798477')+rect(1033,336,48,6,'#a4a18a',3)+`<path d="M1040 278 L1078 278 L1069 258 L1049 258 Z" fill="#e5c28f"/>`;
room+=rect(1010,321,27,24,'#cee0cf',3)+`<path d="M1037 327 q15 0 8 10 h-8" fill="none" stroke="#cee0cf" stroke-width="4"/>`;
room+=`<g transform="translate(904,210) scale(.84)" shape-rendering="crispEdges">${renderPet('cat',165,mood)}</g>`;
room+=t(770,393,17,'Mori의 작은 작업실',palette.muted,500);
let hero=rect(0,0,1200,430,palette.bg,16)+rect(0,0,7,430,palette.mint,3);
hero+=t(48,65,23,'최태현',palette.ink,650)+t(136,65,18,'/  xogus2394',palette.dim,450);
hero+=t(48,149,48,'작은 불편을 발견하고,',palette.ink,700,'letter-spacing="-2"');
hero+=t(48,214,48,'쓸모 있는 제품으로.',palette.mint,700,'letter-spacing="-2"');
hero+=t(48,265,23,'웹과 앱을 만들고, 오래 쓰일 경험을 고민합니다.',palette.muted,400);
let x=48; for(const [name,w] of [['TypeScript',124],['React',87],['NestJS',97],['PostgreSQL',143]]){hero+=rect(x,316,w,35,palette.panel,6)+t(x+14,340,17,name,palette.muted,500);x+=w+10;}
hero+=t(48,393,16,'작게 시작하고, 만들고, 계속 다듬습니다.',palette.dim,400)+room;
fs.writeFileSync(path.join(out,'studio.svg'),shell(1200,430,hero,'최태현의 작은 작업실. 민트빛 고양이 Mori와 함께 웹과 앱을 만듭니다.'));
function homeCard(){
let s=rect(0,0,584,346,palette.bg,12)+rect(0,0,584,5,'#82dcc1',2);
s+=t(28,48,16,'01  /  생활을 위한 도구',palette.dim,500);
s+=`<g stroke="#78d9b9" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M451 77 492 42 533 77 V128 H451 Z"/><path d="M482 128 V98 H503 V128"/></g>`;
s+=rect(28,76,72,26,'#203c3c',5)+t(40,95,14,'공개 앱','#a9e3ca',500);
s+=t(28,151,34,'Homeable',palette.ink,650)+t(28,186,21,'청약 이후의 돈까지, 한눈에.',palette.muted,450);
s+=t(28,227,18,'공고·납부 일정·필요 자금을 연결합니다.',palette.dim,400);
s+=rect(28,267,528,1,palette.edge)+t(28,309,18,'Google Play에서 보기',palette.mint,550)+`<path d="M526 299h17m-6-6 6 6-6 6" stroke="${palette.mint}" fill="none" stroke-width="2"/>`;
return shell(584,346,s,'Homeable. 청약 공고와 납부 일정, 필요 자금을 연결하는 공개 앱. Google Play에서 보기.');}
function gangCard(){
let s=rect(0,0,584,346,palette.bg,12)+rect(0,0,584,5,'#b3c4ed',2);
s+=t(28,48,16,'02  /  여행을 위한 도구',palette.dim,500);
s+=`<g stroke="#b0c4ed" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m442 128 40-67 46 67m-36-17 24-42 35 59"/><path d="m472 78 12 12 10-10"/><circle cx="535" cy="47" r="10"/></g>`;
s+=rect(28,76,72,26,'#2c354b',5)+t(40,95,14,'개발 중','#c0cdee',500);
s+=t(28,151,34,'GangwonCanvas',palette.ink,650)+t(28,186,21,'한 문장에서 시작하는 여행.',palette.muted,450);
s+=t(28,227,18,'강원도 일정을 만들고, 편집하고, 공유합니다.',palette.dim,400);
s+=rect(28,267,528,1,palette.edge)+t(28,309,18,'자연어 기반 여행 일정', '#b7c9ef',500);
return shell(584,346,s,'GangwonCanvas. 한 문장에서 시작하는 강원도 여행 일정. 현재 개발 중.');}

function inner(svg){return svg.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'');}
const hp=inner(homeCard()).replaceAll('Google Play에서 보기','청약 자금 계산 앱').replace(/<path d="M526 299h17m-6-6 6 6-6 6"[^>]*\/>/,'');
const gp=inner(gangCard());
fs.writeFileSync(path.join(out,'projects.svg'),shell(1200,346,`<g>${hp}</g><g transform="translate(616,0)">${gp}</g>`,'만드는 서비스: Homeable 청약 자금 계산 앱, GangwonCanvas 여행 일정 서비스.'));
fs.writeFileSync(path.join(out,'projects-mobile.svg'),shell(584,716,`<g>${hp}</g><g transform="translate(0,370)">${gp}</g>`,'Homeable과 GangwonCanvas. 작은 화면용 세로 프로젝트 카드.'));
let mobile=rect(0,0,600,900,palette.bg,16)+rect(0,0,6,900,palette.mint,3);
mobile+=t(32,54,24,'최태현',palette.ink,650)+t(128,54,18,'/ xogus2394',palette.dim,450);
mobile+=t(32,126,39,'작은 불편을 발견하고,',palette.ink,700,'letter-spacing="-1.5"')+t(32,184,39,'쓸모 있는 제품으로.',palette.mint,700,'letter-spacing="-1.5"');
mobile+=t(32,230,20,'웹과 앱을 만들고, 오래 쓰일 경험을 고민합니다.',palette.muted,400);
let mx=32;for(const [name,w] of [['TypeScript',124],['React',87],['NestJS',97],['PostgreSQL',143]]){mobile+=rect(mx,261,w,35,palette.panel,5)+t(mx+13,285,17,name,palette.muted,500);mx+=w+9;}
mobile+=`<g transform="translate(-844,296) scale(1.2)">${room}</g>`;
mobile+=t(32,860,17,'작게 시작하고, 만들고, 계속 다듬습니다.',palette.dim,400);
fs.writeFileSync(path.join(out,'studio-mobile.svg'),shell(600,900,mobile,'최태현의 작은 작업실. 작은 화면용 세로 배너.'));
console.log('Studio and responsive project artwork generated from real pet state.');
