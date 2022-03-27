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
import EthWallet from "../eth/Wallet"
import useMetaMask from "../eth/useMetamask";

export const Appbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [goLiveModal, setGoLiveModal] = React.useState(false);
    const { isActive, account } = useMetaMask()

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

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => router.push("/")}
                >
                    <img style={{width: 50}} src={"/icon.png"} />
                </IconButton>
                <div style={{flexGrow: 1 }}>
                </div>
                {isActive && <Box sx={{ flexGrow: 0 }}>
                    <IconButton size={"large"} color={"secondary"} onClick={() => {setGoLiveModal(true)}}>
                        <LiveTvIcon style={{fontSize: 35, marginRight: 10}} />
                    </IconButton>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar color={"secondary"}  > {(account?.toString() || "").substr(0, 1)}</Avatar>
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
                        <MenuItem onClick={() => {
                            router.push(`/streams/${publicKey}`)
                            handleCloseUserMenu()
                        }}>
                            <Typography textAlign="center">My Videos</Typography>
                        </MenuItem>
                        <div style={{maxWidth: 200, padding: 10}} onClick={handleCloseUserMenu}>
                            <EthWallet />
                        </div>
                    </Menu>
                </Box>
                }
                {!isActive && <div style={{maxWidth: 200}}>
                    <EthWallet />
                </div>}
            </Toolbar>
        </AppBar>
        <GoLiveModal account={account} open={goLiveModal} onClose={() => {setGoLiveModal(false)}}/>
    </>
}