
/**
 *
 * @author siddharthachandurkar
 */
import grails.converters.JSON
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
class SecurityFilters {
    def filters = {     
        chatadmin(uri:'/main/index**'){
			
            before = {
                if(!session['user']) {
                    if(request.getHeader("X-Requested-With") == "XMLHttpRequest"){
                        log.debug "Ajax Session Expired"
                        def json = [success : "false", message : "Session time out Error:0x10133817"]
                        def arr = []
                        arr.add(json)
                        render arr as JSON
                        return false;
                    }else{
                        log.debug "Normal Session expired "
                        redirect(controller:"login",action:"index")
                        return false
                    }
                }
            }
        }
        
        chatadmin(uri:'/'){
            before = {
                if(session['user'] && session['role']) {
                    redirect(controller:"main",action:"index")
                }
            }
        }
        chatadmin(uri:'/login/index'){
            before = {
                if(session['user']) {
                    redirect(controller:"main",action:"index")
                }
            }
        }
      
    }
}

