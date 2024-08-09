import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'

const ViewWrapperStyled = styled('div')(({ theme }) => ({
  border: '1px solid #eee',
  borderRadius: '5px',
  height: '240px',
  width: '320px',
  position: 'relative',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: 'hidden',
}))

interface ViewWrapperProps {
  className?: string | undefined
  removeView: () => void
  children: React.ReactNode
}

export const ViewWrapper: React.FC<ViewWrapperProps> = ({children, removeView, className}) => {
  return (
    <ViewWrapperStyled className={className}>
      <IconButton size="large" onClick={removeView}
                  sx={{ position: "absolute", top: 0, left: 0, zIndex: 100 }}>
        <DeleteIcon />
      </IconButton>
      {children}
    </ViewWrapperStyled>
  )
}
