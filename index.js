import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://add-to-cart-e0836-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInCart = ref(database, "items")


const inputfieldEl = document.getElementById("input-field")
const addToCartBtn = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")



addToCartBtn.addEventListener("click", function() {
    let inputValue = inputfieldEl.value
    if(inputValue){
        push(itemsInCart, inputValue)
        clearInputEl()
    }

    
})


onValue(itemsInCart, function(snapshot) {
    if (snapshot.exists()){

        let cartArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < cartArray.length; i++) {
            
            let currentItem = cartArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]

            appendShoppingListEl(currentItem)
        } 
    } else {
        shoppingListEl.innerHTML = "Nothing here yet!"
        }   
})



function clearInputEl() {
    inputfieldEl.value = ""
}

function appendShoppingListEl(item) {
    let newEl = document.createElement("li")
    let itemId = item[0]
    let itemValue = item[1]
    newEl.textContent= capitalFirstLetter(itemValue)
    shoppingListEl.append(newEl)
    newEl.addEventListener("dblclick", function() {
        let itemsLocationDB = ref(database, `items/${itemId}`)
        remove(itemsLocationDB)
       
    })
}

function capitalFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""

}

