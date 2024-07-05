export const data: Data = {
  1: {
    name: "epic1",
    row: 1,
    cols: {
      1: {
        col: 1,
        tickets: {
          1: {title: "ticket1"},
        },
      },
      2: {
        col: 2,
        tickets: {
          2: {title: "ticket2"},
        },
      },
      3: {
        col: 3,
        tickets: {
          // 3: {title: "ticket3"}
        },
      },
      4: {
        col: 4,
        tickets: {
          4: {title: "ticket4"},
        },
      },
      5: {
        col: 5,
        tickets: {
          5: {title: "ticket5"},
        },
      },
    },
  },
  2: {
    name: "epic2",
    row: 2,
    cols: {
      1: {
        col: 1,
        tickets: {
          // 6: {title: "ticket6"}
        },
      },
      2: {
        col: 2,
        tickets: {
          7: {title: "ticket7"},
          8: {title: "ticket8"},
        },
      },
      3: {
        col: 3,
        tickets: {},
      },
      4: {
        col: 4,
        tickets: {
          9: {title: "ticket9"},
        },
      },
      5: {
        col: 5,
        tickets: {
          10: {title: "ticket10"},
        },
      },
    },
  },
}

export interface Data {
  [key: number]: {
    name: string
    row: number
    cols: {
      [key: number]: {
        col: number
        tickets: {
          [key: number]: {
            title: string
          }
        }
      }
    }
  }
}

export const newData: NewData[] = [
  {
    title: "ticket1",
    epic: "epic1",
    status: "Up next",
  },
  {
    title: "ticket2",
    epic: "epic1",
    status: "Up next",
  },
  {
    title: "ticket3",
    epic: "epic1",
    status: "In progress",
  },
  {
    title: "ticket4",
    epic: "epic1",
    status: "On hold",
  },
  {
    title: "ticket5",
    epic: "epic1",
    status: "In progress",
  },
  {
    title: "ticket6",
    epic: "epic2",
    status: "Up next",
  },
  {
    title: "ticket7",
    epic: "epic2",
    status: "Done",
  },
  {
    title: "ticket8",
    epic: "epic2",
    status: "In progress",
  },
  {
    title: "ticket9",
    epic: "epic2",
    status: "Done",
  },
  {
    title: "ticket10",
    epic: "epic2",
    status: "Up next",
  },
]

export interface NewData {
  title: string
  epic: string
  status: string
}
