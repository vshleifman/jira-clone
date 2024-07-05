import {useState} from "react"
import styled from "styled-components"
import {Data} from "./mockData"

const Cell = styled.div`
  display: grid;
  border: 1px solid blue;
  gap: 12px;
  padding: 12px;
`

const Ticket = styled.div<{id: number}>`
  border: 1px solid green;
  padding: 2px;
`

const GridCol = ({
  tickets = [],
  epic,
  status,
  handleClick,
}: {
  tickets: Data[]
  epic: string
  status: string
  handleClick: (
    ticketId: number,
    targetStatus: string,
    targetEpic: string
  ) => void
}) => {
  const cellId = `${epic}-${status}`
  const [targetCell, setTargetCell] = useState("")

  const [targetEpic, targetStatus] = targetCell.split("-")

  return (
    <Cell
      id={cellId}
      onDrop={e => {
        const {targetTicketId, sourceCellId} = JSON.parse(
          e.dataTransfer.getData("ticketMove")
        )
        if (targetCell !== sourceCellId) {
          handleClick(targetTicketId, targetStatus, targetEpic)
        }
      }}
      onDragOverCapture={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setTargetCell(e.currentTarget.id)
      }}
    >
      {tickets.map(ticket => {
        if (ticket.epic !== epic) return null
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
                  sourceCellId: cellId,
                })
              )
            }}
            draggable={true}
            id={ticket.id}
          >
            {ticket.title}
          </Ticket>
        )
      })}
    </Cell>
  )
}

export default GridCol
