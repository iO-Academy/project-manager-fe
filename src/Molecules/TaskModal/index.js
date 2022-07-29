export default function TaskModal({task}) {
    return (
        <div className="row">
            <div className="col-12 col-sm-6">
                <strong>Task Estimate:</strong>
                <p>{task.estimate}</p>
            </div>
            <div className="col-12 col-sm-6">
                <strong>Task Deadline:</strong>
                <p className={(task.overdue ? 'text-danger' : '')}>{task.deadline}</p>
            </div>
            <div className="col-12">
                <strong>Task Description:</strong>
                <p>{task.description}</p>
            </div>
        </div>
    )
}