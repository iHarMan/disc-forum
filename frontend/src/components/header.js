// REACT
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// MaterialUI
import AppBar from '@material-ui/core/AppBar'; 
import Toolbar from '@material-ui/core/Toolbar'; 
import Typography from '@material-ui/core/Typography'; 
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';

import {isLogin, logout} from './utils';

// Local imports
import theme from './theme';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: '1px solid ${theme.palette.divider}',
	},
	link: {
		margin: theme.spacing(1, 1.5),
		color: '#22C5A2',
	},
	toolbarTitle: {
		flexGrow : 1,
	},
}));

function Header(){
	const classes = useStyles();
	let history = useHistory();
	const [data, setData] = useState({search:''});
	const goSearch = (e) => {
		history.push({
			pathname : '/search/',
			search : '?search=' + data.search,
		});
		window.location.reload();
	};
	if(isLogin())
	{
		return (
			<React.Fragment>
				<ThemeProvider theme={ theme }>
				<CssBaseline />
				<div className="header">
				<AppBar
					position="static"
					color="background"
					elevation={0}
					className={classes.appBar}
				>
					<Toolbar className={classes.toolbar}>
						<Typography
							variant="h6"
							color="secondary"
							noWrap
							className={classes.toolbarTitle}
						>
							<Link
								component={NavLink}
								className={classes.link}
								to="/"
								underline="none"
								color="secondary"
							>
								Blog
							</Link>
						</Typography>
	
						<SearchBar
							value={data.search}
							onChange={(newValue) => setData({ search: newValue })}
							onRequestSearch={() => goSearch(data.search)}
						/>
	
						{/* <nav>
							<Link
								color="secondary"
								href="#"
								className={classes.link}
								component={NavLink}
								to="/register"
							>
								Register
							</Link>
						</nav> */}
						{/* <Button
							href="#"
							color="inherit"
							variant="outlined"
							className={classes.link}
							component={NavLink}
							to="/login"
						>
							Login
						</Button> */}
						<Button
							href="#"
							color="inherit"
							variant="outlined"
							className={classes.link}
							component={NavLink}
							to="/logout"
							onClick = {()=>{
								logout();
								window.location.reload();
							}}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
				</div>
				</ThemeProvider>
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
            <ThemeProvider theme={ theme }>
			<CssBaseline />
            <div className="header">
			<AppBar
				position="static"
				color="background"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="secondary"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
                            className={classes.link}
							to="/"
							underline="none"
							color="secondary"
						>
							Blog
						</Link>
					</Typography>

					<SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>

					<nav>
						<Link
							color="secondary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					<Button
						href="#"
						color="inherit"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					{/* <Button
						href="#"
						color="inherit"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button> */}
				</Toolbar>
			</AppBar>
            </div>
            </ThemeProvider>
		</React.Fragment>
	);
}
export default Header;
