import React from 'react';

import { 
  withLayout
} from 'components/common';
import './App.css';

function App() {
  return (
    <div className="container pt-5 pb-3">
      <h1 className="mb-4">A pet shop (test)</h1>
      <div className="form-row">
        <div className="form-group col-md-4 col-xl-3">
          <select id="inputState" className="form-control">
            <option value='none'  >Grouped by owner gender</option>
            <option value='pet'>...</option>
          </select>
        </div>
        <div className="form-group col-md-4 col-xl-3">
          <select id="inputState" className="form-control">
            <option selected>Grouped by pet type</option>
            <option>...</option>
          </select>
        </div>
        <div className="form-group col-md-4 col-xl-3 offset-xl-3">
          <div className="btn-group btn-group-toggle tool__viewedBy" data-toggle="buttons">
            <label className="btn btn-secondary active">
              <input type="radio" name="options" id="option1" autocomplete="off" checked /> Owners
            </label>
            <label className="btn btn-outline-secondary">
              <input type="radio" name="options" id="option2" autocomplete="off" /> Pets
            </label>
          </div>
        </div>
      </div>
      <hr />
      <h3 className="text-muted group__label">Group: Male</h3>
        <ul className="box__list">
          <li>
          </li>
        </ul>
    </div>
  );
}

export default withLayout(App);
