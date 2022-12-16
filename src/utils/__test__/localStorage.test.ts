import {
  addAccessTokensToLocalStorage,
  clearLocalStorage,
  getUserId,
  isUserLoggedIn,
} from "../localStorage";

describe("Local Storage", () => {
  it("should store access token, isloggedin, and id in local storage", () => {
    addAccessTokensToLocalStorage("abc123", "true", "1");

    const accessToken = localStorage.getItem("accessToken");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const id = localStorage.getItem("id");

    expect(accessToken).toEqual("abc123");
    expect(isLoggedIn).toEqual("true");
    expect(id).toEqual("1");
  });

  it("should clear local storage", () => {
    addAccessTokensToLocalStorage("abc123", "true", "1");
    clearLocalStorage();

    const accessToken = localStorage.getItem("accessToken");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const id = localStorage.getItem("id");

    expect(accessToken).not.toEqual("abc123");
    expect(isLoggedIn).not.toEqual("true");
    expect(id).not.toEqual("1");
  });

  it("should return user is logged in", () => {
    addAccessTokensToLocalStorage("abc123", "true", "1");

    const isLoggedIn = isUserLoggedIn();

    expect(isLoggedIn).toEqual(true);
  });

  it("should return user is not logged in", () => {
    clearLocalStorage();

    const isLoggedIn = isUserLoggedIn();

    expect(isLoggedIn).toEqual(false);
  });

  it("should return user id", () => {
    addAccessTokensToLocalStorage("abc123", "true", "1");

    const id = getUserId();

    expect(id).toEqual(1);
  });
});
