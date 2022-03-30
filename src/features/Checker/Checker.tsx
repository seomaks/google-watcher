import {ChangeEvent, FormEvent, useState} from "react";
import style from './Checker.module.css'
import {useDispatch, useSelector} from "react-redux";
import {searchTC} from "../../store/app-reducer";
import {DataMonitor} from "../Data-monitor/DataMonitor";
import {AppStateType} from "../../store/store";

export const Checker = () => {
  const dispatch = useDispatch()
  const pageSize = useSelector<AppStateType, number>(state => state.app.pageSize)
  const [data, setData] = useState<string>("")
  const [location, setLocation] = useState<string>("US")
  const [checkBox, setCheckBox] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setData(e.target.value);
  }

  const switchCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist()
    setLocation(e.target.value);
  }

  const handleCheckBox =() => {
    setCheckBox(!checkBox);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userAgent
    if (checkBox) { userAgent = 'mobile'}
    else {userAgent = 'desktop'}
    dispatch(searchTC(data, location, userAgent, pageSize))
  }

  return (
    <div className={style.container}>
      <h1>Google it!</h1>
      <form name="form" onSubmit={handleSubmit}>
        <label>
          <input type="text" value={data} onChange={handleChange}
                 placeholder="Find here..."/>
        </label>
        <button type="submit"></button>
        <div className={style.setter}>
        <label>
          Choose the country:
          <select value={location} onChange={switchCountry}>
            <option value="US">USA</option>
            <option value="BR">Brazil</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="GB">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="AU">Australia</option>
          </select>
        </label>
        <label>
          Mobile
          <input className={style.optionInputCheckbox} type="checkbox" checked={checkBox} onChange={handleCheckBox} />
        </label>
        </div>
      </form>
      <DataMonitor />
    </div>
  );
}