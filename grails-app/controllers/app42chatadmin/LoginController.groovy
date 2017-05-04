package app42chatadmin
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import org.apache.commons.lang.RandomStringUtils

class LoginController {
    def accountService;
    static allowedMethods = [auth: "POST"]
    
    def index(){ }
    
    def auth(){
        if(params.email && params.password){
            def validateAcc = accountService.validateAccount(params)
            if(!validateAcc){
                flash.message = "The username and password you entered don't match."
                redirect(action:"index")
            }else{                
                session["user"] = params.email
                redirect(controller:"main")  
            }
        }else{
            flash.message = "Invalid parameters"
            redirect(controller:"login")
        }
    }
    
    def logout(){
        session.invalidate()
        redirect(controller:"login")
    }
}
