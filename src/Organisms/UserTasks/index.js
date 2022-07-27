import {Link} from "react-router-dom";
import Project from "../../Molecules/Project";

export default function UserTasks({user, tasks}) {
    return (
        <div className="col-12 col-sm-6 col-lg-3 h-100">
            <div className="border rounded p-3 h-100">
                <h4 className="border-bottom pb-2">
                    {user.name}
                    <img src={user.avatar} alt="User Avatar" className="float-right" />
                </h4>

                {
                    tasks.map(task => <Project />)
                }

            </div>
        </div>
    )
}