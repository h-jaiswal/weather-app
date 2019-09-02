const searchButton = document.querySelector('form button')
const searchBar = document.querySelector('form input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    const query = searchBar.value
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    fetch( '/api/weather?address=' + encodeURIComponent(query) ).then((response) => {
        response.json().then((response) => {
            if( response.error ) {
                console.log('Fetch Error')
                messageOne.textContent = response.error
            } else {
                console.log('Fetch Success')
                messageOne.textContent = response.location
                messageTwo.textContent = response.forecast
            }
        })
    })
})

searchBar.addEventListener('input', (e) => {
    e.preventDefault()
    if(searchBar.value === '') {
        messageOne.textContent = ''
        messageTwo.textContent = ''
    }
})