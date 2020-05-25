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

@WebServlet(name = "CheckNameServlet", urlPatterns = "/isCheckName")
public class CheckNameServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userName = request.getParameter("user_name");
        System.out.println(userName);
        Map results = new HashMap();
        try {
            Connection conn = Connect.getConn();
            String sql = "select user_id from taobao_user where user_name = ?";
            PreparedStatement psmt = conn.prepareStatement(sql);
            psmt.setString(1, userName);
            ResultSet rs = psmt.executeQuery();
            if (rs.next()){
                results.put("state", 1);
            }else {
                results.put("state", 0);
            }
            rs.close();
            psmt.close();
        }catch (Exception e){
            e.printStackTrace();
            results.put("state", 1);
        }
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(new JSONObject(results));
    }
}
