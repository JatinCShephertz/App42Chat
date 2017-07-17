package app42chatadmin

import groovy.sql.Sql
import org.apache.commons.lang.RandomStringUtils
import java.util.Random;
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder
import org.json.JSONArray
import org.json.CDL
import org.json.JSONObject
import com.shephertz.app42.paas.sdk.java.App42API;
import com.shephertz.app42.paas.sdk.java.App42Log;
import com.shephertz.app42.paas.sdk.java.App42Response;
import com.shephertz.app42.paas.sdk.java.App42Exception;
import com.shephertz.app42.paas.sdk.java.App42BadParameterException;
import com.shephertz.app42.paas.sdk.java.App42NotFoundException;
import com.shephertz.app42.paas.sdk.java.storage.OrderByType;
import com.shephertz.app42.paas.sdk.java.storage.Query;
import com.shephertz.app42.paas.sdk.java.storage.Operator;
import com.shephertz.app42.paas.sdk.java.storage.QueryBuilder;
import com.shephertz.app42.paas.sdk.java.storage.Storage;
import com.shephertz.app42.paas.sdk.java.storage.StorageService;
import com.shephertz.app42.paas.sdk.java.storage.QueryBuilder.Operator;
import org.json.JSONObject
import grails.converters.JSON
import java.text.DateFormat
import java.text.SimpleDateFormat
import com.shephertz.app42.paas.sdk.java.customcode.CustomCodeService

class AccountService {
    static transactional = true
    static scope = "request"
    def dataSource;
    def mailService
    def baseURL = confHolder.config.chat.baseURL
    def aKey = confHolder.config.chat.apiKey
    def sKey = confHolder.config.chat.secretKey
    def ALPHA_CAPS  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    def ALPHA   = "abcdefghijklmnopqrstuvwxyz";
    def NUM     = "0123456789";
    def SPL_CHARS   = "!#";
    def APP_42_DB_NAME = "DHL"
    def APP_42_Agents_Collection_NAME = "AGENTS"
    def APP_42_Users_Collection_NAME = "USERS"
    def APP_42_ChatHistory_Collection_NAME = "CHAT_HISTORY"
    def APP_42_Offlinechats_Collection_NAME = "OFFLINE_CHAT"
    def APP_42_AgentUsers_Collection_NAME = "AGENT_USERS"
    def  APP_42_CUSTOMECODE_NAME = "dhlchatprofile";
    def generatePswd(int minLen, int maxLen, int noOfCAPSAlpha,int noOfDigits, int noOfSplChars) {
        if(minLen > maxLen)throw new IllegalArgumentException("Min. Length > Max. Length!");
        if((noOfCAPSAlpha + noOfDigits + noOfSplChars) > minLen )throw new IllegalArgumentException("Min. Length should be atleast sum of (CAPS, DIGITS, SPL CHARS) Length!");
        Random rnd = new Random();
        int len = rnd.nextInt(maxLen - minLen + 1) + minLen;
        char[] pswd = new char[len];
        int index = 0;
        for (int i = 0; i < noOfCAPSAlpha; i++) {
            index = getNextIndex(rnd, len, pswd);
            pswd[index] = ALPHA_CAPS.charAt(rnd.nextInt(ALPHA_CAPS.length()));
        }
        for (int i = 0; i < noOfDigits; i++) {
            index = getNextIndex(rnd, len, pswd);
            pswd[index] = NUM.charAt(rnd.nextInt(NUM.length()));
        }
        for (int i = 0; i < noOfSplChars; i++) {
            index = getNextIndex(rnd, len, pswd);
            pswd[index] = SPL_CHARS.charAt(rnd.nextInt(SPL_CHARS.length()));
        }
        for(int i = 0; i < len; i++) {
            if(pswd[i] == 0) {
                pswd[i] = ALPHA.charAt(rnd.nextInt(ALPHA.length()));
            }
        }
        return pswd;
    }
     
    def getNextIndex(Random rnd, int len, char[] pswd) {
        int index = rnd.nextInt(len);
        while(pswd[index = rnd.nextInt(len)] != 0);
        return index;
    }
    
    def pwdGenerator(){
        int noOfCAPSAlpha = 1;
        int noOfDigits = 1;
        int noOfSplChars = 1;
        int minLen = 8;
        int maxLen = 12;
        def pswd = generatePswd(minLen, maxLen,noOfCAPSAlpha, noOfDigits, noOfSplChars);
        println(pswd.toString());
        pswd.toString()
    }
    
    def saveAgentOnApp42(agentObjJson){
         
        App42API.initialize(aKey,sKey);
        StorageService storageService = App42API.buildStorageService(); 
        try{
            Storage storage = storageService.insertJSONDocument(APP_42_DB_NAME,APP_42_Agents_Collection_NAME,agentObjJson);  
            //            println("dbName is " + storage.getDbName());
            //            println("collection Name is " + storage.getCollectionName());
            ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();            
            for(int i=0;i<jsonDocList.size();i++)
            {
                //                println("objectId is " + jsonDocList.get(i).getDocId());  
                //                println("CreatedAt is " + jsonDocList.get(i).getCreatedAt());  
                //                println("UpdatedAtis " + jsonDocList.get(i).getUpdatedAt());  
                //                println("Jsondoc is " + jsonDocList.get(i).getJsonDoc());  
            } 
        }catch(App42Exception exception)   
        {  
            def appErrorCode = exception.getAppErrorCode();  
            def httpErrorCode = exception.getHttpErrorCode();  
            def jsonText = exception.getMessage();   
            //            println appErrorCode
            //            println httpErrorCode
            //            println jsonText
            if(appErrorCode == 1400){
                // invalid params
            }else if(appErrorCode == 1401)  
            {  
                // handle here for Client is not authorized  
            }  
            else if(appErrorCode == 1500)  
            {  
                // handle here for Internal Server Error  
            }  
        }     
       
    }
    def updateAgentOnApp42(agentObjJson,email){
        App42API.initialize(aKey,sKey);
       
        String key = "email"; 
        String value = email; 
        
        StorageService storageService = App42API.buildStorageService(); 
        Storage storage = storageService.updateDocumentByKeyValue(APP_42_DB_NAME,APP_42_Agents_Collection_NAME,key,value,agentObjJson);  
        //        println("dbName is " + storage.getDbName());
        //        println("collection Name is " + storage.getCollectionName());
        ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();            
        for(int i=0;i<jsonDocList.size();i++)
        {
            //            println("objectId is " + jsonDocList.get(i).getDocId());  
            //            println("CreatedAt is " + jsonDocList.get(i).getCreatedAt());  
            //            println("UpdatedAtis " + jsonDocList.get(i).getUpdatedAt());  
            //            println("Jsondoc is " + jsonDocList.get(i).getJsonDoc());  
        } 
       
    }
    
    def deleteAgentOnApp42(email){
        String key = "email";   
        String value = email;    
        App42API.initialize(aKey,sKey);
        StorageService storageService = App42API.buildStorageService();   
        App42Response app42response = storageService.deleteDocumentsByKeyValue(APP_42_DB_NAME,APP_42_Agents_Collection_NAME,key,value);  
        println("response is " + app42response) ;    
        boolean  success = app42response.isResponseSuccess();  
        String jsonResponse = app42response.toString(); 
        println jsonResponse
        return success
    }
    
    def getAgents() {
        def users = User.list()
        println users
        def result = []
        users.each{usr->
            // println usr.getRoles().name
            if(usr.getRoles().name[0] == "AGENT"){
                result.add(usr)
            }
        }
        result
    }
    
    def saveAgent(obj){
        println "Save Agent Called"
        def map = [success:false,msg:"Something went wrong."]
        def allowedNoOfAgents = AdminConfiguration.get(1)?.noOfAgents
        def users = User.list()
        def result = []
        users.each{usr->
            // println usr.getRoles().name
            if(usr.getRoles().name[0] == "AGENT"){
                result.add(usr)
            }
        }
        if(result.size() >= allowedNoOfAgents.toInteger()){
            map.msg = "Agent Creation limit reached. Please contact to support team."
        }else{
            def checkIfEmailExists = User.findByEmail(obj.email)
            if(checkIfEmailExists){
                map.msg = "Agent already exists with the email."
            }else{
                //save user 
                def childRole = Role.findByName("AGENT")
                def pwd = pwdGenerator()
                def password = pwd
                //                    def password = pwd.encodeAsSHA256()
                //create user now
                def userIns = new User()
                userIns.name = obj.name
                userIns.email = obj.email
                userIns.password = password
                userIns.capacity = obj.capacity
                userIns.addToRoles(childRole)
                if(userIns.save(flush:true)){
                    println " agent created" 
                    map.success = true
                    map.msg = "Agent creation completed."
                    //save agent on App42
                    JSONObject json = new JSONObject();
                    json.put("name",obj.name);
                    json.put("email",obj.email);
                    json.put("capacity",obj.capacity);
                    saveAgentOnApp42(json)
                    // send mail to the agent
                    try{
                        println "sending agent invitation mail"
                        mailService.sendMail {
                            async true
                            to obj.email
                            subject "Invitation to become an Agent on App42 Chat Admin Console"
                            html "Hello,<br/><br/> You have been invited to become an Agent on App42 Chat Admin Console. Please click on the <a href='$baseURL'>link</a> and sign in with following credentials:<br/><br/><b>Email:</b> &nbsp; $obj.email <br/><b>Password:</b> &nbsp;$password <br/><br/>Regards,<br/>App42 Team "
                        }
                    }catch(Exception e){
                        println "catch ex"+e
                        println e.getStackTrace()
                    } 
                }
            }
        }
        
        map
    }
    
    def deleteAgent(obj,role){
//        println "role"+role
//        println "Agent to delete ::"+obj.email
        def map = [success:false,msg:""]
        if(obj.email){
            if(role == "SUPER-ADMIN"){
                def checkIfEmailExists = User.findByEmail(obj.email)
                if(!checkIfEmailExists){
                    map.msg = "Agent not found with the email."
                }else{
                    
                    def stats = deleteAgentOnApp42(obj.email)
                    if(stats){
                        checkIfEmailExists.delete(flush:true);
                        map.msg = "Agent deleted successfully."
                        map.success = true
                    }
                    
                }
            }else{
                map.msg = "You are not authorized to perform this action."
            }
        }else{
            map.msg = "Invalid parameters." 
        }
        map
    }
    def changePassword(obj,usr){
        println "changePassword Called"
        def map = [success:false,msg:"Something went wrong."]
        
        def checkIfEmailExists = User.findByEmailAndPassword(usr,obj.oldPwd)
        if(!checkIfEmailExists){
            map.msg = "Wrong Old Password."
        }else{
            //create user now
            checkIfEmailExists.password = obj.newPwd
            if(checkIfEmailExists.save(flush:true)){
                println " password changed completed" 
                map.success = true
                map.msg = "Password change completed."
            }else{
                map.msg = "Something went wrong. Please try again later"
            }
        }
        map
    }
    
    def updatePassword(params){
        def map = [success:false,msg:""]
        def checkIfEmailExists = User.findByEmail(params.email)
        def sub = "App42 Chat password changed successfully."
        if(checkIfEmailExists){
            def pwd = pwdGenerator()
            def password = pwd
            checkIfEmailExists.password = password
            if(checkIfEmailExists.save(flush:true)){
                map.success = true
                map.msg = "Password updated successfuly."
                //send email
                try{
                    println "sending forgot password mail"

                    mailService.sendMail {
                        async true
                        to checkIfEmailExists.email
                        subject sub
                        html "Hey there,<br/><br/> Your password has been changed successfully. Your updated password is :<b> $password </b><br/><br/>Regards,<br/>App42 Team "
                    }
                }catch(Exception e){
                    println "catch ex"+e
                   
                }
            }else{
                map.msg = "Something went wrong. Please try again later." 
            }
        }else{
            map.msg = "User with the email not found."
        }
        return map;
    }
    
   
    
    def updateAgent(obj){
        println "Update Agent Called"
        def map = [success:false,msg:"Something went wrong."]
        
      
        def checkIfEmailExists = User.findByEmail(obj.email)
        if(!checkIfEmailExists){
            map.msg = "Agent not found."
        }else{
            //update user 
            def userIns = checkIfEmailExists
            userIns.name = obj.name
            // userIns.email = obj.email
            // userIns.password = password
            userIns.capacity = obj.capacity
            // userIns.addToRoles(childRole)
            if(userIns.save(flush:true)){
                println " agent updated" 
                map.success = true
                map.msg = "Agent details updation completed."
                
                JSONObject json = new JSONObject();
                json.put("name",obj.name);
                json.put("email",obj.email);
                json.put("capacity",obj.capacity);
                updateAgentOnApp42(json,obj.email)
            }
        }
        map
    }
    def validateAccount(params){
        def password = params.password //.encodeAsSHA256()
        def result = User.findByEmailAndPassword(params.email,password)
        return result;
    }

    def getUserDetails(user,userRole,params){
        App42API.initialize(aKey,sKey);
        int max = 1;  
        int offset = 0 ;
        def userList = []
        def resultMap = [:]
        def userMap = [:]
        StorageService storageService = App42API.buildStorageService();
        Storage storage
        try{
            Query query = QueryBuilder.build("email", params.name, Operator.EQUALS);
            storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Users_Collection_NAME,query,max,offset);         
            ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();  
            for(int i=0;i<jsonDocList.size();i++)  
            {    
                def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())  
                userMap.createdOn = jsonDocList.get(i).getCreatedAt()
                userMap.name = clientJson.name
                userMap.email = clientJson.email
                userMap.phone = clientJson.phone
            } 
        }catch(App42Exception exception){ 
            def appErrorCode = exception.getAppErrorCode();  
            def httpErrorCode = exception.getHttpErrorCode();  
            def jsonText = exception.getMessage();   
            println appErrorCode
            println httpErrorCode
            println jsonText
            if(appErrorCode == 2608){
                userMap = [:]
            } 
        }
        userMap
    }
       
    def openConversation(user,userRole,params){ 
        App42API.initialize(aKey,sKey);
        int max = 10;  
        int offset = 0 ;
        def userList = []
        def resultMap = [:]
        def key = '_$createdAt'
        StorageService storageService = App42API.buildStorageService();
        Storage storage
        try{
            if(userRole == "AGENT"){  
                Query q1 = QueryBuilder.build("user", params.name, Operator.EQUALS); 
                Query q2 = QueryBuilder.build("agent",user, Operator.EQUALS); 
                Query query = QueryBuilder.compoundOperator(q1, Operator.AND, q2);    
                storage = storageService.findDocsWithQueryPagingOrderBy(APP_42_DB_NAME,APP_42_ChatHistory_Collection_NAME,query,max,offset,key,OrderByType.DESCENDING);       
            }else{
                Query query = QueryBuilder.build("user", params.name, Operator.EQUALS);
                storage = storageService.findDocsWithQueryPagingOrderBy(APP_42_DB_NAME,APP_42_ChatHistory_Collection_NAME,query,max,offset,key,OrderByType.DESCENDING);  
            }   
            ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList(); 
        
            for(int i=0;i<jsonDocList.size();i++){    
                def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
                def userMap = [:]
                if(clientJson.sender == params.name){
                    //                    if(userRole == "AGENT"){
                    //                        userMap.name = "Agent"
                    //                    }else{
                    //                        userMap.name = clientJson.user
                    //                    }
                    userMap.name = clientJson.user
                    userMap.position = true
                }else{ 
                    userMap.name = clientJson.agent
                    userMap.position = false
                }
                userMap.createdOn = jsonDocList.get(i).getCreatedAt()
                userMap.message = clientJson.message
                userMap.user = clientJson.user
                userMap.agent = clientJson.agent
                userList.push(userMap)
            } 
        }catch(App42Exception exception){ 
            def appErrorCode = exception.getAppErrorCode();  
            def httpErrorCode = exception.getHttpErrorCode();  
            def jsonText = exception.getMessage();   
            println appErrorCode
            println httpErrorCode
            println jsonText
            if(appErrorCode == 2608){
                userList = []
            } 
        }
        userList
    }
    
    def loadMoreChats(user,userRole,params){ 
        App42API.initialize(aKey,sKey);
        int max = 10;  
        int offset = Integer.parseInt(params.offset) ;
        def userList = []
        def resultMap = [:]
        def key = '_$createdAt'
        StorageService storageService = App42API.buildStorageService();
        Storage storage
        try{
            if(userRole == "AGENT"){  
                Query q1 = QueryBuilder.build("user", params.name, Operator.EQUALS); 
                Query q2 = QueryBuilder.build("agent",user, Operator.EQUALS); 
                Query query = QueryBuilder.compoundOperator(q1, Operator.AND, q2);    
                storage = storageService.findDocsWithQueryPagingOrderBy(APP_42_DB_NAME,APP_42_ChatHistory_Collection_NAME,query,max,offset,key,OrderByType.DESCENDING);       
            }else{
                Query query = QueryBuilder.build("user", params.name, Operator.EQUALS);
                storage = storageService.findDocsWithQueryPagingOrderBy(APP_42_DB_NAME,APP_42_ChatHistory_Collection_NAME,query,max,offset,key,OrderByType.DESCENDING);  
            }   
            ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList(); 
        
            for(int i=0;i<jsonDocList.size();i++){    
                def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
                def userMap = [:]
                if(clientJson.sender == params.name){
                    userMap.name = clientJson.user
                    userMap.position = true
                }else{ 
                    userMap.name = clientJson.agent
                    userMap.position = false
                }
                userMap.createdOn = jsonDocList.get(i).getCreatedAt()
                userMap.message = clientJson.message
                userMap.user = clientJson.user
                userMap.agent = clientJson.agent
                userList.push(userMap)
            }
        }catch(App42Exception exception){ 
            def appErrorCode = exception.getAppErrorCode();  
            def httpErrorCode = exception.getHttpErrorCode();  
            def jsonText = exception.getMessage();   
            //            println appErrorCode
            //            println httpErrorCode
            //            println jsonText
            if(appErrorCode == 2608){
                userList = []
            } 
        } 
        userList
    }
    
    def getOfflineChats(user,userRole,params){
        App42API.initialize(aKey,sKey);
        int max = 10;  
        int offset =  Integer.parseInt(params.offset) ;
        def OfflineChats = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService(); 
        Storage storage   
        try{
            def endDate = getEnddate(params.end)
            Query q2 = QueryBuilder.setCreatedOn(params.start,Operator.GREATER_THAN_EQUALTO);
            Query q3 = QueryBuilder.setCreatedOn(endDate,Operator.LESS_THAN); 
            Query query = QueryBuilder.compoundOperator(q2, Operator.AND, q3); 
            if(userRole == "AGENT"){
                Query q1 = QueryBuilder.build("agent", user, Operator.EQUALS); 
                query = QueryBuilder.compoundOperator(query, Operator.AND, q1);
                storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,query,max,offset);       
            }else{
                storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,query,max,offset);
            }
            ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList(); 
            for(int i=0;i<jsonDocList.size();i++){    
                def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
                def userMap = [:]
                userMap.createdOn = jsonDocList.get(i).getCreatedAt()
                userMap.message = clientJson.message
                userMap.sender = clientJson.user
                userMap.agent = clientJson.agent
                OfflineChats.push(userMap)
            } 
        }catch(App42Exception exception){  
            def appErrorCode = exception.getAppErrorCode();  
            def httpErrorCode = exception.getHttpErrorCode();  
            def jsonText = exception.getMessage();   
            //            println appErrorCode
            //            println httpErrorCode
            println jsonText
            if(appErrorCode == 2608){
                OfflineChats = []
            } 
        } 
        resultMap.OfflineChats = OfflineChats
        resultMap
    }
    
    def beginReportGeneration(user,userRole,params,response){
        App42API.initialize(aKey,sKey);
        int max = 100;  
        int offset = 0 ;
        def OfflineChats = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService();
        Storage storage
        def hadData = true
        def toJSONArray = []
        while(hadData){
            try{
                def endDate = getEnddate(params.end)
                Query q2 = QueryBuilder.setCreatedOn(params.start,Operator.GREATER_THAN_EQUALTO);
                Query q3=QueryBuilder.setCreatedOn(endDate,Operator.LESS_THAN); // LESS_THAN_EQUALTO
                Query query = QueryBuilder.compoundOperator(q2, Operator.AND, q3);
                String name = APP_42_CUSTOMECODE_NAME
                JSONObject jsonBody = new JSONObject();
                jsonBody.put("max", max);
                jsonBody.put("offset",offset);
                
                if(userRole == "AGENT"){
                    Query q1 = QueryBuilder.build("agent", user, Operator.EQUALS);  
                    query = QueryBuilder.compoundOperator(query, Operator.AND, q1); 
                    //storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,query,max,offset);       
                }else{
                    //storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,query,max,offset);
                }  
              
                //ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList(); 
                jsonBody.put("searchQuery", query)
                CustomCodeService customCodeService = App42API.buildCustomCodeService()
                JSONObject customCodeResponse = customCodeService.runJavaCode(name, jsonBody)
                //println "customCodeResponse --------------  "+customCodeResponse.get("response")
                JSONArray jsonResponse = customCodeResponse.optJSONArray("response")
                //println "jsonResponse --------------  "+jsonResponse
                //println "jsonResponse --------------  "+customCodeResponse.get("response").length()
                if(customCodeResponse.get("response").length() == 100){
                    hadData = true
                    offset = offset+100
                }else{
                    hadData = false
                }
                for(int i=0;i<jsonResponse.length();i++){
                    def j = jsonResponse.get(i)
                   // println "j::::::::::::::::::: "+j
                    LinkedHashMap<String, String> jsonOrderedMap = new LinkedHashMap<String, String>();
                    jsonOrderedMap.put("Received On",j.get("Received On"));
                    jsonOrderedMap.put("Message", j.Message);
                    jsonOrderedMap.put("Sender", j.Sender);
                    jsonOrderedMap.put("Agent",j.Agent);
                    if(j.profile.phone == null || j.profile.phone == ""){
                         jsonOrderedMap.put("Phone", "N/A");
                    }else{
                         jsonOrderedMap.put("Phone", j.profile.phone);
                    }
                   
                    jsonOrderedMap.put("Email", j.profile.email);
                    jsonOrderedMap.put("Name",j.profile.name);
                    JSONObject jsonObj = new JSONObject(jsonOrderedMap);
                    toJSONArray.add(jsonObj) 
                }
                   
                    
            }catch(App42Exception exception){ 
                hadData = false
                def appErrorCode = exception.getAppErrorCode();  
                def httpErrorCode = exception.getHttpErrorCode();  
                def jsonText = exception.getMessage();   
                //                println appErrorCode
                //                println httpErrorCode
                println jsonText
                if(appErrorCode == 2608){
                   
                } 
            } 
        }
             
        JSONArray toReturn = new JSONArray(toJSONArray);
        def csv = CDL.toString(toReturn);
        System.out.println(" CSV to be FLushed : " + csv);
          
        if(params?.format && params.format != "html"){
            response.contentType = confHolder.config.grails.mime.types[params.format]
            response.setHeader("Content-disposition", "attachment; filename=OfflineChats.${params.extension}")
            response.outputStream << csv
            response.outputStream.flush()
        }     
    } 
    
    def getAllUsers(user,userRole,params){
        App42API.initialize(aKey,sKey);
        int max = 10;  
        int offset = Integer.parseInt(params.offset) ;
        def userList = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService(); 
        Storage storage
        try{
            def endDate = getEnddate(params.end)
            Query q2 = QueryBuilder.setCreatedOn(params.start,Operator.GREATER_THAN_EQUALTO);
            Query q3 = QueryBuilder.setCreatedOn(endDate,Operator.LESS_THAN); 
            Query query = QueryBuilder.compoundOperator(q2, Operator.AND, q3)
            if(userRole == "AGENT"){
                Query q1 = QueryBuilder.build("agent", user, Operator.EQUALS); 
                query = QueryBuilder.compoundOperator(query, Operator.AND, q1);
                storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,query,max,offset);       
            }else{
                storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,query,max,offset);
            }  
            ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList(); 
        
            for(int i=0;i<jsonDocList.size();i++){   
                def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
                def userMap = [:]
                userMap.createdOn = jsonDocList.get(i).getCreatedAt()
                userMap.name = clientJson.user
                userList.push(userMap)
            } 
        }catch(App42Exception exception){  
            def appErrorCode = exception.getAppErrorCode();  
            def httpErrorCode = exception.getHttpErrorCode();  
            def jsonText = exception.getMessage();   
            //            println appErrorCode
            //            println httpErrorCode
            println jsonText
            if(appErrorCode == 2608){
                userList = []
            }
        } 
        resultMap.userList = userList
        resultMap
    }
    
    def getAllUsersReport(user,userRole,params,response){
        App42API.initialize(aKey,sKey);
        int max = 100;  
        int offset = 0 ;
        def userList = []
        def resultMap = [:]
        def hadData = true
        def toJSONArray = []
        StorageService storageService = App42API.buildStorageService(); 
        Storage storage   
        while(hadData){
            try{
                def endDate = getEnddate(params.end)
                Query q2 = QueryBuilder.setCreatedOn(params.start,Operator.GREATER_THAN_EQUALTO);
                Query q3 = QueryBuilder.setCreatedOn(endDate,Operator.LESS_THAN); 
                Query query = QueryBuilder.compoundOperator(q2, Operator.AND, q3)
                if(userRole == "AGENT"){
                    Query q1 = QueryBuilder.build("agent", user, Operator.EQUALS); 
                    query = QueryBuilder.compoundOperator(query, Operator.AND, q1);
                    storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,query,max,offset);       
                }else{
                    storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,query,max,offset);
                }  
                ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();
                if(jsonDocList.size() == 100){
                    hadData = true
                    offset = offset+100
                }else{
                    hadData = false
                }
                for(int i=0;i<jsonDocList.size();i++) {    
                    def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
                    LinkedHashMap<String, String> jsonOrderedMap = new LinkedHashMap<String, String>();
                    jsonOrderedMap.put("Created On (UTC)",getFormatedDate(jsonDocList.get(i).getCreatedAt()) );
                    def userParams = [:]
                    userParams.name = clientJson.user
                    def userDetails =  getUserDetails(user,userRole,userParams);
                    jsonOrderedMap.put("Email", clientJson.user);
                    jsonOrderedMap.put("Name", userDetails.name);
                    if(userDetails.phone != "" && userDetails.phone != null){
                        jsonOrderedMap.put("Phone", userDetails.phone);
                    }else{
                        jsonOrderedMap.put("Phone", "N/A"); 
                    }
                    JSONObject jsonObj = new JSONObject(jsonOrderedMap);
                    toJSONArray.add(jsonObj)
                }
            }catch(App42Exception exception){ 
                hadData = false
                def appErrorCode = exception.getAppErrorCode();  
                def httpErrorCode = exception.getHttpErrorCode();  
                def jsonText = exception.getMessage();   
                //                println appErrorCode
                //                println httpErrorCode
                println jsonText
                if(appErrorCode == 2608){
                   
                } 
            } 
        }
        
        
        JSONArray toReturn = new JSONArray(toJSONArray);
        def csv = CDL.toString(toReturn);
        System.out.println(" CSV to be FLushed : " + csv);
          
        if(params?.format && params.format != "html"){
            response.contentType = confHolder.config.grails.mime.types[params.format]
            response.setHeader("Content-disposition", "attachment; filename=UsersList.${params.extension}")
            response.outputStream << csv
            response.outputStream.flush()
        } 
    }
    
    def  getEnddate(enddate){
        Date date = Date.parse("yyyy-MM-dd", enddate)
        def tempdate = date.getTime()+ 1 * 24 * 60 * 60 * 1000 
        def endDate = new Date(tempdate)
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return df.format(endDate);
    }
    
    def getFormatedDate(date1) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        def currentTime = df.parse(date1)
        Date date = new Date(currentTime.getTime());
        SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df2.format(currentTime)
    }
}
