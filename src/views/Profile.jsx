import Header from "../components/Header";
import "../styles/profile.css"

export default function Profile() {
    return (
        <>
            <Header name="MY PROFILE" allowSearch={false} />

            <div className="display--elements" style={{
                overflowY: "visible"
            }}>

                <div className="profile--Info">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" disabled />

                    </div>
                    <div>
                        <label htmlFor="email-profile">Email</label>
                        <input type="text" name="email-profile" id="email-profile" disabled />

                    </div>
                    <div>
                        <label htmlFor="Department">Department</label>
                        <input type="text" name="Department" id="Department" disabled />
                    </div>

                </div>
            </div>
        </>
    );
}