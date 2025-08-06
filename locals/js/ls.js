import { memory } from "./fetch.js";
const PrD = document.querySelector(".his-product");

Loader();
export function Loader () {
  let html = ""; 
   if (memory.length > 0 ) {
    memory.forEach((value,i) => {
          html += `<div class="profile" >
                                <div class="del">
                                    <button class="delete" data-his="${i}">X</button>
                                </div>
                                <p class="id" style="margin-left: 10px;">${value.id}</p>
                                <p class="code">${value.Code}</p>
                                <p style="margin-right: 20px;">${value.re}</p>
                            </div>`
    });
  
}
else {
    html = "There is not Sent History" 
}

PrD.innerHTML = html ;
}


