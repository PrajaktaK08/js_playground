"use strict";

const menuToggle =document.querySelector("#menuToggle");
const sidebar= document.querySelector("#mainNavigation");

menuToggle.addEventListener("click", ()=>{
    const isOpen=sidebar.classList.toggle("is-open");
    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});