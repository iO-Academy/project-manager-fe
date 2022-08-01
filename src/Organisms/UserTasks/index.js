import {Link} from "react-router-dom";
import Task from "../../Molecules/Task";
import {useContext} from "react";
import LocaleContext from "../../utils/LocaleContext";

export default function UserTasks({user, tasks}) {

    const locale = useContext(LocaleContext)

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
                        tasks.map(task => {
                            if (locale === 'us' && task.estimate_hrs && task.estimate_days) {
                                task.estimate = `${task.estimate_hrs} hrs / ${task.estimate_days} days`
                            }
                            return <Task key={task.id} id={task.id} name={task.name} overdue={task.overdue} estimate={task.estimate} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}