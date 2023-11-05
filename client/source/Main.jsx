import { createRoot } from 'react-dom/client'

import { StrictMode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './services/queryClient'

import { Application } from './routes/Application'

import './styles/tailwind.css'

import { Modal } from './containers/Modal'

import { Notification } from './components/Notification'

const container = document.querySelector('#root')

const root = createRoot(container)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Modal />
      <Notification />
      <Application />
    </QueryClientProvider>
  </StrictMode>
)
