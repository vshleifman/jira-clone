import styled from "styled-components"
import {Data} from "./mockData"
import {handleMoveStatusOrEpic} from "./helpers/moveTicket"
import GridRow from "./gridRow"
import {useDataStore, useLayoutStore} from "./store"

const Container = styled.div<{rows: number}>`
  display: grid;
  grid-template-rows: min-content auto;
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
  const dataState = useDataStore(state => state.dataState)
  const {
    targetColumn,
    setTargetColumn,
    targetRow,
    columnOrderedList,
    setColumnOrderedList,
    rowOrderedList,
    setRowOrderedList,
  } = useLayoutStore()

  const columns = columnOrderedList
  const epics = rowOrderedList

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
            setColumnOrderedList(
              handleMoveStatusOrEpic(
                Number(draggedIndex),
                Number(targetColumn),
                columnOrderedList
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
            setRowOrderedList(
              handleMoveStatusOrEpic(
                Number(draggedIndex),
                Number(targetRow),
                rowOrderedList
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
              id={i}
            />
          )
        })}
      </EpicsGrid>
    </Container>
  )
}

export default App
