import Project from "../../Molecules/Project";
import {useEffect, useState} from "react";
import {projectsURL} from "../../config";
import handleError from "../../utils/ErrorHandler";

export default function Home() {
    const [projects, setProjects] = useState([])
    const [error, setError] = useState(false)

    const getProjects = async () => {
        try {
            const response = await fetch(projectsURL)
            if (await handleError(response, setError)) {
                const data = await response.json()
                setProjects(data.data)
            }
        } catch(e) {
            setError('Unable to retrieve data')
        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <>
            <div className='row mb-2'>
                <div className='col-12'>
                    <h1>Projects</h1>
                </div>
            </div>
            <div className='row'>
                {
                    error &&
                    <div className="col-12"><div className="alert alert-danger">Error: {error}</div></div>
                }
                {
                    !error &&
                    projects.map(project => <Project key={project.id} id={project.id} name={project.name} overdue={project.overdue} />)
                }
            </div>
        </>
    )
}