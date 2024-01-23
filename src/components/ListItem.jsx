import { useSelector } from "react-redux";

export default function ListItem({ item }) {
    const color = item.status === "closed" ? "green" : item.status === "opened" ? "red" : "gray"
    const pointFill = color == "green" ? "#007F00" : color == "red" ? "#D30000" : "#767676"
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "light--gray" : "";
    const additional_fields = item.additional_fields;


    function getLocation(additional_fields) {
        for (let field in additional_fields) {
            if (additional_fields[field].field_type === "location") return additional_fields[field];
        }
    }
    const location = getLocation(additional_fields)

    return (

        <div className="item--container">
            <div className="item--info">
                <div className="item--id">
                    <span className={className}>{item._id}</span>
                </div>
                <div className="item--category">
                    <span className={className}>Category: {item.category}</span>
                    <span className={className}>Location: {location.value}</span>
                </div>
            </div>
            <div className="item--date">
                <span className={className}>Issued on</span>
                <span className={className}>{item.createdAt}</span>
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