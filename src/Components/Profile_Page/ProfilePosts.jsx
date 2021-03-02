import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Container, Row} from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import SinglePost from './SinglePost';
import GridOnIcon from '@material-ui/icons/GridOn';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import { theme } from "../../Assets/theme";
import '../../App.css';


export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {setValue(newValue)};

  return (
    <Container className="mt-5 pt-5 px-5">
      <AppBar position="static" color="default" className={`d-flex justify-content-center align-items-center ${classes.appBar}`} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          classes={{indicator: classes.indicator}}
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label={<><GridOnIcon  className={classes.tabIcons}/> POSTS</>} {...a11yProps(0)} className={classes.tabFonts} />
          <Tab label={<><LiveTvIcon  className={classes.tabIcons}/> IGTV</>}  {...a11yProps(1)} className={classes.tabFonts}/>
          <Tab label={<><BookmarkBorderIcon  className={classes.tabIcons}/> SAVED</>}  {...a11yProps(2)} className={classes.tabFonts}/>
          <Tab label={<><AssignmentIndOutlinedIcon  className={classes.tabIcons}/> TAGGED</>}  {...a11yProps(3)} className={classes.tabFonts}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container>
            <Row>
          <SinglePost/>
          <SinglePost/>
          <SinglePost/>  
            </Row>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container className="d-flex justify-content-center align-items-center mt-5 flex-column text-center">
        <img src="https://img.icons8.com/ios/452/igtv.png" className={classes.igtvLogo}/> 
        <h2 className="font-weight-light">Upload a video</h2>
        <p className="text-muted">Videos must be between 1 and 60 minutes long.</p>
        <button className={classes.uploadIGTV}>Upload</button>      
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Container>
            <Row>
            <SinglePost/>
            <SinglePost/>
            <SinglePost/>
            </Row>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Container className="d-flex justify-content-center align-items-center mt-5 flex-column text-center">
        <img src="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-72-512.png" className={classes.igtvLogo}/> 
        <h2 className="font-weight-light">Photos of you</h2>
        <p className="text-muted">When people tag you in photos, they'll appear here.</p>
        </Container>      
      </TabPanel>
    </Container>
  );
}



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}


const useStyles = makeStyles(() => ({
  tabFonts: {
    fontSize: '12px',
    display:'flex',
    flexDirection: 'row'
  },
  igtvLogo:{
      width:'80px'
  },
  uploadIGTV:{
      backgroundColor:"#0095F6",
      border:"none",
      borderRadius:"6px",
      padding: "5px 15px",
      color: "#ffff", 
      fontSize:"15px"
  },
  appBar:{
    boxShadow:"none", 
    borderTop:`1px solid ${theme.main.grey}` ,
    backgroundColor: "transparent",
    textAlign:"center",
    display:'flex'
  },
  indicator: {
    top: "0px",
    display:'flex'
  },
  tabIcons:{
    fontSize:"13px",
    marginRight:"5px"
  }
}));
