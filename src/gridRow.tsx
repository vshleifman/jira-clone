import styled from "styled-components"
import GridCol from "./gridCol"

const Row = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  gap: 4px;
`

const RowHeading = styled.div`
  padding: 4px;
  border: 1px solid green;
`

const RowBody = styled.div<{cols: number}>`
  display: grid;
  gap: 4px;
  grid-template-columns: ${({cols}) => `repeat(${cols}, 1fr)`};
`

const GridRow = ({
  rowName,
  cols,
  handleClick,
  id,
}: {
  rowName: string
  cols: {[key: string]: {tickets: {[key: string]: {title: string}}}}
  handleClick: (ticket: number, newRow: number, newCol: number) => void
  id: number
}) => {
  return (
    <Row>
      <RowHeading>{rowName}</RowHeading>
      <RowBody cols={Object.keys(cols).length}>
        {Object.values(cols).map((col, i) => {
          return (
            <GridCol
              id={`row${id}-col${i + 1}`}
              tickets={col.tickets}
              handleClick={handleClick}
            />
          )
        })}
      </RowBody>
    </Row>
  )
}

export default GridRow
