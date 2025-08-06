export let memory = JSON.parse(localStorage.getItem("mem"))||[{
            id : "4378info@mail.com",
            Code:200,
            re:"hismail@mail.com",
        }];

import { Loader } from "./ls.js";
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