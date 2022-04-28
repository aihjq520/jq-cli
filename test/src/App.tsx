import useStores from 'Stores'
import { observer } from 'mobx-react'
import Routers from 'router'

const Modal = observer(() => {
  const { commonStore } = useStores()

  return (
    <>
      {commonStore.modal?.length > 0
        ? commonStore.modal.map((item, index) => {
            const Component = item.component
            return (
              <div key={index}>
                <Component />
              </div>
            )
          })
        : null}
    </>
  )
})

function App() {
  return (
    <>
      <Routers />
      <Modal />
    </>
  )
}

export default observer(App)
