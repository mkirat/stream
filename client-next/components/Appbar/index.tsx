import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Wallet} from "../solana/Wallet";
import {useWallet} from "@solana/wallet-adapter-react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {GoLiveModal} from "../Modal/GoLiveModal";
import Link from 'next/link'
import Button from "@mui/material/Button";
import {useRouter} from "next/router";

export const Appbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [goLiveModal, setGoLiveModal] = React.useState(false);
    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const router = useRouter()
    const { publicKey } = useWallet();

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{flexGrow: 1 }}>
                </div>
                {publicKey && <Box sx={{ flexGrow: 0 }}>
                    <Box onClick={() => router.push(`/streams/${publicKey}`)}>
                        My streams
                    </Box>
                    <IconButton onClick={() => {setGoLiveModal(true)}}>
                        <LiveTvIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <CloudUploadIcon />
                    </IconButton>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Dashboard</Typography>
                        </MenuItem>
                        <div style={{maxWidth: 200, padding: 10}} onClick={handleCloseUserMenu}>
                            <Wallet />
                        </div>
                    </Menu>
                </Box>
                }
                {!publicKey && <div style={{maxWidth: 200}}>
                    <Wallet />
                </div>}
            </Toolbar>
        </AppBar>
        <GoLiveModal open={goLiveModal} onClose={() => {setGoLiveModal(false)}}/>
    </>
}