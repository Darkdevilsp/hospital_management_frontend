import {Link, useParams} from "react-router-dom";


function ManagementDashboard() {
    const username=useParams()
    return (
        <div className="App">
            <h3>PATIENTS</h3>
            <div className={"card"}>
                <button>ADD PATIENT</button>
                <button>TRACK PATIENT</button>
                <button> PATIENT</button>
            </div>

        </div>
    );
}

export default ManagementDashboard;
