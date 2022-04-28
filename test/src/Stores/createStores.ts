import CommonStore from './common'

const createStores = () => {
  const commonStore = new CommonStore()

  const stores = {
    commonStore
  }

  return stores
}

export default createStores
