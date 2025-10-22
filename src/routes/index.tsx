import { createBrowserRouter } from 'react-router-dom'
import { ChatBotProfile } from '../components/ChatBot'
import Home from '../page/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat',
    element: <ChatBotProfile />,
  },
])

export default router


