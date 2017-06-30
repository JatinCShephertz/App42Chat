package app42chatadmin

import groovy.sql.Sql
import org.apache.commons.lang.RandomStringUtils
import java.util.Random;
import org.codehaus.groovy.grails.commons.ConfigurationHolder as confHolder

import com.shephertz.app42.paas.sdk.java.App42API;
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
        // def db = new Sql(dataSource);
        def password = params.password //.encodeAsSHA256()
        def result = User.findByEmailAndPassword(params.email,password)
        // println result
        return result;
    }
    
    def getAllUsers(user,userRole){
        println "&&&&&&&&77777777777777"
        App42API.initialize(aKey,sKey);
        int max = 12;  
        int offset = 0 ;
        def userList = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService();
       
        if(userRole == "AGENT"){
            println "*********************************"
            Query query = QueryBuilder.build("agent", user, Operator.EQUALS); // Build query q1 for key1 equal to name and value1 equal to Nick  
            storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,query,max,offset);       
        }else{
            storage = storageService.findAllDocuments(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,max,offset);
        }
        
        System.out.println("dbName is " + storage.getDbName());  
        System.out.println("collection Name is " + storage.getCollectionName());  
        ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList();  
        
        for(int i=0;i<jsonDocList.size();i++)  
        {  
            System.out.println("objectId is " + jsonDocList.get(i).getDocId());    
            System.out.println("CreatedAt is " + jsonDocList.get(i).getCreatedAt());    
            System.out.println("UpdatedAtis " + jsonDocList.get(i).getUpdatedAt());    
            System.out.println("Jsondoc is " + jsonDocList.get(i).getJsonDoc());  
            System.out.println("Jsondoc is " + jsonDocList.get(i).getJsonDoc().getClass());  
            def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
            def userMap = [:]
            userMap.createdOn = jsonDocList.get(i).getCreatedAt()
            userMap.name = clientJson.user
            userList.push(userMap)
        } 
        resultMap.userList = userList
        println "resultMap ::::::::::::::::::::::;  "+resultMap
        resultMap
    }
    
    def getOfflineChats(user,userRole){
        println "&&&&&&&&77777777777777"
        App42API.initialize(aKey,sKey);
        int max = 10;  
        int offset = 0 ;
        def OfflineChats = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService();
        Storage storage
        println "************************userRole *********"+userRole
        if(userRole == "AGENT"){
            println "*********************************"
            Query query = QueryBuilder.build("agent", user, Operator.EQUALS); // Build query q1 for key1 equal to name and value1 equal to Nick  
            storage = storageService.findDocumentsByQueryWithPaging(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,query,max,offset);       
        }else{
            storage = storageService.findAllDocuments(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,max,offset);
        }
            
        System.out.println("dbName is " + storage.getDbName());  
        System.out.println("collection Name is " + storage.getCollectionName());  
        ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList(); 
        for(int i=0;i<jsonDocList.size();i++)  
        {  
            System.out.println("objectId is " + jsonDocList.get(i).getDocId());    
            System.out.println("CreatedAt is " + jsonDocList.get(i).getCreatedAt());    
            System.out.println("UpdatedAtis " + jsonDocList.get(i).getUpdatedAt());    
            System.out.println("Jsondoc is " + jsonDocList.get(i).getJsonDoc());  
            System.out.println("Jsondoc is " + jsonDocList.get(i).getJsonDoc().getClass());  
            def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
            def userMap = [:]
            userMap.createdOn = jsonDocList.get(i).getCreatedAt()
            userMap.message = clientJson.message
            userMap.sender = clientJson.sender
            userMap.agent = clientJson.agent
            OfflineChats.push(userMap)
        } 
        resultMap.OfflineChats = OfflineChats
        println "resultMap ::::::::::::::::::::::;  "+resultMap
        resultMap
    }
    
    def loadMoreUsers(user,userRole,params){
        println "&&&&&&&&77777777777777"
        App42API.initialize(aKey,sKey);
        int max = 12;  
        int offset = Integer.parseInt(params.offset) ;
        def userList = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService(); 
        Storage storage = storageService.findAllDocuments(APP_42_DB_NAME,APP_42_AgentUsers_Collection_NAME,max,offset);    
        System.out.println("dbName is " + storage.getDbName());  
        System.out.println("collection Name is " + storage.getCollectionName());  
        ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList(); 
        App42Response app42response = storageService.findAllDocumentsCount(APP_42_DB_NAME,APP_42_Users_Collection_NAME);  
        System.out.println("Total Records : " + app42response.getTotalRecords()) 
        
        for(int i=0;i<jsonDocList.size();i++)  
        {  
            System.out.println("objectId is " + jsonDocList.get(i).getDocId());    
            System.out.println("CreatedAt is " + jsonDocList.get(i).getCreatedAt());    
            System.out.println("UpdatedAtis " + jsonDocList.get(i).getUpdatedAt());    
            System.out.println("Jsondoc is " + jsonDocList.get(i).getJsonDoc());  
            System.out.println("Jsondoc is " + jsonDocList.get(i).getJsonDoc().getClass());  
            def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
            def userMap = [:]
            userMap.createdOn = jsonDocList.get(i).getCreatedAt()
            userMap.phone = clientJson.phone
            userMap.email = clientJson.email
            userMap.name = clientJson.name
            userList.push(userMap)
        } 
        resultMap.userList = userList
        resultMap.totalCount = app42response.getTotalRecords()
        println "resultMap ::::::::::::::::::::::;  "+resultMap
        resultMap
    }
    
    def loadMoreOfflineChats(user,userRole,params){
        println "&&&&&&&&77777777777777"
        App42API.initialize(aKey,sKey);
        int max = 10;  
        int offset =  Integer.parseInt(params.offset) ;
        def OfflineChats = []
        def resultMap = [:]
        StorageService storageService = App42API.buildStorageService(); 
        Storage storage = storageService.findAllDocuments(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME,max,offset);    
        System.out.println("dbName is " + storage.getDbName());  
        System.out.println("collection Name is " + storage.getCollectionName());  
        ArrayList<Storage.JSONDocument> jsonDocList = storage.getJsonDocList(); 
        App42Response app42response = storageService.findAllDocumentsCount(APP_42_DB_NAME,APP_42_Offlinechats_Collection_NAME);  
        System.out.println("Total Records : " + app42response.getTotalRecords()) 
        for(int i=0;i<jsonDocList.size();i++)  
        {  
            System.out.println("objectId is " + jsonDocList.get(i).getDocId());    
            System.out.println("CreatedAt is " + jsonDocList.get(i).getCreatedAt());    
            System.out.println("UpdatedAtis " + jsonDocList.get(i).getUpdatedAt());    
            System.out.println("Jsondoc is " + jsonDocList.get(i).getJsonDoc());  
            System.out.println("Jsondoc is " + jsonDocList.get(i).getJsonDoc().getClass());  
            def clientJson = JSON.parse(jsonDocList.get(i).getJsonDoc())
            def userMap = [:]
            userMap.createdOn = jsonDocList.get(i).getCreatedAt()
            userMap.message = clientJson.message
            userMap.sender = clientJson.sender
            userMap.agent = clientJson.agent
            OfflineChats.push(userMap)
        } 
        resultMap.OfflineChats = OfflineChats
        resultMap.totalCount = app42response.getTotalRecords()
        println "resultMap ::::::::::::::::::::::;  "+resultMap
        resultMap
    }
}
