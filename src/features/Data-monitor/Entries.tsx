import style from "./Entries.module.css";

type PropsType = {
  title: string
  description: string
  link: string
}
export const Entries = (props: PropsType) => {
  return (
    <div className={style.container}>
      <div className={style.title}>{props.title}</div>
      <a href={props.link}>{props.link}</a>
      <div className={style.description}>{props.description}</div>
      <hr/>
    </div>
  )
}
