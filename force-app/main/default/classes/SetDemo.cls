public class SetDemo {
    
    public static void createSet(){
        
        Set<String> setCountries = new Set<String>();
        setCountries.add('India');
        setCountries.add('Russia');
        setCountries.add('China');
        System.Debug(setCountries);
        setCountries.add('India');
        System.Debug(setCountries);
        
        
        List<String> lstCountries = new List<String>();
        lstCountries .add('India');
        lstCountries .add('Russia');
        lstCountries .add('China');
        System.Debug(lstCountries );
        lstCountries .add('Brazil');
        System.Debug(lstCountries );
        
        Set<String> uniqCountries = new Set<String>(lstCountries);
        System.Debug(uniqCountries);
        lstCountries .add('Greece');
        
        Boolean setContains = uniqCountries.containsAll(lstCountries);
         System.Debug(setContains);
        
        
        
    }

}