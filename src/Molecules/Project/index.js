import {Link} from "react-router-dom";

export default function Project({id, name, overdue}) {
    return (
        <div className='col-3'>
            <Link to={"/project/" + id}>
                <div className={'border rounded p-3 alert-' + (overdue ? 'danger border-danger' : 'dark')}>
                    <h3>{name}</h3>
                </div>
            </Link>
        </div>
    )
}