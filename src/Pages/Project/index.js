import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {projectURL, tasksURL, taskURL} from "../../config";
import handleError from "../../utils/ErrorHandler";
import {Link, useParams} from "react-router-dom";
import UserTasks from "../../Organisms/UserTasks";
import Modal from "../../Organisms/Modal";
import TaskModal from "../../Molecules/TaskModal";
import LocaleContext from "../../utils/LocaleContext";

export default function Project() {
    const [project, setProject] = useState({})
    const [task, setTask] = useState(false)
    const [error, setError] = useState(false)
    const [taskError, setTaskError] = useState(false)
    const navigate = useNavigate()

    const params = useParams()

    const locale = useContext(LocaleContext)

    const moreStyles = {
        right: 0,
        top: '150px',
        height: '300px'
    }

    const getProject = async () => {
        try {
            const response = await fetch(projectURL + '?id=' + params.id + '&locale=' + locale)
            if (await handleError(response, setError)) {
                const data = await response.json()
                for(const user of data.data.users) {
                    user.tasks = await getTasks(user.id)
                }
                setProject(data.data) // set the tasks data

            }
        } catch(e) {
            setError('Unable to retrieve data')
        }
    }

    const getTasks = async (uid) => {
        try {
            const response = await fetch(tasksURL + '?user_id=' + uid + '&project_id=' + params.id + '&locale=' + locale)
            if (await handleError(response, setError)) {
                const data = await response.json()
                return data.data
            }
        } catch(e) {
            setError('Unable to retrieve task data')
            return []
        }
    }

    const getTask = async id => {
        try {
            const response = await fetch(taskURL + '?id=' + id + '&locale=' + locale)
            if (await handleError(response, setError)) {
                const data = await response.json()
                if (locale === 'us' && data.data.estimate_hrs && data.data.estimate_days) {
                    data.data.estimate = `${data.data.estimate_hrs} hrs / ${data.data.estimate_days} days`
                }
                setTask(data.data)
            }
        } catch(e) {
            setTaskError('Unable to retrieve task')
        }
    }

    useEffect(() => {
        getProject()
    }, [locale])

    useEffect(() => {
        if (params.tid) {
            getTask(params.tid)
        }
    }, [params.tid, locale])

    return (
        <>
            {
                params.tid &&
                <Modal title={(task ? task.name + ' - ' + task.deadline : 'Error')} show={true} closeModal={() => {navigate("/project/" + params.id)}}>
                    {
                        task &&
                        <TaskModal task={task} />
                    }
                    {
                        taskError &&
                        <div className="alert alert-danger">Error: {taskError}</div>
                    }
                </Modal>
            }
            <div className='row mb-2'>
                <div className='col-12'>
                    {
                        error &&
                        <div className="alert alert-danger">Error: {error}</div>
                    }
                    {
                        !error &&
                        <div className="d-flex justify-content-between">
                            <h1>
                                {project.name}
                                <Link to={"/"} className="ml-4 h6">Return to all projects</Link>
                            </h1>
                            <h3>
                                {project.client_name}
                                <img style={{width: '50px'}} src={project.client_logo} alt="Client logo" className="ml-1" />
                            </h3>
                        </div>
                    }
                </div>
            </div>
            <div className='row overflow-auto flex-nowrap h-75 pb-5'>
                {
                    project &&
                    project?.users?.map(user => <UserTasks key={user.id} user={user} tasks={user.tasks} />)
                }
            </div>

            {
                project?.users?.length > 4 &&
                <div style={moreStyles} className="position-fixed">→</div>
            }
        </>
    )
}