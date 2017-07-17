package app42chatadmin
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import org.apache.commons.lang.RandomStringUtils

class LoginController {
    def accountService;
    def baseUrl = confHolder.config.chat.baseURL
    static allowedMethods = [auth: "POST"]
    
    def index(){ }
    
    def auth(){
        if(params.email && params.password){
            def validateAcc = accountService.validateAccount(params)
            if(!validateAcc){
                flash.message = "The username and password you entered don't match."
                redirect(action:"index")
            }else{      
                def userRolesArr =  validateAcc.getRoles().name
                println userRolesArr
                session["role"] = userRolesArr[0]
                session["user"] = params.email
                def url = ""
                if(session["role"] == "SUPER-ADMIN"){
                    url = baseUrl + "/main/index#/agents"
                }else{
                    url = baseUrl + "/main/index#/live-chats"
                }
                redirect(uri:url)  
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
    def forgotPassword(){ }
    
    def sendPassword(){
       
        if(params.email){
            def result = accountService.updatePassword(params)
            if(result.success){
                flash.message = "We have sent an email to your registered email address. Check your mail for New Password."  
            }else{
                flash.message = result.msg
            }
        }else{
            flash.message = "Invalid parameters."
        }   
        redirect(action:"forgotPassword")
    }
    
    def xxxXXXiNcReAsEcApAcItYoFaGeNtSXXXxxxXXX(){
        println "agents"+params.agents
        def adminInstance = AdminConfiguration.get(1)
        adminInstance.noOfAgents = params.agents
        if(adminInstance.save(flush:true)){
            render "updated no of agents"
        }else{
            adminInstance.errors.allErrors.each{
                println it 
            }
            render "Faileddd"
        }
    }
}
