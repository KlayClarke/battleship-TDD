(()=>{var t={495:t=>{t.exports={gameBoard:(t,i)=>{const o={};return o.length=t,o.width=i,o.dimensions=[o.length,o.width],o.ships=[],o.missedAttackCoords=[],o.addShip=function(t){this.ships.push(t)},o.checkUserShipPosition=function(t,i,o,n){return i>o*n/2&&parseInt(i.toString()[1])<=o-(t-1)},o.recieveAttack=function(t,i){t.positions.contains(i)?t.hit(i):this.missedAttackCoords.push(i)},o},shipFactory:(t,i)=>{const o={};return o.length=t,o.width=i,o.dimensions=[o.length,o.width],o.initalPosition,o.allPositions=[],o.positionsHit=[],o.setInitialPosition=function(t){this.initalPosition=t},o.hit=function(t){this.positions.includes(t)&&this.positionsHit.push(t),this.positions.filter((i=>i!=t))},o.isSunk=function(){return 0==this.allPositions.length},o.randomizeCPUShipPosition=function(t,i,o){let n=i*o/2,e=Math.floor(Math.random()*n)+1;for(;1==e.toString().length&&e>i-(t-1)||0==e.toString()[1]||e.toString().length>1&&parseInt(e.toString()[1])>i-(t-1);)e=Math.floor(Math.random()*n)+1;console.log(e),this.initalPosition=e},o}}}},i={};function o(n){var e=i[n];if(void 0!==e)return e.exports;var s=i[n]={exports:{}};return t[n](s,s.exports,o),s.exports}(()=>{"use strict";var t=o(495);const i=document.querySelector(".grid-container");document.querySelector("#text"),function(){let o=(0,t.gameBoard)(10,10),n=(0,t.shipFactory)(4,1),e=(0,t.shipFactory)(4,1);o.addShip(n),o.addShip(e),n.randomizeCPUShipPosition(n.length,o.length,o.width);let s=o.dimensions,r=s[0]*s[1]/2+1;function d(t){console.log(t.target.id)}!function(){for(let t=0;t<s[1]*s[0];t++){const o=document.createElement("div");o.setAttribute("id",`${t+1}`),i.style.gridTemplateColumns=`repeat(${s[1]}, 1fr)`,i.style.gridTemplateRows=`repeat(${s[0]}, 1fr)`,i.appendChild(o).classList.add("grid-item")}}();const a=document.querySelectorAll(".grid-item");for(let t of a)t.innerText=t.id;for(let t of a)t.id>=r&&t.id<r+s[0]&&(t.style.borderTop="5px solid red");for(let t of a)t.id>=r?t.classList.add("disable"):t.classList.add("target");a.forEach((t=>t.addEventListener("click",d)))}()})()})();