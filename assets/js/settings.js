const FINGERPRINT = {}
const USER_NAME_FORM = document.querySelector('form#request_data')

FingerprintJS.load().then(({ get }) => FINGERPRINT.get = get);

/**
 * Stores user specific data in the local storage
 */
USER_NAME_FORM.addEventListener('submit', event => {
    event.preventDefault()
    const theForm = event.target

    if (FINGERPRINT.get) {
        FINGERPRINT.get().then(result => {
            // Use client's unique fingerprint to encrypt
            // their data
            const clientFingerprint = result.visitorId
            const encryptedChannelID = CryptoJS.AES.encrypt(theForm.channel_id.value, clientFingerprint)
            const encryptedApiKey = CryptoJS.AES.encrypt(theForm.api_key.value, clientFingerprint)

            // TODO: make sure that the decrypted data is
            // the same as the data before the encryption
            console.log(theForm.channel_id.value)
            console.log(encryptedChannelID.toString())
            console.log(CryptoJS.AES.decrypt(encryptedChannelID, clientFingerprint).toString(CryptoJS.enc.Utf8))
        });
    }
    
    chrome.storage.local.set({ channelID: theForm.channel_id.value || false })
    chrome.storage.local.set({ apiKey: theForm.api_key.value || false })

    // window.close()
})

/**
 * Pre-populates the settings form
 */
chrome.storage.local.get('channelID', ({ channelID }) => {
    USER_NAME_FORM.channel_id.value = channelID ? channelID : ''
})
chrome.storage.local.get('apiKey', ({ apiKey }) => {
    USER_NAME_FORM.api_key.value = apiKey ? apiKey : ''
})