import {useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";



function PatientDashboard(){
    const {username}=useParams()

    let name
    useEffect(() => {
        const response=axios.post("/patientDashboard",{username:username})
        name=response.data
    }, []);
    return (
        <div>
            <h1>welcome {username}</h1>

        </div>
    )
}
export default PatientDashboard