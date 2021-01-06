import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import './DatePicker.css'

const DateInput = ({ onChange, className, id, initialDate }) => {
  const [date, setDate] = useState(initialDate)

  const handleChange = date => {
    setDate(date)
    onChange(date)
  }

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      dateFormatCalendar="mmm yyyy"
      className={className}
      name="date"
      id={id}
    />
  )
}

export default DateInput
