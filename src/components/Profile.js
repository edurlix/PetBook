import React from 'react';
import { Userlist } from './Userlist';
import { fetchUserData, cancelFetch } from './dataFetcher';

export class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {userData: null}
    }

    loadUserData(){
        this.fetchID = fetchUserData(this.props.username, (userData) => {
            this.setState({userData});
        })
    }

    render(){
        const isLoading = this.state.userData === null ? true : false;

        let className = 'Profile';
        if(isLoading){
            className += ' loading';
        }

        let name;
        if(isLoading){
            name = 'Loading...'
        }else{
            name = this.state.userData.name;
        }

        let bio;
        if(isLoading){
            bio = 'Loading...'
        }else{
            bio = this.state.userData.bio;
        }

        let friends;
        if(isLoading){
            friends = [];
        }else{
            friends = this.state.userData.friends;
        }

        return(
            <div className={className}>
                <div className="profile-picture">
                    {!isLoading && <img src={this.state.userData.profilePictureURL} alt="" />}
                </div>
                <div className='profile-body'>
                    <h2>{name}</h2>
                    <h3>@{this.props.username}</h3>
                    <p>{bio}</p>
                    <h3>My friends</h3>
                    <Userlist usernames={friends} onChoose={this.props.onChoose}/>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.loadUserData();
        
    }

    componentWillUnmount(){
        cancelFetch(this.fetchID);
    }

    componentDidUpdate(prevProps){
        if(this.props.username !== prevProps.username){
            cancelFetch(this.fetchID);
            this.loadUserData();
        }
    }

}