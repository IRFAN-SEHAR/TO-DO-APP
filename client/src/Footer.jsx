import React from "react";
function Footer(){
    const time = new Date().getFullYear();
    return(
        <footer>
        <p>All rights Reserved@ {time} </p>
        </footer>
    )
};
export default Footer;