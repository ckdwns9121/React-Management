import React ,{Component, Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';

class CustomerDelete extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClickClose = () => {
        this.setState({
            open: false
        })
    }

    deleteCustomer(id){
        console.log(id+"삭제");
        const url = "/api/customers/" + id;
        fetch (url,{method :'DELETE'})
        .then(this.props.stateRefresh())
        .catch(err => console.log("에러"+err));
    }
    render(){
        return(
            <Fragment>
            <Button variant="contained" color ="secondary" onClick ={this.handleClickOpen}> 삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle onClose={this.handleClickClose}> 삭제경고 </DialogTitle>
                    <DialogContent>
                    <Typography gutterBottom>
                        선택한 정보가 삭제됩니다.
                    </Typography>

                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) =>{this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
            </Dialog>
            </Fragment>
        );
    }
}

export default CustomerDelete;