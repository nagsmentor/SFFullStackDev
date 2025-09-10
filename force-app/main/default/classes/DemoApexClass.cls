public class DemoApexClass {
    public static Integer age = 45;
    public static String name = 'Nags';
    
 /*   public DemoApexClass(Integer a, String b){
        this.age = a;
        this.name = b;
        System.Debug('My First Class ' + 'Age is: ' + a + ' Name is: ' + b);
    } */
    
   public static void notConstructor(Integer a, String b){
       age = a;
       name = b;
       System.Debug('My First Class ' + 'Age is: ' + a + ' Name is: ' + b);
    }
    
    
    
}