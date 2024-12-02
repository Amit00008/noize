import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme, useMediaQuery } from '@mui/material';
import { IoIosMusicalNotes } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({ handleLogout, userData, query, handleQuery }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen is mobile size

  const isMenuOpen = Boolean(anchorEl);
  const [input, setInput] = React.useState(query);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleQuery(input); // Only update query after delay
    }, 500); // Delay in ms

    return () => clearTimeout(timer); // Cleanup the timer on each change
  }, [input, handleQuery]);


  let pfp;

  if (userData) {
    pfp = userData.images[0]?.url;
  } else {
    pfp = 'https://storage.sonusvos.com/v2/default/assets/default-pfp-2.jpg';
  }

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
      <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: isSidebarOpen ? 200 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSidebarOpen ? 200 : 60,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            backgroundColor: '#1a1a1a',
            color: 'white',
          },
        }}
      >
        <List>
          <ListItem button onClick={toggleSidebar}>
            <ListItemIcon>
              <MenuIcon sx={{ color: 'white' }} />
            </ListItemIcon>
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigate('/home')}>
            <ListItemIcon>
              <HomeIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Home" />}
          </ListItem>
          <ListItem button onClick={() => navigate('/chat')}>
            <ListItemIcon>
              <IoChatboxEllipses className='text-white font-bold ' style={{ fontSize: 25 }}/>
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Chat" />}
          </ListItem>
          <ListItem button onClick={() => navigate('/capsule')}>
            <ListItemIcon>
              <IoIosMusicalNotes className='text-white font-bold ' style={{ fontSize: 25 }}/>
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="MusicCapsule" />}
          </ListItem>
          
          <ListItem button onClick={() => navigate('/library')}>
            <ListItemIcon>
              <LibraryMusicIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Library" />}
          </ListItem>
          <ListItem button onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Settings" />}
          </ListItem>
          

          <ListItem button onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <AccountCircle sx={{ color: 'white' }} />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Profile" />}
          </ListItem>
        </List>
      </Drawer>

  
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: '#1a1a1a' }}>
            <Toolbar>
            <img onClick={()=>{
              navigate('/home');
            }} src="https://i.ibb.co/tZbMKSh/Noize-12-2-2024.png" className='h-9 w-'  alt="" />
          <Search>
            <form onSubmit={(e) => {
              e.preventDefault();
              navigate('/search');
              
            }}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: 'white' }}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <IconButton type="submit" sx={{ p: '10px', color: 'white' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={()=>{
              navigate('/chat');
            }} size="large" color="inherit">
            
            <MailIcon />
              
            </IconButton>
            
            <IconButton size="large" onClick={handleProfileMenuOpen} color="inherit">
              <img src={pfp} alt="pfp" style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }} />
            </IconButton>
          </Box>

          {/* Hamburger Menu for Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    </Box>
  );
}
