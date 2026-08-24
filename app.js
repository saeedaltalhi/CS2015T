
(()=>{
  const $=(s,root=document)=>root.querySelector(s);
  const $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const state={
    completed:new Set(JSON.parse(localStorage.getItem("ds_completed")||"[]")),
    chapter:location.hash.replace("#","")||"home",
    lang:localStorage.getItem("ds_lang")||"ar"
  };
  const T={
    ar:{
      home:"الرئيسية", progress:"تقدمك", startHint:"ابدأ بأول فصل ثم أكمل بطريقتك.",
      completedCount:(a,b)=>`${a} من ${b} فصول مكتملة`, allDone:"أنهيت كل الفصول. ارجع للمحاكاة والأسئلة للمراجعة.",
      reset:"مسح التقدم", dark:"الوضع الداكن", light:"الوضع الفاتح", lang:"English",
      learn:"تعلم بالمشاهدة والتجربة", continue:"ابدأ من حيث توقفت", sorting:"افتح محاكاة الترتيب",
      chapters:"فصول أساسية", simulators:"محاكيات تفاعلية", quizzes:"اختبارات سريعة", tries:"عدد مرات التجربة",
      map:"خريطة المقرر", mapLead:"كل فصل قصير نسبيًا. اقرأ الفكرة، جرّب المحاكاة، ثم أجب عن السؤال.",
      chapter:"الفصل", minutes:"دقيقة تقريبًا", complete:"مكتمل ✓", notComplete:"لم يكتمل بعد", open:"فتح الفصل",
      inside:"داخل هذا الفصل", simulation:"المحاكاة", quiz:"اختبار سريع", try:"جرّب بنفسك",
      simLead:"غيّر القيم واضغط الأزرار وشاهد النتيجة. تستطيع إعادة الضبط والتجربة مرة أخرى.",
      check:"تحقق", choose:"اختر إجابة أولًا.", correct:"صحيح. ", wrong:"ليست الإجابة الصحيحة. ",
      doneTitle:"تم تسجيل الفصل كمكتمل ✓", finishTitle:"أنهيت القراءة والتجربة؟",
      doneHint:"يمكنك تغيير الحالة في أي وقت.", undo:"إلغاء الاكتمال", mark:"اعتبر الفصل مكتملًا",
      confirmReset:"مسح كل علامات التقدم؟"
    },
    en:{
      home:"Home", progress:"Your progress", startHint:"Start with the first chapter and continue at your own pace.",
      completedCount:(a,b)=>`${a} of ${b} chapters completed`, allDone:"You completed every chapter. Revisit the simulations and quizzes for review.",
      reset:"Reset progress", dark:"Dark mode", light:"Light mode", lang:"العربية",
      learn:"Learn by seeing and doing", continue:"Continue where you left off", sorting:"Open Sorting Visualizer",
      chapters:"Core chapters", simulators:"Interactive simulators", quizzes:"Quick quizzes", tries:"Attempts",
      map:"Course roadmap", mapLead:"Each chapter is intentionally focused. Read the idea, try the simulation, then answer the question.",
      chapter:"Chapter", minutes:"min approx.", complete:"Completed ✓", notComplete:"Not completed yet", open:"Open chapter",
      inside:"Inside this chapter", simulation:"Simulation", quiz:"Quick quiz", try:"Try it yourself",
      simLead:"Change the values, press the controls, and watch what happens. Reset and experiment as many times as you like.",
      check:"Check answer", choose:"Choose an answer first.", correct:"Correct. ", wrong:"Not quite. ",
      doneTitle:"Chapter marked as completed ✓", finishTitle:"Finished reading and experimenting?",
      doneHint:"You can change this status at any time.", undo:"Mark incomplete", mark:"Mark chapter complete",
      confirmReset:"Reset all progress?"
    }
  };
  const tr=()=>T[state.lang];
  const txt=v=>typeof v==="string"?v:(v?.[state.lang]??v?.ar??"");


  function save(){
    localStorage.setItem("ds_completed",JSON.stringify([...state.completed]));
    updateProgress();
  }
  function updateProgress(){
    const pct=Math.round(state.completed.size/COURSE.chapters.length*100);
    $("#progressText").textContent=pct+"%";
    $("#progressBar").style.width=pct+"%";
    $("#progressLabel").textContent=tr().progress;
    $("#progressHint").textContent=pct===100?tr().allDone:tr().completedCount(state.completed.size,COURSE.chapters.length);
    renderNav();
  }
  function renderNav(){
    const nav=$("#chapterNav");
    nav.innerHTML=`<button class="nav-item ${state.chapter==="home"?"active":""}" data-go="home"><span class="nav-num">⌂</span><span>${tr().home}</span></button>`+
      COURSE.chapters.map(c=>`<button class="nav-item ${state.chapter===c.id?"active":""} ${state.completed.has(c.id)?"done":""}" data-go="${c.id}">
      <span class="nav-num">${state.completed.has(c.id)?"✓":c.n}</span><span>${txt(c.title)}</span></button>`).join("");
  }
  function go(id){
    state.chapter=id;
    location.hash=id==="home"?"":id;
    render();
    window.scrollTo({top:0,behavior:"smooth"});
    $("#sidebar").classList.remove("open");
  }

  function home(){
    $("#crumb").textContent=tr().home;
    return `
      <section class="hero">
        <span class="kicker">${COURSE.code} · ${tr().learn}</span>
        <h1>${state.lang==="ar"?"هياكل البيانات<br>من الفكرة إلى الحركة.":"Data Structures<br>from idea to motion."}</h1>
        <p>${txt(COURSE.intro)}</p>
        <div class="hero-actions">
          <button class="primary-btn" data-go="${COURSE.chapters.find(c=>!state.completed.has(c.id))?.id||"arrays"}">${tr().continue}</button>
          <button class="secondary-btn" data-go="sorting">${tr().sorting}</button>
        </div>
      </section>
      <div class="stat-grid">
        <div class="stat"><strong>${COURSE.chapters.length}</strong><span>${tr().chapters}</span></div>
        <div class="stat"><strong>8+</strong><span>${tr().simulators}</span></div>
        <div class="stat"><strong>${COURSE.chapters.length}</strong><span>${tr().quizzes}</span></div>
        <div class="stat"><strong>∞</strong><span>${tr().tries}</span></div>
      </div>
      <section class="section">
        <h2 class="section-title">${tr().map}</h2>
        <p class="section-lead">${tr().mapLead}</p>
        <div class="chapter-grid">
          ${COURSE.chapters.map(c=>`
            <article class="chapter-card">
              <span class="tag">${tr().chapter} ${c.n} · ${c.minutes} ${tr().minutes}</span>
              <h3>${txt(c.title)}</h3>
              <p>${txt(c.summary)}</p>
              <div class="chapter-meta"><span class="pill">${state.lang==="ar"?c.title.en:c.title.ar}</span><span class="pill">${state.completed.has(c.id)?tr().complete:tr().notComplete}</span></div>
              <div style="margin-top:13px"><button class="ghost-btn" data-go="${c.id}">${tr().open}</button></div>
            </article>`).join("")}
        </div>
      </section>`;
  }
  function chapterPage(c){
    $("#crumb").textContent=`${tr().chapter} ${c.n} / ${txt(c.title)}`;
    const toc=c.sections.map((s,i)=>`<a href="#sec-${i}" data-anchor="sec-${i}">${txt(s.title)}</a>`).join("")+
      `<a href="#simulation" data-anchor="simulation">${tr().simulation}</a><a href="#quiz" data-anchor="quiz">${tr().quiz}</a>`;
    return `
      <div class="chapter-head">
        <div>
          <span class="kicker">${state.lang==="ar"?c.title.en:c.title.ar}</span>
          <h1>${txt(c.title)}</h1>
          <p>${txt(c.summary)}</p>
        </div>
        <div class="chapter-index">${String(c.n).padStart(2,"0")}</div>
      </div>
      <div class="lesson-layout">
        <div class="lesson-main">
          ${c.sections.map((s,i)=>`<section class="block" id="sec-${i}"><h2>${txt(s.title)}</h2>${txt(s.html)}</section>`).join("")}
          <section class="block" id="simulation"><h2>${tr().try}</h2><p class="muted">${tr().simLead}</p>${simulation(c.sim)}</section>
          ${quiz(c)}
          <div class="complete-box">
            <div><strong>${state.completed.has(c.id)?tr().doneTitle:tr().finishTitle}</strong><div class="muted" style="font-size:12px">${tr().doneHint}</div></div>
            <button class="${state.completed.has(c.id)?"secondary-btn":"primary-btn"}" data-complete="${c.id}">${state.completed.has(c.id)?tr().undo:tr().mark}</button>
          </div>
        </div>
        <aside class="lesson-aside"><h3>${tr().inside}</h3>${toc}</aside>
      </div>`;
  }

  function quiz(c){
    const opts=c.quiz.options[state.lang]||c.quiz.options.ar;
    return `<section class="quiz" id="quiz" data-quiz="${c.id}">
      <div class="q-title">${txt(c.quiz.q)}</div>
      ${opts.map((o,i)=>`<label class="option"><input type="radio" name="q-${c.id}" value="${i}"><span>${o}</span></label>`).join("")}
      <div class="sim-controls"><button class="primary-btn" data-check="${c.id}">${tr().check}</button></div>
      <div class="feedback" id="feedback-${c.id}"></div>
    </section>`;
  }

  function simulation(type){
    if(type==="binary") return `
      <div class="visual-box">
        <div class="array-row" id="bsArray"></div>
        <div class="sim-controls"><input id="bsTarget" type="number" value="23" aria-label="القيمة المطلوبة"><button class="primary-btn" id="bsStep">الخطوة التالية</button><button class="ghost-btn" id="bsReset">إعادة</button></div>
        <div class="output" id="bsOut">المصفوفة مرتبة. اختر قيمة ثم ابدأ.</div>
      </div>`;
    if(type==="linked") return `
      <div class="visual-box"><div class="node-row" id="llView"></div>
      <div class="sim-controls"><input id="llValue" type="number" value="40"><button class="primary-btn" id="llHead">إضافة في البداية</button><button class="secondary-btn" id="llTail">إضافة في النهاية</button><button class="danger-btn" id="llRemove">حذف أول عنصر</button></div>
      <div class="output" id="llOut">غيّر القائمة وشاهد حركة head والروابط.</div></div>`;
    if(type==="recursion") return `
      <div class="visual-box"><div class="sim-controls"><input id="recN" type="number" min="1" max="8" value="5"><button class="primary-btn" id="recBuild">اعرض Call Stack</button></div><div id="recView" class="stack-view"></div><div class="output" id="recOut">اختر n بين 1 و8.</div></div>`;
    if(type==="complexity") return `
      <div class="visual-box"><div class="sim-controls"><select id="cxN"><option>10</option><option>100</option><option>1000</option><option>10000</option></select></div><div id="cxView"></div></div>`;
    if(type==="stackqueue") return `
      <div class="visual-box"><div class="sim-controls"><input id="sqVal" value="A" maxlength="4"><button class="primary-btn" id="push">Push</button><button class="danger-btn" id="pop">Pop</button><button class="primary-btn" id="enqueue">Enqueue</button><button class="danger-btn" id="dequeue">Dequeue</button></div><h3>Stack</h3><div class="stack-view" id="stackView"></div><h3>Queue</h3><div class="array-row" id="queueView"></div><div class="output" id="sqOut">جرّب نفس القيم في Stack وQueue ولاحظ من يخرج أولًا.</div></div>`;
    if(type==="tree") return `
      <div class="visual-box"><div class="sim-controls"><input id="treeVal" type="number" value="45"><button class="primary-btn" id="treeAdd">أضف إلى BST</button><button class="ghost-btn" id="treeReset">إعادة</button></div><svg class="tree-svg" id="treeSvg" viewBox="0 0 760 300" aria-label="Binary Search Tree"></svg><div class="output" id="treeOut">ابدأ بالشجرة الحالية أو أعد ضبطها.</div></div>`;
    if(type==="sorting") return `
      <div class="visual-box"><div class="bar-area" id="sortBars"></div><div class="sim-controls"><select id="sortAlgo"><option value="bubble">Bubble Sort</option><option value="selection">Selection Sort</option><option value="insertion">Insertion Sort</option></select><button class="primary-btn" id="sortRun">تشغيل</button><button class="ghost-btn" id="sortShuffle">قيم جديدة</button></div><div class="output" id="sortOut">اختر خوارزمية وشغّلها.</div></div>`;
    if(type==="heap") return `
      <div class="visual-box"><div class="sim-controls"><input id="heapVal" type="number" value="90"><button class="primary-btn" id="heapAdd">Add to Max Heap</button><button class="danger-btn" id="heapPop">Remove Max</button></div><div class="array-row" id="heapView"></div><div class="output" id="heapOut">الـ index 0 هو الجذر وأكبر قيمة في Max Heap.</div></div>`;
    if(type==="graph") return `
      <div class="visual-box"><div class="graph-canvas" id="graphCanvas"></div><div class="sim-controls"><button class="primary-btn" id="bfsRun">تشغيل BFS</button><button class="secondary-btn" id="dfsRun">تشغيل DFS</button><button class="ghost-btn" id="graphReset">إعادة</button></div><div class="output" id="graphOut">نقطة البداية A.</div></div>`;
    if(type==="hash") return `
      <div class="visual-box"><div class="hash-grid" id="hashView"></div><div class="sim-controls"><input id="hashKey" type="number" value="27"><button class="primary-btn" id="hashAdd">إدخال المفتاح</button><button class="ghost-btn" id="hashReset">إعادة</button></div><div class="output" id="hashOut">الدالة المستخدمة: key % 10، وعند التصادم ننتقل للخانة التالية.</div></div>`;
    return "";
  }

  function initSimulation(type){
    if(type==="binary") initBinary();
    if(type==="linked") initLinked();
    if(type==="recursion") initRecursion();
    if(type==="complexity") initComplexity();
    if(type==="stackqueue") initStackQueue();
    if(type==="tree") initTree();
    if(type==="sorting") initSorting();
    if(type==="heap") initHeap();
    if(type==="graph") initGraph();
    if(type==="hash") initHash();
  }

  function initBinary(){
    const arr=[3,8,12,17,23,29,35,41,56,72,90]; let low=0,high=arr.length-1,done=false;
    const draw=(mid=-1)=>{$("#bsArray").innerHTML=arr.map((v,i)=>`<div class="cell ${i===mid?"active":""} ${i<low||i>high?"dim":""}">${v}<small>${i}</small></div>`).join("")}
    const reset=()=>{low=0;high=arr.length-1;done=false;draw();$("#bsOut").textContent="جاهز. في كل خطوة سنفحص المنتصف ونستبعد نصفًا."}
    $("#bsReset").onclick=reset;
    $("#bsStep").onclick=()=>{if(done)return reset();const t=Number($("#bsTarget").value);if(low>high){$("#bsOut").textContent=`${t} غير موجود. انتهت مساحة البحث.`;done=true;return}let m=Math.floor((low+high)/2);draw(m);if(arr[m]===t){$("#bsOut").textContent=`وجدنا ${t} عند index ${m}.`;done=true;return}if(t<arr[m]){high=m-1;$("#bsOut").textContent=`${t} أصغر من ${arr[m]}، إذن نحذف النصف الأيمن.`}else{low=m+1;$("#bsOut").textContent=`${t} أكبر من ${arr[m]}، إذن نحذف النصف الأيسر.`}};
    $("#bsTarget").onchange=reset; reset();
  }
  function initLinked(){
    let a=[10,20,30];
    const draw=()=>{$("#llView").innerHTML=a.length?a.map((v,i)=>`<div class="node">${v}</div>${i<a.length-1?'<span class="arrow">→</span>':''}`).join(""):'<span class="muted">القائمة فارغة</span>'}
    $("#llHead").onclick=()=>{a.unshift(Number($("#llValue").value));draw();$("#llOut").textContent="تم تغيير head ليشير إلى العقدة الجديدة."}
    $("#llTail").onclick=()=>{a.push(Number($("#llValue").value));draw();$("#llOut").textContent="مررنا إلى النهاية ثم ربطنا العقدة الجديدة."}
    $("#llRemove").onclick=()=>{const x=a.shift();draw();$("#llOut").textContent=x===undefined?"لا يوجد عنصر للحذف.":`حذفنا ${x} وأصبح head يشير إلى العقدة التالية.`}
    draw();
  }
  function initRecursion(){
    $("#recBuild").onclick=()=>{let n=Math.max(1,Math.min(8,Number($("#recN").value)||1));let html="",result=1;for(let i=n;i>=1;i--){html+=`<div class="stack-cell">factorial(${i})</div>`;result*=i}$("#recView").innerHTML=html;$("#recOut").textContent=`وصلنا إلى factorial(1)، ثم تبدأ العودة: النتيجة = ${result}.`};$("#recBuild").click();
  }
  function initComplexity(){
    const render=()=>{let n=Number($("#cxN").value);const rows=[["O(1)",1],["O(log n)",Math.ceil(Math.log2(n))],["O(n)",n],["O(n log n)",Math.round(n*Math.log2(n))],["O(n²)",n*n)];$("#cxView").innerHTML=`<table style="width:100%;border-collapse:collapse">${rows.map(r=>`<tr><td style="padding:9px;border-bottom:1px solid var(--line)"><b>${r[0]}</b></td><td class="ltr" style="padding:9px;border-bottom:1px solid var(--line)">${r[1].toLocaleString()}</td></tr>`).join("")}</table>`};$("#cxN").onchange=render;render();
  }
  function initStackQueue(){
    let s=[],q=[];const draw=()=>{$("#stackView").innerHTML=s.map(v=>`<div class="stack-cell">${v}</div>`).join("")||'<span class="muted">فارغ</span>';$("#queueView").innerHTML=q.map(v=>`<div class="cell">${v}</div>`).join("")||'<span class="muted">فارغ</span>'}
    $("#push").onclick=()=>{s.push($("#sqVal").value||"?");draw()};$("#pop").onclick=()=>{$("#sqOut").textContent=s.length?`Stack أخرج: ${s.pop()}`:"Stack فارغ";draw()};$("#enqueue").onclick=()=>{q.push($("#sqVal").value||"?");draw()};$("#dequeue").onclick=()=>{$("#sqOut").textContent=q.length?`Queue أخرج: ${q.shift()}`:"Queue فارغ";draw()};draw();
  }
  function initTree(){
    let vals=[50,30,70,20,40,60,80];
    const draw=()=>{const svg=$("#treeSvg");let nodes=[];function add(idx,x,y,spread,depth){if(idx>=vals.length||vals[idx]==null)return;nodes.push({idx,v:vals[idx],x,y,parent:idx?Math.floor((idx-1)/2):null});add(idx*2+1,x-spread,y+75,spread*.55,depth+1);add(idx*2+2,x+spread,y+75,spread*.55,depth+1)}add(0,380,38,175,0);let map=Object.fromEntries(nodes.map(n=>[n.idx,n]));svg.innerHTML=nodes.filter(n=>n.parent!==null&&map[n.parent]).map(n=>`<line x1="${map[n.parent].x}" y1="${map[n.parent].y}" x2="${n.x}" y2="${n.y}"/>`).join("")+nodes.map(n=>`<circle cx="${n.x}" cy="${n.y}" r="22"/><text x="${n.x}" y="${n.y}">${n.v}</text>`).join("")}
    function insert(v){if(!vals.length){vals=[v];return}let i=0;while(true){if(vals[i]==null){vals[i]=v;break}if(v===vals[i])break;i=v<vals[i]?i*2+1:i*2+2;if(i>63)break} }
    $("#treeAdd").onclick=()=>{insert(Number($("#treeVal").value));draw();$("#treeOut").textContent="تم إدخال القيمة حسب مقارنات BST."};$("#treeReset").onclick=()=>{vals=[50,30,70,20,40,60,80];draw()};draw();
  }
  function initSorting(){
    let a=[];let running=false;const sleep=ms=>new Promise(r=>setTimeout(r,ms));const shuffle=()=>{if(running)return;a=Array.from({length:13},()=>Math.floor(Math.random()*80)+10);draw();$("#sortOut").textContent="قيم جديدة جاهزة."}
    const draw=(active=[],done=[])=>{$("#sortBars").innerHTML=a.map((v,i)=>`<div class="bar ${active.includes(i)?"active":""} ${done.includes(i)?"done":""}" style="height:${v*1.8}px">${v}</div>`).join("")}
    $("#sortShuffle").onclick=shuffle;
    $("#sortRun").onclick=async()=>{if(running)return;running=true;let comps=0,swaps=0,algo=$("#sortAlgo").value;
      if(algo==="bubble"){for(let end=a.length-1;end>0;end--){for(let i=0;i<end;i++){comps++;draw([i,i+1]);await sleep(70);if(a[i]>a[i+1]){[a[i],a[i+1]]=[a[i+1],a[i]];swaps++}}}}
      if(algo==="selection"){for(let i=0;i<a.length-1;i++){let m=i;for(let j=i+1;j<a.length;j++){comps++;draw([m,j]);await sleep(65);if(a[j]<a[m])m=j}if(m!==i){[a[i],a[m]]=[a[m],a[i]];swaps++}}}
      if(algo==="insertion"){for(let i=1;i<a.length;i++){let key=a[i],j=i-1;while(j>=0){comps++;draw([j,j+1]);await sleep(65);if(a[j]<=key)break;a[j+1]=a[j];swaps++;j--}a[j+1]=key}}
      draw([],a.map((_,i)=>i));$("#sortOut").textContent=`انتهى الترتيب: ${comps} مقارنة، ${swaps} حركة/تبديل.`;running=false};shuffle();
  }
  function initHeap(){
    let h=[88,61,72,25,50,40,65];const up=i=>{while(i>0){let p=Math.floor((i-1)/2);if(h[p]>=h[i])break;[h[p],h[i]]=[h[i],h[p]];i=p}};const down=i=>{while(true){let l=i*2+1,r=i*2+2,m=i;if(l<h.length&&h[l]>h[m])m=l;if(r<h.length&&h[r]>h[m])m=r;if(m===i)break;[h[i],h[m]]=[h[m],h[i]];i=m}}
    const draw=()=>{$("#heapView").innerHTML=h.map((v,i)=>`<div class="hash-cell">${v}<small>${i}</small></div>`).join("")}
    $("#heapAdd").onclick=()=>{h.push(Number($("#heapVal").value));up(h.length-1);draw();$("#heapOut").textContent="أضفنا القيمة ثم نفذنا bubble-up حتى عادت خاصية Max Heap."};$("#heapPop").onclick=()=>{if(!h.length)return;let max=h[0];h[0]=h[h.length-1];h.pop();down(0);draw();$("#heapOut").textContent=`حذفنا أكبر قيمة: ${max}، ثم أعدنا ترتيب الجذر للأسفل.`};draw();
  }
  function initGraph(){
    const pos={A:[15,45],B:[38,18],C:[40,70],D:[65,18],E:[68,54],F:[85,75]}, edges=[["A","B"],["A","C"],["B","D"],["B","E"],["C","E"],["D","F"],["E","F"]];
    const adj={A:["B","C"],B:["A","D","E"],C:["A","E"],D:["B","F"],E:["B","C","F"],F:["D","E"]};let timer=null;
    function draw(active="",done=[]){const el=$("#graphCanvas");let html="";for(const [a,b] of edges){let [x1,y1]=pos[a],[x2,y2]=pos[b],dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy),ang=Math.atan2(dy,dx)*180/Math.PI;html+=`<div class="gedge" style="left:${x1}%;top:${y1}%;width:${len}%;transform:rotate(${ang}deg)"></div>`}for(const [n,[x,y]] of Object.entries(pos)){html+=`<div class="gnode ${active===n?"active":""} ${done.includes(n)?"done":""}" style="left:calc(${x}% - 24px);top:calc(${y}% - 24px)">${n}</div>`}el.innerHTML=html}
    function animate(order,label){clearInterval(timer);let i=0,done=[];draw();$("#graphOut").textContent=`${label}: `;timer=setInterval(()=>{if(i>=order.length){clearInterval(timer);return}let n=order[i++];done.push(n);draw(n,done);$("#graphOut").textContent=`${label}: ${done.join(" → ")}`},550)}
    function bfs(){let q=["A"],seen=new Set(["A"]),o=[];while(q.length){let x=q.shift();o.push(x);for(const y of adj[x])if(!seen.has(y)){seen.add(y);q.push(y)}}return o}
    function dfs(){let o=[],seen=new Set;function go(x){seen.add(x);o.push(x);for(const y of adj[x])if(!seen.has(y))go(y)}go("A");return o}
    $("#bfsRun").onclick=()=>animate(bfs(),"BFS");$("#dfsRun").onclick=()=>animate(dfs(),"DFS");$("#graphReset").onclick=()=>{clearInterval(timer);draw();$("#graphOut").textContent="نقطة البداية A."};draw();
  }
  function initHash(){
    let t=Array(10).fill(null);const draw=(active=-1)=>{$("#hashView").innerHTML=t.map((v,i)=>`<div class="hash-cell ${i===active?"active":""}">${v??"—"}<small>${i}</small></div>`).join("")}
    $("#hashAdd").onclick=()=>{let k=Number($("#hashKey").value),start=((k%10)+10)%10,i=start,steps=0;while(t[i]!==null&&steps<10){i=(i+1)%10;steps++}if(steps>=10){$("#hashOut").textContent="الجدول ممتلئ.";return}t[i]=k;draw(i);$("#hashOut").textContent=steps?`h(${k}) = ${start} لكن الخانة مشغولة؛ تحركنا ${steps} خطوة ووضعناه في ${i}.`:`h(${k}) = ${i}. لا يوجد تصادم.`};$("#hashReset").onclick=()=>{t=Array(10).fill(null);draw()};draw();
  }

  function render(){
    renderNav();
    const c=COURSE.chapters.find(x=>x.id===state.chapter);
    $("#content").innerHTML=c?chapterPage(c):home();
    bindPage();
    if(c)initSimulation(c.sim);
    updateProgress();
  }
  function bindPage(){
    $$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
    $$("[data-complete]").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.complete;state.completed.has(id)?state.completed.delete(id):state.completed.add(id);save();render()}));
    $$("[data-check]").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.check,c=COURSE.chapters.find(x=>x.id===id),sel=$(`input[name="q-${id}"]:checked`),fb=$(`#feedback-${id}`);if(!sel){fb.className="feedback show wrong";fb.textContent=tr().choose;return}const ok=Number(sel.value)===c.quiz.answer;fb.className=`feedback show ${ok?"correct":"wrong"}`;fb.textContent=(ok?tr().correct:tr().wrong)+txt(c.quiz.explain);}));
    $$("[data-anchor]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();document.getElementById(a.dataset.anchor)?.scrollIntoView({behavior:"smooth",block:"start"})}));
  }

  $("#chapterNav").addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)go(b.dataset.go)});
  $("#menuBtn").onclick=()=>$("#sidebar").classList.toggle("open");
  $("#resetProgress").onclick=()=>{if(confirm(tr().confirmReset)){state.completed.clear();save();render()}};
  $("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("ds_dark",document.body.classList.contains("dark")?"1":"0");$("#themeBtn").textContent=document.body.classList.contains("dark")?tr().light:tr().dark};
  if(localStorage.getItem("ds_dark")==="1"){document.body.classList.add("dark");$("#themeBtn").textContent=tr().light}
  function applyLanguage(){
    document.documentElement.lang=state.lang;
    document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
    $("#langBtn").textContent=tr().lang;
    $("#themeBtn").textContent=document.body.classList.contains("dark")?tr().light:tr().dark;
    $("#resetProgress").textContent=tr().reset;
    $("#menuBtn").setAttribute("aria-label",state.lang==="ar"?"فتح القائمة":"Open menu");
    render();
  }
  $("#langBtn").onclick=()=>{
    state.lang=state.lang==="ar"?"en":"ar";
    localStorage.setItem("ds_lang",state.lang);
    applyLanguage();
  };
  window.addEventListener("hashchange",()=>{state.chapter=location.hash.replace("#","")||"home";render()});
  document.documentElement.lang=state.lang;
  document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
  $("#langBtn").textContent=tr().lang;
  $("#resetProgress").textContent=tr().reset;
  render();
})();
