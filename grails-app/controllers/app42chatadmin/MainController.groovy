package app42chatadmin
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
class MainController {
    def secretKey = confHolder.config.app42Chat.secretKey
    def apiKey = confHolder.config.app42Chat.apiKey
    def index() {
//        println "****************session['user']***********************"+session['user']
        [runningEnv : "DEVELOPMENT",email:session['user'],secretKey:secretKey,apiKey:apiKey]
    }
}
