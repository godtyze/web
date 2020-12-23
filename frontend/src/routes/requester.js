export const get = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
    }).then(response => response.json())
}

export const post = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
    }).then(response => response.json())
}
