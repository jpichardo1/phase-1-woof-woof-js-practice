const BASE_URL = 'http://localhost:3000/pups/'

document.addEventListener('DOMContentLoaded', () => {
    fetch(BASE_URL)
    .then(r => r.json())
    .then(pupData => pupData.forEach(renderPupSpan))
})

function renderPupSpan(pup){
   let dogSpan = document.createElement('span')
   dogSpan.innerText = pup.name

    document.getElementById('dog-bar').appendChild(dogSpan)

    dogSpan.addEventListener('click', () => {
        renderDetails(pup)
    })
}

function renderDetails(pup){
    
    let dogName = document.createElement('h2')
    dogName.innerText = pup.name

    let dogImg = document.createElement('img')
    dogImg.src = pup.image

    let dogBtn = document.createElement('button')
    dogBtn.id = pup.id

    dogBtn.innerText = pup.isGoodDog ? 'Good Dog!' :  'Bad Dog!'

    dogBtn.addEventListener('click', toggleGoodDog)

    let infoSection = document.getElementById('dog-info')
    infoSection.innerText = ''
    infoSection.append(dogName, dogImg, dogBtn)
}

function toggleGoodDog(event){

    let toggleVal ={}
    if(event.target.innerText === 'Bad Dog!'){
            toggleVal.isGoodDog = true
    }else {
            toggleVal.isGoodDog = false
    }


    let reqObj = {
        headers: {'Content-Type' : 'application/json'},
        method: 'PATCH',
        body: JSON.stringify(toggleVal)
        }

        fetch(BASE_URL+event.target.id, reqObj)
        .then(r => r.json())
        .then(updatedPup => {
            console.log(updatedPup)
            updatedPup.isGoodDog ? event.target.innerText = 'Good Dog!' : event.target.innerText = 'Bad Dog!'
        })
    }






///document.getElementById('dog-info').innerHTML =
   // `<img src=${pup.image}>
   // <h2>${pup.name}</h2/
   // <button>${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}<button>`

 //  if (pup.isGoodDog){
 //   dogBtn.innerText = 'Good Dog!'
//}else {
  //  dogBtn.innerText = 'Bad Dog!'}