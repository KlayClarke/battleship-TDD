(()=>{var t={495:t=>{t.exports={gameBoard:(t,i)=>{const n={};return n.length=t,n.width=i,n.dimensions=[n.length,n.width],n.ships=[],n.missedAttackCoords=[],n.addShip=function(t){this.ships.push(t)},n.checkUserShipPosition=function(t,i,n,o){return i>n*o/2&&parseInt(i.toString()[1])<=n-(t-1)},n.recieveAttack=function(t,i){t.positions.contains(i)?t.hit(i):this.missedAttackCoords.push(i)},n},shipFactory:(t,i)=>{const n={};return n.length=t,n.width=i,n.dimensions=[n.length,n.width],n.initalPosition,n.allPositions=[],n.setInitialPosition=function(t){this.initalPosition=t},n.setAllPositions=function(){for(let t=this.initalPosition;t<this.initalPosition+this.length;t++)this.allPositions.push(t)},n.hit=function(t){this.allPositions.includes(t)&&(this.allPositions=this.allPositions.filter((i=>i!=t)))},n.isSunk=function(){return 0==this.allPositions.length},n.randomizeCPUShipPosition=function(t,i,n){let o=i*n/2,e=Math.floor(Math.random()*o)+1;for(;1==e.toString().length&&e>i-(t-1)||0==e.toString()[1]||e.toString().length>1&&parseInt(e.toString()[1])>i-(t-1);)e=Math.floor(Math.random()*o)+1;this.initalPosition=e},n}}}},i={};function n(o){var e=i[o];if(void 0!==e)return e.exports;var s=i[o]={exports:{}};return t[o](s,s.exports,n),s.exports}(()=>{"use strict";var t=n(495);const i=document.querySelector(".grid-container"),o=document.querySelector("#directions"),e=document.querySelector("button");function s(){let n=1,e=[],s=[];o.innerHTML="",o.style.backgroundColor="";let r=(0,t.gameBoard)(10,10),l=(0,t.shipFactory)(4,1),a=(0,t.shipFactory)(4,1);r.addShip(l),r.addShip(a),l.randomizeCPUShipPosition(l.length,r.length,r.width),l.setAllPositions(),console.log(l),a.setInitialPosition(72),a.setAllPositions(),console.log(a),function(){i.innerHTML="";for(let t=0;t<r.dimensions[1]*r.dimensions[0];t++){const n=document.createElement("div");n.setAttribute("id",`${t+1}`),i.style.gridTemplateColumns=`repeat(${r.dimensions[1]}, 1fr)`,i.style.gridTemplateRows=`repeat(${r.dimensions[0]}, 1fr)`,i.appendChild(n).classList.add("grid-item")}}();const d=document.querySelectorAll(".grid-item");for(let t of d)t.innerText=t.id;let c=r.dimensions[0]*r.dimensions[1]/2+1;for(let t of d)t.id>=c&&t.id<c+r.dimensions[0]&&(t.style.borderTop="5px solid red");for(let t of d)t.id>=c?t.classList.add("disable"):t.classList.add("target");function h(t){for(let i of d)i.id==t&&i.classList.add("attempt")}function u(t){for(let i of d)i.id==t&&i.classList.add("hit")}function f(t){for(let i of d)i.id==t&&(i.innerText="")}function g(t){f(t.target.id),h(t.target.id);let i=l.allPositions;l.hit(parseInt(t.target.id));let e=l.allPositions;i.length>e.length&&(u(t.target.id),o.innerText="you hit the enemy"),n++,p()}function p(){console.log({cpuSuccessfulHits:e,cpuAllAttemptedHits:s}),l.isSunk()||a.isSunk()?l.isSunk()?(o.innerText="Congratulations. You Won!",o.style.backgroundColor="green"):a.isSunk()&&(o.innerText="We'll get them next time, champ!",o.style.backgroundColor="red"):n%2==1?(o.innerText="Your turn to choose",d.forEach((t=>t.addEventListener("click",g)))):n%2==0&&(o.innerText="Enemy's turn to attack",setTimeout((function(){!function(t){f(t),h(t);let i=a.allPositions;a.hit(parseInt(t));let r=a.allPositions;i.length>r.length&&(u(t),e.push(t),o.innerText="you got hit"),s.push(t),n++,p()}(function(t,i){let n=t*i,o=Math.floor(Math.random()*n)+1;if(e.length>0)for(e.sort((function(t,i){return t-i}));!(o<101&&o>50&&o>e[0]-6&&o<e[0]+6||s.length&&s.includes(o));)o=Math.floor(Math.random()*n)+1;else for(;!(o<101&&o>50||s.length&&s.includes(o));)o=Math.floor(Math.random()*n)+1;return o}(r.length,r.width))})))}!function(){for(let t of d)for(let i of a.allPositions)t.id==i&&t.classList.add("user-ship")}(),p()}s(),e.addEventListener("click",(function(){s()}))})()})();