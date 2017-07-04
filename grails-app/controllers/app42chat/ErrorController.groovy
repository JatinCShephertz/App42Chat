package app42chat
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
class ErrorController {

    def mailService
    def mailTo =  confHolder.config.mail.to
    def sub =  confHolder.config.mail.subject

    def index() {
        // send mail logic goes here
        println "500 Occur"
        String bdy = "<b>Login: </b> <b style='color: blue;'>${session['user']}</b> <br/><b>Organization ID: </b> <b style='color: blue;'>${session['org']}</b> <br/> <b>Error Code:</b> <b style='color: blue;'>${request?.javax?.servlet?.error?.status_code}</b> <br/> <b>URI:</b> <b style='color: blue;'>${request?.getRequestURI()}</b> <br/> <b>Exception Message: </b> <b style='color: blue;'>${request?.exception?.cause}</b> <br/><b>Exception Class Name:</b><b style='color: blue;'> ${request?.exception?.className}</b><br/> <b> Line:</b> <b style='color: blue;'>${request?.exception?.lineNumber}</b> <br/> <b>Stack Trace: </b> <b style='color: red; font-size: 14px;'>${request?.exception?.cause?.getStackTrace()}</b>"
        try{
            println "trying"
            List<String> recipients = mailTo.split(',').collect { it.trim() }
            sendMail {
                to recipients
                subject sub
                html bdy
            }
        }catch(Exception e){
            println "catch ex"+e
            println e.getStackTrace()
        } 
    }
    
}
