import { useState } from "react";
import moment from "moment";

export default function todayDate() {
  const [date, setDate] = useState(new Date());

  return date;
}
