import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Connect {

    // 驱动，固定的
    private static String driverName = "com.mysql.cj.jdbc.Driver";

    private static String url = "jdbc:mysql://172.18.0.2:3306/taobao?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC";
    private static String user = "root";
    private static String password = "123456";

    // 公共使用的变量
    private static Connection conn = null;
    private static Statement stmt = null;
    private static ResultSet rs = null;

    private Connect(){}

    public static Connection getConn()throws Exception{
        if (conn == null || conn.isClosed()){
            Class.forName(driverName);
            conn = DriverManager.getConnection(url,user,password);
        }
        return conn;
    }

}
