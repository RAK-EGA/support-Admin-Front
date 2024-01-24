import {
    Form,
    useSubmit,

} from "react-router-dom"
import { useSelector } from "react-redux";

export default function Header({ name, searching = false, q = '', allowSearch = true, mess = null }) {

    const submit = useSubmit();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--first" : "";
    return (

        <div className="items--header"><span>{name}</span>
            {
                allowSearch && <Form id="search-form" role="search">
                    {mess ? <div className="error--message">{mess}</div> : null}
                    <input
                        id={name}
                        className={searching ? "loading " + className : "" + className}
                        aria-label={`Search ${name}`}
                        type="search"
                        name={name}
                        defaultValue={q}
                        onChange={(event) => {
                            const isFirstSearch = q == null;


                            submit(event.currentTarget.form, {
                                replace: !isFirstSearch,
                            })


                        }}
                    />
                    <div
                        id="search-spinner"
                        aria-hidden
                        hidden={!searching}
                    />
                    <div
                        className="sr-only"
                        aria-live="polite"
                    ></div>
                </Form>}

            {/* add filtering */}
            {/* maybe a button that gives choices and then */}

        </div>
    );

}