const redoForm = document.querySelector('form')

const categoryDiv = document.getElementById('category')
const letterDiv = document.getElementById('letter')

async function newCategory(e) {
  e.preventDefault()

  const withLetter = redoForm.querySelector('input[type="checkbox"]').checked

  let data = {}

  try {
    let httpStatus = null

    if (withLetter) {
      const response = await fetch(`/api?withLetter=true`)

      httpStatus = await response.status

      data = await response.json()
    } else {
      const response = await fetch(`/api`)

      httpStatus = await response.status

      data = await response.json()
    }

    if(httpStatus != 200 && httpStatus != 304) {
      throw new Error(`${httpStatus}`)
    }

    categoryDiv.querySelector('p').innerText = data.category
    letterDiv.querySelector('p').innerText = data.letter ? data.letter : ''
  } catch (err) {
    console.error(err)

    document.querySelector("body").innerHTML = `
    <h1>An error occured</h1>
    <p>See console for more information</p>
    `
  }
}

newCategory({ preventDefault: () => {} })
