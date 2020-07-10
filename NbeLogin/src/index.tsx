import React from 'react';
import FooterLogin from './FooterLogin/index';
import HeaderLogin from './HeaderLogin/index';
import FormLogin from './LoginNbe/index';


const PAGE_NAME_UPPER_CAMEL_CASE: React.FC<PAGE_NAME_UPPER_CAMEL_CASEProps> = () => {
  return (
    <><HeaderLogin/> <FormLogin/> <FooterLogin/> </>
  )
};

export default PAGE_NAME_UPPER_CAMEL_CASE;
