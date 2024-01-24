import { createPortal } from "react-dom";
import {
    Form,

} from "react-router-dom";
import '../styles/modal.css'

export default function Modal({ isShowing, hide, fileInfo }) {


    function show(type) {
        let display
        try{}
        catch(e){
            throw e;
        }
        if (type === "Accept") {
            display = (
                // display here a list of 3rd parties + button send it 
                <div className="third-party--holder">
                    <Form method="post" action="dispatch">
                        <input type="text" hidden readOnly value={fileInfo.path} name="id"></input>
                        <div style={{
                            display: "flex"

                        }}>
                            <div
                                className="attachment"

                            >
                                <input
                                    type="radio"
                                    id="handle"
                                    name="handle"
                                    value="cops"
                                    defaultChecked


                                ></input>
                                <span>cops</span>


                            </div>

                            <div
                                className="attachment"

                            >
                                <input
                                    type="radio"
                                    id="handle"
                                    name="handle"
                                    value="manicipality"
                                ></input>

                                <span> manicipality</span>


                            </div>
                            <div
                                className="attachment"

                            >
                                <input
                                    type="radio"
                                    id="handle"
                                    name="handle"
                                    value="Water"
                                ></input>

                                <span>Water</span>


                            </div>


                        </div>


                        <button className="button" style={{
                            marginTop: "2rem",
                        }}
                        >dispatch</button>
                    </Form>
                </div>
            );
        }
        else if (type === "image") {
            display = (
                <img src={fileInfo.path} alt="attachment img" />
            );
        }
        else {
            display = (

                <iframe src={fileInfo.path} width={"100%"} height={"100%"} allowFullScreen >
                    <p>Your browser does not support iframes.</p>
                </iframe>
            );
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

                        {
                            show(fileInfo.type)
                        }

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