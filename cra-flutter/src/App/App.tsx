import React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import FlutterDashIcon from '@mui/icons-material/FlutterDash'
import GitHubIcon from '@mui/icons-material/GitHub'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { FlutterView } from './FlutterView/FlutterView'
import { ReactView } from './ReactView'
import { Grid } from '@mui/material'

const drawerWidth = 300

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: '64px',
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const EffectButton = ({ title, toggleClassName }: { title: string, toggleClassName: (name: string) => void }) => {
  const onClick = () => {
    toggleClassName(`fx-${title.toLowerCase()}`)
  }
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{ minWidth: '130px' }}
    >
      {title}
    </Button>
  )
}

type ViewType = 'REACT' | 'FLUTTER'

interface View {
  id: number
  type: ViewType
}

function App ({ flutterApp }: { flutterApp: any }) {
  const theme = useTheme()
  const [drawerOpened, setDrawerOpened] = React.useState(true)
  const [classNames, setClassNames] = React.useState('')
  const [screen, setScreen] = React.useState('counter')
  const [clicks, setClicks] = React.useState(0)
  const [text, setText] = React.useState('')
  const [views, setViews] = React.useState<View[]>([
    { id: 1, type: 'FLUTTER' },
    { id: 2, type: 'REACT' },
    { id: 3, type: 'REACT' },
    { id: 4, type: 'FLUTTER' }
  ])
  const handleDrawer = () => {
    setDrawerOpened(!drawerOpened)
  }
  const addView = (type: ViewType) => {
    setViews((flutterViewKeys) => {
      return [
        ...flutterViewKeys,
        {
          id: (flutterViewKeys[flutterViewKeys.length - 1]?.id ?? 0) + 1,
          type,
        }
      ]
    })
  }
  const removeView = (id: number) => {
    setViews((flutterViewKeys) => {
      return flutterViewKeys.filter(k => k.id !== id)
    })
  }
  const toggleClassName = (className: string) => {
    const classNamesArray = classNames.trim().split(/\s+/)
    const index = classNamesArray.indexOf(className)
    if (index === -1) {
      classNamesArray.push(className)
    } else {
      classNamesArray.splice(index, 1)
    }
    setClassNames(classNamesArray.join(' '))
  }
  const handleScreenChange = (event: SelectChangeEvent) => {
    setScreen(event.target.value as string)
  }
  const handleClicksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clicks = parseInt(event.target.value, 10) || 0
    setClicks(clicks)
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value || ''
    setText(text)
  }
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer')
  }
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline/>
      <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ fontSize: 28 }}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React 🤝 Flutter
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => openInNewTab('https://github.com/p-mazhnik/flutter-embedding/')}
            sx={{ mr: 1 }}
          >
            <GitHubIcon sx={{ fontSize: 28 }}/>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="flutter"
            onClick={() => openInNewTab('https://flutter.dev/')}
          >
            <FlutterDashIcon sx={{ fontSize: 28 }}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpened}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', position: "absolute" },
        }}
      >
        <DrawerHeader/>
        <Box sx={{ overflow: 'auto', padding: theme.spacing(1), }}>
          <List>
            <Box>
              <Typography variant="h5" component="h2">Effects</Typography>
              <Box sx={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', gap: '5px' }}>
                <EffectButton toggleClassName={toggleClassName} title="Shadow"/>
                <EffectButton toggleClassName={toggleClassName} title="Mirror"/>
                <EffectButton toggleClassName={toggleClassName} title="Resize"/>
                <EffectButton toggleClassName={toggleClassName} title="Spin"/>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography variant="h5" component="h2">JS Interop</Typography>
              <FormControl fullWidth>
                <InputLabel id="screen-select-label">Screen</InputLabel>
                <Select
                  labelId="screen-select-label"
                  value={screen}
                  label="Screen"
                  onChange={handleScreenChange}
                >
                  <MenuItem value="counter">Counter</MenuItem>
                  <MenuItem value="text">TextField</MenuItem>
                  <MenuItem value="dash">Custom App</MenuItem>
                </Select>
                {screen === 'counter' && (
                  <TextField
                    label="Clicks"
                    type="number"
                    value={clicks}
                    onChange={handleClicksChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="dense"
                  />
                )}
                {screen !== 'counter' && (
                  <TextField
                    label="Text"
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="dense"
                  />
                )}
              </FormControl>
            </Box>
            <Box mt={1} sx={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', gap: '5px' }}>
              <Button
                variant="outlined"
                onClick={() => addView('FLUTTER')}
                sx={{ minWidth: '165px' }}
              >
                Add Flutter view
              </Button>
              <Button
                variant="outlined"
                onClick={() => addView('REACT')}
                sx={{ minWidth: '165px' }}
              >
                Add React view
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
      <Main open={drawerOpened}>
        <Grid container spacing={2} sx={{ overflowY: "scroll" }} columns={{ xs: 2 }} justifyContent="center"
              alignItems="center">
          {views.map((view) => {
              let child;
              if (view.type === 'REACT') {
                child = (
                  <ReactView
                    key={view.id}
                    className={classNames}
                    onClicksChange={setClicks}
                    clicks={clicks}
                    removeView={() => removeView(view.id)}
                  />
                )
              } else {
                child = (
                  <FlutterView
                    key={view.id}
                    className={classNames}
                    flutterApp={flutterApp}
                    onClicksChange={setClicks}
                    onScreenChange={setScreen}
                    onTextChange={setText}
                    removeView={() => removeView(view.id)}
                    text={text}
                    clicks={clicks}
                    screen={screen}
                  />
                )
              }
            return (
              <Grid item key={view.id}>
                {child}
              </Grid>
            )
            }
          )}
        </Grid>
      </Main>
    </Box>
  )
}

export default App
