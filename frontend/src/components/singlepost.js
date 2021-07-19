import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import axiosInstance from '../axios';

// Local imports
import theme from './theme';
import { Container, CssBaseline, Typography } from '@material-ui/core';

// imports for posts
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: '#d8c3a5',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  paper: {
    alignItems: 'center',
    justify: 'center',
    backgroundColor: '#d8c3a5',
    margin: theme.spacing(2),
    padding: theme.spacing(1)
  },
  inline: {
    display: 'inline',
  },
  comment: {
    backgroundColor: "#e98074",
  }
}));

export default function ViewThread(props){
  const classes = useStyles();
  const {id} = useParams();
  const [thread, setThread] = useState({
    topic: "DSA top 50",
    content: "Loading...",
    id: 1,
    title: "Loading...",
    postedAt: "2020-01-01T09:00:00Z",
    author: "Loading...",
    upvotes: 10,
    media: null
  });
  const [post, setPost] = useState([{
      content: "Loading...",
      author: "Loading...",
  }]);

  useEffect(()=>{
    axiosInstance.get("viewthread/"+id).then((res)=>{
      console.log(res.data);
      setThread(res.data.thread);
      setPost(res.data.posts);
    });
  }, [setThread, setPost]);

	return (
		<>
      <ThemeProvider theme={theme}>
        <CssBaseline>
        <Container >
          <Paper className={classes.paper}>
            <Container>
              <Typography variant="h3">
                {thread.title}
              </Typography>
            </Container>
            <Container>
              <Typography component='div' variant='h6'>
              {thread.content}
              </Typography>
            </Container>
            <Container style={{margin: theme.spacing(2)}} align="right">
              <Link >
                <Typography style={{ color: "#e85a4f"}}>
                    {thread.author}
                </Typography>
              </Link>
            </Container>
            {/* Comments/Posts below the Thread */}
            <List className={classes.comment}>
              {post.map((pos)=>{
                return (
                  <ListItem alignItems="flex-start" style={{ margin: theme.spacing(2) }}>
                  <ListItemAvatar>
                    <Avatar alt={pos.author} src={thread.media} style={{ margin: theme.spacing(-1.5) }}/>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Typography style={{ color: "#d8c3a5" }} component="div" variant="h8" >
                        {pos.content}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" /> 
                  </ListItem>
                )
              })}              
              </List>
          </Paper>
          </Container>
        </CssBaseline>
      </ThemeProvider>
		</>
	);
}