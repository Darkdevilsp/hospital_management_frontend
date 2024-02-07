import {useParams} from "react-router-dom";


function DoctorDashboard() {
    const{username}=useParams()
    return(
        <div>
            <h1>welcome {username}</h1>
        </div>
    )
}
export default DoctorDashboard