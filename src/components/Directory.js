import React from 'react';
import { Userlist } from './Userlist';

export function Directory(props){
    return(
        <div>
            <h2>User Directory</h2>
            <Userlist usernames={['dog','cat','komodo']} onChoose={props.onChoose}/>
        </div>
    )
}