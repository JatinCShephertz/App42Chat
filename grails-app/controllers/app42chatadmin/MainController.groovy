package app42chatadmin
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import grails.converters.JSON
class MainController {
    def secretKey = confHolder.config.app42Chat.secretKey
    def apiKey = confHolder.config.app42Chat.apiKey
    def accountService
    
    
    def beforeInterceptor = {
        def user = session["user"]
        if(user ==null){
            def json = [success : "false", message : "Session time out Error:0x10133817"]
            def arr = []
            arr.add(json)
            response.status = 401;
            render arr as JSON
        }
    }
    
    def index() {
        [runningEnv : "DEVELOPMENT",email:session['user'],secretKey:secretKey,apiKey:apiKey]
    }
    
    def getAgents(){
        //  println "getAgents::: calleddd"
        def users = accountService.getAgents()
        render users as JSON
    }
    
    def saveAgent(){
        // println "saveAgent::: calleddd"+params
        def data = JSON.parse(params.reqData)
        def result = accountService.saveAgent(data)
        render result as JSON
    }
    def updateAgent(){
        println "updateAgent::: calleddd"+params
        def data = JSON.parse(params.reqData)
        def result = accountService.updateAgent(data)
        render result as JSON
    }
    
    def getAllUsers(){
        def user = session["user"]
        def userRole = session["role"]
        println "getAllUsers::: calleddd"
        def result = accountService.getAllUsers(user,userRole)
        render result as JSON
    }
    
    def getOfflineChats(){
        def user = session["user"]
        def userRole = session["role"]
        println "getOfflineChats::: calleddd"
        def result = accountService.getOfflineChats(user,userRole)
        render result as JSON
    }
}
