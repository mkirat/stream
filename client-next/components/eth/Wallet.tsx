import { useEffect } from 'react'
import useMetaMask from './useMetamask';
import Button from "@mui/material/Button";

function Wallet() {

    const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()

    return (
        <div className="App">
            {!isActive && <Button variant={"contained"} color="secondary" onClick={connect}>
                Connect
            </Button>}
            {isActive && <Button variant={"contained"} color="secondary" onClick={disconnect}>
                Disconnect ({account?.substr(0, 5)})
            </Button>}
        </div>
    );
}

export default Wallet;