import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import 'remixicon/fonts/remixicon.css'
import SocketContext from './context/SocketContextt.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <SocketContext>
        <CaptainContext>
          <UserContext>
            <App />
          </UserContext>
        </CaptainContext>
      </SocketContext>
    </StrictMode>,
)

