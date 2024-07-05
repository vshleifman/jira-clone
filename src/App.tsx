import {useState} from "react"
import styled from "styled-components"
import {data, newData} from "./mockData"
import {moveTicket} from "./helpers/moveTicket"
import GridRow from "./gridRow"

const Container = styled.div<{rows: number; columns: number}>`
  display: grid;

  height: 66vh;
  width: 100%;
  gap: 8px;
  padding: 4px;
  border: 1px solid black;
  /* grid-template-rows: ${({rows}) => `repeat(${rows}, 1fr)`};
  grid-template-columns: ${({columns}) => `repeat(${columns}, 1fr)`}; */
  grid-template-rows: ${({rows}) => `repeat(${rows}, 1fr)`};
  /* grid-template-columns: ${({columns}) => `repeat(${columns}, 1fr)`}; */
`

const App = () => {
  const [dataState, setDataState] = useState(data)
  const columnsCount = Object.keys(dataState[1].cols).length
  const rowsCount = Object.keys(dataState).length

  const handleClick = (ticket: number, newRow: number, newCol: number) => {
    const res = moveTicket(dataState, ticket, newRow, newCol)
    console.log({res})
    setDataState({...res})
  }

  const epics = newData.reduce((acc: string[], curr) => {
    if (!acc.includes(curr.epic)) {
      acc.push(curr.epic)
    }
    return acc
  }, [])

  const columns = newData.reduce((acc: string[], curr) => {
    if (curr.status !== "Done" && !acc.includes(curr.status)) {
      acc.push(curr.status)
    }
    return acc
  }, [])

  console.log({epics, columns})

  return (
    <Container className="cheese" columns={columnsCount} rows={rowsCount}>
      {Object.values(dataState).map((epic, i) => {
        return (
          <>
            {/* <ColumnHeadersRow cols={dataState.cols} /> */}
            <GridRow
              id={i + 1}
              cols={epic.cols}
              rowName={epic.name}
              handleClick={handleClick}
            />
          </>
        )
      })}
    </Container>
  )
}

export default App
