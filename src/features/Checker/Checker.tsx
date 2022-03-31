import {ChangeEvent, FormEvent} from "react";
import style from './Checker.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
  isCountryAC, isMobileAC,
  isRequestAC,
  searchTC
} from "../../store/app-reducer";
import {DataMonitor} from "../Data-monitor/DataMonitor";
import {AppStateType} from "../../store/store";

export const Checker = () => {
  const dispatch = useDispatch()
  let pageSize = useSelector<AppStateType, number>(state => state.app.pageSize)
  let country = useSelector<AppStateType, string>(state => state.app.country)
  let userAgent = useSelector<AppStateType, string>(state => state.app.userAgent)
  let request = useSelector<AppStateType, string>(state => state.app.request)
  let isMobile = useSelector<AppStateType, boolean>(state => state.app.isMobile)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    dispatch(isRequestAC(e.currentTarget.value))
  }

  const switchCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist()
    dispatch(isCountryAC(e.currentTarget.value))
  }

  const handleCheckBox = () => {
    dispatch(isMobileAC(!isMobile))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchTC(request, country, userAgent, pageSize, isMobile))
    dispatch(isRequestAC(''))
  }

  return (
    <div className={style.container}>
      <h1>Google it!</h1>
      <form name="form" onSubmit={handleSubmit}>
        <label>
          <input type="text" value={request} onChange={handleChange}
                 placeholder="Find here..."/>
        </label>
        <button type="submit"></button>
        <div className={style.setter}>
          <label>
            Choose the country:
            <select value={country} onChange={switchCountry}>
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
            <input className={style.optionInputCheckbox} type="checkbox"
                   checked={isMobile} onChange={handleCheckBox}/>
          </label>
        </div>
      </form>
      <DataMonitor/>
    </div>
  );
}