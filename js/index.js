// slider
const slider = document.querySelector(".slider")
const sliderBall = document.querySelector(".slider-ball")
// dark-mode
const body = document.body;
const fontList = document.querySelector(".font-list")
const searchInput = document.querySelector(".search-input")
const word = document.querySelector(".word > h1")
const noun = document.querySelector(".noun")
const meaningList = document.querySelectorAll(".meaning-list > li")
const verb = document.querySelector(".verb")
const sourceLink = document.querySelector(".source-link")
const moonIcon = document.querySelector(".moon-icon")
// drop down menu
const dropDownMenuBtn = document.querySelector(".drop-down-menu-btn")
const dropDownMenu = document.querySelector(".drop-down-menu")
const dropDownMenuList = document.querySelectorAll(".drop-down-menu > ul > li")
// search-bar
const searchButton = document.querySelector(".search-button")
const errorMessage = document.querySelector(".error-message")
// body
const notFound = document.querySelector(".not-found")
const main = document.querySelector(".main")
const searchWord = document.querySelector(".searched-word")
const footer = document.querySelector(".footer")
const synonymsDiv = document.querySelectorAll(".synonyms")
const playButton = document.querySelector(".play-word")
const audioLink = document.querySelector(".audio-link")


sliderBall.addEventListener('click', darkMode)
function darkMode() {
    sliderBall.classList.toggle("dark-mode");
    if(sliderBall.classList.contains("dark-mode")) {
        darkModeFunction();
    } else if(!sliderBall.classList.contains("dark-mode")) {
        lightModeFunction();
    }
}
function darkModeFunction() {
    const sourceLinkNew = document.querySelectorAll(".source-link")
    const meaningListNew = document.querySelectorAll(".meaning-list > li")
    const verbnew = document.querySelectorAll(".verb")

    slider.classList.add("purple-bg");
    moonIcon.classList.add("purple");
    body.classList.add("dark-bg");
    fontList.classList.add("white-text");
    word.classList.add("white-text");
    for(let i=0;i<sourceLinkNew.length;i++) {
    sourceLinkNew[i].classList.add("white-text");
    }
    searchInput.classList.add("input-bg");
    for(let i=0;i<meaningListNew.length;i++) {
        meaningListNew[i].classList.add("white-text");
    }
    dropDownMenu.classList.add("dark-bg")
    dropDownMenu.classList.add("drop-down-box")
    for(let i=0;i<dropDownMenuList.length;i++) {
        dropDownMenuList[i].classList.add("white-text")
    }
    for(let i=0;i<verbnew.length;i++) {
        verbnew[i].classList.add("white-text")
    }
}
function lightModeFunction() {
    const sourceLinkNew = document.querySelectorAll(".source-link")
    const meaningListNew = document.querySelectorAll(".meaning-list > li")
    const verbNew = document.querySelectorAll(".verb")
    const synonymNew = document.querySelectorAll(".synonyms > h3")

    slider.classList.remove("purple-bg");
    moonIcon.classList.remove("purple");
    body.classList.remove("dark-bg");
    fontList.classList.remove("white-text");
    word.classList.remove("white-text");
    for(let i=0;i<sourceLinkNew.length;i++) {
    sourceLinkNew[i].classList.remove("white-text");
    }
    searchInput.classList.remove("input-bg");
    for(let i=0;i<meaningListNew.length;i++) {
        meaningListNew[i].classList.remove("white-text");
    }
    dropDownMenu.classList.remove("dark-bg")
    dropDownMenu.classList.remove("drop-down-box")
    for(let i=0;i<dropDownMenuList.length;i++) {
        dropDownMenuList[i].classList.remove("white-text")
    }
    for(let i=0;i<verbNew.length;i++) {
        verbNew[i].classList.remove("white-text")
    }
}
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     sliderBall.classList.toggle("dark-mode");
//     darkModeFunction();
// } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
//     lightModeFunction();
// }
dropDownMenuBtn.addEventListener('click', () => {
    dropDownMenu.classList.toggle("show");
})
document.addEventListener('click', (ev) => {
    if(ev.target.matches('.drop-down-menu > ul > li')) {
        if(ev.target.classList.contains("sans-serif")) {
            body.classList.add("sans-serif-font");
            body.classList.remove("serif-font");
            body.classList.remove("mono-font");
            searchInput.classList.add("sans-serif-font");
            searchInput.classList.remove("serif-font"); 
            searchInput.classList.remove("mono-font");
            dropDownMenu.classList.toggle("show");
        } else if(ev.target.classList.contains("serif")) {
            body.classList.remove("sans-serif-font");
            body.classList.add("serif-font");
            body.classList.remove("mono-font");
            searchInput.classList.remove("sans-serif-font");
            searchInput.classList.add("serif-font"); 
            searchInput.classList.remove("mono-font");
            dropDownMenu.classList.toggle("show");     
        } else if(ev.target.classList.contains("mono")) {
            body.classList.remove("sans-serif-font");
            body.classList.remove("serif-font");
            body.classList.add("mono-font");
            searchInput.classList.remove("sans-serif-font");
            searchInput.classList.remove("serif-font"); 
            searchInput.classList.add("mono-font");
            dropDownMenu.classList.toggle("show");     
        }
        fontList.innerHTML = ev.target.innerHTML;
    }
})

searchButton.addEventListener('click', search);

searchInput.addEventListener('click', () => {
    errorMessage.classList.add("hidden");
    searchInput.classList.remove("error-border");
})
async function search() {

    
    const word = document.querySelector('.search-input').value;

    if (word === '') {
        errorMessage.classList.remove("hidden");
        searchInput.classList.add("error-border");
        return;
    }

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    console.log(data)

    const wordTitle = document.querySelector(".word > h1")
    const wordP = document.querySelector(".word > p")
    const linkNewTab = document.querySelector(".link > svg")

    if (data.title === "No Definitions Found") {
        notFound.classList.remove("hidden");
        searchWord.classList.add("hidden");
        main.classList.add("hidden");
        footer.classList.add("hidden");
    } else {
        notFound.classList.add("hidden");
        searchWord.classList.remove("hidden");
        main.classList.remove("hidden");
        footer.classList.remove("hidden");
        //word
        wordTitle.innerHTML = `${data[0].word}`;
        wordP.innerHTML = `${data[0].phonetic}`;

        //main
        let section = document.createElement('section');
        let footerSource = "";
        section.classList.add("noun-section");
        section.classList.add("verb-section");
        let listItems = "";
        let listItem = "";
        let example = "";
        let synonymList = "";
        let synonymBlock = "";
        let antonymList = "";
        let antonymBlock = "";
        section.innerHTML = "";
        main.innerHTML = "";
        footerSource = "";
        footer.innerHTML = "";
        for(let content of data) {
        for (let meaning of content.meanings) {
            if (meaning.definitions.length > 0) {
                listItems = "";
                for (let def of meaning.definitions) {
                    listItem = `<li>${def.definition}</li>`;
                    if(def.example === undefined) {
                        example = "";
                    }
                    else {
                    example = `<p class="verb-example">"${def.example}"</p>`;
                    }
                    listItems += `${listItem} ${example}`;
            }
            if (meaning.synonyms.length > 0) {
                synonymList = "";
                synonymBlock = "";
                for (let syn of meaning.synonyms) {
                    synonymList += `
                        <p class="synonym-p">${syn}</p>
                    `;
                }
                synonymBlock = `
                    <div class="synonyms">
                        <h3>Synonyms</h3>
                        ${synonymList}
                    </div>
                `;
            } else {
                synonymList = "";
                synonymBlock = `
                    <div class="synonyms hidden">
                        <h3>Synonyms</h3>
                        ${synonymList}
                    </div>
                `; 
            }
            if (meaning.antonyms.length > 0) {
                antonymList = "";
                antonymBlock = "";
                for (let ant of meaning.antonyms) {
                    antonymList += `
                        <p class="synonym-p">${ant}</p>
                    `;
                }
                antonymBlock = `
                    <div class="synonyms">
                        <h3>Antonyms</h3>
                        ${antonymList}
                    </div>
                `;
            } else {
                antonymList = "";
                antonymBlock = `
                    <div class="synonyms hidden">
                        <h3>Antonyms</h3>
                        ${antonymList}
                    </div>
                `; 
            }
        section.innerHTML += `
                <div class="section-header">
                    <h2 class="verb">${meaning.partOfSpeech}</h2>
                    <div class="border-div"></div>
                </div>
                <div class="meaning">
                    <h3>Meaning</h3>
                    <ul class="meaning-list">
                        ${listItems}
                    </ul>
                </div>
                ${synonymBlock}
                ${antonymBlock}
        `;
        }
    }
    //footer
    let urlList = "";
    if (content.sourceUrls.length > 0) {
        for (let url of content.sourceUrls) {
            urlList += `
                <a href="${url}" class="source-link" target="_blank">${url}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                    <path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/>
                </svg>
            `;
        }
    }
    footerSource += `
            <div class="footer-content">
                <p class="source">Source</p>
                <div class="link">
                    ${urlList}
                </div>
            </div>
    `;
    //audio
    if (content.phonetics.length > 0) {
        for (let link of content.phonetics) {
            if(link.audio !== '') {
                audioLink.src = link.audio;
            }
        }
    }
}
        main.appendChild(section);
        footer.innerHTML = footerSource;
    }
    if(sliderBall.classList.contains("dark-mode")) {
        darkModeFunction();
    } else if(!sliderBall.classList.contains("dark-mode")) {
        lightModeFunction();
    }
}
playButton.addEventListener('click', () => {
    audioLink.play();
})
document.addEventListener('click', (ev) => {
    if(ev.target.matches('.link > svg')) {
        const clickLink = ev.target.parentNode;
        const linkClick = clickLink.querySelector(".source-link")
        console.log(linkClick)
        linkClick.click();
    }
})
document.addEventListener('click', (ev) => {
    if(ev.target.matches('.synonym-p')) {
        searchInput.value = ev.target.innerHTML;
        searchButton.click();
        window.scrollTo({ top: 0});
    }
})
document.addEventListener('keydown', (e) =>{
    if(e.key === "Enter" && searchInput === document.activeElement) {
        e.preventDefault()
        searchButton.click();
    }
})