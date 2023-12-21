export default function Ticket() {
    return (

        <div className="ticket--container">
            <div className="ticket--info">
                <div className="ticket--id">
                    <span>Ticket ID #12315iisaor02394asd24</span>
                </div>
                <div className="ticket--category">
                    <span>Category: water support</span>
                    <span>Location: In your head rent free</span>
                </div>
            </div>
            <div className="ticket--date">
                <span>Issued on</span>
                <span>18/12/2023</span>
            </div>
            <div className="ticket--status">
                {/* i dont know maybe look for an icont I instead? OR just keep it and change the fill Color so that it changes with status */}
                {/* depending on the props.status I give span class either red blue or green and I also change the fill according to it */}

                {/* 
                     color: #007F00;    green
                     color: #D30000;    red 
                     color: #4A4AFF;    blue
                 */}
                <span className="status--holder red">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="4.43859" cy="3.66666" rx="3.53948" ry="3.5" fill="#D30000" />
                    </svg>
                    status
                </span>

            </div>
        </div>
    );
}