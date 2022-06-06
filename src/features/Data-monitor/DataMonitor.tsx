import React from "react";
import {AppStateType} from "../../store/store";
import {useSelector} from "react-redux";
import style from './DataMonitor.module.css'
import {EntriesType} from "../../api/api";
import {Entries} from "./Entries";
import {v1} from 'uuid';

export const DataMonitor = React.memo(() => {
  console.log("Data monitor")
  const entries = useSelector<AppStateType, Array<EntriesType>>(state => state.app.entries)

  return (
    <div className={style.container}>
      {entries.map(entry => <Entries key={v1()}
                                     title={entry.title}
                                     description={entry.description}
                                     link={entry.link}
        />
      )}
    </div>
  );
})
