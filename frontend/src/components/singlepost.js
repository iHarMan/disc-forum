import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import axiosInstance from '../axios';

//gridlist
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: '#12548E',
  },
  inline: {
    display: 'inline',
  },
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
          <Paper>
            <Container>
              <Typography variant="h6">
                {thread.title}
              </Typography>
            </Container>
            <Container>
              {thread.content}
            </Container>
            <Container>
              {thread.author}
            </Container>
            {/* Comments/Posts below the Thread */}
            <List className={classes.root}>
              {post.map((pos)=>{
                return (
                  <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={pos.author} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        {pos.content}
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" /> 
                  </ListItem>
                )
              })}              
              </List>
          </Paper>
        </CssBaseline>
      </ThemeProvider>
		</>
	);
}