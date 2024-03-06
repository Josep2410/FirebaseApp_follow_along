import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" // grap fn from url
import {getDatabase , ref , push , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" // grap fns from url

const appSettings = {
  databaseURL : "https://realtime-database-4ab8e-default-rtdb.firebaseio.com/" // url from OUR db
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref( database , "shoppingList" ) // ref ( reference to db , call reference something)

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDb , inputValue)

  clearInputFieldEl()
})

// whenever there is a change to the DB, run onValue fn
onValue(shoppingListInDb , function(snapshot){
  clearShoppingListEl()
  if(snapshot.exists()){
    let items = Object.entries(snapshot.val()) 
  
    if(!items.length) return
  
    for( let item of items){
      appendToShoppingListEl(item)
    }
  }
  else{
    shoppingListEl.innerHTML = `No items in here... yet`
  }

})

function clearShoppingListEl(){
  shoppingListEl.innerHTML = ""
  
}


function clearInputFieldEl(){
  inputFieldEl.value = ""
}

function appendToShoppingListEl(item){
  //shoppingListEl.innerHTML+= `<li>${val}</li>`

  const  [currentItemID , currentItemValue] = item
  const newEl = document.createElement('li')

  newEl.textContent = currentItemValue

  newEl.addEventListener("click" , () =>{
    let exactLocationOfItemInDB = ref(database , `shoppingList/${currentItemID}`)
    remove(exactLocationOfItemInDB)
  })

  shoppingListEl.appendChild(newEl)

}