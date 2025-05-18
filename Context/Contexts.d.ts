interface Context {
  detail?: any
  search?: any
  edit?: any
  manage?: any
  create?: any
}

interface BaseProvider {
  detail?: any
  search?: any
  edit?: any
  manage?: any
  children: any
}
interface BaseData {
  loading: boolean
  updating: boolean
  error: boolean | any
  errorModal: boolean | any
  [key: string]: any
}

interface Action {
  type: string
  payload?: any
}

type Dispatch = ({ type, payload }: Action) => void
