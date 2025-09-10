public class ListDemo {
    
    public static void addList(){
        Boolean found;
        Boolean notfound;
        List<String> lstString = new List<String>();
        lstString.add('India');
        lstString.add('Russia');
        lstString.add('China');
        //System.Debug(lstString);
         lstString.add(1, 'USA');
         //System.Debug(lstString.size());
        //lstString.clear();
        Boolean emptylist = lstString.isEmpty();
        //System.Debug(emptylist);
       // 
       found = lstString.contains('Russia');
        notfound = lstString.contains('Finland');
        System.Debug(found);
        System.Debug(notfound);

        List<String> newList = new List<String>();
        newList.add('apples');
        System.debug(newList);
        newList.addAll(lstString);
        System.debug('Added: ' + newList);
        
        for(String s : newList){
            if(s.equalsIgnoreCase('apples'))
                {
                    System.debug(s + ' is a fruit');
                }
            else
                {
                    System.debug(s + ' is a country');
                }
        }
        
        //Index starts from 0. Size = 4, Index is 0.1.2.3
        for(Integer i = 0; i < newList.size();i++)
        {
            if(newList[i].equalsIgnoreCase('apples'))
                {
                    System.debug(newList[i] + ' is a fruit');
                }
            else
                {
                    System.debug(newList[i] + ' is a country');
                }
        }
        
       
        List<String> lstCopy = new List<String>(lstString);
        System.Debug(lstCopy);
    }    
    
    

}