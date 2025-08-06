export let memory = JSON.parse(localStorage.getItem("mem"))||[];
  let html = ""; 
const form = document.querySelector("form")
const endpoint = "/api/sent"

form.addEventListener("submit",async (e)=>{
    e.preventDefault();
   
   
    const body = {
      host: form.host.value,
        port:form.port.value,
        user : form.user.value,
        pass: form.pass.value,
        from:form.from.value,
        to:form.to.value,
        sub:form.subject.value,
        body:form.body.value,
        type: AluChecker () ,
    }
   fetch(endpoint,{
        method:'POST',
        headers:{
            "Content-type" : "Application/json"
        },
        body:JSON.stringify(body),
    })
    .then(response=>response.json())
    .then(info=>{   
       
        let code = 0;
        if (info === "Error") {
            code = 404;  
             memory.push({
            id : info.message,
            Code:code,
            re:"Ulubulu",
        });
       localStorage.setItem("mem",JSON.stringify(memory));  
        }
        else {
            code = 200;
        const ID = info.messageId;
        const env = info.envelope.to[0];
       memory.push({
            id :ID,
            Code:code,
            re:env,
        });
       localStorage.setItem("mem",JSON.stringify(memory));
        
}})
    .catch(err=>{
        console.log(err)
    })
    .finally(()=>{
        Loader();

    })

})

function AluChecker () {
     if (Number(form.port.value)=== 465) {
        return  true ;
    }
    else {
        return  false ;
    }
}

export const setItem = (id) =>{
    memory.splice(id,1);
    localStorage.setItem("mem",JSON.stringify(memory))
}

const PrD = document.querySelector(".his-product");

Loader();
export function Loader () {

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

