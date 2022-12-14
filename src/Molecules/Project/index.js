import {Link} from "react-router-dom";

export default function Project({id, name, overdue}) {
    return (
        <div className='col-12 col-sm-6 col-lg-3 mb-3'>
            <div className={'border rounded p-3 alert-' + (overdue ? 'danger border-danger' : 'dark')}>
                <h3>{name}</h3>
            </div>
        </div>
    )
}