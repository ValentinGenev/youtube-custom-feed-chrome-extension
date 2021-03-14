const USER_NAME_FORM = document.querySelector('form#youtube_user_name')

USER_NAME_FORM.addEventListener('submit', event => {
    event.preventDefault()
    chrome.storage.sync.set({ userName: event.target.name.value || false })
})

chrome.storage.sync.get('userName', ({ userName }) => {
    USER_NAME_FORM.name.value = userName ? userName : ''
})