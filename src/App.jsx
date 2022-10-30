import React, { useState, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
    CssBaseline,
    Container,
    Grid,
    Button,
    TextField,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {
  distill,
  CHRONIUM_ADDRESS,
  getTimeBalance,
  balanceOf,
  sellTokens,
  buyTokens,
  sellChron,
  buyChron,
  tokens,
} from "./dapp.js";
import { blue } from "@mui/material/colors";

const errorHeader = "Something Went Wrong!";
const successHeader = "Success!";

const Row = ({ symbol, tokenAddress, tokenBalance }) => {
  const [isTxnInProgress, setTxnInProgress] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState(null);
  const [dialogMsg, setDialogMsg] = useState(null);
  const inputRef = useRef({});

  const handleBuy = async (e) => {
    const quantity = inputRef.current["quantity"].value;
    setTxnInProgress(true);
    try {
      await buyTokens(quantity, tokenAddress, CHRONIUM_ADDRESS);

      setDialogHeader(successHeader);
      setDialogMsg("Buy Transaction Completed");
      setOpenDialog(true);
    } catch (e) {
      console.log(e.message);
      setDialogHeader(errorHeader);
      setDialogMsg(e.message);
      setOpenDialog(true);
    }

    setTxnInProgress(false);
    console.log(`Buy ${quantity} of ${symbol}`);
  };

  const handleSell = async (e) => {
    const quantity = inputRef.current["quantity"].value;
    setTxnInProgress(true);
    try {
      await sellTokens(quantity, tokenAddress, CHRONIUM_ADDRESS);

      setDialogHeader(successHeader);
      setDialogMsg("Sell Transaction Completed");
      setOpenDialog(true);
    } catch (e) {
      console.log(e.message);
      setDialogHeader(errorHeader);
      setDialogMsg(e.message);
      setOpenDialog(true);
    }
    setTxnInProgress(false);
    console.log(`Sell ${quantity} of ${symbol}`);
  };

  const handleBuyChron = async (e) => {
    const quantity = inputRef.current["quantity"].value;
    setTxnInProgress(true);
    try {
      await buyChron(quantity, CHRONIUM_ADDRESS, tokenAddress);

      setDialogHeader(successHeader);
      setDialogMsg("Buy Chron Transaction Completed");
      setOpenDialog(true);
    } catch (e) {
      console.log(e.message);
      setDialogHeader(errorHeader);
      setDialogMsg(e.message);
      setOpenDialog(true);
    }

    setTxnInProgress(false);
    console.log(`Buy ${quantity} of ${symbol}`);
  };
    
  const handleSellChron = async (e) => {
    const quantity = inputRef.current["quantity"].value;
    setTxnInProgress(true);
    try {
      await sellChron(quantity, CHRONIUM_ADDRESS, tokenAddress);

      setDialogHeader(successHeader);
      setDialogMsg("Sell Chron Transaction Completed");
      setOpenDialog(true);
    } catch (e) {
      console.log(e.message);
      setDialogHeader(errorHeader);
      setDialogMsg(e.message);
      setOpenDialog(true);
    }
    setTxnInProgress(false);
    console.log(`Sell ${quantity} of ${symbol}`);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <form onSubmit={() => inputRef.current.value}>
      <Grid
        container
        columns={16}
        spacing={2}
        sx={{ mb: 2 }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={2}>
          {symbol}
        </Grid>
        <Grid item xs={5} sx={{ fontSize: "14px" }}>
          {tokenAddress}
        </Grid>
        <Grid item xs={3} sx={{ fontSize: "14px" }}>
          {tokenBalance}
        </Grid>
        <Grid item xs={2}>
          <TextField
            inputRef={(el) => (inputRef.current["quantity"] = el)}
          ></TextField>
        </Grid>
        {isTxnInProgress ? (
          <>
            <Grid item xs={2}>
              <CircularProgress />
            </Grid>
            <Grid item xs={1}>
              <CircularProgress />
            </Grid>
          </>
        ) : (
          <>
            {/* <div style={{ height: 5 }}>
              <div style={{ height: "5%" }}> */}
            <Grid item xs={1.5}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleBuy}
              >
                Buy
              </Button>
              <Button variant="contained" size="small" onClick={handleBuyChron}>
                Buy Chron
              </Button>
            </Grid>
            <Grid item xs={1.5}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSell}
              >
                Sell
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleSellChron}
              >
                Sell Chron
              </Button>
              <div>
                <Dialog
                  open={openDialog}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {dialogHeader}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {dialogMsg}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
            {/* </div> */}
            {/* </div> */}
          </>
        )}
      </Grid>
    </form>
  );
};


const App = () => {
    const [chroniumBalance,setChroniumBalance] = useState(0);
    const [timeBalance,setTimeBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tokenBalances,setTokenBalances]=useState([]);

    const handleDistill = async (e)=>{
        setIsLoading(true);
        await distill(timeBalance);
        setIsLoading(false);
    }
    const handleCheckBalance = async (e)=>{
        setIsLoading(true);
        let balanceA = await balanceOf(CHRONIUM_ADDRESS);
        setChroniumBalance(balanceA);
        let balanceB = await getTimeBalance();
        setTimeBalance(balanceB);
        setIsLoading(false);

        const tokenBalances = []
        for (const token of tokens)
        {
            var tokenBalance = (await balanceOf(token.tokenAddress)).toString();
            tokenBalances.push(tokenBalance);
        }
        setTokenBalances(tokenBalances);
    }

    const theme = createTheme({
        palette: {
           mode: "dark",
            

        },
    });

    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <h1>SUSS GBA Token Exchange (Singapore)</h1>
            <h2>Real-Time Chronium Balance</h2>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={2}>
                Chronium (CHRON):
              </Grid>
              <Grid item xs={3}>
                <TextField value={chroniumBalance} />
              </Grid>
              <Grid item xs={1}>
                Time Balance (to be distilled):
              </Grid>
              <Grid item xs={3}>
                <TextField value={timeBalance} />
              </Grid>
              {isLoading ? (
                <Grid container item xs={2} justifyContent="center">
                  <CircularProgress />
                </Grid>
              ) : (
                <>
                  <Grid container item xs={2} justifyContent="space-evenly">
                    <Button variant="contained" onClick={handleCheckBalance}>
                      Balance
                    </Button>
                    <Button variant="contained" onClick={handleDistill}>
                      Distill
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
            <hr></hr>
            <h2>SUSS Token Trading Engine</h2>
            <Grid
              container
              columns={16}
              sx={{ mb: 2 }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={2}>
                Token
              </Grid>
              <Grid item xs={5}>
                Token Address
              </Grid>
              <Grid item xs={3}>
                Balance (Token)
              </Grid>
              <Grid item xs={2}>
                Amount (Token/CHRON)
              </Grid>
              <Grid item xs={3}> 
              </Grid>
              </Grid>
            {tokens.map((x, idx) => (
              <Row
                key={idx}
                symbol={x.symbol}
                tokenAddress={x.tokenAddress}
                tokenBalance={tokenBalances[idx]}
              />
            ))}
          </Container>
        </ThemeProvider>
      </>
    );
};

export default App;
