chrome.storage.local.get(['channelID', 'apiKey'], ({ channelID, apiKey }) => getYouTubePublicUserSubscribers(channelID, apiKey))

// TODO: request permissions on the
// extension activation

function getYouTubePublicUserSubscribers(channelID, apiKey) {
    getData(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&channelId=${channelID}&key=${apiKey}`).then(data => {
        if (data.error?.errors.length > 0) {
            data.error.errors.forEach(({ message }) => console.error(message))
        }
        else {
            console.log(data)
            // TODO: start the rendering process
        }
    })
}

async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    return response.json();
}

