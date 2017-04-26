/**
 * Created by moyu on 2017/3/2.
 */

const HOST = "http://api.lb.dev.mydocumate.com/v1/";
const HOST2 = "http://api.zry.dev.mydocumate.com/v1/";

export const signInURL = HOST2 + "account/sign-in";
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

export const searchPeopleURL = HOST2 + "advisor/search";

export const oneStepURL = HOST2 + "select-option/get";
export const computePriceURL = HOST2 + "price-preview/get";

export const oneStepViewURL = HOST2 + "service-full-package/view";
export const oneStepCommentURL = HOST2 + "service-full-package/review";
export const serviceTextPackViewURL = HOST2 + "service-text-package/view";
export const serviceTextPackCommentURL = HOST2 + "service-text-package/review";
export const serviceTextViewURL = HOST2 + "service-text-graduate/view";
export const serviceTextCommentURL = HOST2 + "service-text-graduate/review";
export const serviceResumeViewURL = HOST2 + "service-text-resume/view";
export const serviceResumeCommentURL = HOST2 + "service-text-resume/review";

export const oneStepCreateURL = HOST2 + "service-full-package/create";
export const cartGetURL = HOST2 + "shopping-cart/get-order-family-json";

export const orderListURL = HOST2 + "user-backend";
