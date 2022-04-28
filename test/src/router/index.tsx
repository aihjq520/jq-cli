import { Routes, Route } from 'react-router-dom'

import { observer } from 'mobx-react'
import Layout from 'pages/layout'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  )
}

export default observer(Routers)
