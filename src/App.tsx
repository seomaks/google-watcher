import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import {Checker} from "./features/Checker/Checker";
import {RequestStatusType} from "./store/app-reducer";
import {AppStateType} from "./store/store";
import Preloader from "./components/common/Preloader";

function App() {
const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

  if (status === 'loading') {
    return <div className="preload">
      <Preloader/>
    </div>
  }

  return (
    <div className="App">
      <Checker />
    </div>
  );
}

export default App;
