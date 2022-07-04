import React from 'react';

const Admin = ({ children }) => {
  return (
    <div className="layout-admin ">
      <main className="page">
        {children}
      </main>
    </div>
  );
};

export default Admin;
