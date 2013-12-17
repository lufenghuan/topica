//Ensure that routes aren't redirected or not found
describe("E2E Testing for Routes", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should have a working / route', function() {
    browser().navigateTo('/');
    expect(browser().window().path()).toBe("/");
  });

  it('should have a working /profile route', function() {
    browser().navigateTo('/profile');
    expect(browser().window().path()).toBe("/profile");
  });

  it('should have a working /signup route', function() {
    browser().navigateTo('/signup');
    expect(browser().window().path()).toBe("/signup");
  });

  it('should have a working /login route', function() {
    browser().navigateTo('/login');
    expect(browser().window().path()).toBe("/login");
  });

});
