/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kittenName = form.kittyName.value
  let kittenID = generateId()
  let Kitten = kittens.find(kitten => kitten.name == kittenName)

  if (kittenName == "") {
    alert("Please enter a valid kitten name")
    return
  }

  if (Kitten) {
    alert("Select another kitten, you can't have the same one more than once")
  } else {
    //get a random kitten photo and apply defaut settings
    Kitten = {
      id: kittenID,
      image: "https://robohash.org/" + kittenName + "?set=set4",
      name: kittenName,
      mood: "Tolerant",
      affection: 5
    }
    kittens.push(Kitten)
    saveKittens()
  }
  //hints from w3schools.com/jsref/met_form_reset.asp
  form.reset()
  drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
//hints from contacts project
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittenData) {
    kittens = kittenData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
// hints from contacts project
function drawKittens() {
  let template = ""
  kittens.forEach(kitten => {
    if (kitten.mood == "Gone") {
      template += `
      <div class="card p-2 text-center Gone">
      <img src="${kitten.image}" height="100" alt="Moody Kittens" class="kitten ${kitten.mood}">
      <div class="mt-2 text-left">
      <p>Name: <span>${kitten.name}</span></p>
      <p><span>Gone Ran Away</span></p>
      </div>
      </div>`
    } else {
      template += `
      <div class="card p-2 text-center">
      <img src="${kitten.image}" height="100" alt="Moody Kittens" class="kitten ${kitten.mood}">
      <div class="mt-2 text-left">
      <p>Name: <span>${kitten.name}</span></p>
      <p>Mood: <span>${kitten.mood}</span></p>
      <p>Affection: <span>${kitten.affection}</span></p>
      <div class="d-flex space-between">
      <button onclick="pet('${kitten.id}')">Pet</button>
      <button onclick="catnip('${kitten.id}')">Catnip</button>
      </div>
      </div>
      </div>`
    }
  })
  document.getElementById("kittens").innerHTML = template
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
//hints from w3schools.com/jsref/jsref_splice.asp
function pet(id) {
  let newAffection = Math.floor(Math.random() * 8)
  let index = kittens.findIndex(kitten => kitten.id === id)
  let kitten = findKittenById(id)
  kitten.affection = newAffection
  kitten = setKittenMood(kitten)
  kittens.splice(index, 1, kitten)
  saveKittens()
  drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
//hints from w3schools.com/jsref/jsref_findindex.asp
function catnip(id) {
  let index = kittens.findIndex(kitten => kitten.id === id)
  kittens[index].affection = 5
  kittens[index].mood = "Tolerant"
  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
//hints from w3schools.com/jsref/jsref_switch.asp
function setKittenMood(kitten) {
  switch (kitten.affection) {
    case 0:
      kitten.mood = "Gone"
      break;
    case 1:
    case 2:
    case 3:
      kitten.mood = "Angry"
      break;
    case 4:
    case 5:
      kitten.mood = "Tolerant"
      break;
    default:
      kitten.mood = "Happy"
  }
  return kitten
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

//clear your kittens who ran away
//hints from w3schools.com/jsref/met_element_remove.asp
function clearKittens() {
  window.localStorage.clear()
  document.getElementById("welcome").remove();
  kittens = []
}

//remove the kitten when it runs away
//hints w3shools/jsref/jsref_findindex.asp
function removeKitten(id) {
  let index = kittens.findIndex(kitten => kitten.id === id)
  kittens.splice(index, 1)
  saveKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, image: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens()