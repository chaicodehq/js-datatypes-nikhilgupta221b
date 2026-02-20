/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  let errors = {};

  const name = formData.name;

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 50
  ) {
    errors["name"] = "Name must be 2-50 characters";
  }

  const email = formData.email;
  let validEmail = true;

  const firstAt = email.indexOf("@");
  const lastAt = email.lastIndexOf("@");

  if (firstAt === -1 || firstAt !== lastAt) {
    validEmail = false;
  }
  if (!email.includes(".", firstAt)) {
    validEmail = false;
  }

  if (validEmail === false) {
    errors["email"] = "Invalid email format";
  }

  const phone = formData.phone;

  const firstDigit = ["6", "7", "8", "9"];

  const phoneregex = /^\d+$/;
  if (
    typeof phone !== "string" ||
    phone.length !== 10 ||
    !firstDigit.includes(phone.charAt(0)) ||
    !phoneregex.test(phone)
  ) {
    errors["phone"] = "Invalid Indian phone number";
  }

  const age = formData.age;

  if (typeof age === "string") {
    const ageNumber = parseInt(age);
    if (Number.isNaN(ageNumber)) {
      errors["age"] = "Age must be an integer between 16 and 100";
    }
  } else if (
    typeof age !== "number" ||
    !Number.isInteger(age) ||
    age < 16 ||
    age > 100
  ) {
    errors["age"] = "Age must be an integer between 16 and 100";
  }

  const pincode = formData.pincode;
  const pincodeRegex = /^\d+$/;
  if (
    typeof pincode !== "string" ||
    pincode.length !== 6 ||
    pincode.charAt(0) === "0" ||
    !pincodeRegex.test(pincode)
  ) {
    errors["pincode"] = "Invalid Indian pincode";
  }

  const agreeTerms = formData.agreeTerms;

  if (Boolean(agreeTerms) === false) {
    errors["agreeTerms"] = "Must agree to terms";
  }

  const state = formData.state?.trim() ?? "";

  if (state === "") {
    errors["state"] = "State is required";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid: isValid,
    errors: errors,
  };
}
