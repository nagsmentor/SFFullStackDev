public class MapDemo {
    
    public static void createMap(){
       Map<String, String> mpCapitals = new Map<String, String>();
        mpCapitals.put('India','New Delhi');
        mpCapitals.put('Russia','Moscow');
        mpCapitals.put('China','Beijing');
        System.Debug(mpCapitals);
        mpCapitals.put('China','Peking');
        mpCapitals.put('Greece','Peking');
        System.Debug(mpCapitals);
        
        String indCapital = mpCapitals.get('India');
   	    System.Debug(indCapital);
        List<String> setCountries = new List<String>(mpCapitals.keyset());
//        setCountries = mpCapitals.keyset();
        System.Debug(setCountries);
        
        for (Integer i=0;i<setCountries.size();i++)
        {
            System.Debug(setCountries[i] + ' capital is ' + mpCapitals.get(setCountries[i]));
        }
    }
    
    
    

}