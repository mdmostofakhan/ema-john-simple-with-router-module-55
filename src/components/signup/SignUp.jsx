import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';


const SignUp = () => {
    const [error, serError] = useState('')
    const [show, setShow] = useState(false);
    const { createUser } = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault()

        serError('');
        const form =event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        
        console.log(email, password, confirm)
 
         if(password !== confirm){
            serError('Your Password did not match')
            return
         }
           
           else if(password.length < 6){
            serError('password must be 6 characters an longer')
            return;
           }

           createUser(email, password)
           .then(result => {
             const loggedUser = result.user;
               console.log(loggedUser);
           })
           .catch(error => {
              console.log(error)
              serError(error.message);
           })


    }


    return (
        <div className='form-container'>
        <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name="password" id="" required/>
                    <p onClick={() => setShow(!show)}><small>
                         {
                            show ? <span>Show Password</span> : <span>Hide Password</span>
                         }
                        </small></p>
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type={show ? "text" : "password"}name="confirm" id="" required/>
                    <p onClick={() => setShow(!show)}><small>
                         {
                            show ? <span>Show Password</span> : <span>Hide Password</span>
                         }
                        </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account <Link to='/login'>Login</Link></small></p>
                <p className='text-error'>{error}</p>
    </div>
    );
};

export default SignUp;