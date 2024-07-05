import styled from "styled-components"
import GridCol from "./gridCol"
import {Data, statusList} from "./mockData"

const Row = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  gap: 6px;
`

const RowHeading = styled.div`
  padding: 2px 12px;
  border: 1px solid green;
`

const RowBody = styled.div<{cols: number}>`
  display: grid;
  gap: 12px;
  grid-template-columns: ${({cols}) => `repeat(${cols}, 1fr)`};
`

const GridRow = ({
  rowName,
  ticketsSortedByStatus,
  handleClick,
}: {
  rowName: string
  ticketsSortedByStatus: {[key: string]: Data[]}
  handleClick: (
    ticketId: number,
    targetStatus: string,
    targetEpic: string
  ) => void
  id: number
}) => {
  return (
    <Row>
      <RowHeading>{rowName}</RowHeading>
      <RowBody cols={statusList.length}>
        {statusList.map(col => {
          console.log({col, tickets: ticketsSortedByStatus[col]})

          return (
            <GridCol
              tickets={ticketsSortedByStatus[col]}
              handleClick={handleClick}
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
