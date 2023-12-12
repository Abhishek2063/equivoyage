export function setUserDetails(data) {
    sessionStorage.setItem("typeData", btoa(JSON.stringify(data)));
  }
  
  export function clearUserDetails() {
    sessionStorage.setItem("typeData", null);
  }
  
  export const getUserDetails = () => {
    if (sessionStorage.getItem("typeData") === null) {
      return "";
    }
    try {
      const userData = JSON.parse(atob(sessionStorage.getItem("typeData")));
      return userData;
    } catch (e) {
      return;
    }
  };
  
  export function setEntityData(data) {
    sessionStorage.setItem("entityData", btoa(JSON.stringify(data)));
  }
  
  export const getEntityData = () => {
    if (sessionStorage.getItem("entityData") === null) {
      return "";
    }
    try {
      const userData = JSON.parse(atob(sessionStorage.getItem("entityData")));
      return userData;
    } catch (e) {
      return;
    }
  };
  