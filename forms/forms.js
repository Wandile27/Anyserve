/* AnyServe forms engine. Edit CONFIG, then upload the whole folder. */
const CONFIG={
  /* Optional automatic delivery via Web3Forms (web3forms.com). Create one free access key per destination email,
     then paste them here. Leave empty to use the email / WhatsApp / copy fallback (no setup needed). */
  keys:{sales:"",support:""},
  email:{sales:"info@anyserve.co.za",support:"support@anyserve.co.za"},
  whatsapp:"",   /* AnyServe WhatsApp, digits only e.g. 27XXXXXXXXX. Empty lets the sender choose the contact. */
  home:"https://anyserve.co.za"
};

/* ---- field helpers: [name,label,type,hint,options,wide] ---- */
const T=(k,l,h="",w=0)=>[k,l,"t",h,"",w], P=(k,l,h="",w=0)=>[k,l,"p",h,"",w], E=(k,l,h="",w=0)=>[k,l,"e",h,"",w];
const A=(k,l,h="")=>[k,l,"a",h,"",1], Sel=(k,l,o,h="",w=0)=>[k,l,"s",h,o,w], Ck=(k,l,o,h="")=>[k,l,"c",h,o,1], Ag=(k,l,o)=>[k,l,"y","",o,1];
const has=(d,k,v)=>Array.isArray(d[k])?d[k].includes(v):d[k]===v;
const WHO=(t="1. Your details")=>({t,d:"So we know who to contact. We serve customers nationwide.",f:[T("name","Your name"),T("biz","Business name (if any)"),P("phone","Phone / WhatsApp"),E("mail","Email address"),T("town","Town / city and province"),A("addr","Site address (if we need to visit)","Street and suburb")]});
const WHEN=Sel("when","When would you like this done?",["As soon as possible","Within a month","Within 3 months","Just getting a quote"]);
const BUD=Sel("bud","Budget in mind (optional)",["Not sure yet","Under R5,000","R5,000 - R20,000","R20,000 - R50,000","Over R50,000"]);

const FORMS={
website:{icon:"i-gl",eyebrow:"Websites & digital",title:"Website client information",desc:"Everything we need to build your website, in one place.",route:"sales",
 info:"Please do not type passwords or banking PINs. We never need them.",secs:[
 WHO("1. About your business"),
 {t:"2. About the business",d:"",f:[Sel("type","What kind of business?",["Guest house / B&B / lodge","Restaurant / takeaway","Events planning / catering","Other business"]),T("reg","Registered company name or number","Needed for online payments"),A("links","Existing website, Facebook, Instagram or listing links","Booking.com, Airbnb, LekkeSlaap, Google Business, etc."),T("hours","Operating hours",""),
  Ck("goals","What should the website do?",["Look professional online","Get booking / quote enquiries","Take online bookings","Take online payments or deposits","Online food ordering","Events / catering enquiries","Photo gallery","Google Maps","WhatsApp button"]),A("why","Main reason for wanting a website?","Example: more direct bookings and less commission"),A("cust","Who are your typical customers?"),WHEN]},
 {t:"3. Domain and business email",d:"You pay the registrar directly, so you always own your domain. We set it up for you.",f:[T("dom","Preferred web address","Example: yourbusiness.co.za. Give 2 or 3 choices"),Sel("hasdom","Do you already own a domain?",["No","Yes, with Domains.co.za","Yes, with another provider","Not sure"]),A("emails","Email addresses you would like","Example: info@, bookings@, name@"),Ag("domok","Domain agreement",["I understand I pay the domain and email fees directly to the registrar and will add AnyServe as Technical Contact."])]},
 {t:"4. Look and feel",d:"",f:[Sel("logo","Do you have a logo?",["Yes, I will send it","No, I need one","Not sure"]),T("cols","Brand colours"),A("style","Websites you like (links)","Tell us what you like about them"),T("tag","Tagline or slogan (if any)","","1"),A("soc","Social media links to show")]},
 {t:"5. Your story",d:"Rough notes are fine. We will turn them into professional copy.",f:[A("about","Tell us about the business","How it started, what makes it special, who runs it"),A("usp","Top 3 things customers love"),A("near","What is nearby, or where do you serve?")]},
 {t:"6. Accommodation details",d:"Only confirmed details are published. We will not guess.",show:d=>has(d,"type","Guest house / B&B / lodge"),f:[T("nrooms","Number of rooms / units"),T("sleeps","Total guests you can sleep"),A("rooms","Room list","For each room type: name, beds, sleeps how many, rate, amenities"),A("rates","Rates and seasons","Or 'rates on request'"),T("cin","Check-in times"),T("cout","Check-out time"),A("pol","Policies","Cancellation, children, pets, smoking, deposits"),A("meals","Breakfast / meals"),Ck("fac","Facilities",["Swimming pool","Garden","Braai area","Guest lounge","Conference room","Free Wi-Fi","Air-conditioning","Secure parking","Laundry","Airport transfers","Self-catering kitchen","Backup power"]),Ck("plat","Where are you listed today?",["Booking.com","Airbnb","LekkeSlaap","Expedia","Facebook only","Other"]),Sel("avail","How should we handle availability?",["Guests send an enquiry and we reply","Show availability, we block dates manually","Sync with Booking.com or other calendars","Not sure yet"],"",1)]},
 {t:"7. Restaurant / takeaway details",d:"",show:d=>has(d,"type","Restaurant / takeaway"),f:[A("menu","Menu and prices","Or say you will send a photo or file"),A("zones","Delivery areas and fees","Suburbs, distances, minimum order"),T("ohrs","Ordering and kitchen hours"),Sel("pos","Do you use a POS or printer?",["No","Yes","Interested in AnyTill POS"])]},
 {t:"8. Events planning and catering",d:"",show:d=>has(d,"type","Events planning / catering")||has(d,"goals","Events / catering enquiries"),f:[Ck("evsv","Services you offer",["Event planning","Catering","Décor / flowers","Equipment hire","Venue hire","Staffing","Cafeteria / canteen contract","Other"]),Ck("evty","Types of events",["Weddings","Corporate functions","Conferences","Birthdays / private","Funerals / memorial","Other"]),T("evnum","Typical or maximum guest numbers"),T("evarea","Areas you serve"),A("evpk","Packages, sample menus or pricing approach","Or 'quotes on request'"),A("evpast","Past events or clients you may name","Only names you have permission to show publicly")]},
 {t:"9. Online payments",d:"Payments always go into your own account, never ours.",show:d=>has(d,"goals","Take online payments or deposits")||has(d,"goals","Take online bookings")||has(d,"goals","Online food ordering"),f:[Sel("pay","Preferred provider",["PayFast","Yoco","Not sure, advise me","I already have an account"],"Fees are charged by the provider per transaction"),T("dep","Deposit or payment rule","Example: 50% deposit"),A("ref","Refund / cancellation rule"),Sel("payname","Is the account in the business's name?",["Yes","No, personal account","Not set up yet"],"",1)]},
 {t:"10. Photos and files",d:"Real photos sell best. Send the originals by WhatsApp, Google Drive or USB.",f:[Ck("ph","I will send photos of",["Exterior / entrance","Rooms (each type)","Bathrooms","Pool","Garden","Dining / lounge","Conference / event space","Food and menu","Events I have done","Team / owner","Surroundings / views"]),Sel("how","How will you send them?",["WhatsApp","Email","Google Drive / Dropbox link","USB / in person"]),Ck("docs","Other files",["Logo","Price list","Menu","Brochure","Terms / policies"]),Ag("own","Photo rights",["I own these photos or have permission to use them on my website."])]},
 {t:"11. Details to show on the website",d:"",f:[P("showp","Phone to display"),P("showw","WhatsApp to display"),E("shown","Email to display"),E("dest","Email enquiries should go to"),T("map","Google Maps link to your business","","1"),A("more","Anything else we should know?")]}]},

support:{icon:"i-it",eyebrow:"IT support",title:"IT support request",desc:"Computer, printer, email or software trouble? Tell us what is happening.",route:"support",secs:[WHO(),
 {t:"2. The problem",d:"",f:[Sel("urg","How urgent is it?",["Work has stopped","Urgent, today","This week","Planning ahead"]),Ck("cat","What is it about?",["Computer / laptop","Printer / scanner","Email / Microsoft 365","Internet / Wi-Fi","Software","Backup / data","New setup","User accounts / access","Other"]),A("desc","What is happening?","Error messages, what you see, anything helpful"),A("tried","What have you tried already?"),T("since","When did it start?"),T("dev","Which devices or users are affected?"),T("users","How many users / computers at the site?"),Sel("rem","Can we try to help remotely first?",["Yes","No, on-site only","Not sure"]),T("hrs","When is someone available at the site?"),Ck("plan","Interested in",["Monthly support plan","Backup solution","Microsoft 365 management"])]}]},

network:{icon:"i-net",eyebrow:"Networking & Wi-Fi",title:"Network and Wi-Fi site survey",desc:"Help us plan the right cabling and Wi-Fi for your building.",route:"sales",secs:[WHO(),
 {t:"2. The site",d:"",f:[Sel("site","Type of site",["Office","Shop","School","Guest house / B&B","Warehouse / industrial","Restaurant","Home","Other"]),T("bld","Number of buildings / floors"),T("area","Approx. size (m²) or number of rooms"),T("users","Number of users"),T("devs","Approx. number of devices (phones, PCs, TVs, etc.)"),Sel("ceil","Ceiling / wall type",["Open roof","Rhino board / ceiling","Brick / concrete","Mixed","Not sure"]),Sel("pwr","Backup power (UPS / inverter)?",["Yes","No","Not sure"])]},
 {t:"3. What you need",d:"",f:[Ck("need","Tick all that apply",["New network cabling","Wi-Fi coverage in more areas","Guest Wi-Fi","Fix slow or dropping Wi-Fi","Cabinet / rack / patch panel","Wireless link between buildings","Separate staff and guest networks","Replace old equipment","Not sure, advise me"]),A("prob","Current problems","Dead zones, slow speeds, dropouts"),T("isp","Internet provider and package"),Sel("conn","Connection type",["Fibre","LTE / 5G","Wireless ISP","ADSL","Not sure"]),Sel("plan","Floor plan or photos available?",["Yes, I will send them","No","I can take photos"],"You can send photos or plans by WhatsApp"),WHEN,BUD,A("more","Anything else?")]}]},

cctv:{icon:"i-cam",eyebrow:"CCTV & security",title:"CCTV site survey",desc:"Tell us about your premises so we can recommend the right camera system.",route:"sales",secs:[WHO(),
 {t:"2. Your premises",d:"",f:[Sel("site","Type of site",["Shop","Office","School","Guest house / B&B","Warehouse","Restaurant","Home","Other"]),T("cams","Approx. number of cameras wanted"),Ck("areas","Areas to cover",["Entrance / gate","Parking","Perimeter / yard","Reception","Corridors / common areas","Kitchen","Till / cash point","Stock room / warehouse","Other"],"Please do not request cameras in bedrooms or bathrooms."),Sel("loc","Indoor or outdoor?",["Indoor","Outdoor","Both"]),Sel("old","Existing system?",["None","Analogue DVR","IP / NVR","Not sure"]),T("brand","Existing brand or model (if known)")]},
 {t:"3. Preferences",d:"",f:[Sel("rv","View on your phone?",["Yes","No","Not sure"]),Sel("days","How long should footage be kept?",["Not sure","7 days","14 days","30 days or more"]),Sel("inet","Internet at the site?",["Fibre","LTE / 5G","Wireless","None","Not sure"]),Sel("pwr","Backup power?",["Yes","No","Interested"]),Ck("extra","Also interested in",["Access control","Video intercom","Alarm integration","Fault finding on existing system"]),WHEN,BUD,A("more","Anything else?","Known blind spots, past incidents, special requirements")]}]},

hardware:{icon:"i-it",eyebrow:"Computers & hardware",title:"Hardware quote",desc:"Need PCs, laptops, printers or peripherals? Tell us what you are looking for and we will quote.",route:"sales",secs:[WHO(),
 {t:"2. What do you need?",d:"",f:[Ck("items","Tick everything you need",["Desktop PCs","Laptops","Monitors","Printers","Scanners","Keyboards & mice","UPS / power backup","Routers & network gear","Cables & accessories","POS hardware","Other"]),A("list","List what you need","Brand, model, specs and quantities if you know them. Rough ideas are fine."),T("qty","Total number of items"),Sel("for","Who is it for?",["Office / business","School","Home","Reseller / project","Other"]),T("brands","Preferred brands (if any)"),Sel("svc","Setup",["Supply only","Supply and set up","Supply, set up and transfer data from old computer","Not sure"]),Sel("del","Delivery",["Deliver to me","I will collect","Not sure"]),Ck("also","Also interested in",["Software installation","Printer set-up on the network","Backup solution","Support plan"]),WHEN,BUD,A("more","Anything else?")]}]},

pos:{icon:"i-pos",eyebrow:"AnyTill & business systems",title:"AnyTill POS requirements",desc:"Tell us how you trade so we can recommend the right till, hardware and setup.",route:"sales",secs:[WHO(),
 {t:"2. Your business",d:"",f:[Sel("type","Type of business",["Retail shop","Spaza / convenience","Restaurant / takeaway","Cafe / coffee shop","Bar / liquor","Other"]),T("outlets","Number of outlets"),T("tills","Number of tills / counters"),T("staff","Number of staff using the till"),T("prods","Approx. number of products / menu items"),Ck("sell","How do you sell?",["Counter sales","Dine-in","Takeaway","Delivery","Online orders"])]},
 {t:"3. What you need",d:"",f:[Ck("hw","Hardware you already have",["Computer / tablet","Touchscreen","Receipt printer","Kitchen printer","Cash drawer","Barcode scanner","Card machine","Nothing yet"]),T("card","Card machine provider (if any)"),Ck("feat","Features you want",["Stock tracking","Kitchen display","Customer loyalty","Sales reports","Multiple users / permissions","Works offline","Product import from Excel","Staff training"]),Sel("net","Internet reliability",["Reliable","Sometimes drops","Poor / none"]),Sel("ls","Load shedding backup?",["Yes","No","Need advice"]),Sel("mig","Do you have a product list to import?",["Yes, Excel","Yes, paper","No"]),WHEN,BUD,A("more","Anything else?")]}]}
};

/* ---- engine ---- */
const $=s=>document.querySelector(s);
const id=document.body.dataset.form;
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
const app=$("#app");
const icon=n=>`<svg class="ic"><use href="#${n}"/></svg>`;
const hero=(eb,t,d)=>`<section class="hero" style="padding:118px 0 56px"><div class="w"><span class="lb">${eb}</span><h1 style="font-size:clamp(2.2rem,5vw,3.8rem);margin:16px 0 14px">${t}</h1><p class="sub" style="margin:0">${d}</p></div></section>`;
if(id==="hub"){
  app.innerHTML=hero("Request forms","Tell us what you need.","Pick the form that fits. The more detail you give, the faster and more accurate our quote.")+`<section class="alt" style="padding:48px 0 90px"><div class="w"><div class="cd" style="margin-top:0">${Object.entries(FORMS).map(([k,f])=>`<a class="c" href="${k}.html">${icon(f.icon)}<h3>${f.title}</h3><p>${f.desc}</p><span class="lb" style="margin-top:8px">Open form &rarr;</span></a>`).join("")}</div></div></section>`;
}else{
const F=FORMS[id];
const secs=[...F.secs,{t:F.secs.length+1+". Confirm",d:"",f:[Ag("consent","Consent",["I agree that AnyServe may store and use this information to respond to my request (POPIA). See the privacy notice."])]}];
const KEY="anyserve_"+id+"_v1";
app.innerHTML=hero(F.eyebrow,F.title,F.desc)+`<div class="f-bar"><div class="w f-wrap"><div class="f-prog"><i id="pg"></i></div><small id="pt"></small></div></div>
<section class="alt" style="padding:36px 0 90px"><div class="w f-wrap">${F.info?`<p class="f-note">${F.info}</p>`:""}<form id="f" novalidate></form>
<div class="f-out" id="out"><h3>Your summary</h3><p class="f-d" id="outp"></p><pre id="pre"></pre>
<div class="acts"><button class="btn bp" id="cp" type="button">Copy</button><button class="btn bd" id="wa" type="button">Send via WhatsApp</button><button class="btn bd" id="em" type="button">Send by email</button><button class="btn bd" id="pr" type="button">Print / PDF</button></div><div class="f-msg" id="omsg" role="status"></div></div>
<div id="done"></div></div></section>`;
const form=$("#f");
secs.forEach((s,i)=>{const sec=document.createElement("fieldset");sec.className="f-sec";sec.dataset.s=i;sec.innerHTML=`<h3>${s.t}</h3>${s.d?`<p class="f-d">${s.d}</p>`:""}<div class="f-grid"></div>`;const g=sec.lastChild;
 s.f.forEach(([k,lab,ty,hint,opt,wide])=>{const d=document.createElement("div");if(wide||ty==="c"||ty==="y")d.className="f-span";
  let h=ty==="c"||ty==="y"?`<label>${lab}</label>`:`<label for="${k}">${lab}</label>`;
  if(ty==="a")h+=`<textarea id="${k}" name="${k}" rows="4"></textarea>`;
  else if(ty==="s")h+=`<select id="${k}" name="${k}"><option value="">Select…</option>${opt.map(o=>`<option>${esc(o)}</option>`).join("")}</select>`;
  else if(ty==="c"||ty==="y")h+=`<div class="f-opts${ty==="y"?" f-agree":""}">${opt.map(o=>`<label><input type="checkbox" name="${k}" value="${esc(o)}">${o}</label>`).join("")}</div>`;
  else h+=`<input id="${k}" name="${k}" type="${{t:"text",e:"email",p:"tel"}[ty]}" autocomplete="off">`;
  if(hint)h+=`<small>${hint}</small>`;d.innerHTML=h;g.appendChild(d)});form.appendChild(sec)});
form.insertAdjacentHTML("beforeend",`<div class="f-hp" aria-hidden="true"><label>Do not tick<input type="checkbox" id="bot" tabindex="-1" autocomplete="off"></label></div><button class="btn bp" id="send" type="button">Send to AnyServe &rarr;</button><div class="f-msg" id="msg" role="status"></div><small>We use your details only to respond and deliver the service.</small>`);
const data=()=>{const d={};form.querySelectorAll("[name]").forEach(el=>{const k=el.name;if(el.type==="checkbox"){d[k]=d[k]||[];if(el.checked)d[k].push(el.value)}else d[k]=el.value.trim()});return d};
function sync(){const d=data();let tot=0,fil=0;
 form.querySelectorAll(".f-sec").forEach(sec=>{const s=secs[sec.dataset.s];const vis=!s.show||s.show(d);sec.style.display=vis?"":"none";
  if(vis)s.f.forEach(([k,,ty])=>{if(ty==="y")return;tot++;if(ty==="c"?d[k].length:d[k])fil++})});
 const p=tot?Math.round(fil/tot*100):0;$("#pg").style.width=p+"%";$("#pt").textContent=p+"% COMPLETE · BLANK ANSWERS ARE FINE, WE WILL HELP";
 try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}}
try{const d=JSON.parse(localStorage.getItem(KEY)||"null");if(d)form.querySelectorAll("[name]").forEach(el=>{const v=d[el.name];if(v==null)return;if(el.type==="checkbox")el.checked=v.includes(el.value);else el.value=v})}catch(e){}
sync();form.addEventListener("input",sync);form.addEventListener("change",sync);
function summary(){const d=data();let o=`${F.title.toUpperCase()}\nSubmitted: ${new Date().toLocaleDateString("en-ZA")}\n`;
 secs.forEach(s=>{if(s.show&&!s.show(d))return;let b="";s.f.forEach(([k,lab,ty])=>{if(k==="consent")return;const v=d[k];const t=ty==="c"||ty==="y"?v.join(", "):v;if(t)b+=`• ${lab}: ${t}\n`});if(b)o+=`\n== ${s.t.replace(/^\d+\.\s*/,"").toUpperCase()} ==\n${b}`});return o}
const msg=(t,e,el="#msg")=>{const m=$(el);m.textContent=t;m.className="f-msg"+(e?" err":"")};
function fallback(why){$("#pre").textContent=summary();$("#outp").textContent=why;$("#out").style.display="block";$("#out").scrollIntoView({behavior:"smooth"})}
$("#send").onclick=async()=>{const d=data();msg("");
 if(!d.name||!(d.phone||d.mail)){msg("Please enter your name and a phone number or email so we can reach you.",1);$("#name").focus();return}
 if(!d.consent.length){msg("Please tick the consent box at the bottom.",1);return}
 if($("#bot").checked)return;
 const key=CONFIG.keys[F.route];
 if(!key){fallback("Send this to AnyServe with one of the buttons below.");return}
 const b=$("#send");b.disabled=true;msg("Sending…");
 try{const r=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({access_key:key,subject:`${F.title}: ${d.biz||d.name}`,from_name:d.name,email:d.mail||undefined,message:summary(),botcheck:""})});
  const j=await r.json();if(!j.success)throw 0;
  try{localStorage.removeItem(KEY)}catch(e){}
  form.style.display="none";$("#done").innerHTML=`<div class="f-out" style="display:block"><h3>Thank you, ${esc(d.name)}</h3><p>We have received your information and will be in touch soon.</p><a class="btn bp" href="../">Back to AnyServe</a></div>`;window.scrollTo({top:0,behavior:"smooth"})}
 catch(e){b.disabled=false;msg("");fallback("We could not send automatically. Please use one of the buttons below instead.")}};
$("#cp").onclick=async()=>{try{await navigator.clipboard.writeText($("#pre").textContent);msg("Copied. Paste it into WhatsApp or an email.",0,"#omsg")}catch(e){msg("Select the text and copy it.",1,"#omsg")}};
$("#wa").onclick=()=>window.open(`https://wa.me/${CONFIG.whatsapp}?text=`+encodeURIComponent($("#pre").textContent),"_blank","noopener");
$("#em").onclick=()=>{location.href=`mailto:${CONFIG.email[F.route]}?subject=`+encodeURIComponent(F.title+": "+(data().biz||data().name||""))+"&body="+encodeURIComponent($("#pre").textContent)};
$("#pr").onclick=()=>print();
}
const yy=$("#y");if(yy)yy.textContent=new Date().getFullYear();
const bg=$(".bg"),lk=$(".lk");if(bg)bg.onclick=()=>bg.setAttribute("aria-expanded",lk.classList.toggle("o"));
