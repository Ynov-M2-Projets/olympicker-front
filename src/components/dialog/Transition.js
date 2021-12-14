import {forwardRef} from "react";
import Slide from "@mui/material/Slide";

export const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});