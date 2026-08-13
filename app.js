const user={name:"",gender:"",country:"",height:"",weight:"",habits:[]};
let step=0;

const questions=[
 {text:'أهلًا بيك ❤️ أنا سنا. خلينا نتعرف على بعض بهدوء، وكل إجابة منك هتخليني أساعدك بشكل أقرب ليك.',type:'name',placeholder:'تحب أناديك بإيه؟'},
 {text:'جميل يا صديقي ☀️ تحب سنا تكلمك بصيغة إيه؟',type:'gender'},
 {text:'طيب قولي إنت موجود فين؟ 🌍 البلد هتساعدني أفهم الجو والشمس عندك بشكل أفضل.',type:'country',placeholder:'مثال: مصر'},
 {text:'وطولك كام تقريبًا؟ 🌱 مش محتاج رقم مثالي، رقم تقريبي كفاية.',type:'height',placeholder:'مثال: 180 سم'},
 {text:'ووزنك كام تقريبًا؟ ❤️ الهدف إني أفهم احتياجاتك، مش أحكم عليك.',type:'weight',placeholder:'مثال: 80 كجم'}
];

function save(){localStorage.setItem("sundoseUser",JSON.stringify(user));}

function renderWelcome(){
 const message=document.getElementById("message"), area=document.getElementById("form-area");
 const progress=document.getElementById("progress");
 if(!message||!area)return;
 const q=questions[step];
 progress.style.width=((step+1)/questions.length*100)+"%";
 message.innerHTML=q.text;
 if(q.type==="gender"){
   area.innerHTML='<div class="gender-grid"><button class="gender-btn" data-g="male">👨 ذكر</button><button class="gender-btn" data-g="female">👩 أنثى</button></div>';
   area.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{
     user.gender=b.dataset.g;
     area.querySelectorAll(".gender-btn").forEach(x=>x.classList.remove("active"));
     b.classList.add("active");
     setTimeout(()=>nextWelcome(),220);
   });
   return;
 }
 area.innerHTML='<input id="answer" type="'+(q.type==="height"||q.type==="weight"?"text":"text")+'" placeholder="'+q.placeholder+'"><div class="actions">'+(step?'<button class="back" id="back">رجوع</button>':'')+'<button class="next" id="next">نكمل ☀️</button></div>';
 document.getElementById("next").onclick=nextWelcome;
 if(step)document.getElementById("back").onclick=()=>{step--;renderWelcome()};
 document.getElementById("answer").focus();
}
function nextWelcome(){
 const q=questions[step], value=document.getElementById("answer")?.value.trim();
 if(!value)return;
 if(q.type==="name")user.name=value;
 if(q.type==="country")user.country=value;
 if(q.type==="height")user.height=value;
 if(q.type==="weight")user.weight=value;
 if(step<questions.length-1){step++;renderWelcome()}else{save();location.href="habits.html"}
}

function renderHabits(){
 const data=JSON.parse(localStorage.getItem("sundoseUser")||"{}");
 const msg=document.getElementById("habit-message"), box=document.getElementById("habits");
 if(!msg||!box)return;
 msg.innerHTML=`تمام يا ${data.name||"صديقي"} ❤️ دلوقتي نختار مع بعض الحاجة اللي تحب تبدأ بيها. اختار اللي يهمك، وسنا هتمشي معاك خطوة بخطوة.`;
 const items=[
  ["sun","☀️","الشمس","التعرض المناسب للشمس جزء من روتين صحي متوازن."],
  ["water","💧","المياه","الترطيب المنتظم يساعد جسمك يحافظ على نشاطه ووظائفه."],
  ["sport","🏃","الرياضة","الاستمرار في الحركة أهم من إنك تبدأ بمجهود كبير."],
  ["treatment","💊","العلاج والمكملات","لو عندك علاج أو مكملات، تنظيمها أهم من استخدامها بعشوائية."]
 ];
 box.innerHTML=items.map(x=>`<button class="habit" data-h="${x[0]}"><div class="icon">${x[1]}</div><b>${x[2]}</b><p>${x[3]}</p></button>`).join("");
 box.querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>{
   b.classList.toggle("active");
   const k=b.dataset.h;
   if(user.habits.includes(k))user.habits=user.habits.filter(x=>x!==k);else user.habits.push(k);
   save();
 });
 document.getElementById("continue").onclick=()=>{
   save();
   alert("ممتاز ❤️ الخطوة التالية هنجهزها بعد ما نتأكد إن التعارف والاختيارات شغالين بشكل سليم.");
 };
}

if(location.pathname.endsWith("/welcome.html"))renderWelcome();
if(location.pathname.endsWith("/habits.html"))renderHabits();
