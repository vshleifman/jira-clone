import styled from "styled-components"
import GridCol from "./gridCol"
import {Data} from "./mockData"

const Row = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  gap: 6px;
`

const RowHeading = styled.div<{id: number}>`
  padding: 8px 12px;
  &:hover {
    background: #36b0ce;
  }
`

const RowBody = styled.div<{cols: number}>`
  display: grid;
  gap: 12px;
  grid-template-columns: ${({cols}) => `repeat(${cols}, 1fr)`};
`

const GridRow = ({
  rowName,
  ticketsSortedByStatus,
  handleMoveTicket,
  statusList,
  setTargetRow,
  id,
}: {
  rowName: string
  ticketsSortedByStatus: {[key: string]: Data[]}
  id: number
  handleMoveTicket: (
    ticketId: number,
    targetStatus: string,
    targetEpic: string
  ) => void
  statusList: string[]
  setTargetRow: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <Row>
      <RowHeading
        id={id}
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
          setTargetRow(e.currentTarget.id)
        }}
        draggable={true}
      >
        {rowName}
      </RowHeading>
      <RowBody cols={statusList.length}>
        {statusList.map(col => {
          return (
            <GridCol
              tickets={ticketsSortedByStatus[col]}
              handleMoveTicket={handleMoveTicket}
              status={col}
              epic={rowName}
            />
          )
        })}
      </RowBody>
    </Row>
  )
}

export default GridRow
