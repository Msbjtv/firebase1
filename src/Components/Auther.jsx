import React, { useState, useEffect } from 'react'
import { auth, googleProvider } from '../Config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
const Auther = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async()=>{
    try{
      await createUserWithEmailAndPassword(auth, email, password)
    }catch(err){
      console.error(err)
    }

  }
  const googleSignIn = async()=>{
    try{
      await signInWithPopup(auth, googleProvider)
    }catch(err){
      console.error(err)
    }

  }
  const logOut = async()=>{
    try{
      await signOut(auth)
    }catch(err){
      console.error(err)
    }

  }
  // console.log(auth?.currentUser?.photoURL)
  return (
    <>
    <div className='flex justify-between align-middle m-4'>
      <input type="text" placeholder='Email..' className='border-2 rounded-md outline-none py-1 px-2 text-sm max-sm: w-1/4' onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder='Password..' className='border-2 rounded-md outline-none py-1 px-2 text-sm max-sm: w-1/4' onChange={(e)=>setPassword(e.target.value)}/>
      <button className='border px-3 rounded-md bg-blue-700 text-white hover:bg-blue-600' onClick={signIn}>
        Sign In</button>
      <button className='border px-3 rounded-md bg-blue-700 text-white hover:bg-blue-600' onClick={logOut}>
        Log Out</button>
    </div>
    <div className='mx-4' onClick={googleSignIn}>
      <button className='underline text-sm text-blue-700 hover:text-blue-500'>Sign in with google</button>
    </div>
    </>
  )
}

export default Auther