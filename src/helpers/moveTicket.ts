import {Data} from "../mockData"

export const moveTicket = (
  data: Data,
  ticketKey: number,
  newRow: number,
  newCol: number
) => {
  console.log({data, ticketKey, newRow, newCol})

  let ticketToMove

  for (const epic in data) {
    for (const col in data[epic].cols) {
      const tickets = data[epic].cols[col].tickets
      if (tickets[ticketKey]) {
        console.log(`deleting ${ticketKey}`)
        ticketToMove = tickets[ticketKey]
        delete tickets[ticketKey]
        break
      }
    }
    if (ticketToMove) break
  }

  if (ticketToMove) {
    data[newRow].cols[newCol].tickets[ticketKey] = ticketToMove
  }
  return data
}
