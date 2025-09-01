import NavigationBar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <div>
            <NavigationBar />
            <div className="p-6">{children}</div>
        </div>
    );
};

export default Layout;