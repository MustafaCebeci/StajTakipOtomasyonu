function fetchh(url,option){
    fetch(url, option)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            if(!data.message){
                const veri = {
                    oturumTipi : type,
                    token : token
                } 
                window.localStorage.setItem("STOO",JSON.stringify(veri));
                window.open("/anamenu","_blank");
            }
            else{
                alert("Bir Hata oluştu");
            }
        })
        .catch(error => {
            console.error("Error during fetch:", error);
        });
}

function setUp(tip,veri){
    let data=JSON.stringify(veri);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    };

    const url = ("/anasayfa/"+tip);
    fetchh(url,options);
}

document.getElementById("firma").addEventListener("submit", event=>{
    event.preventDefault();
    const formData = new FormData(event.target);

    let formDataObject = {};

    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });
    setUp("firma",formDataObject)
});
document.getElementById("ogretmen").addEventListener("submit", event=>{
    event.preventDefault();
    const formData = new FormData(event.target);

    let formDataObject = {};

    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });
    setUp("ogretmen",formDataObject)
});
document.getElementById("ogrenci").addEventListener("submit", event=>{
    event.preventDefault();
    const formData = new FormData(event.target);

    let formDataObject = {};

    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });
    setUp("ogrenci",formDataObject)
});
