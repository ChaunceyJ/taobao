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

@WebServlet(name = "LoginServlet", urlPatterns = "/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Map results = new HashMap();
        String userName = request.getParameter("user_name");
        String password = request.getParameter("password");
        System.out.println(userName);
        System.out.println(password);
        try {
            Connection conn = Connect.getConn();
            String sql = "select * from taobao_user where user_name = ?";
            PreparedStatement psmt = conn.prepareStatement(sql);
            psmt.setString(1, userName);
            ResultSet rs = psmt.executeQuery();
            if (rs.next()){
                String passwordNew = rs.getString("password");
                if (password.equals(passwordNew)){
                    results.put("success", 1);
                    results.put("userid", rs.getInt("user_id"));
                    results.put("username", rs.getString("user_name"));
                    results.put("nickname", rs.getString("nick_name"));
                }else {
                    results.put("success", 0);
                }
            }else {
                results.put("success", 0);
            }
            rs.close();
            psmt.close();
            conn.close();
        }catch (Exception e){
            e.printStackTrace();
            results.put("success", 0);
        }
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(new JSONObject(results));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
