let urlParams = new URLSearchParams(window.location.search);
let token = urlParams.get('q');
let type = urlParams.get('t');

let data
try{
    let res = await fetch(`/authcontrol/${token}`);
    if(res.ok){
        data = res.json();
    }else{
        data={error:"Başarısız"};
    }
}catch(err){
    alert("Bir hata ile karşılaşıldı. Lütfen Anasayfa'ya dönüp tekrar giriş yapmayı deneyin.")
}
if(data.message){
    const veri = {
        oturumTipi : type,
        token : token
    } 
    window.localStorage.setItem("STOO",JSON.stringify(veri));
    setTimeout(() => {
        window.open("/anamenu","_blank")
    }, 3000);
}
else{
    document.getElementsByClassName("loaders l_active")[0].classList.toggle("l_active");
    document.getElementsByClassName("errs")[0].classList.toggle("errs_active");
}