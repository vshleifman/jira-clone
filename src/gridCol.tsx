import {useState} from "react"
import styled from "styled-components"

const Cell = styled.div`
  border: 1px solid orange;
  gap: 4px;
  padding: 4px;
`

const Ticket = styled.div`
  border: 1px solid green;
  padding: 2px;
`

const GridCol = ({
  tickets,
  handleClick,
  id,
}: {
  tickets: {[key: string]: {title: string}}
  handleClick: (ticket: number, newRow: number, newCol: number) => void
  id: string
}) => {
  const [targetCell, setTargetCell] = useState("")

  const [targetRow, targetCol] = targetCell
    .split("-")
    .map(item => item.slice(3))

  return (
    <Cell
      id={id}
      onDrop={e => {
        const {targetTicketId, sourceCellId} = JSON.parse(
          e.dataTransfer.getData("ticketMove")
        )
        if (targetCell !== sourceCellId) {
          handleClick(targetTicketId, Number(targetRow), Number(targetCol))
        }
      }}
      onDragOverCapture={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setTargetCell(e.currentTarget.id)
      }}
    >
      {Object.keys(tickets).map(ticket => {
        return (
          <Ticket
            onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
              console.log(e.currentTarget.id)
            }}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
              e.dataTransfer.setData(
                "ticketMove",
                JSON.stringify({
                  targetTicketId: e.currentTarget.id,
                  sourceCellId: id,
                })
              )
            }}
            draggable={true}
            id={ticket}
          >
            {tickets[ticket].title}
          </Ticket>
        )
      })}
    </Cell>
  )
}

export default GridCol
