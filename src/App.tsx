import {useState} from "react"
import styled from "styled-components"
import {Data, data, epicsList, statusList} from "./mockData"
import {handleMoveStatusOrEpic, moveTicket} from "./helpers/moveTicket"
import GridRow from "./gridRow"

const Container = styled.div<{rows: number}>`
  display: grid;
  grid-template-rows: min-content auto;
  height: 66vh;
  width: 100%;
  gap: 8px;
  padding: 4px;
  border: 1px solid black;
`

const EpicsGrid = styled.div<{rows: number}>`
  display: grid;
  grid-template-rows: ${({rows}) => `repeat(${rows}, auto)`};
  gap: 8px;
`

const StatusesBar = styled.div<{columns: number}>`
  display: grid;
  grid-template-columns: ${({columns}) => `repeat(${columns}, 1fr)`};
  gap: 12px;
`

const StatusTitle = styled.div<{id: number}>`
  background: #1b97d087;
  border-radius: 10px;
  padding: 5px 12px;
`

const App = () => {
  const [dataState, setDataState] = useState(data)

  const [targetColumn, setTargetColumn] = useState("")
  const [targetRow, setTargetRow] = useState("")
  const [statusOrderedList, setStatusOrderedList] = useState(statusList)
  const [epicsOrderedList, setEpicsOrderedList] = useState(epicsList)

  const handleMoveTicket = (
    ticketId: number,
    targetStatus: string,
    targetEpic: string
  ) => {
    const res = moveTicket(dataState, ticketId, targetStatus, targetEpic)
    setDataState([...res])
  }

  const columns = statusOrderedList
  const epics = epicsOrderedList

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
      <StatusesBar
        onDrop={e => {
          const {draggedIndex} = JSON.parse(
            e.dataTransfer.getData("columnMove")
          )
          if (draggedIndex !== targetColumn) {
            setStatusOrderedList(
              handleMoveStatusOrEpic(
                Number(draggedIndex),
                Number(targetColumn),
                statusOrderedList
              )
            )
          }
        }}
        columns={columns.length}
      >
        {columns.map((col, i) => {
          return (
            <StatusTitle
              onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                e.dataTransfer.setData(
                  "columnMove",
                  JSON.stringify({
                    draggedIndex: e.currentTarget.id,
                  })
                )
              }}
              onDragOverCapture={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault()
                setTargetColumn(e.currentTarget.id)
              }}
              draggable={true}
              id={i}
            >
              {col}
            </StatusTitle>
          )
        })}
      </StatusesBar>
      <EpicsGrid
        rows={epics.length}
        onDrop={e => {
          const transferData = e.dataTransfer.getData("columnMove")
          if (!transferData) return
          const {draggedIndex} = JSON.parse(transferData)
          if (draggedIndex !== targetRow) {
            setEpicsOrderedList(
              handleMoveStatusOrEpic(
                Number(draggedIndex),
                Number(targetRow),
                epicsOrderedList
              )
            )
          }
        }}
      >
        {epics.map((epic, i) => {
          return (
            <GridRow
              rowName={epic}
              ticketsSortedByStatus={ticketsSortedByStatus}
              handleMoveTicket={handleMoveTicket}
              statusList={statusOrderedList}
              setTargetRow={setTargetRow}
              id={i}
            />
          )
        })}
      </EpicsGrid>
    </Container>
  )
}

export default App
