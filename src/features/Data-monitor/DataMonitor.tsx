import {AppStateType} from "../../store/store";
import {useSelector} from "react-redux";
import style from './DataMonitor.module.css'
import {EntriesType} from "../../api/api";
import {Entries} from "./Entries";

export const DataMonitor = () => {
  const entries = useSelector<AppStateType, Array<EntriesType>>(state => state.app.entries)
  return (
    <div className={style.container}>
      {entries.map(entry => <Entries key={entry.id}
                                     title={entry.title}
                                     description={entry.description}
                                     link={entry.link}
        />
      )}
    </div>
  );
}
