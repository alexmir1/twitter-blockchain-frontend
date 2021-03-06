import { useConnectedMetaMask } from 'metamask-react';
import React, { useState } from 'react';
import ComposeForm from './ComposeForm';
import Timeline from './Timeline';
import { FaTwitter } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import './App.css';

import initialTweets from '../tweets.json';
import contracts from '../contracts';
import web3 from '../web3';

function Feed() {
  const [tweets, setTweets] = useState(initialTweets);
  const [favorites, setFavorites] = useState([]);

  const handlePostTweet = async (content) => {
    const accounts = await web3.eth.getAccounts();
    const user_id = await contracts.methods.getUserId(accounts[0]).call();
    const profile = await contracts.methods.getUserProfile(user_id).call();
    const newTweet = {
      content,
      id: nanoid(),
      created_on: Date(Date.now()),
      user: web3.utils.hexToAscii(profile.username),
      comments_count: 0,
      retweets_count: 0,
      favorites_count: 0,
    };
    setTweets([...tweets, newTweet]);
  };

  const handleToggleFavorite = (tweetId) => {
    const foundIndex = favorites.indexOf(tweetId);

    if (foundIndex > -1) {
      // Found, return a new array without this id
      setFavorites(favorites.filter((favoriteId) => favoriteId !== tweetId));
    } else {
      // Not found in favorites, return a new array including this id
      setFavorites([...favorites, tweetId]);
    }
  };

  return (
    <div className="app">
      <FaTwitter className="app-logo" size="2em" />
      <ComposeForm onSubmit={handlePostTweet} />
      <div className="separator"></div>
      <Timeline
        tweets={tweets}
        onRetweet={handlePostTweet}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default Feed;
