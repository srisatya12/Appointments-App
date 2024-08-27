// Write your code here
const AppointmentItem = props => {
  const {each, changeLike} = props
  const {id, title, date, isLike} = each
  const onChangeLike = () => {
    changeLike(id)
  }
  const image = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <p>{title}</p>
      <p>{date}</p>
      <button onClick={onChangeLike}>
        <img src={image} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
