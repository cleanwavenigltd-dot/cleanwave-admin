import React from 'react';
import LoginForm from '../../Login/components/LoginForm';

const VendorLogin = () => {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <div>
          </div>
      <LoginForm loginType="vendor" />
    </div>
  );
};

export default VendorLogin;
