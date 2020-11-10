import React, { useEffect, useRef, useCallback } from "react";
import { GET_OTP } from "../queries/sendOtp.gql";
import { useLazyQuery } from "@apollo/react-hooks";
import defaultClasses from "./login.scss";
import Button from "@magento/venia-ui/lib/components/Button/button";
import { useFieldState } from "informed";

const RequestOtp = () => {
    const phoneVals = useFieldState("phone").value;
    const [queryOtp, { data, error, loading }] = useLazyQuery(GET_OTP, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if (data.sendOTPtoPhone.response == "true") {
                let btn = document.getElementById("requestOtpBtn");
                btn.classList.add(defaultClasses.hide);
                let otp = document.getElementById("enterOtp");
                otp.classList.remove(defaultClasses.hide);
                const phone = document.getElementById("enterPhoneValid");
				phone.classList.add(defaultClasses.hide);
				document.getElementById('timer').innerHTML = 1 + ":" + 30;
				if(document.getElementById('timer') != null) {
				startTimer();
				}
            } else {
                let validphoneChcek = document.getElementById(
                    "enterPhoneValid"
                );
                validphoneChcek.classList.remove(defaultClasses.hide);
                validphoneChcek.classList.add(
                    defaultClasses.requirePhonenumber
                );
                let otp = document.getElementById("enterOtp");
                otp.classList.add(defaultClasses.hide);
            }
        },
	});
	
	function startTimer() {
		if(document.getElementById('timer') != null) {
		var presentTime = document.getElementById('timer').innerHTML;
		var timeArray = presentTime.split(/[:]+/);
		var m = timeArray[0];
		var s = checkSecond((timeArray[1] - 1));
		if(s==59){m=m-1}
		if(m<0){
			
			
		}
		
		document.getElementById('timer').innerHTML =
			m + ":" + s;
		if(m>0 || s>0) {
		setTimeout(startTimer, 1000);
		}
		}
	}
	
		function checkSecond(sec) {
		if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
		if (sec < 0) {sec = "59"};
		return sec;
		}
    const validate = useCallback(() => {
        if (phoneVals != null) {
            queryOtp({
                variables: { telephone: phoneVals },
            });
        } else {
            const phone = document.getElementById("enterPhoneValid");
            phone.classList.remove(defaultClasses.hide);
            phone.classList.add(defaultClasses.requirePhonenumber);
        }
    }, [phoneVals, queryOtp]);

    return (
        <Button
            type="submit"
            className={defaultClasses.requestOtpBtn}
            disabled={loading}
            onClick={validate}
        >
            {"Request OTP"}
        </Button>
    );
};

export default RequestOtp;