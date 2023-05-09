let store = Immutable.Map({
    user: { name: "Rawan" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit','Perseverance'],
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (key, newState) => {
    store = store.set(key, newState);
    console.log(store.get('apod'))
    render(root, store);

}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

//create buttons 
const buttons=()=>{
    return store.get('rovers')
    .map((rover)=>`<button class="btn" onclick=GetRovers("${rover}")>${rover}  </button>`)
    .join("");
}


//Higher Order Functions are functions that take other functions as arguments or return functions.... 
//-----------------------------------------------------------------Higher Order Function-----------------------------------------------------------------

// Function App() is high order function that  RETURN three  FUNCTIONS 1.Greeting(store.get("user").name) 2.buttons() 3.card().
const App = () => {
   // let { rovers, apod } = state

    return `
        <header></header> 
        
        ${Greeting(store.get("user").name)}
        <div>
           ${buttons()}
           </div>
           <div class="card">
            ${card()}
            </div>
        <footer></footer>
    `
}
//Higher Order Functions are functions that take other functions as arguments or return functions.... 
//-----------------------------------------------------------------Higher Order Function-----------------------------------------------------------------
// Function card() is high order function that  RETURN  FUNCTION dashbourd().
function card() {
    if(store.get("apod")) 
    return dashbourd()
  else return "<p> Click one of the rovers above !!</p>"
	
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})


const Greeting = (name) => {
    if (name) {
         return ` <img alt ="Nasa" class="nasa" src="https://api.nasa.gov/assets/img/favicons/favicon-192.png">
         <h1>Welcome, ${name}! <br> it's Mars Online Dashboard </h1>`} 
         return ` <h1> it's Mars Online Dashboard</h1> `
}

function dashbourd() {
    //I take nasa colour from their web site "https://nasa.github.io/nasawds-site/components/colors/" for styling :)
 
    return `<ul>
<li><span> Rover Name : </span>${store.get('apod').latest_photos[0].rover.name}</li>
<li><span> Rover Launch Date : </span>${store.get('apod').latest_photos[0].rover.launch_date}</li>
<li><span> Rover Landing Date : </span>${store.get('apod').latest_photos[0].rover.landing_date}</li>
<li><span> Rover status : </span>${store.get('apod').latest_photos[0].rover.status}</li>
<li><span> Rover Photo : </span><br><img alt ="${store.get('apod').latest_photos[0].rover.name}" class="image" src="${ store.get('apod').latest_photos[0].img_src}"></li>
</ul>`
}

// ------------------------------------------------------  API CALLS
const GetRovers = (roverName) => {
                        fetch(`http://localhost:3000/rovers/${roverName}`)
    .then(res => res.json())
    .then(apod => updateStore("apod",  apod ));

}
