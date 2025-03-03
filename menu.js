const header = document.querySelector("header");

const nav = document.querySelector("nav");

let openMode = "open";

header.addEventListener("click", (e)=>{
    const target = e.target;

    if(target.classList.contains("menu-btn") && openMode == "open"){
        nav.classList.remove("element-hidden");
        nav.classList.add("nav_change_display");

        header.classList.add("visible");
        header.querySelector("h3").style.display = "none";

        target.innerHTML = "close"

        openMode = "close";
    }else if(target.classList.contains("menu-btn") && openMode == "close"){
        nav.classList.add("element-hidden");
        nav.classList.remove("nav_change_display");
        
        header.classList.remove("visible");
        header.querySelector("h3").style.display = "flex";
        
        target.innerHTML = "menu"
        openMode = "open";
    }
});