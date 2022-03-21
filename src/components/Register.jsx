import React from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

import contracts from '../contracts';
import web3 from '../web3';


export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registred, setRegistred] = useState(false);
  const [message, setMessage] = useState('');
  const onSubmit = data => {
      console.log(data);
      const register = async () => {
        const accounts = await web3.eth.getAccounts();
        setMessage('Waiting on transaction success...');
        await contracts.methods.createUser(web3.utils.asciiToHex(data["Username"]), data["Public Name"]).send({
            from: accounts[0]
        });  
        setRegistred(true)
      }
      register()
  }
  console.log(errors);
  
  if (registred) {
      return (<Navigate to="/feed" />)
  }
  return (
    // TODO: check if registred
    <div>
        <p>
            {message}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" {...register("Username", {required: true, maxLength: 20, pattern: /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i})} />
        <input type="text" placeholder="Public Name" {...register("Public Name", {required: true})} />

        <input type="submit" />
        </form>
    </div>
  );
}