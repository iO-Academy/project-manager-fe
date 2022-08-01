import Project from "../../Molecules/Project";
import {useContext, useEffect, useState} from "react";
import {clientsURL, projectsURL} from "../../config";
import handleError from "../../utils/ErrorHandler";
import LocaleContext from "../../utils/LocaleContext";

export default function Home() {
    const [projects, setProjects] = useState([])
    const [clients, setClients] = useState([])
    const [projectError, setProjectsError] = useState(false)
    const [clientError, setClientError] = useState(false)
    const [clientFilter, setClientFilter] = useState('all')

    const locale = useContext(LocaleContext)

    const getProjects = async () => {
        try {
            let requestURL = projectsURL + '?locale=' + locale
            if (clientFilter !== 'all') {
                requestURL = projectsURL + '?client=' + clientFilter + '&locale=' + locale
            }
            const response = await fetch(requestURL)
            if (await handleError(response, setProjectsError)) {
                const data = await response.json()
                setProjects(data.data)
            }
        } catch(e) {
            setProjectsError('Unable to retrieve data')
        }
    }

    const getClients = async () => {
        try {
            const response = await fetch(clientsURL)
            if (await handleError(response, setClientError)) {
                const data = await response.json()
                setClients(data.data)
            }
        } catch(e) {
            setClientError('Unable to retrieve client data')
        }
    }

    useEffect(() => {
        getProjects()
    }, [locale, clientFilter])

    useEffect(() => {
        getClients()
    }, [])

    return (
        <>
            <div className='row mb-2'>
                <div className='col-12'>
                    <h1>Projects</h1>
                </div>
                <div className="col-12">
                    <h5>Filter projects by client:</h5>
                    <select value={clientFilter} onChange={(e) => {setClientFilter(e.target.value)}}>
                        {
                            !clientError &&
                            <option value="all">All clients</option>
                        }
                        {
                            clientError &&
                            <option selected disabled>{clientError}</option>
                        }
                        {
                            clients &&
                            clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className='row'>
                {
                    projectError &&
                    <div className="col-12"><div className="alert alert-danger">Error: {projectError}</div></div>
                }
                {
                    !projectError &&
                    projects.map(project => <Project key={project.id} id={project.id} name={project.name} overdue={project.overdue}/>)
                }
            </div>
        </>
    )
}