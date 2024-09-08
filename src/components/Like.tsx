import st from './like.module.scss'

const Like = ({ active }: { active: boolean }) => {
  return <span className={`${st.like} ${active ? st.like__active : ''}`}>♥</span>
}
export default Like
