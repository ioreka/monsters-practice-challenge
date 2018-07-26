document.addEventListener('DOMContentLoaded', function() {

  function fetchMonsters() {
    const url = 'http://localhost:3000/monsters?_limit=50'
    fetch(url)
    .then(r => r.json())
    .then(r => renderMonsters(r))
  }
  fetchMonsters()

  function renderMonsters(data) {
    for (monster of data) {
      let monsterDiv = document.createElement('div')
      let monsterName = document.createElement('h2')
      let monsterAge = document.createElement('h3')
      let monsterDescription = document.createElement('p')
      monsterName.innerHTML = monster.name
      monsterAge.innerHTML = monster.age
      monsterDescription.innerHTML = `Bio: ${monster.description}`
      monsterDiv.append(monsterName, monsterAge, monsterDescription)
      document.getElementById('monster-container').append(monsterDiv)
    }
  }

  const newMonsterButton = document.getElementById('create-monster')
  newMonsterButton.addEventListener('click', newMonster)


  function newMonster(e) {
    e.preventDefault()
    let newMonsterName = document.getElementById("monster-name").value
    let newMonsterAge = document.getElementById("monster-age").value
    let newMonsterDescription = document.getElementById("monster-description").value
    let monsterData = {
      name: newMonsterName,
      age: newMonsterAge,
      description: newMonsterDescription
    }
    const url = 'http://localhost:3000/monsters'
    fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(monsterData)
    })
    .then(r => r.json())
    // .then(r => console.log(r))
  }

  let currentPage = 1
  let forwardButton = document.getElementById('forward')
  let backButton = document.getElementById('back')

  forwardButton.addEventListener('click', renderNewPage)
  backButton.addEventListener('click', renderNewPage)

  // myStorage = window.localStorage
  // myStorage.setItem(currentPage, 1)

  function renderNewPage(e) {
      console.log(currentPage)
    if (e.target.id == "forward") {
      currentPage += 1
    } else {
      currentPage -= 1
    }
    console.log(currentPage)
    const url = `http://localhost:3000/monsters?_limit=50&_page=${currentPage}`
    window.location.reload(true);
    fetch(url)
    .then(r => r.json())
    .then(r => renderMonsters(r))
  }


})
