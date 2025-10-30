import { createBrowserRouter } from 'react-router-dom'
import Home from '../page/Home'
import BotChatPage from '../page/testChat/BotChatPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat',
    element: <BotChatPage />,
  },
])

export default router


