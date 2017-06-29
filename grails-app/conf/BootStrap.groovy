import app42chatadmin.User
import app42chatadmin.Role
import app42chatadmin.AdminConfiguration
class BootStrap {

    def init = { servletContext ->
        def adminSettingsInstance = AdminConfiguration.get(1) ?: new AdminConfiguration(noOfAgents:"2").save(failOnError: true)
        def superAdminRoleInstance = Role.findByName("SUPER-ADMIN") ?: new Role(name: 'SUPER-ADMIN').save(failOnError: true)
        def agentRoleInstance = Role.findByName("AGENT") ?: new Role(name: 'AGENT').save(failOnError: true)
        def superAdminUserInstance = User.findByEmail('admin@shephertz.com') ?: new User(email: 'admin@shephertz.com',name:'ADMINISTRATOR',password:'admin')
        superAdminUserInstance.addToRoles(superAdminRoleInstance)
        superAdminUserInstance.save(failOnError: true)
//        def agentUserInstance = User.findByEmail('agent01@shephertz.com') ?: new User(email: 'agent01@shephertz.com',name:'AGENT01',capacity:"2",password:'agent')
//        agentUserInstance.addToRoles(agentRoleInstance)
//        agentUserInstance.save(failOnError: true)
    }
    def destroy = {
    }
}
