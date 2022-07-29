export default function Modal({show, closeModal, title, children}) {
    return (
        <>
            {
                show &&
                <div className="modal-backdrop fade show"></div>
            }

            <div className={"modal" + (show ? ' open d-block' : '')} tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}