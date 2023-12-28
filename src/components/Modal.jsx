import { createPortal } from "react-dom";
import '../styles/modal.css'

export default function Modal({ isShowing, hide, fileInfo }) {

    function isImage(type) {
        return ['png', 'jpeg', 'webp','jpg'].includes(type);
    }
    function show(type) {
        let display

        if (isImage(type)) {
            display = (
                <img src={fileInfo.path} alt="attachment img" />
            )
        }
        else {
            display = (
                <iframe src={fileInfo.path} width={"100%"} height={"100%"} allowFullScreen >
                    <p>Your browser does not support iframes.</p>
                </iframe>)
        }
        return display;
    }


    const display = (

        <>
            <div className="modal-overlay" />
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                    <div className="modal-header">
                        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="media--holder">
                        {show(fileInfo.type)}

                    </div>

                </div>
            </div>
        </>


    );
    return (
        isShowing ? createPortal(
            display, document.body
        ) : null
    );
}