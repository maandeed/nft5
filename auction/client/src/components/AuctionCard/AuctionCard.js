import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AccountContext } from '../../context/AccountContext';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'
import { Button } from '../../globalStyles'
import {
    useStyles,
    Heading,
    Subheading,
    Subtitle,
    BodyText,
    TextWrapper
  } from './AuctionCard.style'
  
const AuctionCard = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { account } = useContext(AccountContext)

    const getAuction = (id) => {
        navigate (props._id, {
            state: {
              id: props.id,
              _id: props._id,
              image: props.image,
              title: props.title,
              description: props.description,
              seller: props.seller,
              startbid: props.startbid,
              currentbid: props.currentbid,
              starttime: props.starttime,
              duration: props.duration,
              numberbid: props.numberbid,
              status: props.status,
              transactionhash: props.transactionhash,
              account: account
            },
        })
    }

    const RenderStartAuctionButton = () => {
        if (props.status === -1) {   // inactive and fund released
            return (
              <Button
                id={props.id}
                disabled={true} >
                Fund Released
              </Button>
            )
        } else if (props.status === 2) {   // expired and await fund release
            return (
              <Button
                id={props.id}
                disabled={true} >
                Awaiting Delivery
              </Button>
            )
        } else if (props.status === 1) {   // active auction
            return (
              <Button
                id={props.id}
                disabled={true} >
                Game Started
              </Button>
            )
        } else {      // not registered yet, only seller can register
            return (
              <Button
                id={props.id}
                disabled={props.seller === account ? false : true}
                onClick={(e) => { props.startAuction(e.target.id) }}>
                Start Game
              </Button>
            )
        }
    }

    const RenderGoToAuctionButton = () => {
        if (props.status === 1) {
            return (
              <Button Big fontBig live
                id={props.id}
                disabled={false}
                onClick={(e) => { getAuction(e.target.id) }}>
                LIVE Game
              </Button>
            )
        } else if (props.status === -1 || props.status === 2) {
            return (
              <Button Big fontBig closed
                id={props.id}
                disabled={false}
                onClick={(e) => { getAuction(e.target.id) }}>
                Game Ended
              </Button>
            )
        } else {
            return (
              <Button Big fontBig
                id={props.id}
                disabled={false}
                onClick={(e) => { getAuction(e.target.id) }}>
                Game status
              </Button>
            )
        }
    }

    return ( 
        <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={5}>
            <Grid item>
              <ButtonBase
                id={props.id}
                className={classes.image}
                onClick={(e) => {
                  window.location.href = `auctions/${e.target.id}`
                }}>
                <img className={classes.img} alt="Bad news" src={props.image} />
              </ButtonBase>
              <Heading> {props.title} </Heading>
              <Subtitle>Seller {props.seller}
              </Subtitle>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Heading>Starting Bid {props.startbid} Eth</Heading>
                  <Heading>Current Bid {props.currentbid ? props.currentbid : 0} Eth</Heading>
                </Grid>
                <Grid item xs>
                  <TextWrapper>
                    <Subheading>
                      Auction Time: {props.starttime ? props.starttime : 'Not Registered Yet'}
                    </Subheading>
                    <BodyText>
                      Duration: {props.starttime ? props.duration : ''} min
                  </BodyText>
                    <br /><br />
                    <BodyText>
                      {props.transactionhash ? 'TxHash:' : ''}
                    </BodyText>
                    <BodyText>
                      {props.transactionhash ? props.transactionhash : ''}
                    </BodyText>
                    <br />
                    <BodyText>
                      {props.transactionhash ? `No. of Bids: ${props.numberbid}` : ''}
                    </BodyText>
                  </TextWrapper>
                </Grid>
                <Grid item>
                  {RenderStartAuctionButton()}
                  {RenderGoToAuctionButton()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
}
 
export default AuctionCard;