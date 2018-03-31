
const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
  },
  logout(cb) {
    this.isAuthenticated = false;
  },
};

export default AuthService;
