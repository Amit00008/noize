import React, { useState, useEffect } from 'react';
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

const Profile = ({ userData }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userData) {
            setError('User data is not available');
        } else if (userData.error) {
            setError('Server error');
        } else {
            setError(null);
        }
    }, [userData]);

    if (error) {
        return (
            <ThemeProvider theme={darkTheme}>
                <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 5 }}>
                    <Container maxWidth="sm">
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                            <Typography variant="h5" color="error" align="center">
                                {error}
                            </Typography>
                        </Paper>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }

    const user = {
        name: userData.display_name,
        email: userData.email,
        avatarUrl: userData.images[0]?.url,
    };

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
                            <Avatar
                                alt={user.name}
                                src={user.avatarUrl}
                                sx={{ width: 120, height: 120, mb: 2 }}
                            />
                            <Typography variant="h5" fontWeight="bold" color="text.primary">
                                {user.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 3, bgcolor: 'primary.main' }} />

                        <Box>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                Followers: {userData.followers.total}
                            </Typography>
                            
                            <Box mt={3}>
                                <Typography variant="h6" color="text.primary" gutterBottom>
                                    Location
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.location}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="center" mt={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                            >
                                Edit Profile
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Profile;
