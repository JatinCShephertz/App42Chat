import app42chatadmin.User
class BootStrap {

    def init = { servletContext ->
         def userObj = User.findByEmail('admin@shephertz.com') ?: new User(email: 'admin@shephertz.com',password:'admin').save(failOnError: true)
    }
    def destroy = {
    }
}
