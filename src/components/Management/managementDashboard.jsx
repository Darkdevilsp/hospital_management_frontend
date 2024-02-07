import {useParams} from "react-router-dom";


function ManagementDashboard() {
    const{username}=useParams()
    return(
        <div>
            <h1>welcome {username}</h1>
        </div>
    )
}
export default ManagementDashboard