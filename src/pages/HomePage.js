import React from "react";
import Jumbotron from "../components/Jumbotron";
import ThemesCard from "../components/ThemesCard";

const home = (props) => (
    <div className="bg-white">
        <Jumbotron/>

        <div className="container mt-5 pb-5">
            <div className="row">
                <div className="col d-flex justify-content-center align-items-center flex-column">
                    <h3>Naše témata</h3>
                    <p>Stránky jsou určené pro každého, kdo chce přispět jakýmkoliv článkem týkajícím se vědy</p>
                </div>
            </div>
            <div className="row mt-3 bottom-padding">
                <ThemesCard title="Nekonečný Vesmír" info="Připoj se s námi na tajuponé cestě hlubokým vesmírem!"/>

                <ThemesCard title="Informační Technologie"
                            info="Automatizovné systémy pomáhají vytvářet města nové generace!"/>

                <ThemesCard title="Lidské Tělo"
                            info="Pojď se něco dozvědět o tom, jak funguje lidksé tělo a jeho procesy!"/>
            </div>
        </div>
    </div>
);

export default home;