import React from "react";

export function Hero(){
    return (
        <>
        <Center className="alligator">
            <img  className="alligator center" src="images/welcome.gif"/>
        </Center>
        <hr className="alligator" />
        <ul id="contact" className="hero-content">
            <li className="alligator"><a target="_blank" href="https://open.spotify.com/user/ge7ibsztbcdxkj0umooh7av6l?si=56600db326404ff7">Spotify</a></li>
            <li className="normal"><a target="_blank"  href="https://www.linkedin.com/in/minh-phu-ngo-79b5a32b0/">Linkedln</a></li>
            <li><a target="_blank"  href="https://github.com/Minardi299">Github</a></li>
            <li><a target="_blank" href="mailto:phu.ngo@outlook.com">Contact</a></li>
            <li className="alligator"><a target="_blank" href="">Dont click</a></li>
        </ul> 
        <section id="hero" className="bg active">
            <div className="hero-content">
            <div className="hero-text normal">
                <p className="no-margin">Hi! My name is</p>
                <h1 id="name" className="no-margin hidden">minh</h1>
                <h3 className="no-margin">Junior developer</h3>
                <h5 id="current-time"></h5>
            </div>
            <div className="hero-button">
                <input type="checkbox" id="checkboxInput"/>
                <label htmlFor="checkboxInput" className="toggleSwitch"></label>
            </div>
            </div>
        </section>
        </>
    );
}