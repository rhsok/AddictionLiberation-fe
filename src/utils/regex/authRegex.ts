export const phoneRegex = new RegExp(/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/);
export const emailRegex = new RegExp(
  /^(?=.{6,20}$)[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
export const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,20}$/
);
export const usernameRegex = new RegExp(/^[가-힣a-zA-Z]{2,10}$/);
