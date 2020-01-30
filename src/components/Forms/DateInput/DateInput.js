import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateInput = ({ onChange, className, id }) => {
  const [date, setDate] = useState(new Date())

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
