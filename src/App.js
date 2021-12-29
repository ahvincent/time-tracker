import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Timer from './components/Timer'
import { formatTime, startTimeEntry, stopTimeEntry } from './utils';
import useFetch from './hooks/useFetch';
import useTimer from './hooks/useTimer.js';

const AUTH_TOKEN = "<Your Toggl Auth Token>"; // Base 64 encoding of <api token>:api_token
const WORKSPACE_ID = "<Your workspace ID>"
var TIME_ENTRY_ID = null

function App() {

    const [currentProject, setCurrentProject] = useState('\u00A0')
    const timerUtil = useTimer(0)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${AUTH_TOKEN}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const [projectsResponse, projectsLoading, projectsHasError] = useFetch(`https://api.track.toggl.com/api/v8/workspaces/${WORKSPACE_ID}/projects`, requestOptions)

    const projectsMap = (projects) => projects.map(project => <div className="col"><button onClick={() => startTimer(project)} type="button" className="btn btn-primary">{project.name}</button></div>)

    const startTimer = async (project) => {
        timerUtil.handleReset();
        timerUtil.handleStart();
        setCurrentProject(project.name);

        // Check if timer already running
        if (TIME_ENTRY_ID) {
            // Stop previous timer
            stopTimeEntry(TIME_ENTRY_ID, AUTH_TOKEN)
            TIME_ENTRY_ID = null;
        }

        const timeEntryResponse = await startTimeEntry(project.id, AUTH_TOKEN);

        if (timeEntryResponse) {
            TIME_ENTRY_ID = timeEntryResponse.data.id
        } else {
            alert("Error starting time entry.")
        }
    }

    const stopTimer = () => {
        //timerUtil.handlePause();
        timerUtil.handleReset();
        setCurrentProject("");

        // Check if timer already running
        if (TIME_ENTRY_ID) {
            // Stop previous timer
            stopTimeEntry(TIME_ENTRY_ID, AUTH_TOKEN)
            TIME_ENTRY_ID = null;
        }
    }

    return (
      <div className="App">
        <header className="App-header">
          <Timer timerUtil={timerUtil} />
          <h5>{currentProject}</h5>
          <div className="row row-cols-3" id="buttonArea">
            {projectsLoading ? <div>Loading...</div> : (projectsHasError ? <div>Error occurred.</div> : projectsMap(projectsResponse))}
          </div>
          <div className="row" id="buttonArea">
            <button className="btn btn-secondary" disabled={!timerUtil.isPaused} onClick={stopTimer}>Stop</button>
          </div>
        </header>
      </div>
    );
}

export default App;