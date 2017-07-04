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
            println("dbName is " + storage.getDbName());
            println("collection Name is " + storage.getCollectionName());
            ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();            
            for(int i=0;i<jsonDocList.size();i++)
            {
                println("objectId is " + jsonDocList.get(i).getDocId());  
                println("CreatedAt is " + jsonDocList.get(i).getCreatedAt());  
                println("UpdatedAtis " + jsonDocList.get(i).getUpdatedAt());  
                println("Jsondoc is " + jsonDocList.get(i).getJsonDoc());  
            } 
        }catch(App42Exception exception)   
        {  
            def appErrorCode = exception.getAppErrorCode();  
            def httpErrorCode = exception.getHttpErrorCode();  
            def jsonText = exception.getMessage();   
            println appErrorCode
            println httpErrorCode
            println jsonText
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
        println("dbName is " + storage.getDbName());
        println("collection Name is " + storage.getCollectionName());
        ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();            
        for(int i=0;i<jsonDocList.size();i++)
        {
            println("objectId is " + jsonDocList.get(i).getDocId());  
            println("CreatedAt is " + jsonDocList.get(i).getCreatedAt());  
            println("UpdatedAtis " + jsonDocList.get(i).getUpdatedAt());  
            println("Jsondoc is " + jsonDocList.get(i).getJsonDoc());  
        } 
       
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
    
    def getAllUsers(user,userRole){
        App42API.initialize(aKey,sKey);
        int max = 10;  
        int offset = 0 ;
        def userList = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService();
        Storage storage
        if(userRole == "AGENT"){
            Query query = QueryBuilder.build("agent", user, Operator.EQUALS); // Build query q1 for key1 equal to name and value1 equal to Nick  
            storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,query,max,offset);       
        }else{
            storage = storageService.findAllDocuments(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,max,offset);
        }
        ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();  
        
        for(int i=0;i<jsonDocList.size();i++) {   
            def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
            def userMap = [:]
            userMap.createdOn = jsonDocList.get(i).getCreatedAt()
            userMap.name = clientJson.user
            userList.push(userMap)
        } 
        resultMap.userList = userList
        resultMap
    }
    
    def loadMoreUsers(user,userRole,params){
        App42API.initialize(aKey,sKey);
        int max = 10;  
        int offset = Integer.parseInt(params.offset) ;
        def userList = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService(); 
        Storage storage
        try{
            if(userRole == "AGENT"){
                Query query = QueryBuilder.build("agent", user, Operator.EQUALS); 
                storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,query,max,offset);       
            }else{
                storage = storageService.findAllDocuments(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,max,offset);
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
            println appErrorCode
            println httpErrorCode
            println jsonText
            if(appErrorCode == 1400){
                // invalid params
            } 
        } 
        resultMap.userList = userList
        resultMap
    }

    def getUserDetails(user,userRole,params){
        App42API.initialize(aKey,sKey);
        int max = 1;  
        int offset = 0 ;
        def userList = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService();
        Storage storage
        Query query = QueryBuilder.build("email", params.name, Operator.EQUALS);
        storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Users_Collection_NAME,query,max,offset,params);         
        ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();  
        def userMap = [:]
        for(int i=0;i<jsonDocList.size();i++)  
        {    
            def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())  
            userMap.createdOn = jsonDocList.get(i).getCreatedAt()
            userMap.name = clientJson.name
            userMap.email = clientJson.email
            userMap.phone = clientJson.phone
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
                if(userRole == "AGENT"){
                    userMap.name = "Agent"
                }else{
                    userMap.name = clientJson.user
                }
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
            if(userRole == "AGENT"){
                Query q1 = QueryBuilder.build("agent", user, Operator.EQUALS); 
                Query q2 = QueryBuilder.setCreatedOn(params.start,Operator.GREATER_THAN_EQUALTO);
                Query q3 = QueryBuilder.setCreatedOn(params.end,Operator.LESS_THAN_EQUALTO); 
                Query query = QueryBuilder.compoundOperator(q2, Operator.AND, q3); 
                query = QueryBuilder.compoundOperator(query, Operator.AND, q1);
                storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,query,max,offset);       
            }else{
                storage = storageService.findAllDocuments(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,max,offset);
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
            println appErrorCode
            println httpErrorCode
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
                if(userRole == "AGENT"){
                    Query q1 = QueryBuilder.build("agent", user, Operator.EQUALS); 
                    Query q2 = QueryBuilder.setCreatedOn(params.start,Operator.GREATER_THAN_EQUALTO);
                    Query q3=QueryBuilder.setCreatedOn(params.end,Operator.LESS_THAN_EQUALTO); // LESS_THAN_EQUALTO
                    Query query = QueryBuilder.compoundOperator(q2, Operator.AND, q3); 
                    query = QueryBuilder.compoundOperator(query, Operator.AND, q1); 
            
                    storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,query,max,offset);       
                }else{
                    storage = storageService.findAllDocuments(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,max,offset);
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
                    jsonOrderedMap.put("createdOn",jsonDocList.get(i).getCreatedAt());
                    jsonOrderedMap.put("message", clientJson.message);
                    jsonOrderedMap.put("sender", clientJson.user);
                    jsonOrderedMap.put("agent",clientJson.agent);
                    JSONObject jsonObj = new JSONObject(jsonOrderedMap);
                    toJSONArray.add(jsonObj)
                }
            }catch(App42Exception exception){ 
                hadData = false
                def appErrorCode = exception.getAppErrorCode();  
                def httpErrorCode = exception.getHttpErrorCode();  
                def jsonText = exception.getMessage();   
                println appErrorCode
                println httpErrorCode
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
}
