import {create} from "zustand"
import {Data, data, epicsList, statusList} from "../mockData"

interface DataState {
  dataState: Data[]
  setDataState: (newData: Data[]) => void
}

interface LayoutState {
  targetColumn: string
  setTargetColumn: (newTargetColumn: string) => void
  targetRow: string
  setTargetRow: (newTargetRow: string) => void
  columnOrderedList: string[]
  setColumnOrderedList: (newColumnOrderedList: string[]) => void
  rowOrderedList: string[]
  setRowOrderedList: (newRowOrderedList: string[]) => void
}

export const useDataStore = create<DataState>()(set => ({
  dataState: data,
  setDataState: newData => set(() => ({dataState: [...newData]})),
}))

export const useLayoutStore = create<LayoutState>()(set => ({
  targetColumn: "",
  setTargetColumn: newTargetColumn =>
    set(() => ({targetColumn: newTargetColumn})),
  targetRow: "",
  setTargetRow: newTargetRow => set(() => ({targetRow: newTargetRow})),
  columnOrderedList: statusList,
  setColumnOrderedList: newColumnOrderedList =>
    set(() => ({columnOrderedList: newColumnOrderedList})),
  rowOrderedList: epicsList,
  setRowOrderedList: newRowOrderedList =>
    set(() => ({rowOrderedList: newRowOrderedList})),
}))
