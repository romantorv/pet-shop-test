import React from 'react';

import { 
  withLayout
} from 'components';
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
            <div className="box__item">
              <div className="box__body">
                <div className="box__avatar">
                  <img src="static/images/icon_avatar_boy.svg" />
                </div>
                <div className="box__information">
                  <h5 className="mb-0">A Boy</h5>
                  <p className="text-muted mb-0">12</p>
                </div>
              </div>
              <div className="box__footer">
                <ul className="pets__list-mini">
                  <li className="pets__item-mini">
                    <span role="img" className="pets__avatar-mini" aria-label="Cat - Garfield">🐱</span>
                    <strong>Garfield</strong>
                  </li>
                  <li className="pets__item-mini">
                    <span role="img" className="pets__avatar-mini" aria-label="Fish - Ariel">🐳</span>
                    <strong>Ariel</strong>
                  </li>
                  <li className="pets__item-mini">
                    <span role="img" className="pets__avatar-mini" aria-label="Fish - Ariel">🐳</span>
                    <strong>Ariel</strong>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div className="box__item">
              <div className="box__body">
                <div className="box__avatar">
                  <img src="static/images/icon_avatar_boy.svg" />
                </div>
                <div className="box__information">
                  <h5 className="mb-0">A Boy</h5>
                  <p className="text-muted mb-0">12</p>
                </div>
              </div>
              <div className="box__footer">
                
              </div>
            </div>
          </li>
          <li>
            <div className="box__item">
              <div className="box__body">
                <div className="box__avatar">
                  <img src="static/images/icon_avatar_boy.svg" />
                </div>
                <div className="box__information">
                  <h5 className="mb-0">A Boy</h5>
                  <p className="text-muted mb-0">12</p>
                </div>
              </div>
              <div className="box__footer">
                <ul className="pets__list-mini">
                  <li className="pets__item-mini">
                    <span role="img" className="pets__avatar-mini" aria-label="Cat - Garfield">🐱</span>
                    <strong>Garfield</strong>
                  </li>
                  <li className="pets__item-mini">
                    <span role="img" className="pets__avatar-mini" aria-label="Fish - Ariel">🐳</span>
                    <strong>Ariel</strong>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div className="box__item">
              <div className="box__body">
                <div className="box__avatar">
                  <span role="img" className="pets__avatar" aria-label="Cat - Garfield">🐱</span>
                </div>
                <div className="box__information">
                  <h5 className="mb-0">Kitten</h5>
                </div>
              </div>
              <div className="box__footer bg-light">
                <div className="person__profile-mini">
                  <div className="person__avatar-mini">
                    <img src="static/images/icon_avatar_boy.svg" alt="Name - age" />
                  </div>
                  <div className="person__info-mini">
                    <h6 className="mb-0">A Boy - Age: 12</h6>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

    </div>
  );
}

export default withLayout(App);
