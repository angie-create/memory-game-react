import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout__container">
        {children}
      </div>
    </div>
  );
};

export default Layout;