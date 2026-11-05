/* AURA — visualization studies. These are generative diagrams, not live model outputs. */
(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const TAU=Math.PI*2, clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), mix=(a,b,t)=>a+(b-a)*t;
const rgba=(rgb,a)=>`rgba(${rgb},${a})`;
const rigs=[];
function setup(id,fn){const el=document.getElementById(id);if(!el)return;const ctx=el.getContext('2d',{alpha:false});if(!ctx)return;const rig={el,ctx,fn,w:0,h:0,active:true};rigs.push(rig);const fit=()=>{let b=el.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);if(b.width<1)return;rig.w=b.width;rig.h=b.height;el.width=Math.round(b.width*d);el.height=Math.round(b.height*d);ctx.setTransform(d,0,0,d,0,0)};new ResizeObserver(fit).observe(el);fit();return rig}
function line(ctx,pts,color,width=1){ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke()}
function dot(ctx,x,y,r,fill){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=fill;ctx.fill()}
function label(ctx,s,x,y,color='rgba(235,245,239,.6)',size=10){ctx.font=`${size}px ui-monospace,SFMono-Regular,Menlo,monospace`;ctx.fillStyle=color;ctx.fillText(s,x,y)}
function grid(ctx,w,h,spacing=38,color='rgba(205,235,232,.06)'){ctx.strokeStyle=color;ctx.lineWidth=.7;for(let x=0;x<w;x+=spacing){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=spacing){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}}
function glow(ctx,x,y,r,color){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)}
// The hero is a deep-space sculptural field of interconnected flowing strands.
const hero=setup('heroCanvas',(ctx,w,h,t)=>{
ctx.fillStyle='#101b1c';ctx.fillRect(0,0,w,h);const centerX=w*(w<650?.72:.77),centerY=h*.48,R=Math.min(w*.37,h*.47);
glow(ctx,centerX,centerY,R*1.65,'rgba(73,147,129,.16)');
ctx.save();ctx.translate(centerX,centerY);ctx.rotate(-.24);const strands=78,steps=125;
for(let j=0;j<strands;j++){const u=j/(strands-1),phi=u*TAU;ctx.beginPath();for(let i=0;i<=steps;i++){const v=i/steps,latitude=(v-.5)*Math.PI,twist=phi+v*3.1+t*.025;let rr=R*Math.cos(latitude),x=rr*Math.cos(twist)*.9,y=R*Math.sin(latitude)*1.16+rr*Math.sin(twist)*.18; x+=18*Math.sin(latitude*2+phi*3);if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y)}const alpha=.035+.19*Math.pow((Math.sin(phi+t*.05)+1)/2,2);ctx.strokeStyle=rgba('155,221,199',alpha);ctx.lineWidth=j%7===0?1.25:.55;ctx.stroke()}
for(let n=0;n<165;n++){let a=n*2.39996+t*.025,b=Math.acos(1-2*(n+.5)/165),r=R*.9,x=r*Math.sin(b)*Math.cos(a),y=r*Math.cos(b)*1.12;dot(ctx,x,y,n%11===0?1.8:.65,rgba('210,255,237',.1+.33*(n%4)/4))}ctx.restore();
for(let j=0;j<28;j++){let x=w*((j*47%101)/101),y=h*((j*31%97)/97);dot(ctx,x,y,j%7===0?1.4:.65,'rgba(235,247,242,.25)')}
label(ctx,'AURA / INTELLIGENCE ATLAS',w*.7,h*.84,'rgba(208,235,225,.46)',9);
});
// A precise topographic robot motion-planning schematic.
let scene='parallel';
const robotics=setup('roboticsCanvas',(ctx,w,h,t)=>{
ctx.fillStyle='#0b181b';ctx.fillRect(0,0,w,h);grid(ctx,w,h,36,'rgba(149,209,193,.055)');
const sx=w/780,sy=h/440;ctx.save();ctx.scale(sx,sy);
// map rings and ego-centric sensing
for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(275,246,80+i*83,35+i*44,-.05,0,TAU);ctx.strokeStyle=rgba('100,196,175',.11-i*.015);ctx.lineWidth=1;ctx.stroke()}
for(let i=0;i<18;i++){let yy=75+i*19;line(ctx,[[0,yy],[780,yy]],'rgba(185,226,216,.028)',1)}
ctx.fillStyle='#213131';ctx.fillRect(0,275,780,155);ctx.strokeStyle='rgba(196,224,214,.12)';ctx.setLineDash([18,15]);line(ctx,[[0,274],[780,274]],'rgba(196,224,214,.28)',1.3);ctx.setLineDash([]);
const slots=[420,525,630];slots.forEach((x,i)=>{ctx.fillStyle=i===1?'rgba(91,222,179,.08)':'rgba(211,233,225,.022)';ctx.fillRect(x,307,99,86);ctx.strokeStyle=i===1?'rgba(146,247,213,.75)':'rgba(157,187,175,.32)';ctx.lineWidth=1.4;ctx.strokeRect(x,307,99,86);label(ctx,i===1?'TARGET / A2':'BAY / 0'+(i+1),x+9,417,i===1?'#b9efda':'#6c8982',9)});
for(let i=0;i<28;i++){let a=i/28*TAU+t*.08,r=scene==='occlusion'?125:185,x=300+Math.cos(a)*r,y=233+Math.sin(a)*r*.67;line(ctx,[[300,240],[x,y]],'rgba(89,217,194,.09)',.8)}
ctx.beginPath();ctx.moveTo(190,231);ctx.bezierCurveTo(323,227,419,240,456,293);ctx.bezierCurveTo(483,338,527,345,574,344);ctx.strokeStyle='rgba(86,236,185,.17)';ctx.lineWidth=25;ctx.stroke();ctx.strokeStyle='#a9ffda';ctx.lineWidth=1.8;ctx.setLineDash([8,9]);ctx.stroke();ctx.setLineDash([]);
for(let k=0;k<32;k++){let p=(k/32+t*.045)%1,ax=mix(190,574,p),ay=231+112*p*p*p;dot(ctx,ax,ay,1.2,'rgba(163,250,214,.32)')}
let cx=300+Math.sin(t*.2)*14,cy=235;ctx.save();ctx.translate(cx,cy);ctx.rotate(-.05);ctx.fillStyle='#a2f5d3';ctx.shadowColor='#77e5c3';ctx.shadowBlur=25;ctx.beginPath();ctx.roundRect(-34,-15,68,30,6);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#143333';ctx.fillRect(-10,-12,25,24);ctx.strokeStyle='#e1ffe9';ctx.lineWidth=2;ctx.strokeRect(-34,-15,68,30);ctx.restore();
if(scene==='pedestrian'){glow(ctx,471,287,66,'rgba(255,169,121,.20)');dot(ctx,471,288,9,'#f8b18b');label(ctx,'DYNAMIC AGENT',490,278,'#ffbda1',9)}
if(scene==='occlusion'){ctx.fillStyle='#53616b';ctx.fillRect(392,171,63,78);ctx.strokeStyle='#e2e8ed';ctx.strokeRect(392,171,63,78);glow(ctx,421,231,50,'rgba(248,154,127,.1)');label(ctx,'BLIND REGION',397,160,'#e5afaa',10)}
if(scene==='angled'){ctx.save();ctx.translate(575,344);ctx.rotate(-.6);ctx.strokeStyle='#a8ffdd';ctx.lineWidth=2;ctx.strokeRect(-44,-33,88,66);ctx.restore();label(ctx,'45° SLOT',610,300,'#a8ffdd',10)}
ctx.strokeStyle='rgba(162,232,208,.36)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(24,51);ctx.lineTo(24,86);ctx.moveTo(24,51);ctx.lineTo(60,51);ctx.moveTo(756,51);ctx.lineTo(722,51);ctx.moveTo(756,51);ctx.lineTo(756,86);ctx.stroke();
label(ctx,'01  /  MOTION PLANNING',24,113,'#d8f2e9',12);label(ctx,'SIMULATED SENSOR FIELD',24,130,'#71998d',9);label(ctx,'CARLA • TOWN 05',565,110,'#b0c8c0',10);label(ctx,'TRAJECTORY / CONCEPTUAL',24,407,'#809e96',9);
ctx.restore();
});
// Agent collaboration as a breathing graph, where stage selections change signal routing.
let stage='plan';
const agents=setup('agentsCanvas',(ctx,w,h,t)=>{
ctx.fillStyle='#101a2a';ctx.fillRect(0,0,w,h);grid(ctx,w,h,44,'rgba(162,179,229,.035)');const sx=w/780,sy=h/440;ctx.save();ctx.scale(sx,sy);
glow(ctx,399,218,270,'rgba(75,93,174,.13)');
const nodes=[{x:390,y:92,r:19,n:'INTENT'},{x:390,y:190,r:27,n:'PLANNER'},{x:180,y:294,r:21,n:'ANALYST'},{x:391,y:314,r:21,n:'SKEPTIC'},{x:602,y:294,r:21,n:'EVIDENCE'},{x:390,y:397,r:20,n:'JUDGE'}];
let edges=[[0,1],[1,2],[1,3],[1,4],[2,5],[3,5],[4,5]];
let focus={plan:[0,1],research:[1,2,4],challenge:[3,5],review:[4,5]}[stage];
for(let i=0;i<edges.length;i++){let [a,b]=edges[i],A=nodes[a],B=nodes[b],active=focus.includes(a)&&focus.includes(b);ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.bezierCurveTo(A.x,A.y+50,B.x,B.y-50,B.x,B.y);ctx.strokeStyle=active?'rgba(203,222,255,.67)':'rgba(158,175,210,.18)';ctx.lineWidth=active?1.5:.8;ctx.stroke();let p=(t*.24+i*.17)%1,px=mix(A.x,B.x,p),py=mix(A.y,B.y,p)+Math.sin(p*Math.PI)*(a===1?-28:14);dot(ctx,px,py,active?3:1.3,active?'#d9e7ff':'rgba(176,192,235,.35)')}
for(let i=0;i<90;i++){let a=i*2.39996+t*.035,r=105+Math.sqrt(i/90)*210,x=390+Math.cos(a)*r,y=234+Math.sin(a)*r*.58;dot(ctx,x,y,i%10?0.8:1.2,'rgba(165,189,241,.12)')}
nodes.forEach((n,i)=>{let on=focus.includes(i),p=1+Math.sin(t*1.15+i)*.04;if(on)glow(ctx,n.x,n.y,74,'rgba(150,178,249,.14)');ctx.beginPath();ctx.arc(n.x,n.y,n.r*p,0,TAU);ctx.strokeStyle=on?'#d1ddff':'rgba(177,196,234,.51)';ctx.lineWidth=on?1.8:1;ctx.stroke();dot(ctx,n.x,n.y,on?5:3,on?'#d9e6ff':'#8fa5c8');label(ctx,n.n,n.x-n.n.length*3.2,n.y+n.r+21,on?'#d7e1ff':'#8194b3',9)});
label(ctx,'02 / DISTRIBUTED REASONING',24,67,'#cad7f8',11);label(ctx,'EVIDENCE   ·   CRITIQUE   ·   CONSENSUS',24,84,'#788eb4',9);label(ctx,'ILLUSTRATIVE WORKFLOW',562,412,'#8fa2c4',9);
ctx.restore();
});
// A generative token-to-token attention matrix. Not derived from measured attention weights.
let method='sft';
const llms=setup('llmsCanvas',(ctx,w,h,t)=>{
ctx.fillStyle='#1e1727';ctx.fillRect(0,0,w,h);grid(ctx,w,h,37,'rgba(220,185,225,.026)');const sx=w/780,sy=h/440;ctx.save();ctx.scale(sx,sy);
glow(ctx,430,215,290,'rgba(141,84,155,.12)');
label(ctx,'03 / REPRESENTATION SPACE',23,68,'#ecd6e9',11);label(ctx,'TOKEN INTERACTIONS · NOT MODEL TELEMETRY',23,86,'#9d86a5',9);
const words=['VISION','CONTEXT','ACTION','MEMORY','INTENT','WORLD','REWARD','ALIGN'];const N=8,startX=194,startY=115,step=39;
for(let i=0;i<N;i++){label(ctx,words[i],24,startY+step*i+5,'#b8a4bc',9);label(ctx,String(i+1).padStart(2,'0'),startX+step*i-6,103,'#927e9e',9)}
for(let i=0;i<N;i++)for(let j=0;j<N;j++){let signal=Math.sin((i+1)*4.33+(j+1)*1.77+({sft:0,dpo:2.8,grpo:5.2}[method]))*.5+.5;let value=Math.pow(signal,2.1),r=15*value+3,xx=startX+step*j,yy=startY+step*i;ctx.fillStyle=rgba(method==='sft'?'225,173,213':method==='dpo'?'157,204,230':'196,188,243',.08+value*.64);ctx.fillRect(xx-14,yy-14,28,28);dot(ctx,xx,yy,r*.37,rgba('245,225,244',.18+value*.47))}
const base=method==='sft'?0:method==='dpo'?2:4;
for(let k=0;k<13;k++){let a=k*.7+t*.16+base,px=588+Math.cos(a)*Math.sin(k*.51)*100,py=232+Math.sin(a)*Math.cos(k*.37)*123;dot(ctx,px,py,2,'rgba(230,195,232,.45)');line(ctx,[[588,232],[px,py]],'rgba(203,162,213,.13)',1)}
for(let ring=0;ring<4;ring++){ctx.beginPath();ctx.arc(588,232,30+ring*27,0,TAU);ctx.strokeStyle='rgba(225,186,226,.12)';ctx.stroke()}
ctx.save();ctx.translate(588,232);ctx.rotate(t*.11);for(let i=0;i<110;i++){let a=i*2.4,rad=Math.sqrt(i/110)*87;dot(ctx,Math.cos(a)*rad,Math.sin(a)*rad,1,'rgba(218,191,236,.24)')}ctx.restore();dot(ctx,588,232,5,'#f1cfef');
label(ctx,method.toUpperCase()+' / EXPLANATORY MODE',515,399,'#dcbfe0',9);label(ctx,'TOKEN × TOKEN',195,420,'#9c82a5',9);
ctx.restore();
});
// Existing site buttons retain their textual updates; these listeners update the new canvases too.
document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>scene=b.dataset.scenario));
document.querySelectorAll('[data-agent-step]').forEach(b=>b.addEventListener('click',()=>stage=b.dataset.agentStep));
document.querySelectorAll('[data-method]').forEach(b=>b.addEventListener('click',()=>method=b.dataset.method));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{const rig=rigs.find(r=>r.el===e.target);if(rig)rig.active=e.isIntersecting}),{rootMargin:'100px'});rigs.forEach(r=>observer.observe(r.el));
let frame=0,last=0;function render(ms){if(document.hidden){requestAnimationFrame(render);return}const time=reduced?0:ms/1000;if(reduced&&frame>3)return;for(const r of rigs){if(!r.active||!r.w)continue;r.ctx.save();r.fn(r.ctx,r.w,r.h,time);r.ctx.restore()}frame++;last=ms;requestAnimationFrame(render)}requestAnimationFrame(render);
})();
