export const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours}:${getMinutes}:${getSeconds}`
}

export const startTimeEntry = (projectId, authToken) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${authToken}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "time_entry": { "pid": projectId, "created_with": "react-app" } });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://api.track.toggl.com/api/v8/time_entries/start", requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
}

export const stopTimeEntry = (timeEntryId, authToken) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${authToken}`);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://api.track.toggl.com/api/v8/time_entries/${timeEntryId}/stop`, requestOptions)

}