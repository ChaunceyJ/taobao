import com.alibaba.fastjson.JSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(name = "GetOrderServlet", urlPatterns = "/getOrder")
public class GetOrderServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        int userId = 0;
        for (Cookie c:cookies
        ) {
            if (c.getName().equals("userid")){
                userId = Integer.valueOf(c.getValue());
            }
        }
        List list = new ArrayList();
        try {
            Connection conn = Connect.getConn();
            String sql = "select transaction.product_id, name, picture, per_price, number_of, total_price, buy_time from transaction natural join product where user_id = "+userId;
            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()){
                Map re = new HashMap();
                re.put("productid", rs.getInt("product_id"));
                re.put("productname", rs.getString("name"));
                re.put("imgsrc", rs.getString("picture"));
                re.put("perPrice", rs.getFloat("per_price"));
                re.put("number", rs.getInt("number_of"));
                re.put("totalPrice", rs.getFloat("total_price"));
                re.put("buyTime", rs.getString("buy_time"));
                list.add(re);
            }
//            System.out.println(list);
            rs.close();
            st.close();
            conn.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(JSON.toJSONString(list));
    }
}
