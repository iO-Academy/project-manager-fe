import {Link} from "react-router-dom";
import Task from "../../Molecules/Task";

export default function UserTasks({user, tasks}) {
    return (
        <div className="col-12 col-sm-6 col-lg-3 h-100">
            <div className="border rounded p-3 h-100">
                <h4 className="border-bottom pb-2">
                    {user.name}
                    <img src={user.avatar} alt="User Avatar" className="float-right" />
                </h4>
                <div className="overflow-auto w-100" style={{height: 'calc(100% - 5px;)'}}>
                    {
                        tasks &&
                        tasks.map(task => <Task key={task.id} id={task.id} name={task.name} overdue={task.overdue} estimate={task.estimate} />)
                    }
                </div>
            </div>
        </div>
    )
}