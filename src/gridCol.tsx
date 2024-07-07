import {useState} from "react"
import styled from "styled-components"
import {Data} from "./mockData"

const Cell = styled.div`
  display: grid;
  background: #73c2df;
  border-radius: 5px;
  gap: 12px;
  padding: 8px 10px;
`

const Ticket = styled.div<{id: number}>`
  border: 1px solid green;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 0px #00000067;
  padding: 8px;
  background: #ffffff;
  &:hover {
    background: #91c7d4;
  }
`

const GridCol = ({
  tickets = [],
  epic,
  status,
  handleMoveTicket,
}: {
  tickets: Data[]
  epic: string
  status: string
  handleMoveTicket: (
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
        const transferData = e.dataTransfer.getData("ticketMove")
        if (!transferData) return
        const {targetTicketId, sourceCellId} = JSON.parse(transferData)
        if (targetCell !== sourceCellId) {
          handleMoveTicket(targetTicketId, targetStatus, targetEpic)
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
