const redoForm = document.querySelector('form')

const categoryDiv = document.getElementById('category')
const letterDiv = document.getElementById('letter')

async function newCategory(e) {
  e.preventDefault()

  const withLetter = redoForm.querySelector('input[type="checkbox"]').checked

  let data = {}

  if (withLetter) {
    const response = await fetch(`/api?withLetter=true`)
    data = await response.json()

       
  } else {
    const response = await fetch(`/api`)
    data = await response.json()
  }

  categoryDiv.querySelector('p').innerText = data.category
  letterDiv.querySelector('p').innerText = data.letter ? data.letter : ''
}

newCategory({ preventDefault: () => {} })