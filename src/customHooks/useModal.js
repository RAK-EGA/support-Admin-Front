import { useState } from "react";

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [fileInfo, setFileInfo] = useState({
        type: "none",
        path: "none",
    });



    function toggle() {
        setIsShowing(old => !old);
    }

    function setInfo(type,path){
        setFileInfo({
            type:type,
            path:path,
        })
    }

    return {
        isShowing,
        toggle,
        fileInfo,
        setInfo,
    }

};

export default useModal;