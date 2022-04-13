import Navsidebar from "./Navsidebar";

const Layout = ({ children }) => {
  return (
    <body className="g-sidenav-show   bg-gray-100">
      <Navsidebar/>
      <main className="main-content position-relative border-radius-lg ">
      {children}
      </main>
    </body>
  );
};

export default Layout;
