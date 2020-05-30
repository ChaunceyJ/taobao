import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
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
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.*;

@WebServlet(name = "ProductInfoServlet", urlPatterns = "/productInfo")
public class ProductInfoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONArray ja = JSONArray.parseArray(request.getParameter("data"));
        List list = new ArrayList();
        try {
            Connection conn = Connect.getConn();
            for (Object i:ja
            ) {
                Map re = new HashMap();
                String sql = "select * from product where product_id = "+Integer.valueOf((String)i);
                Statement st = conn.createStatement();
                ResultSet rs = st.executeQuery(sql);
                if (rs.next()){
                    re.put("productid", rs.getInt("product_id"));
                    re.put("productname", rs.getString("name"));
                    re.put("imgsrc", rs.getString("picture"));
                    re.put("perPrice", rs.getFloat("now_price"));
                }
                list.add(re);
                rs.close();
                st.close();
            }
            conn.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(JSON.toJSONString(list));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int productid = Integer.valueOf(request.getParameter("id"));
        Map re = new HashMap();
        try {
            Connection conn = Connect.getConn();
            String sql = "select * from product where product_id = "+productid;
            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery(sql);
            if (rs.next()){
                re.put("name", rs.getString("name"));
                re.put("picture", rs.getString("picture"));
                re.put("price", rs.getFloat("now_price"));
            }
            rs.close();
            st.close();
            conn.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(JSON.toJSONString(re));
    }
}
