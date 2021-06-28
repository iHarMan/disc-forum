import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette : {
		type : 'dark', 
		primary : {
			main : '#12548E',
		},
		secondary : {
			main : '#22C5A2',
		},
		error : {
			main : red.A400,
		},
		background : {
			default : '#1E1E1E',
		},
	},
});

export default theme;