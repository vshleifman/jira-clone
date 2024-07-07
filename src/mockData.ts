export const data: Data[] = [
  {
    id: 1,
    title: "ticket1",
    epic: "epic1",
    status: "Backlog",
  },
  {
    id: 2,
    title: "ticket2",
    epic: "epic1",
    status: "Up next",
  },
  {
    id: 3,
    title: "ticket3",
    epic: "epic1",
    status: "In progress",
  },
  {
    id: 4,
    title: "ticket4",
    epic: "epic1",
    status: "On hold",
  },
  {
    id: 5,
    title: "ticket5",
    epic: "epic3",
    status: "In progress",
  },
  {
    id: 6,
    title: "ticket6",
    epic: "epic2",
    status: "Up next",
  },
  {
    id: 7,
    title: "ticket7",
    epic: "epic2",
    status: "Done",
  },
  {
    id: 8,
    title: "ticket8",
    epic: "epic2",
    status: "In progress",
  },
  {
    id: 9,
    title: "ticket9",
    epic: "epic2",
    status: "Done",
  },
  {
    id: 10,
    title: "ticket10",
    epic: "epic3",
    status: "Up next",
  },
]

export const hiddenStatuses = ["Done"]
export const statusList = [
  "Backlog",
  "Up next",
  "In progress",
  "On hold",
  "Done",
].filter(status => !hiddenStatuses.includes(status))
export const epicsList = ["epic1", "epic2", "epic3"]

export interface Data {
  title: string
  epic: string
  status: string
  id: number
}
