import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function RootLayout() {
  return (
    <Fragment>
      {/* <header className="container sticky">Header</header> */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="container sticky bottom-0">Footer</footer>
    </Fragment>
  );
}
