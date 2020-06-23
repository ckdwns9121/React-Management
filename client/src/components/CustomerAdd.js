import React, { Component } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
// import DialogAction from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null, //프로필 이미지는 파일형태
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log("응답"+response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        this.handleClickClose();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        console.log("파일"+this.state.file);
        if(this.state.file ==null){
            alert("프로필 사진을 업로드 해주세요");
            return;
        }
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data' //파일포함되잇을때 명시하는 헤더
            }
        }
        return post(url, formData, config);
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClickClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    노예 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>추가하기</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === '' ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label><br />
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></TextField><br></br>
                        <TextField label="생일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></TextField><br></br>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></TextField><br></br>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></TextField><br></br>
                    </DialogContent>
                    <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>

                </Dialog>
            </div>

            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로필 이미지: <input type ="file" name ="file" file ={this.state.file} value ={this.state.fileName} onChange ={this.handleFileChange}></input> <br></br>
                이름 :<input type ="text" name="userName" value={this.state.userName} onChange ={this.handleValueChange}></input><br></br>
                생년월일:<input type ="text" name="birthday" value={this.state.birthday} onChange ={this.handleValueChange}></input><br></br>
                성별:<input type ="text" name="gender" value={this.state.gender} onChange ={this.handleValueChange}></input><br></br>
                직업:<input type ="text" name="job" value={this.state.job} onChange ={this.handleValueChange}></input><br></br>
                <button type ="submit">추가하기</button>
            </form>*/
        )
    }
}
export default withStyles(styles)(CustomerAdd);