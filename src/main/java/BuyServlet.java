import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.*;

@WebServlet(name = "BuyServlet", urlPatterns = "/buy")
public class BuyServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        int userId = 0;
        for (Cookie c:cookies
             ) {
            if (c.getName().equals("userid")){
                userId = Integer.valueOf(c.getValue());
            }
        }
        JSONArray ja = JSONArray.parseArray(request.getParameter("data"));
        Map re = new HashMap();
        List list = new ArrayList();
        try {
            Connection conn = Connect.getConn();
            String sql = "insert into transaction(product_id, user_id, per_price, total_price, number_of, buy_time) values(?, ?, ?, ?, ?, ?)";
            PreparedStatement pst = conn.prepareStatement(sql);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String time = dateFormat.format(new Date().getTime());
            pst.setInt(2, userId);
            pst.setString(6, time);
            for (Object i:ja
                 ) {
                JSONObject jo = (JSONObject)i;
                list.add(jo.getInteger("product_id"));
                pst.setInt(1, jo.getInteger("product_id"));
                pst.setFloat(3, jo.getFloat("per_price"));
                pst.setFloat(4, jo.getFloat("total_price"));
                pst.setInt(5, jo.getInteger("number_of"));
                pst.executeUpdate();
                Statement st = conn.createStatement();
                st.executeUpdate("update product set product.remind_total = product.remind_total-1 where product_id = "+jo.getInteger("product_id"));
            }
            pst.close();
            conn.close();
            re.put("state", 1);
            re.put("list", list);
        }catch (Exception e){
            e.printStackTrace();
            re.put("state", 0);
        }
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(JSON.toJSONString(re));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    public static void main(String[] args) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = dateFormat.format(new Date().getTime());
        System.out.println(time);
    }
}
