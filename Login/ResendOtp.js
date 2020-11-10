import React, {useCallback} from 'react';
import { RESEND_OTP } from '../queries/resendOtp.gql';
import { useLazyQuery } from '@apollo/react-hooks';
import defaultClasses from './login.scss';

const ResendOtp = (props) => {
	const [resend, { data, error, loading }] = useLazyQuery(RESEND_OTP, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if (data) {
                console.log(data);
            } 
        },
	});

	const resendOtp = useCallback(() => {
        
            resend();
        
    },[resend]);

    return (
        <a className={defaultClasses.resendBtn} onClick={() => resendOtp()}>{'Resend OTP'}</a>
    );
}

export default ResendOtp;