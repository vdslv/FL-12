import React from "react";
import {Link} from "react-router-dom";

function Btn() {
    return (
        <Link to='/addPost'><button id='btn'>Add course</button></Link>

    )
}

export default Btn;