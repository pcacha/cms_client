import React from "react";

const themesCard = (props) => (
    <div className="col mt-2">
        <div className={"my-card border rounded"}>
            <h3>{props.title}</h3>
            <p>{props.info}</p>
        </div>
    </div>
);

export default themesCard;