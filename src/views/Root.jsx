import {
    Outlet,
    useNavigation,
} from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/root.css";
import SideBar from "../components/SideBar";
import { useSelector, useDispatch } from "react-redux";
import useToast from '../customHooks/useToast';
import { resetMessage } from "../features/messages/messagesSlice";

export default function Root() {
    const navigation = useNavigation();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const classname = isDarkmode ? "dark--primary" : "light--primary"
    const [isMessage, message] = useSelector((state) => state.messages.value);
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const { showSuccessToast, _ } = useToast();
    const show = () => {
        showSuccessToast(message,{className: `${classname} light--gray`,});
        dispatch(resetMessage());

    }
    isMessage ? show() : null;
    return (
        <div id="page--layout">
            <NavBar />
            <div id="content">
                <div id="sidebar">
                    <SideBar />
                </div>
                <div
                    id="detail"
                    className={
                        navigation.state === "loading" ? `loading ${classname}` : classname
                    }>



                    <Outlet />

                </div>


            </div>
        </div>



    );
}