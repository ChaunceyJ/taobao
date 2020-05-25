import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
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
import com.alibaba.fastjson.*;

@WebServlet(name = "ProductServlet", urlPatterns = "/getAllProduct")
public class ProductServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Map> res = new ArrayList<>();
        try {
            Connection conn = Connect.getConn();
            String sql = "select * from product";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()){
                Map mRS = new HashMap();
                mRS.put("product_id", rs.getInt("product_id"));
                mRS.put("product_name", rs.getString("name"));
                mRS.put("now_price", rs.getFloat("now_price"));
                mRS.put("old_price", rs.getFloat("ord_price"));
                mRS.put("remind_total", rs.getInt("remind_total"));
                mRS.put("all_total", rs.getInt("all_total"));
                mRS.put("picture", rs.getString("picture"));
                res.add(mRS);
            }
            rs.close();
            stmt.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println(res);
        Map finMap = new HashMap();
        finMap.put("results", res);
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(new JSONObject(finMap));
    }
}
