import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <h1 className='text-3xl'>Hello world</h1>
    </StrictMode>,
)
