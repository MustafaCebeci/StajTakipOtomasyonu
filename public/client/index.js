let p_prew = document.getElementById("btn1");
let p_next = document.getElementById("btn2");

const p_card = document.getElementsByClassName("card");
const p_icon = document.getElementsByClassName("page");
const l_card = document.getElementsByClassName("form");
const span = document.getElementById("yontem");
const type =["Firma","Okul","Öğrenci"];
let index = 0;

function prew(){
    if(index==0) index=2;
    else index--;
    setPage();
};

function next(){
    if(index==2) index=0;
    else index++;
    setPage();
};

function click_toggle(i){
    index = i;
    setPage()
};

function setPage(){
    document.getElementsByClassName("page p_active")[0].classList.toggle("p_active");
    document.getElementsByClassName("card c_active")[0].classList.toggle("c_active");
    document.getElementsByClassName("form f_active")[0].classList.toggle("f_active");
    p_icon[index].classList.toggle("p_active");
    p_card[index].classList.toggle("c_active");
    l_card[index].classList.toggle("f_active");
    span.textContent=type[index];
};