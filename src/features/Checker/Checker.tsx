import {ChangeEvent, FormEvent, useState} from "react";
import style from './Checker.module.css'
import {useDispatch} from "react-redux";
import {searchTC} from "../../store/app-reducer";
import {DataMonitor} from "../Data-monitor/DataMonitor";

export const Checker = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setData(e.target.value);
  }


  const switchCountry = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setLocation(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchTC(data, location))
  }

  return (
    <div className={style.container}>
      <h1>Google it!</h1>

      <form name="form" onSubmit={handleSubmit}>
        <label>
          <input type="text" value={data} onChange={handleChange}
                 placeholder="Find here..."/>
        </label>

        <label>
          <input type="text" value={location} onChange={switchCountry}
                 placeholder="Choose the country"/>
        </label>

        <button type="submit"></button>
      </form>
      <DataMonitor/>
    </div>
  );
}