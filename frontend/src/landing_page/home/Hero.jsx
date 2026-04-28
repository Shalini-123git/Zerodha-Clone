import React from "react";

function Hero() {
    return (
        <div className="container p-5">
            <div className="row text-center">
                <img src="media/images/homeHero.png" alt="Hero Image" className="mb-5"/>
                <h1>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivations, mutual funds, and more</p>
                <button style={{width:"25%", margin:"0 auto"}} className="p-3 btn btn-primary fs-5">Signup Now</button>
            </div>
        </div>
    )
}

export default Hero;