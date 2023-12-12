
export function getToken() {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("ACCESS_TOKEN");
      return token;
    }
  }
  
  export function setToken(token) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ACCESS_TOKEN");
      sessionStorage.setItem("ACCESS_TOKEN", token);
      return token;
    }
  }
  
  export function removeLocalData() {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ACCESS_TOKEN");
      sessionStorage.removeItem("typeData");
      sessionStorage.removeItem("entityData");
      return true;
    }
  }
  
  export function getVerifyToken() {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("VERIFY_TOKEN");
      return token;
    }
  }
  
  export function setVerifyToken(token) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("VERIFY_TOKEN");
      sessionStorage.setItem("VERIFY_TOKEN", token);
      return token;
    }
  }
  