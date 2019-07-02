import React from 'react';

import { 
  withLayout
} from 'components/common';
import Homepage from 'pages/Homepage';
import PetStore from 'stores';
import './App.css';


function App() {
  const petStore = PetStore.create({state: 'initial'});
  return (
    <div className="container pt-5 pb-3">
      <h1 className="mb-4">A pet shop (test)</h1>
      <hr />
      <Homepage componentStore={petStore} />
    </div>
  );
}

export default withLayout(App);
