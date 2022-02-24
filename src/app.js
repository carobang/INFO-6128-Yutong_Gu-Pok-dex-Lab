let elements = {
    navigator: null,
    cardsRow: null,
    toolbar: null,
    title: null,
};

async function firstfetch(){
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    .then(response => response.json())
    .then(data => {
        for (index in data.results) {
            //console.log(data);
            let url= data.results[index].url;
            let name = data.results[index].name;
           // console.log(data.results[index].name);
            let list = document.createElement('ons-list-item');
            list.setAttribute('id',name);
            list.setAttribute('modifier', "tappable chevron");
            list.style.textTransform = 'capitalize';
            let node = document.createTextNode(name);
            list.appendChild(node);
            listPokemon.appendChild(list);

            list.addEventListener('click', () => changePage('cards.html', { url:url }));
           // console.log(data.results[index].url);
        }
    })
}

async function secondFetch(url){
    await fetch(url)
    .then(response => response.json())
    .then(data=>{
       // console.log(data)
//set pokemon detailed page title
    let pokeTitle = data.name;
    console.log(pokeTitle)
    let title = document.getElementById('title');
    title.style.textTransform = 'capitalize';
    title.textContent= pokeTitle;
    //set pokemon picture
    let pokeImage = data.sprites.front_default;
       //  console.log(pokeImage);
         let pokeImg = document.getElementById('pokePic');
        pokeImg.src=pokeImage;
//set pokemon name and ID
    let pokeId = data.id;
    console.log(pokeId)
   let nameID = document.getElementById('pokeNameID');
   nameID.style.textTransform = 'capitalize';
   nameID.textContent=pokeTitle+' '+'#'+pokeId;

//set pokemon types
for(index in data.types){
    let pokeTypes= data.types[index].type.name;
   // console.log(pokeTypes);
   let types= document.getElementById('types')
    let typeList = document.createElement('ons-list-item');
    typeList.style.textTransform = 'capitalize';
    let typeName = document.createTextNode(pokeTypes);
    //console.log(typeName);
    typeList.appendChild(typeName);
    types.appendChild(typeList);
}

for(index in data.stats){
    //console.log(data.stats);
    let pokeStats= data.stats[index].stat.name;
   //console.log(pokeStats);
    let pokeBaseStats = data.stats[index].base_stat;
    //console.log(pokeBaseStats);
    let pokeEfforts=data.stats[index].effort;
    //console.log(pokeEfforts);
    let stats= document.getElementById('stats');
    let statsList = document.createElement('ons-list-item');
    statsList.setAttribute("class", "w3-display-container");
    statsList.setAttribute("id", "something");
    statsList.style.textTransform = 'capitalize';
    let statsDetail = document.createTextNode(pokeStats+' '+ pokeBaseStats+' '+pokeEfforts);
     //console.log(statsDetail);
    statsList.appendChild(statsDetail);
    stats.appendChild(statsList);
}
    })
}



const changePage = (page, data) => {
    elements.navigator.pushPage(page, { data });
}

document.addEventListener('init', (e) => {
    if (e.target.id === 'home') {
        elements = {
            listPokemon: document.querySelector('#listPokemon'),
            navigator: document.querySelector('#navigator'),
            toolbar: document.querySelector('#toolbar'),
        }
        firstfetch();
    }

    if(e.target.id ==='cards'){
        let pokeUrl = elements.navigator.topPage.data.url;
        secondFetch(pokeUrl);
        elements={
            title: document.querySelector('#title'),
            navigator: document.querySelector('#navigator'),
            pokePic:document.querySelector('#pokePic'),
            pokeNameID:document.querySelector('#pokeNameID'),
            types:document.querySelector('#types'),
            stats:document.querySelector('#stats'),
        }
    }
})


window.addEventListener('load',() => window.history.pushState({ },''));
window.addEventListener('popstate',() =>{
    const pages = elements.navigator.pages;
    if(pages && pages.length >1){
        elements.navigator.popPage();
        window.history.pushState({ },'');
    }
    else{
        window.history.back();
    }
})