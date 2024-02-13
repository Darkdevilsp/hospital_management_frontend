import {Link} from "react-router-dom";


function Staff()
{
    return(
        <div>
            <h1>STAFF</h1>
            <Link to={"/managementSignup"}><button>ADD MANAGEMENT</button></Link>
        </div>
    )
}

export default Staff