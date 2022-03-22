import React  from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Avatar from './Avatar';
import './ComposeForm.css';

import contracts from '../contracts';
import web3 from '../web3';

function ComposeForm({ onSubmit }) {
  const [editorValue, setEditorValue] = useState('');
  const [tweetStatus, setTweetStatus] = useState(0);

  const handleEditorValueChange = (e) => {
    setEditorValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendTweet = async () => {
      const accounts = await web3.eth.getAccounts();
      await contracts.methods.tweet(editorValue).send({
        from: accounts[0]
      });
      setTweetStatus(0)
      onSubmit(editorValue);
      setEditorValue('');
    }
    setTweetStatus(1)
    sendTweet()
  };

  if (tweetStatus == 1) {
    return (
      <form className="compose-form" onSubmit={handleSubmit}>
      <div className="compose-form-container">
        <Avatar />
        <h1>Tweet is sending..</h1>
      </div>
      <button className="compose-form-submit" disabled>Tweet</button>
    </form>
    )
  }

  return (
    <form className="compose-form" onSubmit={handleSubmit}>
      <div className="compose-form-container">
        <Avatar />
        <textarea
          value={editorValue}
          onChange={handleEditorValueChange}
          className="compose-form-textarea"
          placeholder="What's happening?"
        />
      </div>
      <button className="compose-form-submit">Tweet</button>
    </form>
  );
}

ComposeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ComposeForm;
