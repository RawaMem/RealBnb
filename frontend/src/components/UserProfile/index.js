import { useSelector } from "react-redux"

function UserProfile() {
    const user = useSelector(state => state.session.user);


    return (
        <div>
            <h3>Welcome back, {user.username}</h3>
            <div className="select-bar-container">
                
            </div>
        </div>
    )
}

export default UserProfile;