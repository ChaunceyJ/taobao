import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "SignupServlet", urlPatterns = "/signup")
public class SignupServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String user_name = request.getParameter("user_name");
        String nick_name = request.getParameter("nick_name");
        String password = request.getParameter("password");
        Map results = new HashMap();
        try {
            Connection conn = Connect.getConn();
            String sql = "insert into taobao_user(user_name, password, nick_name) values (?, ?, ?)";
            PreparedStatement psmt = conn.prepareStatement(sql);
            psmt.setString(1, user_name);
            psmt.setString(2, password);
            psmt.setString(3, nick_name);
            System.out.println(psmt.toString());
            if (psmt.executeUpdate() > 0){
                results.put("state", 1);
                sql = "select user_id, user_name, nick_name from taobao_user where user_name = ?";
                psmt = conn.prepareStatement(sql);
                psmt.setString(1, user_name);
                ResultSet rs = psmt.executeQuery();
                if (rs.next()){
                    results.put("userid", rs.getInt("user_id"));
                    results.put("username", rs.getString("user_name"));
                    results.put("nickname", rs.getString("nick_name"));
                    System.out.println(rs.getString("nick_name"));
                }else {
                    results.put("state", 0);
                }
                rs.close();
            }else {
                results.put("state", 0);
            }
            psmt.close();
            conn.close();
        }catch (Exception e){
            e.printStackTrace();
            results.put("state", 0);
        }
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(new JSONObject(results));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
