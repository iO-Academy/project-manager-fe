import {useEffect, useState} from "react";
import {projectURL} from "../../config";
import handleError from "../../utils/ErrorHandler";
import {Link, useParams} from "react-router-dom";
import UserTasks from "../../Organisms/UserTasks";

export default function Project() {
    const [project, setProject] = useState({})
    const [error, setError] = useState(false)

    const params = useParams()

    const moreStyles = {
        right: 0,
        top: '150px',
        height: '300px'
    }

    const getProject = async () => {
        try {
            const response = await fetch(projectURL + '?id=' + params.id)
            if (await handleError(response, setError)) {
                const data = await response.json()
                setProject(data.data)
            }
        } catch(e) {
            setError('Unable to retrieve data')
        }
    }

    useEffect(() => {
        getProject()
    }, [])

    return (
        <>
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
                    project?.users?.map(user => <UserTasks key={user.id} user={user} tasks={[]} />)
                }
            </div>

            {
                project?.users?.length > 4 &&
                <div style={moreStyles} className="position-fixed">→</div>
            }
        </>
    )
}