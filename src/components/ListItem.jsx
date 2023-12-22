export default function ListItem({item}) {
    const color = item.status==="resolved"?"green":item.status==="unresolved"?"red":"gray" 
    const pointFill = color=="green"?"#007F00":color=="red"?"#D30000":"#767676"
    return (

        <div className="item--container">
            <div className="item--info">
                <div className="item--id">
                    <span>{item.id}</span>
                </div>
                <div className="item--category">
                    <span>Category: {item.category}</span>
                    <span>Location: {item.location}</span>
                </div>
            </div>
            <div className="item--date">
                <span>Issued on</span>
                <span>{item.date}</span>
            </div>
            <div className="item--status">
                {/* i dont know maybe look for an icont I instead? OR just keep it and change the fill Color so that it changes with status */}
                {/* depending on the props.status I give span class either red blue or green and I also change the fill according to it */}

                {/* 
                     color: #007F00;    green
                     color: #D30000;    red 
                     color: #4A4AFF;    blue
                     color: #767676: gray
                 */}
                <span className={`status--holder ${color}`}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="4.43859" cy="3.66666" rx="3.53948" ry="3.5" fill={pointFill} />
                    </svg>
                    {item.status}
                </span>

            </div>
        </div>
    );
}