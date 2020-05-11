import React from "react";
import { Header } from "../features/header/Header";
import { CountryDataDisplay } from "../features/countryDataDisplay/CountryDataDisplay";
import { useParams } from "react-router-dom";

export const Country = () => {
  let { countryCode } = useParams();

  return (
    <div className="App">
      <Header />
      <main>
        <CountryDataDisplay countryCode={countryCode} />
      </main>
    </div>
  );
};
