dataSource {
    pooled = true
    driverClassName = "org.h2.Driver"
    username = "sa"
    password = ""
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}
// environment specific settings
environments {
    production {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop','update'
            pooled = true
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = "App42RootUser"
            url = "jdbc:mysql://localhost/app42chatadmin?autoReconnect=true&jdbcCompliantTruncation=false&zeroDateTimeBehavior=convertToNull"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
            properties { 
                maxActive = 50
                maxIdle = 10
                minIdle = 2
                initialSize = 2
                maxWait = 30000
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            } 
			
        }
    }
    development {
        dataSource {
                            
            dbCreate = "update" // one of 'create', 'create-drop','update'
            pooled = true
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = ""
            url = "jdbc:mysql://localhost/app42chatadmin?autoReconnect=true&jdbcCompliantTruncation=false&zeroDateTimeBehavior=convertToNull"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
            properties { 
                maxActive = 50
                maxIdle = 1
                minIdle = 0
                initialSize = 1
                maxWait = 30000
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            } 
			
        }
    }
    test {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop','update'
            pooled = true
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = "App42RootUser"
            url = "jdbc:mysql://localhost/app42chatadmin?autoReconnect=true&jdbcCompliantTruncation=false&zeroDateTimeBehavior=convertToNull"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
            properties { 
                maxActive = 50
                maxIdle = 1
                minIdle = 0
                initialSize = 1
                maxWait = 30000
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            } 
			
        }
    }
}