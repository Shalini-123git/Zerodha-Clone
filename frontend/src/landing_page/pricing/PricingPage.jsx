import React from "react";
import Hero from "./Hero.jsx";
import Brokerage from "./Brokerage.jsx";
import OpenAccount from "../openAccount.jsx";

function PricingPage() {
  return (
    <>
      <Hero />
      <OpenAccount />
      <Brokerage />
    </>
  );
}

export default PricingPage;