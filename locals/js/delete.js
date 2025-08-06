import { setItem } from "./fetch.js";
import { Loader } from "./ls.js";
const del = document.querySelectorAll(".delete");

del.forEach(KEY =>{
    KEY.addEventListener('click',()=>{
        const ID = KEY.dataset.his;
        setItem(ID);
        Loader();
    })

})