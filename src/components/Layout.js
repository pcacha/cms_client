import React from "react";
import Navigation from "./Navigation"
import Footer from "./Footer"

const layout = (props) => (
    <>
        <Navigation />
        {props.children}
        <Footer />
    </>
);

export default layout;