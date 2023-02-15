const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const btn = document.querySelector("#btnTranslate");
const from_text = document.querySelector("#from-text");
const to_text = document.querySelector("#to-text");
const exchange = document.querySelector(".middle .fas");
const icons = document.querySelectorAll(".icons");

for(let lang in languages){
    let option = `
        <option value="${lang}">${languages[lang]}</option>
    `;
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}


btn.addEventListener("click", ()=>{
    let text = from_text.value;
    let from = fromLang.value;
    let to = toLang.value;

    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;


    fetch(url)
        .then(res => res.json())
        .then(data => {
            to_text.value = data.responseData.translatedText;
        })
});


exchange.addEventListener("click", () => {
    let text = from_text.value;
    from_text.value = to_text.value;
    to_text.value = text;


    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
});



for(let icon of icons) {
    //console.log(icon)
    icon.addEventListener("click", (element) => {
        if(element.target.classList.contains("fa-copy")){
            //console.log(element.target.classList)
            if(element.target.id == "from"){
                //console.log(element.target.id)
               navigator.clipboard.writeText(from_text.value); 
            }else{
               navigator.clipboard.writeText(to_text.value) 
            }
        }else{
            let utterance;
            if(element.target.id == "from"){
                utterance = new SpeechSynthesisUtterance(from_text.value);
                utterance.lang = fromLang.value;
            }else{
                utterance = new SpeechSynthesisUtterance(to_text.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }
    });
}