import {useState} from "react"
import styled from "styled-components"
import {Data, data, epicsList, statusList} from "./mockData"
import {moveTicket} from "./helpers/moveTicket"
import GridRow from "./gridRow"

const Container = styled.div<{rows: number}>`
  display: grid;
  grid-template-rows: ${({rows}) => `min-content repeat(${rows}, auto)`};
  height: 66vh;
  width: 100%;
  gap: 8px;
  padding: 4px;
  border: 1px solid black;
`

const StatusesBar = styled.div<{columns: number}>`
  display: grid;
  grid-template-columns: ${({columns}) => `repeat(${columns}, 1fr)`};
  gap: 12px;
`

const StatusTitle = styled.div`
  border: 1px solid blue;
  padding: 4px;
`

const App = () => {
  const [dataState, setDataState] = useState(data)

  const handleClick = (
    ticketId: number,
    targetStatus: string,
    targetEpic: string
  ) => {
    const res = moveTicket(dataState, ticketId, targetStatus, targetEpic)
    setDataState([...res])
  }
  const columns = statusList
  const epics = epicsList

  const ticketsSortedByStatus: {[key: string]: Data[]} = {}

  columns.forEach(col => {
    dataState.forEach(ticket => {
      if (ticket.status === col) {
        if (!ticketsSortedByStatus[col]) {
          ticketsSortedByStatus[col] = []
        }
        ticketsSortedByStatus[col].push(ticket)
      }
    })
  })

  return (
    <Container rows={epics.length}>
      <StatusesBar columns={columns.length}>
        {columns.map((col, i) => {
          return <StatusTitle key={i}>{col}</StatusTitle>
        })}
      </StatusesBar>
      {epics.map((epic, i) => {
        return (
          <GridRow
            id={i + 1}
            rowName={epic}
            ticketsSortedByStatus={ticketsSortedByStatus}
            handleClick={handleClick}
          />
        )
      })}
    </Container>
  )
}

export default App
