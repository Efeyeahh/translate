const fromtext = document.querySelector(".from-text"),
totext = document.querySelector(".to-text"),
selectTag = document.querySelectorAll('select'),
exchangeIcon = document.querySelectorAll('.exchange'),
translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) =>{
    for(const country_code in countries){
        let selected;
        if(id == 0 && country_code == "tr-TR"){
            selected = "selected";
        } else if(id == 1 && country_code == "en-US"){
            selected = "selected";
        }
        let option =  ` <option value="${country_code}"${selected}>${countries[country_code]}</option> `;
        tag.insertAdjacentHTML("beforeend", option) // adding options tag inside select tag
    }
});

exchangeIcon.addEventListener("click", () => {
    // exchanging textarea and select tag values
    let tempText = fromtext.value,
    tempLang = selectTag[0].value;
    fromtext.value = totext.value;
    selectTag[0].value = selectTag[1].value;
    totext.value = tempText;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () => {
    let text = fromtext.values;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        totext.value = data.responseData.translatedText;
    });
});