!function(){let t;let e=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");function a(){let t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t}e.addEventListener("click",()=>{t=setInterval(a,1e3),e.disabled=!0,d.disabled=!1}),d.addEventListener("click",()=>{clearInterval(t),e.disabled=!1,d.disabled=!0})}();
//# sourceMappingURL=01-color-switcher.406688eb.js.map
