/*  This module exports fake data fetching functionality.
    In a real app, this would grab data from internet, but
    this module just waits a little bit before responding.

    you don't need to look at this, but you can if you want!.
*/

const FAKE_USER_DATA = {
    cat: {
        name: 'Kitty Cat',
        bio: "I'm the coolest cat around. I'm the cat's meow!",
        profilePictureURL: 'https://content.codecademy.com/courses/React/react_lifecycle_cat_profile_picture.jpg',
        friends: ['komodo']
    },
    dog: {
        name: 'Doggy Dog',
        bio: "I'm the doggity dog! Woof Woof!",
        profilePictureURL: 'https://content.codecademy.com/courses/React/react_lifecycle_dog_profile_picture.jpg',
        friends: ['komodo']
    },
    komodo: {
        name: 'Lizard Lady',
        bio: "I'm a komodo dragon. You'll love me.",
        profilePictureURL: 'https://content.codecademy.com/courses/React/react_lifecycle_komodo_profile_picture.jpg',
        friends: ['cat','dog']
    }
};

const timeoutByFetchID = new Map();

class Fetch {
    constructor(){
        Object.defineProperty(this, '_id', {
            value: Date.now() + Math.random().toString().substring(2)
        });
    }
}

export function fetchUserData(username, callback){
    if(!FAKE_USER_DATA.hasOwnProperty(username)){
        throw new Error(
            'Invalid username. Make sure it is "cat", "dog", or "komodo".'
        );
    }

    const fetch = new Fetch();

    const delay  = Math.floor(Math.random()*1000) + 500;
    const timeout = setTimeout(() => {
        timeoutByFetchID.delete(fetch._id);
        callback(FAKE_USER_DATA[username]);
    }, delay);

    timeoutByFetchID.set(fetch._id, timeout);

    return fetch;
}

export function cancelFetch(fetch){
    if(!fetch || typeof fetch !== 'object'){
        return;
    }
    const timeout = timeoutByFetchID.get(fetch._id);
    clearTimeout(timeout);
    timeoutByFetchID.delete(fetch._id);
}