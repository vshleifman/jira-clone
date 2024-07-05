import {Data} from "../mockData"

export const moveTicket = (
  data: Data[],
  ticketId: number,
  targetStatus: string,
  targetEpic: string
) => {
  const ticket = data.find(ticket => {
    return ticket.id == ticketId
  })

  if (!ticket) return data
  const ticketIndex = data.indexOf(ticket)
  const updatedTicket = {...ticket, status: targetStatus, epic: targetEpic}

  data[ticketIndex] = updatedTicket
  return data
}
