import React from 'react';

import Navigation from './Navigation';

const Global = (props) => {
  return ( 
    <div className="w-100 app-bg app-bg-img" style={{minHeight: "100%"}}>
      {/* Top  Nav */}
      <Navigation></Navigation>

      {/* Content */}
      <div className="container h-100">
        <div className="row h-100">
          <main role="main" className="col-md mx-auto col-lg-10 pt-3 px-4 h-100">
            { props.children }
          </main>
        </div>
      </div>
    </div>
   );
}
 
export default Global;