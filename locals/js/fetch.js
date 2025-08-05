
let mem =  JSON.parse(localStorage.getItem("model")) ;

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
        const ID = info.messageId;
        let code = 0;
        
            if (info.accepted.length === 1) {
                code = 200
            }

            else {
                code = 404
            }
       
        const env = info.envelope.to[0];
        const model = {
            id :ID,
            Code:code,
            re:env,
        }
        mem.push(model);
        localStorage.setItem("model",JSON.stringify(mem));
        
    })
    .catch(err=>{
        console.log(err)
    })
    .finally(()=>{
        console.log(mem);
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

// //<div class="profile" >
//                                 <div class="del">
//                                     <button data-his="${i}">X</button>
//                                 </div>
//                                 <p class="id" style="margin-left: 10px;">${value.id}</p>
//                                 <p class="code">${value.Code}</p>
//                                 <p style="margin-right: 20px;">${value.re}</p>
//                             </div
