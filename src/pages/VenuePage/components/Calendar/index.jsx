import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ selectedDate, onChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      required
      className="form-control rounded-5 px-3"
      popperPlacement="top"
      popperClassName="react-datepicker-top"
      popperContainer={({ children }) => (
        <div
          style={{
            margin: "0 auto",
            zIndex: 2,
            transform: "translateY(-100%)",
            position: "absolute",
          }}
        >
          {children}
        </div>
      )}
    />
  );
}

export default Calendar;
