/**
 * Created by moyu on 2017/3/2.
 */

const HOST = "http://api.lb.dev.mydocumate.com/v1/";

export const signInURL = HOST + "account/sign-in";
export const signUpURL = HOST + "account/sign-up";
export const resetPwdURL = HOST + "account/reset-password";

export const getVerifyURL = HOST + "sms/send-verification-code-for-guest";

export const homeURL = HOST + "frontend/index";

export const foreignTeacherURL = HOST + "editor/index";
export const foreignTeacherDetailURL = HOST + "editor/view";
export const foreignTeacherDetailCommentURL = HOST + "editor/reviews-of-advisor";

export const abroadExpertURL = HOST + "course/index";
export const abroadExpertDetailURL = HOST + "course/view";
export const abroadExpertDetailCommentURL = HOST + "course/reviews-of-topic";

export const saoRedirect = "http://api.lb.dev.mydocumate.com/common/account/set-redirect-url";
