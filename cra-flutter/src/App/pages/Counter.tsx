import React from 'react'
import { Fab, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

const RootContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  userSelect: 'none',
})

const NumberText = styled(Typography)({
  marginBottom: '16px',
})

const FloatingButton = styled(Fab)({
  position: 'absolute',
  bottom: '16px',
  right: '16px',
})

interface CounterProps {
  onClicksChange?: (clicks: number) => void;
  clicks: number;
}

export const Counter: React.FC<CounterProps> = ({ clicks, onClicksChange }) => {
  const incrementNumber = () => {
    onClicksChange?.(clicks + 1)
  }

  return (
    <RootContainer>
      <AppBar position="static" style={{ height: '56px', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="inherit" component="div">
          React Counter
        </Typography>
      </AppBar>
      <Box sx={{ flexGrow: 1 }} alignItems='center' display='flex'>
        <NumberText variant="h4">{clicks}</NumberText>
      </Box>
      <FloatingButton color="primary" aria-label="add" onClick={incrementNumber}>
        <AddIcon/>
      </FloatingButton>
    </RootContainer>
  )
}
