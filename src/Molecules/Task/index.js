import {Link} from "react-router-dom";

export default function Task({id, name, overdue, estimate}) {
    return (
        <div className={'border rounded mb-3 p-3 alert-' + (overdue ? 'danger border-danger' : 'dark')}>
            <h3 className="mb-0">
                {name}
                <span className="badge badge-info float-right">{estimate}</span>
            </h3>
        </div>
    )
}