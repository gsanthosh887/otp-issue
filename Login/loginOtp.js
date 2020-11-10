import React, {useCallback} from 'react';
import { VALIDATE_OTP } from '../queries/otpValidation.gql';
import { useLazyQuery } from '@apollo/react-hooks';
import defaultClasses from './login.scss';
import Button from '@magento/venia-ui/lib/components/Button/button';
import { useHistory } from "react-router-dom";
import { useFieldState } from "informed";

const LoginOtp = (props) => {

	const [loginOtp,  { called, loading, data }] = useLazyQuery(VALIDATE_OTP, {
		variables: {generatedOTP: props.otp}
	});
if (called && loading) return <p>Loading ...</p>
if (!called) {
	return (<Button className={defaultClasses.requestOtpBtn} onClick={() => loginOtp()}>{'Login'}</Button>);
}
if(data && (props.otp && props.otp.length == 6)){
	const token = data.validateOTP.token.split('=')[1].split('&')[0];
	localStorage.setItem('Token', token)
	if(token != null) {
		let history = useHistory();
		history.push("/homePage");
	}
	return '';
}else {
	const Invalidotp = document.getElementById("enterValidOtp");
	Invalidotp.classList.remove(defaultClasses.hide);
	Invalidotp.classList.add(defaultClasses.requireOtp);
	return (<Button className={defaultClasses.requestOtpBtn} onClick={() => loginOtp()}>{'Login'}</Button>);
}
	// const otpVals = useFieldState("otp").value;
    // console.log("&&&&&&",otpVals)
    // const [loginQueryOtp, { data, error, loading }] = useLazyQuery(VALIDATE_OTP, {
    //     fetchPolicy: "network-only",
    //     onCompleted: (data) => {
    //         if (data && (otpVals && otpVals.length == 6)) {
    //             const token = data.validateOTP.token.split('=')[1].split('&')[0];
	// 			localStorage.setItem('Token', token)
	// 			if(token != null) {
	// 				let history = useHistory();
	// 				history.push("/homePage");
	// 			}
    //         } else {
    //             const Invalidotp = document.getElementById("enterValidOtp");
	// 			Invalidotp.classList.remove(defaultClasses.hide);
	// 			Invalidotp.classList.add(defaultClasses.requireOtp);
    //         }
    //     },
	// });
	
	
    // const login = useCallback(() => {
    //     if (otpVals != null) {
    //         loginQueryOtp({
	// 			variables: {generatedOTP: otpVals},
    //         });
    //     } else {
    //         const Invalidotp = document.getElementById("enterValidOtp");
	// 			Invalidotp.classList.remove(defaultClasses.hide);
	// 			Invalidotp.classList.add(defaultClasses.requireOtp);
    //     }
    // }, [otpVals, loginQueryOtp]);

    // return (
    //     <Button
    //         type="submit"
    //         className={defaultClasses.requestOtpBtn}
    //         disabled={loading}
    //         onClick={login}
    //     >
    //         {"Login"}
    //     </Button>
    // );
}

export default LoginOtp;