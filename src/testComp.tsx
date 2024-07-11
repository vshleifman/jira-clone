import {useState} from "react"
import {useTestStore} from "./store"

const Fill = () => {
  console.log("rerndering FIll")

  return (
    <div>
      hihi
      <Test />
    </div>
  )
}

const Test = () => {
  const {number, value, setNumber, setValue} = useTestStore()
  //   const number = useTestStore(state => state.number)
  //   const value = useTestStore(state => state.value)
  //   const setNumber = useTestStore(state => state.setNumber)
  //   const setValue = useTestStore(state => state.setValue)
  //   const [number, setNumber] = useState(0)
  //   const [value, setValue] = useState("test")
  console.log("rendering TEst")

  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}></button>
      <p>{value}</p>
      <input onChange={e => setValue(e.target.value)}></input>
    </div>
  )
}

export default Fill
