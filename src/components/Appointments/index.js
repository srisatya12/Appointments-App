// Write your code here
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'
import './index.css'
class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], isActive: false}
  changeLike = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isLike: !each.isLike}
        }
        return each
      }),
    }))
  }
  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }
  onChangeDate = event => {
    this.setState({date: event.target.value})
  }
  submitAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const updated_date = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newContact = {
      id: uuidv4(),
      title,
      date: updated_date,
      isLike: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newContact],
      title: '',
      date: '',
    }))
  }
  onStarred = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }
  filteredList = () => {
    const {isActive, appointmentList} = this.state
    if (isActive === true) {
      const filtered = appointmentList.filter(each => each.isLike === true)
      return filtered
    }
    return appointmentList
  }
  render() {
    const {title, date} = this.state
    const filteredList = this.filteredList()
    return (
      <div className="container">
        <div>
          <h1>Add Appointment</h1>
          <form onSubmit={this.submitAppointment}>
            <label for="title">Title</label>
            <input
              value={title}
              id="title"
              onChange={this.onChangeTitle}
              type="text"
              placeholder="Title"
            />
            <br />
            <label for="Date">Date</label>
            <input
              value={date}
              id="Date"
              onChange={this.onChangeDate}
              type="date"
            />
            <button type="submit"> Add</button>
          </form>
          <hr />
          <h1>Appointments</h1>
          <button data-testid="star" onClick={this.onStarred}>
            Starred
          </button>
          <ul>
            {filteredList.map(each => (
              <AppointmentItem
                key={each.id}
                each={each}
                changeLike={this.changeLike}
              />
            ))}
          </ul>
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
          />
        </div>
      </div>
    )
  }
}

export default Appointments
