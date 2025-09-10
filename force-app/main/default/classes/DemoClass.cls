public class DemoClass {
    public String Name='raja';
    public Integer age=100;
    
    public DemoClass()
    {
        System.Debug('Name is: ' + this.Name + ' Age is: ' + this.age);
    }
    
    public DemoClass(String a, Integer b)
    {
        this.Name = a;
        this.age = b;
        System.Debug('Name is: ' + this.Name + ' Age is: ' + this.age);
    }
    
    public DemoClass(String a, String b, Integer c)
    {
        this.Name = a + ' ' + b;
        this.age = c;
        System.Debug('Name is: ' + this.Name + ' Age is: ' + this.age);
    }
    
   }