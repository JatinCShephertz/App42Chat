
/**
 *
 * @author siddharthachandurkar
 */
import grails.converters.JSON
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
class SecurityFilters {
    def filters = {     
        gateway(uri:'/main/index**'){
			
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
        
        gateway(uri:'/'){
            before = {
                if(session['user'] && session['userID']) {
                    redirect(controller:"main",action:"index")
                }
            }
        }
        gateway(uri:'/login/index'){
            before = {
                if(session['user']) {
                    redirect(controller:"main",action:"index")
                }
            }
        }
        gateway(uri:'/login/create'){
            before = {
                
                if(RUNNING_MODE == "SHARED") {
                    redirect(controller:"login",action:"index")
                }
            }
        }
    }
}

