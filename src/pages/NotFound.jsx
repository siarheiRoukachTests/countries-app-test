import React from "react";
import { Header } from "../features/header/Header";
import { ErrorMessage } from "../ui/errorMessage/ErrorMessage";

export const NotFound = () => {
  return (
    <div>
      <Header />
      <main>
        <ErrorMessage status={404} />
      </main>
    </div>
  );
};
