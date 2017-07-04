package app42chatadmin
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import grails.converters.JSON
class MainController {
    def s2Host = confHolder.config.chat.s2Host
    def s2AppKey = confHolder.config.chat.s2AppKey
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
        [runningEnv : "DEVELOPMENT",email:session['user'],s2Host:s2Host,s2AppKey:s2AppKey]
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
    
    def loadMoreUsers(){
        def user = session["user"]
        def userRole = session["role"]
        println "loadMoreUsers::: calleddd"+params
        def result = accountService.loadMoreUsers(user,userRole,params)
        render result as JSON 
    }
    def loadMoreOfflineChats(){
        println "loadMoreOfflineChats::: calleddd"+params
        def user = session["user"]
        def userRole = session["role"]        
        def result = accountService.loadMoreOfflineChats(user,userRole,params)
        render result as JSON 
    }
    
    def getUserDetails(){
        println "getUserDetails  ::::::::::::::: "+params
        def user = session["user"]
        def userRole = session["role"]        
        def result = accountService.getUserDetails(user,userRole,params)
        render result as JSON
    }
    
    def openConversation(){
        println "openConversation  ::::::::::::::: "+params
        def user = session["user"]
        def userRole = session["role"]        
        def result = accountService.openConversation(user,userRole,params)
        render result as JSON
    }
    
    def loadMoreChats(){
        println "loadMoreChats  ::::::::::::::: "+params
        def user = session["user"]
        def userRole = session["role"]        
        def result = accountService.loadMoreChats(user,userRole,params)
        render result as JSON 
    }
    
    def beginReportGeneration(){
        println "beginReportGeneration  ::::::::::::::: "+params
        def user = session["user"]
        def userRole = session["role"]        
        def result = accountService.beginReportGeneration(user,userRole,params,response)
    }
}
