import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';

//gridlist
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';

// Local imports
import theme from './theme';
import { CssBaseline } from '@material-ui/core';
import axiosInstance from '../axios';

// topic.js
import TopicTable from './topic';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 2650,
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
	display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  media: {
    height: 0,
    paddingTop: '52.3%', 
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
	  marginTop: theme.spacing(3),
	  marginLeft: theme.spacing(2),
	  marginRight: theme.spacing(2),
	  marginBottom: theme.spacing(2),
	  paddingTop: theme.spacing(1),
	  paddingBottom: theme.spacing(1),
	  backgroundColor: "#282C2E",
  },
  topic: {
	marginLeft: theme.spacing(2),
	marginRight: theme.spacing(2),
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [latestPostData, setLatestPostData] = React.useState({
	  data : [
		{
			id : "Loading",
			topic : "Loading",
			title : "Loading",
			upvotes : "Loading",
			author : "Loading",
			content : "Loading",
		},
	  ]
  });
  const [topicData, setTopicData] = React.useState([{
	  title : "Loading...",
	  media : "Loading...",
  },
  {
	  title : "Loading...",
	  media : "Loading...",
  }, 
  {
	  title : "Loading...",
	  media : "Loading...",
  }]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(()=>{
	axiosInstance.get("feed/").then((res)=>{
		console.log(res.data);
		setLatestPostData(res.data);
		console.log(latestPostData);
	});
  }, [setLatestPostData]);

  useEffect(()=>{
	  axiosInstance.get("topic/").then((res)=>{
		  console.log(res.data);
		  setTopicData(res.data);
		  console.log(topicData);
	  });
  }, [setTopicData]);
  return (
	  <ThemeProvider theme={theme}>
		<CssBaseline/>
		<Paper className={classes.paper}>
		<div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {topicData.map((topic) => (
          <GridListTile key={topic.id}>
            <img src={topic.media} alt={topic.title} />
            <GridListTileBar
              title={topic.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${topic.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
	</Paper>
	<div className={classes.topic}>
		<TopicTable posts={latestPostData}/>
	</div>
	</ThemeProvider>
  );
}