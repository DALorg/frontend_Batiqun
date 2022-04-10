import Navsidebar from "./Navsidebar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navsidebar/>
      {children}
    </div>
  );
};

export default Layout;
