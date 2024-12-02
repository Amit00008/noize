import React from 'react';
import {
    Avatar,
    Box,
    Container,
    Typography,
    Paper,
    Divider,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212', // Dark background color
            paper: '#1e1e2f',   // Dark card background
        },
        primary: {
            main: '#9c27b0', // Purplish accent color
        },
        text: {
            primary: '#ffffff',  // Light text
            secondary: '#b0b0b0', // Muted text
        },
    },
    typography: {
        fontFamily: `'Roboto', 'Arial', sans-serif`,
    },
});

const Library = () => {
   

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 5 }}>
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            
                            <Typography variant="h5" fontWeight="bold" color="text.primary">
                               Still in development
                            </Typography>
                            
                        </Box>

                        <Divider sx={{ my: 3, bgcolor: 'primary.main' }} />

                        
                        
                        </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Library;
