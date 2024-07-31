import styled from "styled-components"
import {useDataStore} from "./store"
import {useRef} from "react"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  height: 100%;
`

const Ticket = ({id}: {id: number}) => {
  const {dataState} = useDataStore()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const toggleDialog = () => {
    dialogRef.current?.hasAttribute("open")
      ? dialogRef.current?.close()
      : dialogRef.current?.showModal()
  }

  const ticketData = dataState.find(ticket => ticket.id === id)

  const summaryText = ticketData?.summary
  if (!ticketData) return null
  return (
    <>
      <dialog
        ref={dialogRef}
        onClick={e => {
          e.target === e.currentTarget && toggleDialog()
        }}
      >
        <Container>
          <span>{ticketData.title}</span>
          <span>{summaryText}</span>
          <span>{ticketData.id}</span>
        </Container>
      </dialog>
      <Container
        onClick={() => {
          dialogRef.current?.showModal()
        }}
      >
        <span>{ticketData.title}</span>
        <span>
          {summaryText!.length > 40
            ? `${summaryText?.substring(0, 40)}...`
            : summaryText}
        </span>
        <span>{ticketData.id}</span>
      </Container>
    </>
  )
}

export default Ticket
