import React from "react";
import { Header } from "../features/header/Header";
import { CountryPallete } from "../features/countryPallete";

export const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <CountryPallete />
      </main>
    </div>
  );
};
