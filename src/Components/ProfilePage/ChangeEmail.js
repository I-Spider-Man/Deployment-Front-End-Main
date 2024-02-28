import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { checkUser, generateOtp, updateEmail } from '../Files/User_profile_avator';
import { useUser } from '../Auth/UserContext';
import { message } from 'antd';

function ChangeEmail({ onClose,onRender }) {
    const [password,setPassword]=useState('');
    const {userDetails,updateUserData}=useUser();
    const [newEmail,setNewEmail]=useState('');
    const [sentOtp,setSentOtp]=useState('');
    const [otpRecived,setOtpRecived]=useState('');
    const [checkingProcess,setCheckingProcess]=useState(false);
    const [validateEmail,setValidateEmail]=useState(false);
    const [emailChange,setEmailChange]=useState(false);
    const userId=userDetails.userId;
    useEffect(()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidateEmail(emailRegex.test(newEmail));
    })
    const checkingUserPassword=async()=>{
        try{
            setCheckingProcess(true);
            const response=await checkUser(userDetails?.userId,password);
            if(response.status===200){
                message.success(response.data);
                setEmailChange(true);

            }
            
        }catch(error){
            console.log(error);
            message.error(error.response.data);
        }finally{
            setCheckingProcess(false);
            
        }
    }
    const sendOTP=async()=>{
        try{
            setCheckingProcess(true);
            const otp=await generateOtp(newEmail);
            setSentOtp(otp);
        }catch(error){
            console.log(error);
        }
        setCheckingProcess(false);
    }
    const ChangeUserEmail=async(e)=>{
        e.preventDefault();
            if(otpRecived==sentOtp){
                try{
                    const response=await updateEmail(userId,newEmail);
                    updateUserData();
                    onRender();
                    onClose();
                    
                }catch(error){
                    console.log(error);
                }
            }
            else{
                message.error("otp mis-match");
            }
        
    }
  return (
    <div>ChangeEmail
        <Box 
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display:'flex',
                alignItems:'center',
                flexDirection:'column'
            }}
            onSubmit={(e)=>ChangeUserEmail(e)}
            noValidate
            autoComplete="off"
        >
            {emailChange ? (
                <>
                <TextField required id='outlined-required' label="New Email" type='email' value={newEmail} onChange={(e)=>setNewEmail(e.target.value)}/>
<LoadingButton loading={checkingProcess} loadingIndicator={<>Sending Otp...</>} disabled={!validateEmail || checkingProcess} onClick={()=>sendOTP()}>Check Email</LoadingButton>
{sentOtp && <TextField required id='outlined-required' label="Enter OTP" type='otp' value={otpRecived} onChange={(e)=>setOtpRecived(e.target.value)}/>}
<Button type='Submit' disabled={(!validateEmail || !otpRecived.trim() || checkingProcess)}>Submit</Button>
<Button variant="contained" onClick={()=>{setEmailChange(false)}}>Back </Button>
</>
                            ):(
                  <>
                  <TextField required id='outlined-required' label="Password" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  <LoadingButton loading={checkingProcess} loadingIndicator={<>Checking password..</>} disabled={!password.trim()} onClick={()=>{checkingUserPassword()}}>Check password</LoadingButton>
                  </>
                            )}
        </Box>
    </div>
  )
}

export default ChangeEmail